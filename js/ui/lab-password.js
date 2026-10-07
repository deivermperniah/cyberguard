window.CG = window.CG || {};

CG.labPassword = (() => {
  const REWARD = 500;
  const GUESSES_PER_SECOND = 1e10;
  const COMMON = ['123456', 'password', 'contraseña', 'qwerty', 'admin', 'iunav', '111111', 'abc123', 'letmein', '000000'];
  const LEVELS = [
    { min: 0, label: 'Muy débil' },
    { min: 28, label: 'Débil' },
    { min: 36, label: 'Aceptable' },
    { min: 60, label: 'Fuerte' },
    { min: 80, label: 'Fortaleza' }
  ];
  const CHARSETS = {
    lower: 'abcdefghijkmnpqrstuvwxyz',
    upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    number: '23456789',
    symbol: '!@#$%&*?-_+='
  };

  function analyze(pw) {
    const lower = pw.toLowerCase();
    const checks = {
      length: pw.length >= 12,
      lower: /[a-zñ]/.test(pw),
      upper: /[A-ZÑ]/.test(pw),
      number: /\d/.test(pw),
      symbol: /[^A-Za-z0-9ñÑ]/.test(pw),
      common: pw.length > 0 && !COMMON.some(c => lower.includes(c))
    };

    const pool = (checks.lower ? 26 : 0) + (checks.upper ? 26 : 0) + (checks.number ? 10 : 0) + (checks.symbol ? 33 : 0);
    let bits = pw.length * Math.log2(pool || 1);
    if (!checks.common) bits = Math.min(bits, 10);

    let level = LEVELS.reduce((acc, lvl, i) => (bits >= lvl.min ? i : acc), 0);
    if (level === 4 && !Object.values(checks).every(Boolean)) level = 3;

    const seconds = Math.pow(2, bits) / 2 / GUESSES_PER_SECOND;
    return { checks, level, seconds };
  }

  function formatTime(seconds) {
    if (seconds < 1) return 'al instante';
    if (seconds > 4.3e17) return 'más que la edad del universo 🌌';
    const units = [
      ['siglos', 3153600000],
      ['años', 31536000],
      ['días', 86400],
      ['horas', 3600],
      ['minutos', 60],
      ['segundos', 1]
    ];
    const [name, size] = units.find(([, s]) => seconds >= s);
    return `${CG.formatNumber(Math.floor(seconds / size))} ${name}`;
  }

  function update() {
    const pw = CG.$('pw-input').value;
    const fill = CG.$('pw-meter-fill');
    const levelEl = CG.$('pw-level');

    if (!pw) {
      fill.style.width = '0';
      fill.className = 'pw-meter-fill';
      levelEl.className = 'pw-level';
      levelEl.textContent = 'Sin evaluar';
      CG.$('pw-time').textContent = '';
      document.querySelectorAll('#pw-checks li').forEach(li => li.classList.remove('ok'));
      return;
    }

    const { checks, level, seconds } = analyze(pw);
    fill.style.width = (level + 1) * 20 + '%';
    fill.className = 'pw-meter-fill lvl-' + level;
    levelEl.className = 'pw-level lvl-' + level;
    levelEl.textContent = LEVELS[level].label;
    CG.$('pw-time').textContent = `Descifrarla tomaría: ${formatTime(seconds)}`;
    document.querySelectorAll('#pw-checks li').forEach(li => {
      li.classList.toggle('ok', checks[li.dataset.check]);
    });

    if (level === 4 && !CG.state.rewards.has('fortress')) {
      CG.state.rewards.add('fortress');
      CG.karma.add(REWARD, levelEl);
      CG.achievements.unlock('fortress');
    }
  }

  function randomIndex(max) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
  }

  function generate() {
    const all = Object.values(CHARSETS).join('');
    const chars = Object.values(CHARSETS).map(set => set[randomIndex(set.length)]);
    while (chars.length < 16) chars.push(all[randomIndex(all.length)]);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomIndex(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    const input = CG.$('pw-input');
    input.value = chars.join('');
    setVisible(true);
    CG.sound.play('unlock');
    update();
  }

  function setVisible(visible) {
    CG.$('pw-input').type = visible ? 'text' : 'password';
    CG.$('pw-toggle').textContent = visible ? '🙈' : '👁️';
    CG.$('pw-toggle').setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
  }

  function reset() {
    CG.$('pw-input').value = '';
    setVisible(false);
    update();
  }

  function init() {
    CG.$('pw-input').addEventListener('input', update);
    CG.$('pw-toggle').addEventListener('click', () => setVisible(CG.$('pw-input').type === 'password'));
    CG.$('pw-generate').addEventListener('click', generate);
    reset();
  }

  return { init, reset };
})();
