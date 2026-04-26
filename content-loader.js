async function ensureContentLoaded() {
  if (globalThis.DS_CONTENT && globalThis.ACHIEVEMENTS && globalThis.getLevelInfo) {
    return;
  }

  const response = await fetch("./index.txt");
  if (!response.ok) {
    throw new Error("Не удалось загрузить index.txt с материалами");
  }

  let source = await response.text();

  // Небольшая правка синтаксической опечатки из исходного файла.
  source = source.replace(/<code">/g, "<code>");

  source = source
    .replace("const DS_CONTENT =", "globalThis.DS_CONTENT =")
    .replace("const LEVELS =", "globalThis.LEVELS =")
    .replace("const ACHIEVEMENTS =", "globalThis.ACHIEVEMENTS =")
    .replace("function getLevelInfo(", "globalThis.getLevelInfo = function getLevelInfo(");

  // Выполняем источник как скрипт приложения.
  new Function(source)();

  // Опционально подменяем модуль Python (m1) из отдельного файла,
  // если пользователь добавил/обновил его локально.
  try {
    const moduleResponse = await fetch("./m1_python_module.js", { cache: "no-store" });
    if (moduleResponse.ok) {
      const moduleSource = await moduleResponse.text();
      const parsedModule = new Function(`"use strict"; return (\n${moduleSource}\n);`)();

      if (
        parsedModule &&
        parsedModule.id === "m1" &&
        Array.isArray(parsedModule.lessons) &&
        parsedModule.lessons.length > 0 &&
        globalThis.DS_CONTENT &&
        Array.isArray(globalThis.DS_CONTENT.modules)
      ) {
        const idx = globalThis.DS_CONTENT.modules.findIndex((m) => m.id === "m1");
        if (idx >= 0) {
          globalThis.DS_CONTENT.modules[idx] = parsedModule;
        } else {
          globalThis.DS_CONTENT.modules.unshift(parsedModule);
        }

        // Пересчитываем XP после подмены модуля.
        globalThis.DS_CONTENT.totalXP = globalThis.DS_CONTENT.modules.reduce((total, mod) => {
          return total + mod.lessons.reduce((sum, lesson) => sum + (lesson.xp || 0) + 30, 0);
        }, 0);
      }
    }
  } catch {
    // Если файл отсутствует/битый — работаем с базовым контентом без падения.
  }

  if (!globalThis.DS_CONTENT) {
    throw new Error("Материалы не инициализировались");
  }
}
