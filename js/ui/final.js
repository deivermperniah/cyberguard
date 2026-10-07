window.CG = window.CG || {};

CG.final = (() => {
  function rank(correct, total) {
    if (correct === total) {
      return {
        emoji: '🏆',
        title: '¡Expertos en Ciberseguridad!',
        text: 'El equipo de Deiver, Leo y Daira logró identificar todos los vectores de ataque, contener el ransomware y restaurar la integridad de SisteMAT. ¡IUNAV puede operar de forma segura!'
      };
    }
    if (correct >= Math.ceil(total * 0.6)) {
      return {
        emoji: '🥈',
        title: '¡Buen Trabajo!',
        text: 'El equipo controló la mayor parte del incidente. Hay áreas de mejora en algunas decisiones, pero la universidad está en camino de recuperarse.'
      };
    }
    return {
      emoji: '🔐',
      title: 'Se Necesita Más Entrenamiento',
      text: 'El equipo tuvo dificultades para identificar los vectores correctos. Se recomienda repasar los conceptos de ciberseguridad y volver a intentarlo.'
    };
  }

  function formatDuration(ms) {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  function show() {
    CG.quiz.stop();
    const st = CG.state;
    const total = CG.data.questions.length;
    const correct = st.correctCount();

    if (correct === total) CG.achievements.unlock('perfect');
    if (st.hintsUsed === 0 && st.answers.length === total) CG.achievements.unlock('no-hints');

    const best = CG.storage.get('best', 0);
    const isRecord = st.karma > best;
    if (isRecord) CG.storage.set('best', st.karma);

    const r = rank(correct, total);
    CG.$('final-emoji').textContent = r.emoji;
    CG.$('final-title').textContent = r.title;
    CG.$('final-text').textContent = r.text;
    CG.$('final-score').textContent = CG.formatNumber(st.karma) + ' pts';
    CG.$('final-record').hidden = !isRecord;

    const stats = [
      [`${correct}/${total}`, 'Aciertos'],
      [`x${st.maxStreak}`, 'Mejor racha'],
      [st.hintsUsed, 'Pistas'],
      [`${st.analyzed.size}/${CG.data.evidences.length}`, 'Evidencias'],
      [formatDuration(Date.now() - st.startedAt), 'Tiempo']
    ];
    CG.$('final-stats').innerHTML = stats.map(([value, label]) => `
      <div class="stat-tile"><span class="stat-value">${value}</span><span class="stat-label">${label}</span></div>
    `).join('');

    CG.$('final-achievements').innerHTML = [...st.runAchievements].map((id, i) => {
      const a = CG.achievements.find(id);
      return `<span class="final-badge" style="animation-delay: ${i * 0.1}s">${a.icon} ${a.name}</span>`;
    }).join('');

    CG.showScreen('screen-final');
    CG.sound.play(correct >= Math.ceil(total * 0.6) ? 'achievement' : 'wrong');
    if (correct >= Math.ceil(total * 0.6)) CG.fx.confetti(correct === total ? 160 : 80);
  }

  function init() {
    CG.$('btn-restart').addEventListener('click', () => CG.restart());
    CG.$('btn-explore').addEventListener('click', () => {
      CG.showScreen('screen-game');
      CG.quiz.render();
      CG.tabs.show('evidencias');
    });
  }

  return { init, show };
})();
