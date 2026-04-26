const DS_DB = (() => {
  const DB_NAME = "ds-path-db";
  const DB_VERSION = 1;
  const STORE = "state";
  const KEY = "main";

  function openDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function defaultState() {
    return {
      id: KEY,
      totalXP: 0,
      completedLessons: {},
      quizScores: {},
      achievements: [],
      streakDays: 0,
      maxStreak: 0,
      lastStudyDate: null,
    };
  }

  async function getState() {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const req = store.get(KEY);
      req.onsuccess = () => resolve(req.result || defaultState());
      req.onerror = () => reject(req.error);
    });
  }

  async function saveState(nextState) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      store.put({ ...nextState, id: KEY });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  return { getState, saveState, defaultState };
})();
