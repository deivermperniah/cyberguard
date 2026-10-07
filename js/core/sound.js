window.CG = window.CG || {};

CG.sound = (() => {
  const TONES = {
    click: [[660, 0.05]],
    correct: [[523, 0.09], [659, 0.09], [784, 0.16]],
    wrong: [[220, 0.12, 'sawtooth'], [160, 0.25, 'sawtooth']],
    unlock: [[880, 0.07], [1175, 0.12]],
    scan: [[440, 0.06], [550, 0.06], [660, 0.06], [770, 0.06]],
    tick: [[1000, 0.03]],
    achievement: [[523, 0.08], [659, 0.08], [784, 0.08], [1047, 0.25]],
    start: [[262, 0.08], [392, 0.08], [523, 0.18]]
  };

  let ctx = null;
  let muted = CG.storage.get('muted', false);

  function play(name) {
    if (muted || !TONES[name]) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      let t = ctx.currentTime;
      TONES[name].forEach(([freq, dur, type = 'square']) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
        t += dur;
      });
    } catch (e) {}
  }

  function renderButton() {
    const btn = CG.$('btn-sound');
    btn.textContent = muted ? '🔇' : '🔊';
    btn.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar sonido');
  }

  function init() {
    renderButton();
    CG.$('btn-sound').addEventListener('click', () => {
      muted = !muted;
      CG.storage.set('muted', muted);
      renderButton();
      play('click');
    });
  }

  return { play, init };
})();
