(async function bootstrap() {
  const app = document.getElementById("app");
  const levelBadge = document.getElementById("levelBadge");
  const navButtons = [...document.querySelectorAll(".bottom-nav button")];
  let state = DS_DB.defaultState();
  let view = "home";
  let currentLessonId = null;
  let currentQuizIndex = 0;
  let currentQuizCorrect = 0;
  let pyodidePromise = null;
  const pythonDrafts = {};

  const PYTHON_LABS = {
    m1l1: [
      {
        title: "Приветствие",
        description: "Создай переменную name и выведи приветствие через f-строку.",
        starter: 'name = "Дима"\nprint(f"Привет, {name}!")',
        tests: 'assert "name" in globals()\nassert isinstance(name, str)',
      },
      {
        title: "Возраст",
        description: "Создай переменную age (число) и выведи возраст через 5 лет.",
        starter: "age = 24\nprint(age + 5)",
        tests: 'assert "age" in globals()\nassert isinstance(age, int)',
      },
    ],
    m1l2: [
      {
        title: "Четное/нечетное",
        description: "Напиши код, который задает number и печатает True, если число четное.",
        starter: "number = 14\nprint(number % 2 == 0)",
        tests: 'assert "number" in globals()\nassert number % 2 == 0 or number % 2 == 1',
      },
      {
        title: "Функция суммы",
        description: "Создай функцию add(a, b), которая возвращает сумму.",
        starter: "def add(a, b):\n    return a + b\n\nprint(add(2, 3))",
        tests: 'assert "add" in globals()\nassert add(10, 5) == 15',
      },
    ],
    m1l3: [
      {
        title: "Очистка строк",
        description: "Очисти список names: убрать пробелы и привести к Title Case.",
        starter:
          'names = ["  дима ", "КАТЯ", "вася  "]\nclean_names = [n.strip().title() for n in names]\nprint(clean_names)',
        tests:
          'assert "clean_names" in globals()\nassert clean_names == ["Дима", "Катя", "Вася"]',
      },
    ],
    m1l4: [
      {
        title: "Безопасный ввод",
        description: "Добавь try/except для защиты от нечислового ввода.",
        starter:
          'user_input = "abc"\ntry:\n    x = int(user_input)\n    print(x)\nexcept ValueError:\n    print("Это не число")',
        tests: 'assert "try:" in """\n""" or True',
      },
    ],
    m1l5: [
      {
        title: "Сумма от 1 до N",
        description: "Вычисли сумму чисел от 1 до n.",
        starter: "n = 10\ntotal = sum(range(1, n + 1))\nprint(total)",
        tests: 'assert "total" in globals()\nassert total == 55',
      },
    ],
  };

  try {
    await ensureContentLoaded();
    state = await DS_DB.getState();
  } catch (err) {
    app.innerHTML = `<div class="card"><h3>Ошибка запуска</h3><p>${String(err.message || err)}</p></div>`;
    return;
  }

  function save() {
    return DS_DB.saveState(state);
  }

  function getAllLessons() {
    return DS_CONTENT.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title }))
    );
  }

  function computeStats() {
    const lessons = getAllLessons();
    const completedIds = Object.keys(state.completedLessons).filter((id) => state.completedLessons[id]);
    const completedModules = DS_CONTENT.modules
      .filter((m) => m.lessons.every((l) => state.completedLessons[l.id]))
      .map((m) => m.id);

    const perfectQuizzes = Object.values(state.quizScores).filter((s) => s === 100).length;
    const quizzesPassed = Object.keys(state.quizScores).length;

    return {
      lessonsTotal: lessons.length,
      completedLessons: completedIds.length,
      completedModules,
      perfectQuizzes,
      quizzesPassed,
      totalXP: state.totalXP,
      maxStreak: state.maxStreak,
      progressPct: lessons.length ? Math.round((completedIds.length / lessons.length) * 100) : 0,
    };
  }

  function updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (state.lastStudyDate === today) return;

    if (!state.lastStudyDate) {
      state.streakDays = 1;
    } else {
      const prev = new Date(state.lastStudyDate);
      const now = new Date(today);
      const diff = Math.round((now - prev) / 86400000);
      if (diff === 1) state.streakDays += 1;
      else if (diff > 1) state.streakDays = 1;
    }

    state.lastStudyDate = today;
    state.maxStreak = Math.max(state.maxStreak || 0, state.streakDays || 0);
  }

  function unlockAchievements(stats) {
    const unlocked = new Set(state.achievements || []);
    for (const a of ACHIEVEMENTS) {
      if (!unlocked.has(a.id) && a.condition(stats)) unlocked.add(a.id);
    }
    state.achievements = [...unlocked];
  }

  function updateHeader() {
    const levelInfo = getLevelInfo(state.totalXP || 0);
    levelBadge.textContent = `${levelInfo.currentLevel.icon} ${levelInfo.currentLevel.title} • XP: ${state.totalXP}`;
  }

  async function ensurePyRuntime() {
    if (globalThis.pyodide) return globalThis.pyodide;
    if (!pyodidePromise) {
      pyodidePromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.onload = async () => {
          try {
            const py = await globalThis.loadPyodide({
              stdout: () => {},
              stderr: () => {},
            });
            resolve(py);
          } catch (e) {
            reject(e);
          }
        };
        script.onerror = () => reject(new Error("Не удалось загрузить Python-движок (Pyodide)."));
        document.head.appendChild(script);
      });
    }
    return pyodidePromise;
  }

  async function runPythonCode(code) {
    const py = await ensurePyRuntime();
    const out = [];
    const err = [];
    py.setStdout({ batched: (msg) => out.push(msg) });
    py.setStderr({ batched: (msg) => err.push(msg) });

    try {
      await py.runPythonAsync(code);
      return { ok: true, output: out.join("\n").trim() };
    } catch (e) {
      return {
        ok: false,
        output: out.join("\n").trim(),
        error: `${String(e)}${err.length ? `\n${err.join("\n")}` : ""}`.trim(),
      };
    }
  }

  function generatePythonHint(code, error, task) {
    if (!error) {
      return "Начни с маленького шага: сначала выведи промежуточный результат через print(), потом усложняй.";
    }
    if (/SyntaxError/i.test(error)) return "Синтаксическая ошибка: проверь двоеточия, скобки, кавычки и отступы.";
    if (/IndentationError/i.test(error)) return "Проверь отступы в блоках if/for/while/def. В Python это критично.";
    if (/NameError/i.test(error))
      return "Используется переменная/функция, которая не объявлена. Проверь опечатки и порядок строк.";
    if (/TypeError/i.test(error))
      return "Скорее всего смешаны типы (строка и число). Используй int()/str() для преобразования.";
    if (/ValueError/i.test(error))
      return "Некорректное преобразование значения. Проверь, что в int()/float() передаётся правильный формат.";
    if (/AssertionError/i.test(error))
      return `Код запускается, но не проходит проверку задания "${task.title}". Сверь ожидаемое условие и имена переменных.`;
    if (!code.includes("print(")) return "Добавь print(), чтобы увидеть промежуточные значения и быстрее понять, где ошибка.";
    return "Разбей задачу на 2-3 шага: сначала переменные, затем логику, затем вывод.";
  }

  function renderPythonLab(lesson) {
    const tasks = PYTHON_LABS[lesson.id];
    if (!tasks?.length) return "";
    return `
      <section class="card python-lab" id="pythonLab">
        <h3>Python-практика с помощником</h3>
        <p class="muted">Пиши код, запускай прямо в приложении и получай подсказки по ошибкам.</p>
        <label class="muted">Задание</label>
        <select id="pyTaskSelect" class="py-select">
          ${tasks.map((t, i) => `<option value="${i}">${i + 1}. ${t.title}</option>`).join("")}
        </select>
        <p id="pyTaskDesc" class="muted">${tasks[0].description}</p>
        <textarea id="pyEditor" class="py-editor" spellcheck="false">${pythonDrafts[lesson.id] || tasks[0].starter}</textarea>
        <div class="row">
          <button id="pyRunBtn" type="button">▶ Запустить код</button>
          <button id="pyCheckBtn" type="button" class="primary">Проверить задание</button>
        </div>
        <pre id="pyOutput" class="py-output">Готово к запуску.</pre>
        <div class="py-hint-wrap">
          <strong>AI-подсказка</strong>
          <p id="pyHint" class="muted">После запуска здесь появится подсказка по твоему коду.</p>
        </div>
      </section>
    `;
  }

  function bindPythonLab(lesson) {
    const tasks = PYTHON_LABS[lesson.id];
    if (!tasks?.length) return;
    const taskSelect = document.getElementById("pyTaskSelect");
    const taskDesc = document.getElementById("pyTaskDesc");
    const editor = document.getElementById("pyEditor");
    const output = document.getElementById("pyOutput");
    const hint = document.getElementById("pyHint");
    const runBtn = document.getElementById("pyRunBtn");
    const checkBtn = document.getElementById("pyCheckBtn");

    function getCurrentTask() {
      return tasks[Number(taskSelect.value) || 0];
    }

    taskSelect.addEventListener("change", () => {
      const task = getCurrentTask();
      taskDesc.textContent = task.description;
      if (!editor.value.trim()) editor.value = task.starter;
      output.textContent = "Готово к запуску.";
      hint.textContent = "После запуска здесь появится подсказка по твоему коду.";
    });

    editor.addEventListener("input", () => {
      pythonDrafts[lesson.id] = editor.value;
    });

    runBtn.addEventListener("click", async () => {
      runBtn.disabled = true;
      output.textContent = "Запуск...";
      const result = await runPythonCode(editor.value);
      if (result.ok) {
        output.textContent = result.output || "Код выполнился без вывода.";
        hint.textContent = "Код запустился. Теперь проверь задание кнопкой 'Проверить задание'.";
      } else {
        output.textContent = `${result.output ? `${result.output}\n` : ""}${result.error}`;
        hint.textContent = generatePythonHint(editor.value, result.error, getCurrentTask());
      }
      runBtn.disabled = false;
    });

    checkBtn.addEventListener("click", async () => {
      checkBtn.disabled = true;
      const task = getCurrentTask();
      output.textContent = "Проверка задания...";
      const combinedCode = `${editor.value}\n\n${task.tests}`;
      const result = await runPythonCode(combinedCode);
      if (result.ok) {
        output.textContent = `Задание "${task.title}" пройдено.\n${result.output || ""}`.trim();
        hint.textContent = "Отлично! Переходи к следующему заданию или усложни решение самостоятельно.";
      } else {
        output.textContent = `${result.output ? `${result.output}\n` : ""}${result.error}`;
        hint.textContent = generatePythonHint(editor.value, result.error, task);
      }
      checkBtn.disabled = false;
    });
  }

  async function completeLesson(lesson) {
    if (!state.completedLessons[lesson.id]) {
      state.completedLessons[lesson.id] = true;
      state.totalXP += lesson.xp || 0;
      updateStreak();
      const stats = computeStats();
      unlockAchievements(stats);
      await save();
    }
  }

  async function finishQuiz(lesson, percent) {
    state.quizScores[lesson.id] = Math.max(percent, state.quizScores[lesson.id] || 0);
    if (percent >= 60) {
      state.totalXP += 30;
      updateStreak();
    }
    const stats = computeStats();
    unlockAchievements(stats);
    await save();
  }

  function renderHome() {
    const stats = computeStats();
    app.innerHTML = `
      <section class="card">
        <h2>Твой путь в Data Science</h2>
        <p class="muted">Мобильный учебный трек с материалами, тестами и автосохранением в IndexedDB.</p>
      </section>
      <section class="card">
        <div class="row">
          <strong>Общий прогресс</strong>
          <span>${stats.progressPct}%</span>
        </div>
        <div class="progress-wrap"><div class="progress-bar" style="width:${stats.progressPct}%"></div></div>
        <p class="muted">${stats.completedLessons}/${stats.lessonsTotal} уроков, стрик: ${state.streakDays || 0} дн.</p>
      </section>
      <section class="card">
        <h3>Быстрые цифры</h3>
        <p>Модулей: ${DS_CONTENT.modules.length}</p>
        <p>Тестов пройдено: ${stats.quizzesPassed}</p>
        <p>Достижений: ${(state.achievements || []).length}/${ACHIEVEMENTS.length}</p>
      </section>
    `;
  }

  function renderModules() {
    app.innerHTML = DS_CONTENT.modules
      .map((m) => {
        const done = m.lessons.filter((l) => state.completedLessons[l.id]).length;
        return `
          <section class="card">
            <div class="row">
              <h3>${m.icon || "📘"} ${m.title}</h3>
              <span class="pill">${done}/${m.lessons.length}</span>
            </div>
            <p class="muted">${m.subtitle || ""}</p>
            ${m.lessons
              .map(
                (l) => `<div class="card">
                  <div class="row">
                    <div>
                      <strong>${l.title}</strong>
                      <p class="muted">${l.readTime || "?"} мин • ${l.xp || 0} XP</p>
                    </div>
                    <button data-lesson="${l.id}">${state.completedLessons[l.id] ? "Повторить" : "Открыть"}</button>
                  </div>
                </div>`
              )
              .join("")}
          </section>
        `;
      })
      .join("");

    app.querySelectorAll("button[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentLessonId = btn.getAttribute("data-lesson");
        renderLesson();
      });
    });
  }

  function renderLesson() {
    const lesson = getAllLessons().find((l) => l.id === currentLessonId);
    if (!lesson) {
      renderModules();
      return;
    }

    const bestQuiz = state.quizScores[lesson.id] || 0;
    app.innerHTML = `
      <section class="card">
        <div class="row">
          <h2>${lesson.title}</h2>
          <button id="backToModules">Назад</button>
        </div>
        <p class="muted">${lesson.moduleTitle} • ${lesson.readTime || "?"} мин • ${lesson.xp || 0} XP</p>
      </section>
      <section class="card lesson-content">${lesson.content || "<p>Контент пуст.</p>"}</section>
      <section class="card">
        <div class="row">
          <button id="completeLesson" class="primary">${state.completedLessons[lesson.id] ? "Урок засчитан" : "Отметить как пройденный"}</button>
          <button id="startQuiz" ${lesson.quiz?.length ? "" : "disabled"}>Начать тест</button>
        </div>
        <p class="muted">Лучший результат теста: ${bestQuiz}%</p>
      </section>
      ${lesson.moduleId === "m1" ? renderPythonLab(lesson) : ""}
    `;

    document.getElementById("backToModules").addEventListener("click", renderModules);
    document.getElementById("completeLesson").addEventListener("click", async () => {
      await completeLesson(lesson);
      updateHeader();
      renderLesson();
    });
    document.getElementById("startQuiz").addEventListener("click", () => {
      currentQuizIndex = 0;
      currentQuizCorrect = 0;
      renderQuiz(lesson);
    });
    if (lesson.moduleId === "m1") bindPythonLab(lesson);
  }

  function renderQuiz(lesson) {
    const questions = lesson.quiz || [];
    if (!questions.length) return renderLesson();
    const q = questions[currentQuizIndex];

    app.innerHTML = `
      <section class="card">
        <div class="row">
          <h3>Тест: ${lesson.title}</h3>
          <span>${currentQuizIndex + 1}/${questions.length}</span>
        </div>
        <p class="quiz-q">${q.q}</p>
        <div class="quiz-opts">
          ${q.opts.map((opt, idx) => `<button data-opt="${idx}">${opt}</button>`).join("")}
        </div>
        <button id="cancelQuiz">Выйти</button>
      </section>
    `;

    app.querySelectorAll("button[data-opt]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const selected = Number(btn.getAttribute("data-opt"));
        const ok = selected === q.ans;
        if (ok) currentQuizCorrect += 1;

        if (currentQuizIndex < questions.length - 1) {
          currentQuizIndex += 1;
          renderQuiz(lesson);
        } else {
          const percent = Math.round((currentQuizCorrect / questions.length) * 100);
          await finishQuiz(lesson, percent);
          updateHeader();
          app.innerHTML = `
            <section class="card">
              <h3>Результат теста</h3>
              <p class="${percent >= 60 ? "ok" : "bad"}">Твой результат: ${percent}%</p>
              <p class="muted">${percent >= 60 ? "Отлично, +30 XP." : "Попробуй ещё раз, чтобы закрепить тему."}</p>
              <button id="backLesson" class="primary">Вернуться к уроку</button>
            </section>
          `;
          document.getElementById("backLesson").addEventListener("click", renderLesson);
        }
      });
    });

    document.getElementById("cancelQuiz").addEventListener("click", renderLesson);
  }

  function renderProgress() {
    const stats = computeStats();
    const unlocked = new Set(state.achievements || []);
    app.innerHTML = `
      <section class="card">
        <h2>Твой прогресс</h2>
        <p>XP: <strong>${state.totalXP}</strong></p>
        <p>Уроки: <strong>${stats.completedLessons}/${stats.lessonsTotal}</strong></p>
        <p>Тесты: <strong>${stats.quizzesPassed}</strong>, идеальных: <strong>${stats.perfectQuizzes}</strong></p>
        <p>Стрик: <strong>${state.streakDays || 0}</strong>, макс: <strong>${state.maxStreak || 0}</strong></p>
      </section>
      <section class="card">
        <h3>Достижения</h3>
        ${ACHIEVEMENTS.map(
          (a) => `<div class="card">
            <div class="row">
              <strong>${a.icon} ${a.title}</strong>
              <span>${unlocked.has(a.id) ? "✅" : "⬜"}</span>
            </div>
            <p class="muted">${a.desc}</p>
          </div>`
        ).join("")}
      </section>
    `;
  }

  function render() {
    updateHeader();
    navButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.view === view));
    if (view === "home") renderHome();
    if (view === "modules") renderModules();
    if (view === "progress") renderProgress();
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      view = btn.dataset.view;
      currentLessonId = null;
      render();
    });
  });

  render();
})();
