window.CG = window.CG || {};

CG.labPhishing = (() => {
  const REWARD = 300;

  let emails = [];
  let index = 0;
  let score = 0;
  let answered = false;

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function render() {
    const box = CG.$('phishing-game');

    if (index >= emails.length) {
      const perfect = score === emails.length;
      box.innerHTML = `
        <div class="lab-summary">
          <div>${perfect ? '🏆' : '📬'}</div>
          <div class="lab-summary-score">${score} / ${emails.length}</div>
          <p>${perfect ? '¡Ningún anzuelo te atrapó!' : 'Revisa las señales de alerta y vuelve a intentarlo.'}</p>
          <button class="btn-ghost" id="phish-restart">↺ Jugar de nuevo</button>
        </div>`;
      if (perfect) {
        CG.achievements.unlock('phish-hunter');
        CG.fx.confetti(40);
      }
      return;
    }

    const mail = emails[index];
    answered = false;
    box.innerHTML = `
      <div class="lab-progress">Correo ${index + 1} / ${emails.length} · Aciertos: ${score}</div>
      <div class="email-card" id="email-card">
        <div class="email-row"><span class="email-label">De:</span>${mail.from}</div>
        <div class="email-row"><span class="email-label">Asunto:</span><strong>${mail.subject}</strong></div>
        <div class="email-body">${mail.body}</div>
      </div>
      <div class="lab-actions">
        <button class="btn-choice btn-safe" data-choice="safe">✅ Legítimo</button>
        <button class="btn-choice btn-phish" data-choice="phish">🎣 Phishing</button>
      </div>
      <div class="feedback-box" id="phish-feedback"></div>
      <button class="next-btn" id="phish-next">${index < emails.length - 1 ? 'Siguiente correo →' : 'Ver resultado →'}</button>
    `;
  }

  function choose(choice, btn) {
    if (answered) return;
    answered = true;

    const mail = emails[index];
    const saidPhish = choice === 'phish';
    const correct = saidPhish === mail.phishing;

    document.querySelectorAll('#phishing-game .btn-choice').forEach(b => { b.disabled = true; });

    const stamp = document.createElement('div');
    stamp.className = `email-stamp ${mail.phishing ? 'phish' : 'safe'}`;
    stamp.textContent = mail.phishing ? 'PHISHING' : 'LEGÍTIMO';
    CG.$('email-card').appendChild(stamp);

    const feedback = CG.$('phish-feedback');
    feedback.className = 'feedback-box ' + (correct ? 'correct' : 'wrong');
    feedback.textContent = (correct ? '✅ ¡Bien visto! ' : '❌ ¡Cuidado! ') + mail.explain;

    if (correct) {
      score++;
      CG.sound.play('correct');
      const key = 'phish-' + mail.id;
      if (!CG.state.rewards.has(key)) {
        CG.state.rewards.add(key);
        CG.karma.add(REWARD, btn);
      }
    } else {
      CG.sound.play('wrong');
      CG.fx.shake(CG.$('email-card'));
    }

    CG.$('phish-next').classList.add('visible');
  }

  function reset() {
    emails = shuffle(CG.data.emails);
    index = 0;
    score = 0;
    render();
  }

  function init() {
    CG.$('phishing-game').addEventListener('click', e => {
      const choiceBtn = e.target.closest('[data-choice]');
      if (choiceBtn) return choose(choiceBtn.dataset.choice, choiceBtn);
      if (e.target.closest('#phish-next')) {
        index++;
        CG.sound.play('click');
        return render();
      }
      if (e.target.closest('#phish-restart')) return reset();
    });
    reset();
  }

  return { init, reset };
})();
