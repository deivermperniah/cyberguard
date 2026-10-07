window.CG = window.CG || {};
CG.data = CG.data || {};

CG.data.evidences = [
  {
    id: 'ev1',
    code: 'E-01',
    icon: '📧',
    title: 'Email Sospechoso',
    teaser: 'Revisando la bandeja de entrada del personal...',
    detail: 'Se encontró un correo de phishing enviado hace 3 semanas a 47 empleados. El asunto: "Actualización urgente de credenciales SisteMAT". El dominio del remitente: <code>iunav-soporte.net</code> (dominio falso registrado 4 días antes del ataque). Al menos 3 empleados hicieron clic en el enlace malicioso.',
    karma: 500,
    question: null
  },
  {
    id: 'ev2',
    code: 'E-02',
    icon: '🗄️',
    title: 'Logs del Servidor',
    teaser: 'Análisis de los registros del servidor de base de datos.',
    detail: 'Los logs revelan 15,000 consultas SQL anómalas entre el 01 y 14 de octubre. Todas originadas desde la IP <code>185.220.101.47</code> (servidor Tor). El patrón indica un ataque de inyección SQL automatizado contra el módulo de inscripciones estudiantiles.',
    karma: 1000,
    question: 1
  },
  {
    id: 'ev3',
    code: 'E-03',
    icon: '🔑',
    title: 'Base de Contraseñas',
    teaser: 'Análisis del gestor de credenciales administrativo.',
    detail: 'El 80% de las cuentas de administrador usaban contraseñas de 6 caracteres o menos. La cuenta del administrador principal: <code>admin / iunav2024</code>. No había autenticación de dos factores activada en ninguna cuenta crítica.',
    karma: 1000,
    question: 2
  },
  {
    id: 'ev4',
    code: 'E-04',
    icon: '🦠',
    title: 'Muestra de Ransomware',
    teaser: 'Archivo malicioso encontrado en el servidor principal.',
    detail: 'Hash MD5: <code>a3f8c2e1b9d47f...</code>. Familia: LockBit 3.0. El malware fue introducido vía una cuenta comprometida 6 días antes de activarse. Estaba configurado para cifrar 847 GB de datos académicos y exigir 5 BTC (~$200,000 USD) como rescate.',
    karma: 1500,
    question: 3
  },
  {
    id: 'ev5',
    code: 'E-05',
    icon: '📡',
    title: 'Tráfico de Red',
    teaser: 'Captura Wireshark de los últimos 30 días.',
    detail: 'Se detectaron conexiones salientes encriptadas hacia servidores en Rusia y Países Bajos. Exfiltración de datos estimada: 2.3 GB de información personal de estudiantes. El atacante usó el puerto 443 para mimetizarse con tráfico HTTPS legítimo.',
    karma: 1500,
    question: 4
  },
  {
    id: 'ev6',
    code: 'E-06',
    icon: '📋',
    title: 'Código Vulnerable',
    teaser: 'Revisión del código fuente de SisteMAT.',
    detail: `Se encontró una vulnerabilidad SQL Injection en el módulo de búsqueda de estudiantes. El código concatenaba directamente el input del usuario en la consulta: <code>SELECT * FROM alumnos WHERE nombre='" + nombre + "'"</code>. Sin parametrización, sin validación, sin sanitización de inputs.`,
    karma: 2000,
    question: 5
  }
];
