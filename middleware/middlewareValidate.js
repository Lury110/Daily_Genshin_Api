// utils/validate.js
function normalizeStr(s) {
    return String(s || '').trim().replace(/\s+/g, ' ');
}
function isPlainTextStrict(s, { max = 120 } = {}) {
    if (typeof s !== 'string') return false;
    if (!s) return false;
    if (s.length > max) return false;
    // Interdit balises et contrôles
    if (/[<>]/.test(s)) return false;
    if (/[\u0000-\u001F\u007F]/.test(s)) return false;
    return true;
}
function isValidEmail(e) {
    e = String(e || '').toLowerCase().trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
module.exports = { normalizeStr, isPlainTextStrict, isValidEmail };
