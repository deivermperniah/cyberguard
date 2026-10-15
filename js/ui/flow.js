window.CG = window.CG || {};

CG.flow = (() => {
  const PHASES = [
    {
      id: 'jugar',
      num: 1,
      label: 'Investigar',
      objective: 'Responde las 6 preguntas para reconstruir el ataque. Cada decisión correcta revela una evidencia.',
      done: () => CG.state.answers.length >= CG.data.questions.length
    },
    {
      id: 'evidencias',
      num: 2,
      label: 'Evidencias',
      objective: 'Analiza las 6 evidencias que desbloqueaste durante la investigación.',
      done: () => CG.state.analyzed.size >= CG.data.evidences.length
    },
    {
      id: 'riesgos',
      num: 3,
      label: 'Riesgos',
      objective: 'Estudia los 7 riesgos de seguridad identificados en el incidente.',
      done: () => CG.state.risksRead.size >= CG.data.risks.length
    },
    {
      id: 'laboratorio',
      num: 4,
      label: 'Laboratorio',
      objective: 'Supera los dos minijuegos de entrenamiento y gana karma extra.',
      done: () => CG.state.labPhishingDone && CG.state.labPasswordUsed
    }
  ];

  let current = PHASES[0].id;

  const indexOf = id => PHASES.findIndex(p => p.id === id);
  const isDone = id => PHASES[indexOf(id)].done();

  function isUnlocked(id) {
    const i = indexOf(id);
    return i <= 0 || isDone(PHASES[i - 1].id);
  }

  function renderStepper() {
    CG.$('phase-stepper').innerHTML = PHASES.map(p => {
      const done = p.done();
      const unlocked = isUnlocked(p.id);
      const cls = ['step-btn', p.id === current ? 'active' : '', done ? 'done' : '', unlocked ? '' : 'locked']
        .filter(Boolean).join(' ');
      return `
        <li class="step-item">
          <button type="button" class="${cls}" data-phase="${p.id}" ${unlocked ? '' : 'disabled'}>
            <span class="step-index">${done ? '✓' : p.num}</span>
            <span class="step-label">${p.label}</span>
            ${unlocked ? '' : '<span class="step-lock">🔒</span>'}
          </button>
        </li>`;
    }).join('');
  }

  function renderPhase() {
    document.querySelectorAll('.phase').forEach(section => {
      section.classList.toggle('active', section.id === 'phase-' + current);
    });

    const i = indexOf(current);
    const phase = PHASES[i];
    const last = i === PHASES.length - 1;
    const done = phase.done();

    CG.$('phase-status').textContent = done
      ? (last ? '¡Misión completada!' : `Fase ${phase.num} completada.`)
      : `Fase ${phase.num} de ${PHASES.length} · pendiente`;

    const btn = CG.$('phase-continue');
    btn.disabled = !done;
    btn.textContent = last ? '📊 Ver informe final' : 'Continuar →';
  }

  function render() {
    renderStepper();
    renderPhase();
  }

  function show(id) {
    if (indexOf(id) < 0 || !isUnlocked(id)) return;
    current = id;
    window.scrollTo({ top: 0 });
    render();
  }

  function next() {
    if (!PHASES[indexOf(current)].done()) return;
    const i = indexOf(current);
    if (i === PHASES.length - 1) {
      CG.final.show();
      return;
    }
    current = PHASES[i + 1].id;
    window.scrollTo({ top: 0 });
    render();
  }

  function reset() {
    current = PHASES[0].id;
  }

  function init() {
    CG.$('phase-stepper').addEventListener('click', e => {
      const btn = e.target.closest('[data-phase]');
      if (!btn || btn.disabled) return;
      CG.sound.play('click');
      show(btn.dataset.phase);
    });
    CG.$('phase-continue').addEventListener('click', () => {
      CG.sound.play('click');
      next();
    });
    reset();
    render();
  }

  return { init, render, show, next, reset, refresh: render, current: () => current };
})();
