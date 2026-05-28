let last = null;
let cooldownUntil = 0;

module.exports = {
  smooth(tension) {
    if (!last) {
      last = tension;
      return tension;
    }
    if (tension === last) return tension;

    const smoothed = last;
    last = tension;
    return smoothed;
  },

  allowTrigger() {
    const now = Date.now();
    if (now < cooldownUntil) return false;
    cooldownUntil = now + 3000;
    return true;
  }
};
