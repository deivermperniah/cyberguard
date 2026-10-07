window.CG = window.CG || {};

CG.karma = (() => {
  let shown = CG.INITIAL_KARMA;
  let frame = null;

  function render(animate = true) {
    const display = CG.$('karma-display');
    const target = CG.state.karma;
    cancelAnimationFrame(frame);

    if (!animate || CG.fx.reducedMotion()) {
      shown = target;
      display.textContent = CG.formatNumber(target);
      return;
    }

    const from = shown;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / 700, 1);
      shown = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      display.textContent = CG.formatNumber(shown);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    display.classList.remove('karma-flash');
    void display.offsetWidth;
    display.classList.add('karma-flash');
  }

  function add(amount, originEl) {
    CG.state.karma += amount;
    render();
    if (originEl) {
      const sign = amount > 0 ? '+' : '';
      CG.fx.floatText(sign + CG.formatNumber(amount), originEl, amount > 0 ? 'good' : 'bad');
    }
  }

  return { add, render };
})();
