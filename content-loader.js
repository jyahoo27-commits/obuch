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

  if (!globalThis.DS_CONTENT) {
    throw new Error("Материалы не инициализировались");
  }
}
