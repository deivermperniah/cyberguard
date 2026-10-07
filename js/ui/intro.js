window.CG = window.CG || {};

CG.intro = (() => {
  const BOOT_LINES = [
    { text: '> Conectando con SisteMAT...', cls: '' },
    { text: '> [ERROR] 15.000 consultas anómalas detectadas', cls: 'term-danger' },
    { text: '> [ALERTA] Ransomware LockBit 3.0 activo', cls: 'term-danger' },
    { text: '> Cifrado de 847 GB programado en 24:00:00', cls: 'term-warn' },
    { text: '> Activando protocolo CYBERGUARD... OK', cls: 'term-ok' }
  ];

  let bootId = 0;
  let skip = false;
  let selected = null;

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function boot() {
    const run = ++bootId;
    const terminal = CG.$('boot-terminal');
    const story = CG.$('intro-story');
    terminal.innerHTML = '';
    story.classList.remove('is-visible');
    skip = CG.fx.reducedMotion();

    for (const line of BOOT_LINES) {
      const el = document.createElement('div');
      el.className = 'term-line ' + line.cls;
      terminal.appendChild(el);
      for (const ch of line.text) {
        if (run !== bootId) return;
        el.textContent += ch;
        if (!skip) await wait(18);
      }
      if (!skip) await wait(240);
    }
    if (run === bootId) story.classList.add('is-visible');
  }

  function renderPicker() {
    CG.$('character-pick').innerHTML = CG.characters.pickerHtml(selected);
  }

  function renderBest() {
    const best = CG.storage.get('best', 0);
    const el = CG.$('best-score');
    el.hidden = !best;
    el.textContent = `🏆 Tu mejor puntaje: ${CG.formatNumber(best)} pts`;
  }

  function start() {
    const startBtn = CG.$('btn-start');
    if (!selected) {
      CG.fx.shake(startBtn);
      return;
    }
    CG.state.startedAt = Date.now();
    const character = CG.characters.setLeader(selected);

    CG.sound.play('start');
    CG.quiz.render();
    CG.showScreen('screen-game');
    CG.tabs.show('historia');
    CG.fx.toast(`${character.name} lidera la investigación: ${character.perk.desc}`, { icon: character.emoji, type: 'success' });
  }

  function reset() {
    selected = null;
    CG.$('btn-start').disabled = true;
    renderPicker();
    renderBest();
    boot();
  }

  function init() {
    CG.$('intro-karma').textContent = CG.formatNumber(CG.INITIAL_KARMA);
    CG.$('boot-terminal').addEventListener('click', () => { skip = true; });
    CG.$('character-pick').addEventListener('click', e => {
      const card = e.target.closest('[data-character]');
      if (!card) return;
      selected = card.dataset.character;
      CG.$('btn-start').disabled = false;
      CG.sound.play('click');
      renderPicker();
    });
    CG.$('btn-start').addEventListener('click', start);
    reset();
  }

  return { init, reset };
})();
