window.CG = window.CG || {};

CG.INITIAL_KARMA = 30600;

CG.formatNumber = n => n.toLocaleString('es-VE');

CG.$ = id => document.getElementById(id);

CG.state = {
  reset() {
    this.karma = CG.INITIAL_KARMA;
    this.character = null;
    this.questionIndex = 0;
    this.answers = [];
    this.streak = 0;
    this.maxStreak = 0;
    this.hintsUsed = 0;
    this.unlocked = new Set(['ev1']);
    this.analyzed = new Set();
    this.risksRead = new Set();
    this.rewards = new Set();
    this.runAchievements = new Set();
    this.startedAt = Date.now();
  },

  hasPerk(perkId) {
    return Boolean(this.character && this.character.perk.id === perkId);
  },

  correctCount() {
    return this.answers.filter(a => a.correct).length;
  }
};

CG.state.reset();
