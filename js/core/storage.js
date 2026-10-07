window.CG = window.CG || {};

CG.storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('cyberguard.' + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem('cyberguard.' + key, JSON.stringify(value));
    } catch (e) {}
  }
};
