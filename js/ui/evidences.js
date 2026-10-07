window.CG = window.CG || {};

CG.evidences = (() => {
  const SCAN_MS = 1200;

  function reward(ev) {
    return CG.state.hasPerk('evidence-bonus') ? Math.round(ev.karma * 1.5) : ev.karma;
  }

  function status(ev) {
    if (CG.state.analyzed.has(ev.id)) return 'revealed';
    if (CG.state.unlocked.has(ev.id)) return 'unlocked';
    return 'locked';
  }

  function cardHtml(ev) {
    const st = status(ev);
    const lockIcon = { locked: '🔒', unlocked: '🔓', revealed: '✅' }[st];
    const note = st === 'locked'
      ? `<br><em>(Responde la pregunta ${ev.question} para desbloquear)</em>`
      : st === 'unlocked' ? '<br><em>👆 Haz clic para analizar</em>' : '';

    return `
      <article class="evidence-card ${st}" data-id="${ev.id}" tabindex="0" role="button"
        aria-label="${ev.code} ${ev.title}: ${st === 'locked' ? 'bloqueada' : st === 'unlocked' ? 'lista para analizar' : 'analizada'}">
        <div class="lock-icon">${lockIcon}</div>
        <div class="evidence-icon">${ev.icon}</div>
        <div class="evidence-title">${ev.code} · ${ev.title}</div>
        <div class="evidence-desc">${ev.teaser}${note}</div>
        <div class="evidence-scan"><div class="evidence-scan-bar"></div>Analizando evidencia...</div>
        <div class="evidence-revealed-text">${ev.detail}</div>
        <span class="karma-reward">+${CG.formatNumber(reward(ev))} KARMA</span>
      </article>
    `;
  }

  function updateProgress() {
    const total = CG.data.evidences.length;
    const done = CG.state.analyzed.size;
    CG.$('evidence-progress').textContent = `Evidencias analizadas: ${done} / ${total}`;
    CG.$('evidence-progress-bar').style.width = (done / total * 100) + '%';

    const pending = [...CG.state.unlocked].filter(id => !CG.state.analyzed.has(id)).length;
    const badge = CG.$('badge-evidencias');
    badge.hidden = pending === 0;
    badge.textContent = pending;
  }

  function render() {
    CG.$('evidence-grid').innerHTML = CG.data.evidences.map(cardHtml).join('');
    updateProgress();
  }

  function analyze(card) {
    const ev = CG.data.evidences.find(e => e.id === card.dataset.id);
    const st = status(ev);

    if (st === 'locked') {
      CG.sound.play('wrong');
      CG.fx.shake(card);
      CG.fx.toast(`Responde correctamente la pregunta ${ev.question} en "Jugar" para desbloquear esta evidencia.`, { icon: '🔒', type: 'warn' });
      return;
    }
    if (st === 'revealed' || card.classList.contains('scanning')) return;

    card.classList.add('scanning');
    CG.sound.play('scan');
    const runId = CG.state.startedAt;

    setTimeout(() => {
      if (runId !== CG.state.startedAt || CG.state.analyzed.has(ev.id)) return;
      CG.state.analyzed.add(ev.id);
      const current = document.querySelector(`.evidence-card[data-id="${ev.id}"]`);
      CG.karma.add(reward(ev), current);
      CG.sound.play('unlock');
      current.outerHTML = cardHtml(ev);
      document.querySelector(`.evidence-card[data-id="${ev.id}"]`).classList.add('just-revealed');
      updateProgress();

      if (CG.state.analyzed.size === CG.data.evidences.length) {
        CG.achievements.unlock('forensic');
      }
    }, SCAN_MS);
  }

  function unlock(id) {
    if (CG.state.unlocked.has(id)) return;
    CG.state.unlocked.add(id);
    const ev = CG.data.evidences.find(e => e.id === id);
    render();
    CG.fx.toast(`Nueva evidencia desbloqueada: ${ev.code} · ${ev.title}`, { icon: '🔓', type: 'success' });
  }

  function init() {
    const grid = CG.$('evidence-grid');
    grid.addEventListener('click', e => {
      const card = e.target.closest('.evidence-card');
      if (card) analyze(card);
    });
    grid.addEventListener('keydown', e => {
      const card = e.target.closest('.evidence-card');
      if (card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        analyze(card);
      }
    });
    render();
  }

  return { init, render, unlock };
})();
