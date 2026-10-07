window.CG = window.CG || {};

CG.risks = (() => {
  const READ_REWARD = 100;
  let filter = 'all';

  function render() {
    CG.$('risks-list').innerHTML = CG.data.risks.map((risk, i) => `
      <div class="risk-item ${CG.state.risksRead.has(i) ? 'read' : ''}" data-index="${i}" data-level="${risk.level}"
        ${filter !== 'all' && filter !== risk.level ? 'hidden' : ''}>
        <button class="risk-header" aria-expanded="false">
          <span class="risk-level ${risk.level}">${CG.data.riskLevels[risk.level]}</span>
          <span class="risk-name">${risk.name}</span>
          <span class="risk-read">✓ Estudiado</span>
          <span class="risk-arrow">▶</span>
        </button>
        <div class="risk-body">
          <p><strong class="risk-label-bad">Descripción:</strong> ${risk.desc}</p>
          <p><strong class="risk-label-good">Solución:</strong> ${risk.solution}</p>
        </div>
      </div>
    `).join('');
    updateProgress();
  }

  function updateProgress() {
    CG.$('risk-progress').textContent = `Estudiados: ${CG.state.risksRead.size} / ${CG.data.risks.length}`;
  }

  function toggle(item) {
    const open = item.classList.toggle('open');
    item.querySelector('.risk-header').setAttribute('aria-expanded', open);
    CG.sound.play('click');

    const index = Number(item.dataset.index);
    if (!open || CG.state.risksRead.has(index)) return;

    CG.state.risksRead.add(index);
    item.classList.add('read');
    CG.karma.add(READ_REWARD, item.querySelector('.risk-level'));
    updateProgress();

    if (CG.state.risksRead.size === CG.data.risks.length) {
      CG.achievements.unlock('risk-reader');
    }
  }

  function setFilter(level) {
    filter = level;
    document.querySelectorAll('#risk-filters .chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.level === level);
    });
    document.querySelectorAll('.risk-item').forEach(item => {
      item.hidden = level !== 'all' && item.dataset.level !== level;
    });
    CG.sound.play('click');
  }

  function init() {
    CG.$('risks-list').addEventListener('click', e => {
      const header = e.target.closest('.risk-header');
      if (header) toggle(header.closest('.risk-item'));
    });
    CG.$('risk-filters').addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (chip) setFilter(chip.dataset.level);
    });
    render();
  }

  return { init, render };
})();
