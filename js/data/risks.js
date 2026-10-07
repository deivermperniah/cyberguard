window.CG = window.CG || {};
CG.data = CG.data || {};

CG.data.riskLevels = {
  critical: 'CRÍTICO',
  high: 'ALTO',
  medium: 'MEDIO',
  low: 'BAJO'
};

CG.data.risks = [
  {
    level: 'critical',
    name: 'Inyección SQL (SQLi) — OWASP A03',
    desc: 'El código de SisteMAT concatena directamente los datos del usuario en las consultas SQL sin ningún tipo de validación o parametrización. Esto permite a un atacante manipular la lógica de la base de datos, extraer información confidencial, modificar registros o incluso eliminar tablas enteras.',
    solution: 'Usar consultas parametrizadas (Prepared Statements), un ORM confiable, y validar/sanitizar todos los inputs del usuario. Implementar un WAF (Web Application Firewall).'
  },
  {
    level: 'critical',
    name: 'Ransomware / Malware en servidores',
    desc: 'El malware LockBit 3.0 fue instalado aprovechando credenciales comprometidas. De no contenerse, cifraría todos los archivos del sistema académico haciéndolos inaccesibles, con un impacto devastador para el funcionamiento de la universidad.',
    solution: 'Aislar los sistemas afectados de inmediato. Restaurar desde backups limpios. Implementar EDR (Endpoint Detection & Response), antivirus corporativo actualizado y segmentación de red para limitar la propagación.'
  },
  {
    level: 'high',
    name: 'Phishing y Ingeniería Social',
    desc: 'Los atacantes crearon un dominio falso idéntico al de la universidad y enviaron correos convincentes solicitando credenciales. El desconocimiento del personal facilitó que 3 empleados entregaran sus contraseñas voluntariamente.',
    solution: 'Capacitación periódica al personal en identificación de phishing. Implementar DMARC, DKIM y SPF para proteger el dominio. Simulacros de phishing para medir y mejorar la conciencia del personal.'
  },
  {
    level: 'high',
    name: 'Contraseñas débiles y sin MFA',
    desc: 'Las cuentas administrativas usaban contraseñas triviales como "iunav2024" y no tenían autenticación multifactor. Esto permitió al atacante acceder al panel de administración tras obtener las credenciales por phishing.',
    solution: 'Política de contraseñas de mínimo 12 caracteres con complejidad. Implementar MFA obligatorio para todas las cuentas administrativas. Usar un gestor de contraseñas institucional. Revisar contraseñas con herramientas de breach checking.'
  },
  {
    level: 'medium',
    name: 'Falta de parches y actualizaciones',
    desc: 'El módulo de inscripciones tenía una vulnerabilidad conocida sin parchear desde hacía 8 meses. Las actualizaciones de seguridad del sistema operativo y frameworks también estaban desactualizadas.',
    solution: 'Establecer un proceso formal de gestión de parches con SLA definidos. Usar herramientas de escaneo de vulnerabilidades (Nessus, OpenVAS). Implementar un entorno de staging para probar parches antes de producción.'
  },
  {
    level: 'medium',
    name: 'Exfiltración de datos / Fuga de información',
    desc: 'Los atacantes lograron copiar y transmitir 2.3 GB de datos personales de estudiantes hacia servidores externos. Esto implica violaciones a la privacidad, posibles sanciones legales y daño reputacional para la institución.',
    solution: 'Implementar DLP (Data Loss Prevention). Cifrar datos sensibles en reposo y en tránsito. Monitoreo de tráfico saliente anómalo con SIEM. Clasificar y minimizar los datos almacenados siguiendo el principio de mínimo privilegio.'
  },
  {
    level: 'low',
    name: 'Sin política de backups verificada',
    desc: 'Si bien existían backups, nunca se habían probado formalmente. Ante el ransomware, el equipo descubrió que el último backup válido tenía 5 días de antigüedad y algunas tablas críticas no estaban incluidas.',
    solution: 'Implementar la regla 3-2-1 para backups (3 copias, 2 medios diferentes, 1 offsite). Realizar pruebas de restauración mensuales. Automatizar verificación de integridad de backups. Considerar backup inmutable en cloud.'
  }
];
