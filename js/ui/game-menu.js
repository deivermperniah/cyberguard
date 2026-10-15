window.CG = window.CG || {};

CG.gameMenu = (() => {
  let confirmTimer = null;

  function resetConfirm() {
    clearTimeout(confirmTimer);
    const btn = CG.$('btn-menu-restart');
    btn.classList.remove('confirming');
    btn.textContent = '↺ Reiniciar partida';
  }

  function open() {
    CG.sound.play('click');
    resetConfirm();
    CG.$('game-menu').showModal();
  }

  function close() {
    CG.$('game-menu').close();
  }

  function restart() {
    const btn = CG.$('btn-menu-restart');
    if (!btn.classList.contains('confirming')) {
      btn.classList.add('confirming');
      btn.textContent = '⚠ ¿Seguro? Clic para confirmar';
      CG.sound.play('tick');
      confirmTimer = setTimeout(resetConfirm, 4000);
      return;
    }
    close();
    CG.restart();
  }

  function init() {
    const modal = CG.$('game-menu');
    CG.$('btn-menu').addEventListener('click', open);
    CG.$('btn-close-menu').addEventListener('click', close);
    CG.$('btn-menu-continue').addEventListener('click', close);
    CG.$('btn-menu-restart').addEventListener('click', restart);
    modal.addEventListener('close', resetConfirm);
    modal.addEventListener('click', e => {
      const r = modal.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) close();
    });
  }

  return { init };
})();
