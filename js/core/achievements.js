window.CG = window.CG || {};

CG.achievements = (() => {
  const unlocked = new Set(CG.storage.get('achievements', []));

  function find(id) {
    return CG.data.achievements.find(a => a.id === id);
  }

  function unlock(id) {
    CG.state.runAchievements.add(id);
    if (unlocked.has(id)) return;

    unlocked.add(id);
    CG.storage.set('achievements', [...unlocked]);

    const achievement = find(id);
    CG.sound.play('achievement');
    CG.fx.toast(`Logro desbloqueado: ${achievement.name}`, {
      icon: achievement.icon,
      type: 'achievement',
      duration: 4000
    });
    render();
  }

  function render() {
    CG.$('achievements-count').textContent = unlocked.size;
    CG.$('achievement-list').innerHTML = CG.data.achievements.map(a => `
      <li class="achievement ${unlocked.has(a.id) ? 'unlocked' : 'locked'}">
        <span class="achievement-icon">${unlocked.has(a.id) ? a.icon : '🔒'}</span>
        <div>
          <div class="achievement-name">${a.name}</div>
          <div class="achievement-desc">${a.desc}</div>
        </div>
      </li>
    `).join('');
  }

  function init() {
    const modal = CG.$('achievements-modal');
    render();
    CG.$('btn-achievements').addEventListener('click', () => {
      CG.sound.play('click');
      modal.showModal();
    });
    CG.$('btn-close-achievements').addEventListener('click', () => modal.close());
    modal.addEventListener('click', e => {
      const r = modal.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) modal.close();
    });
  }

  return { init, unlock, find };
})();
