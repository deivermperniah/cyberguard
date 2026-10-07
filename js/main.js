window.CG = window.CG || {};

CG.showScreen = id => {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.toggle('active', screen.id === id);
  });
  window.scrollTo({ top: 0 });
};

CG.restart = () => {
  CG.quiz.stop();
  CG.state.reset();
  CG.karma.render(false);
  CG.$('nav-agent').textContent = '';
  CG.characters.render();
  CG.evidences.render();
  CG.risks.render();
  CG.labPhishing.reset();
  CG.labPassword.reset();
  CG.intro.reset();
  CG.showScreen('screen-intro');
};

CG.sound.init();
CG.achievements.init();
CG.tabs.init();
CG.characters.render();
CG.evidences.init();
CG.risks.init();
CG.quiz.init();
CG.labPhishing.init();
CG.labPassword.init();
CG.final.init();
CG.intro.init();
CG.karma.render(false);
