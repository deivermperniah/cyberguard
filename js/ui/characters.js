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
  }
};
