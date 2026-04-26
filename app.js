(async function bootstrap() {
  const app = document.getElementById("app");
  const levelBadge = document.getElementById("levelBadge");
  const navButtons = [...document.querySelectorAll(".bottom-nav button")];
  let state = DS_DB.defaultState();
  let view = "home";
  let currentLessonId = null;
  let currentQuizIndex = 0;
  let currentQuizCorrect = 0;

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
