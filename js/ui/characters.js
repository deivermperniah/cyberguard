window.CG = window.CG || {};

CG.characters = {
  pickerHtml(selectedId) {
    return CG.data.characters.map(c => `
      <button class="pick-card ${selectedId === c.id ? 'selected' : ''}" data-character="${c.id}" style="--accent: ${c.color}" aria-pressed="${selectedId === c.id}">
        <span class="pick-emoji">${c.emoji}</span>
        <span class="pick-name">${c.name}</span>
        <span class="pick-role">${c.role}</span>
        <span class="pick-perk"><strong>⭐ ${c.perk.title}</strong>${c.perk.desc}</span>
        <span class="pick-skills">${c.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</span>
      </button>
    `).join('');
  },

  setLeader(id) {
    const character = CG.data.characters.find(c => c.id === id);
    CG.state.character = character;

    const agent = CG.$('nav-agent');
    agent.textContent = character.emoji;
    agent.title = `Líder: ${character.name} · ${character.perk.title}`;
    agent.style.setProperty('--accent', character.color);

    CG.evidences.render();
    return character;
  }
};
