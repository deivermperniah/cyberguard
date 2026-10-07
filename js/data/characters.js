window.CG = window.CG || {};
CG.data = CG.data || {};

CG.data.characters = [
  {
    id: 'deiver',
    name: 'Deiver',
    emoji: '🔍',
    color: 'var(--neon-cyan)',
    role: 'Analista Forense Digital',
    desc: 'Experto en análisis post-mortem de sistemas comprometidos. Deiver tiene la habilidad de reconstruir exactamente qué ocurrió, cuándo y cómo, examinando logs, archivos temporales y registros del sistema. Su meticulosidad es legendaria en IUNAV.',
    skills: ['Forense Digital', 'Análisis de Logs', 'Recuperación de Datos', 'Malware Analysis'],
    perk: { id: 'evidence-bonus', title: 'Ojo Forense', desc: 'Las evidencias analizadas otorgan +50% de karma.' }
  },
  {
    id: 'leo',
    name: 'Leo',
    emoji: '🌐',
    color: 'var(--neon-green)',
    role: 'Especialista en Redes y Tráfico',
    desc: 'Leo puede leer el tráfico de red como otros leen un libro. Su especialidad es rastrear comunicaciones sospechosas, identificar IPs maliciosas y configurar defensas perimetrales. Fue él quien detectó los primeros patrones anómalos.',
    skills: ['Análisis de Red', 'Firewalls', 'IDS/IPS', 'Wireshark'],
    perk: { id: 'extra-time', title: 'Reflejos de Red', desc: '+10 segundos para responder cada pregunta.' }
  },
  {
    id: 'daira',
    name: 'Daira',
    emoji: '💻',
    color: 'var(--neon-purple)',
    role: 'Experta en Seguridad de Aplicaciones',
    desc: 'Daira conoce cada vulnerabilidad posible en las aplicaciones web. Su dominio de OWASP Top 10, inyección SQL, XSS y autenticación rota la convierte en la persona perfecta para analizar cómo los atacantes penetraron SisteMAT.',
    skills: ['OWASP', 'SQL Injection', 'Pentesting', 'Code Review'],
    perk: { id: 'free-hints', title: 'Code Review', desc: 'Las pistas no cuestan karma.' }
  }
];
