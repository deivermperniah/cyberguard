window.CG = window.CG || {};

CG.story = (() => {
  function open() {
    CG.showScreen('screen-story');
  }

  function start() {
    CG.sound.play('click');
    CG.showScreen('screen-game');
    CG.flow.render();
  }

  function init() {
    CG.$('btn-story-start').addEventListener('click', start);
  }

  return { init, open, start };
})();
