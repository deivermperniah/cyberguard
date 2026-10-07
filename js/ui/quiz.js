window.CG = window.CG || {};

CG.quiz = (() => {
  const BASE_TIME = 30;
  const EXTRA_TIME = 10;
  const HINT_COST = 500;
  const SPEED_BONUS_MAX = 500;
  const STREAK_BONUS = 250;
  const LETTERS = 'ABCD';

  let timer = null;
  let totalTime = BASE_TIME;
  let timeLeft = BASE_TIME;
  let answered = false;
  let hintUsed = false;
  let lastSecond = null;

  const question = () => CG.data.questions[CG.state.questionIndex];
  const total = () => CG.data.questions.length;

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function updateHud() {
    const { streak, hintsUsed } = CG.state;
    CG.$('hud-correct').textContent = `${CG.state.correctCount()} / ${total()}`;
    CG.$('hud-streak').textContent = streak;
    CG.$('hud-hints').textContent = hintsUsed;
    CG.$('hud-streak').parentElement.classList.toggle('hot', streak >= 2);
    CG.$('progress-bar').style.width = (CG.state.answers.length / total() * 100) + '%';
  }

  function hintLabel() {
    return CG.state.hasPerk('free-hints') ? '💡 Pedir pista (gratis)' : `💡 Pedir pista (−${CG.formatNumber(HINT_COST)})`;
  }

  function render() {
    stopTimer();
    updateHud();
    const area = CG.$('game-play-area');
    const i = CG.state.questionIndex;

    if (i >= total()) {
      area.innerHTML = `
        <div class="game-section quiz-done">
          <span class="final-emoji">🛡️</span>
          <h3 class="section-title">Investigación completada</h3>
          <p>Ya respondiste todas las preguntas. Puedes seguir analizando evidencias y jugando en el laboratorio.</p>
          <button class="next-btn visible" id="btn-results">VER RESULTADOS →</button>
        </div>`;
      CG.$('btn-results').addEventListener('click', () => CG.final.show());
      return;
    }

    const q = question();
    const speaker = CG.data.characters.find(c => c.id === q.speaker);
    answered = false;
    hintUsed = false;
    totalTime = BASE_TIME + (CG.state.hasPerk('extra-time') ? EXTRA_TIME : 0);
    timeLeft = totalTime;
    lastSecond = null;

    area.innerHTML = `
      <div class="game-section" id="question-section">
        <div class="question-top">
          <div class="question-counter">PREGUNTA ${i + 1} / ${total()} · ${q.topic.toUpperCase()}</div>
          <div class="timer" id="timer">⏱ <span id="timer-value">${totalTime}</span>s</div>
        </div>
        <div class="timer-bar"><div class="timer-bar-fill" id="timer-fill"></div></div>

        <div class="speaker" style="--accent: ${speaker.color}">
          <span class="speaker-avatar">${speaker.emoji}</span>
          <div class="speaker-bubble"><strong>${speaker.name}:</strong> ${q.text}</div>
        </div>
        ${q.code ? `<pre class="code-snippet"><code>${escapeHtml(q.code)}</code></pre>` : ''}

        <div class="options-grid">
          ${q.options.map((opt, idx) => `
            <button class="option-btn" data-index="${idx}"><kbd>${LETTERS[idx]}</kbd><span>${opt}</span></button>
          `).join('')}
        </div>

        <div class="quiz-tools">
          <button class="btn-ghost" id="btn-hint">${hintLabel()}</button>
          <span class="kbd-help">Atajos: <kbd>A</kbd>–<kbd>D</kbd> o <kbd>1</kbd>–<kbd>4</kbd> · <kbd>Enter</kbd> para continuar</span>
        </div>
        <div class="hint-box" id="hint-box" hidden></div>
        <div class="feedback-box" id="feedback"></div>
        <button class="next-btn" id="next-btn">${i < total() - 1 ? 'SIGUIENTE PREGUNTA →' : 'VER RESULTADOS →'}</button>
      </div>
    `;

    startTimer();
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(tick, 100);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function tick() {
    const gameVisible = CG.$('screen-game').classList.contains('active');
    const dialogOpen = document.querySelector('dialog[open]');
    if (answered || !gameVisible || dialogOpen || CG.tabs.current() !== 'jugar' || document.hidden) return;

    timeLeft = Math.max(timeLeft - 0.1, 0);
    const seconds = Math.ceil(timeLeft);
    const ratio = timeLeft / totalTime;

    CG.$('timer-value').textContent = seconds;
    const fill = CG.$('timer-fill');
    fill.style.width = ratio * 100 + '%';
    fill.classList.toggle('warn', ratio <= 0.5 && ratio > 0.2);
    fill.classList.toggle('danger', ratio <= 0.2);
    CG.$('timer').classList.toggle('danger', seconds <= 5);

    if (seconds <= 5 && seconds !== lastSecond && seconds > 0) CG.sound.play('tick');
    lastSecond = seconds;

    if (timeLeft <= 0) answer(-1);
  }

  function answer(idx) {
    if (answered) return;
    answered = true;
    stopTimer();

    const q = question();
    const elapsed = totalTime - timeLeft;
    const section = CG.$('question-section');
    const buttons = [...section.querySelectorAll('.option-btn')];
    const feedback = CG.$('feedback');
    const correct = idx === q.correct;

    buttons.forEach(b => { b.disabled = true; });
    CG.$('btn-hint').disabled = true;
    CG.state.answers.push({ correct, time: elapsed });

    if (correct) {
      CG.state.streak++;
      CG.state.maxStreak = Math.max(CG.state.maxStreak, CG.state.streak);

      const speedBonus = Math.round((timeLeft / totalTime) * SPEED_BONUS_MAX);
      const streakBonus = (CG.state.streak - 1) * STREAK_BONUS;
      const gained = q.karma + speedBonus + streakBonus;

      buttons[idx].classList.add('correct');
      CG.karma.add(gained, buttons[idx]);
      CG.sound.play('correct');
      CG.fx.confetti(30);

      feedback.className = 'feedback-box correct';
      feedback.innerHTML = `${escapeHtml(q.feedbackCorrect)}
        <div class="bonus-list">
          <span class="bonus-tag">Base +${CG.formatNumber(q.karma)}</span>
          <span class="bonus-tag">⚡ Velocidad +${CG.formatNumber(speedBonus)}</span>
          ${streakBonus ? `<span class="bonus-tag">🔥 Racha +${CG.formatNumber(streakBonus)}</span>` : ''}
        </div>`;

      if (CG.state.streak >= 2) {
        const combo = document.createElement('div');
        combo.className = 'combo-flash';
        combo.textContent = `🔥 COMBO x${CG.state.streak}`;
        section.appendChild(combo);
      }

      CG.achievements.unlock('first-correct');
      if (CG.state.streak >= 3) CG.achievements.unlock('streak-3');
      if (elapsed < 5) CG.achievements.unlock('speedster');
    } else {
      CG.state.streak = 0;
      if (idx >= 0) buttons[idx].classList.add('wrong');
      buttons[q.correct].classList.add('correct');
      CG.sound.play('wrong');
      CG.fx.shake(section);

      feedback.className = 'feedback-box wrong';
      feedback.textContent = (idx < 0 ? '⏰ ¡Se acabó el tiempo! ' : '') + q.feedbackWrong;
    }

    if (q.unlocks) CG.evidences.unlock(q.unlocks);
    updateHud();

    const nextBtn = CG.$('next-btn');
    nextBtn.classList.add('visible');
    nextBtn.focus({ preventScroll: true });
  }

  function useHint() {
    if (answered || hintUsed) return;
    hintUsed = true;
    CG.state.hintsUsed++;

    const hintBtn = CG.$('btn-hint');
    hintBtn.disabled = true;
    if (!CG.state.hasPerk('free-hints')) CG.karma.add(-HINT_COST, hintBtn);
    CG.sound.play('click');

    const q = question();
    const wrong = q.options.map((_, i) => i).filter(i => i !== q.correct);
    wrong.sort(() => Math.random() - 0.5).slice(0, 2).forEach(i => {
      const btn = document.querySelector(`.option-btn[data-index="${i}"]`);
      btn.classList.add('eliminated');
      btn.disabled = true;
    });

    const box = CG.$('hint-box');
    box.hidden = false;
    box.textContent = `💡 Pista: ${q.hint} (se eliminaron 2 opciones incorrectas)`;
    updateHud();
  }

  function next() {
    CG.state.questionIndex++;
    if (CG.state.questionIndex >= total()) {
      CG.final.show();
    } else {
      render();
      CG.$('question-section').scrollIntoView({ block: 'nearest' });
    }
  }

  function onKey(e) {
    const gameVisible = CG.$('screen-game').classList.contains('active');
    if (!gameVisible || CG.tabs.current() !== 'jugar' || !CG.$('question-section')) return;
    if (e.target.matches('input, textarea') || e.ctrlKey || e.metaKey || e.altKey) return;

    const key = e.key.toUpperCase();
    let idx = LETTERS.indexOf(key);
    if (idx < 0 && /^[1-4]$/.test(key)) idx = Number(key) - 1;

    if (idx >= 0 && !answered) {
      const btn = document.querySelector(`.option-btn[data-index="${idx}"]`);
      if (btn && !btn.disabled) answer(idx);
    } else if (e.key === 'Enter' && answered && e.target.tagName !== 'BUTTON') {
      next();
    }
  }

  function refreshHint() {
    const hintBtn = CG.$('btn-hint');
    if (hintBtn) hintBtn.textContent = hintLabel();
  }

  function init() {
    CG.$('game-play-area').addEventListener('click', e => {
      const option = e.target.closest('.option-btn');
      if (option) return answer(Number(option.dataset.index));
      if (e.target.closest('#btn-hint')) return useHint();
      if (e.target.closest('#next-btn')) return next();
    });
    document.addEventListener('keydown', onKey);
  }

  return { init, render, refreshHint, stop: stopTimer };
})();
