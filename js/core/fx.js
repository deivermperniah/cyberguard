window.CG = window.CG || {};

CG.fx = (() => {
  const CONFETTI_COLORS = ['#00f5ff', '#00ff88', '#ffd60a', '#bf5af2', '#ff2d55'];
  const MAX_TOASTS = 4;

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function toast(message, { icon = 'ℹ️', type = 'info', duration = 3200 } = {}) {
    const item = document.createElement('div');
    item.className = `toast toast-${type}`;
    const iconEl = document.createElement('span');
    iconEl.className = 'toast-icon';
    iconEl.textContent = icon;
    const msgEl = document.createElement('span');
    msgEl.textContent = message;
    item.append(iconEl, msgEl);
    const stack = CG.$('toast-stack');
    stack.appendChild(item);
    while (stack.children.length > MAX_TOASTS) stack.firstElementChild.remove();

    setTimeout(() => {
      item.classList.add('toast-out');
      setTimeout(() => item.remove(), 300);
    }, duration);
  }

  function floatText(text, originEl, kind = 'good') {
    const rect = originEl.getBoundingClientRect();
    const el = document.createElement('span');
    el.className = `float-text ${kind}`;
    el.textContent = text;
    el.style.left = rect.left + rect.width / 2 + 'px';
    el.style.top = Math.max(rect.top - 10, 10) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function confetti(count = 80) {
    if (reducedMotion()) return;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDuration = 2 + Math.random() * 2 + 's';
      piece.style.animationDelay = Math.random() * 0.6 + 's';
      piece.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
      piece.style.setProperty('--spin', (Math.random() * 1080 - 540) + 'deg');
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }
  }

  function shake(el) {
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 500);
  }

  return { reducedMotion, toast, floatText, confetti, shake };
})();
