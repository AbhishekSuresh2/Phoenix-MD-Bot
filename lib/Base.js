// lib/Base.js
// Utility helpers used across the bot. Kept intentionally small and well-documented.
const fs = require('fs');
const path = require('path');

module.exports = {
  // Safely ensure a directory exists
  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  },

  // Simple helper to normalize jid (phone@...), keep as-is if falsy
  normalizeJid(jid) {
    if (!jid) return jid;
    return jid.toString();
  },

  // A safe JSON parse that returns a fallback value on error
  safeJSONParse(value, fallback = null) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  },

  // Read text file if exists, otherwise return default
  readTextFile(filepath, defaultValue = '') {
    try {
      if (fs.existsSync(filepath)) return fs.readFileSync(filepath, 'utf8');
      return defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  // Write JSON safely
  writeJSON(filepath, obj) {
    try {
      const dir = path.dirname(filepath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filepath, JSON.stringify(obj, null, 2), 'utf8');
      return true;
    } catch (e) {
      return false;
    }
  }
};
