window.CG = window.CG || {};

CG.characters = {
  render() {
    const leader = CG.state.character && CG.state.character.id;
    CG.$('characters-grid').innerHTML = CG.data.characters.map(c => `
      <div class="char-card ${leader === c.id ? 'is-leader' : ''}" style="--accent: ${c.color}">
        ${leader === c.id ? '<span class="leader-tag">LÍDER</span>' : ''}
        <div class="char-avatar">${c.emoji}</div>
        <div class="char-name">${c.name}</div>
        <div class="char-role">${c.role}</div>
        <div class="char-desc">${c.desc}</div>
        <div class="char-skills">
          ${c.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
        <div class="char-perk"><strong>⭐ ${c.perk.title}:</strong> ${c.perk.desc}</div>
      </div>
    `).join('');
  },

  pickerHtml(selectedId) {
    return CG.data.characters.map(c => `
      <button class="pick-card ${selectedId === c.id ? 'selected' : ''}" data-character="${c.id}" style="--accent: ${c.color}" aria-pressed="${selectedId === c.id}">
        <span class="pick-emoji">${c.emoji}</span>
        <span>
          <span class="pick-name">${c.name}</span>
          <span class="pick-perk"><strong>${c.perk.title}</strong>${c.perk.desc}</span>
        </span>
      </button>
    `).join('');
  },

  setLeader(id) {
    const character = CG.data.characters.find(c => c.id === id);
    CG.state.character = character;

    const agent = CG.$('nav-agent');
    agent.textContent = character.emoji;
    agent.title = `Líder: ${character.name} · ${character.perk.title} (clic para abrir el menú)`;
    agent.style.setProperty('--accent', character.color);

    this.render();
    CG.evidences.render();
    return character;
  }
};
