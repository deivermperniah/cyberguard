window.CG = window.CG || {};

CG.tabs = (() => {
  let current = 'historia';

  function show(name) {
    current = name;
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.toggle('active', tab.id === 'tab-' + name);
    });
    document.querySelectorAll('.nav-tab').forEach(btn => {
      const active = btn.dataset.tab === name;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active);
      if (active) btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
    window.scrollTo({ top: 0 });
  }

  function init() {
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-tab], [data-goto]');
      if (!trigger) return;
      CG.sound.play('click');
      show(trigger.dataset.tab || trigger.dataset.goto);
    });
  }

  return { init, show, current: () => current };
})();
