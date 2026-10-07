window.CG = window.CG || {};
CG.data = CG.data || {};

CG.data.questions = [
  {
    speaker: 'deiver',
    topic: 'Ingeniería social',
    text: "Revisé los correos del personal de IUNAV: 3 empleados hicieron clic en un enlace malicioso enviado desde 'iunav-soporte.net'. ¿Cómo se llama este tipo de ataque?",
    options: [
      'Ataque de Fuerza Bruta — se prueban millones de contraseñas hasta encontrar la correcta.',
      'Phishing — suplantación de identidad por correo para robar credenciales.',
      'DDoS — inundación de tráfico para saturar el servidor.',
      'Man-in-the-Middle — intercepción de comunicaciones legítimas.'
    ],
    correct: 1,
    hint: "Fíjate en el dominio: imita al oficial para que la víctima 'pique el anzuelo' y entregue su contraseña.",
    feedbackCorrect: '✅ ¡Correcto! El Phishing es uno de los vectores de ataque más comunes. Los atacantes crearon un dominio casi idéntico (iunav-soporte.net vs iunav.edu) para engañar a los empleados.',
    feedbackWrong: '❌ Incorrecto. El ataque descrito es Phishing: los atacantes crean un sitio/correo falso que imita a uno legítimo para que la víctima entregue sus credenciales voluntariamente.',
    karma: 1500,
    unlocks: 'ev2'
  },
  {
    speaker: 'leo',
    topic: 'Seguridad web',
    text: 'Analicé los logs y encontré 15.000 consultas SQL anómalas en el módulo de inscripciones. Este es el código vulnerable. ¿Qué tipo de vulnerabilidad es?',
    code: `query = "SELECT * FROM alumnos WHERE nombre='" + nombre + "'";`,
    options: [
      'Cross-Site Scripting (XSS) — inyección de scripts maliciosos en páginas web.',
      'Buffer Overflow — desbordamiento de memoria para ejecutar código arbitrario.',
      'SQL Injection — inserción de código SQL malicioso en campos de entrada.',
      'CSRF — solicitudes falsas que explotan la sesión autenticada del usuario.'
    ],
    correct: 2,
    hint: 'El texto que escribe el usuario se pega directamente dentro de la consulta a la base de datos.',
    feedbackCorrect: "✅ ¡Excelente! La SQL Injection (OWASP A03) ocurre cuando el input del usuario se concatena directamente en consultas SQL. Un atacante puede escribir ' OR 1=1-- para obtener todos los registros o incluso borrar tablas enteras.",
    feedbackWrong: '❌ Incorrecto. La vulnerabilidad es SQL Injection. Al no usar consultas parametrizadas, el atacante puede insertar fragmentos SQL que alteran la lógica de la consulta original.',
    karma: 2000,
    unlocks: 'ev3'
  },
  {
    speaker: 'daira',
    topic: 'Autenticación',
    text: "Las cuentas admin usaban contraseñas como 'iunav2024' y ninguna tenía MFA. ¿Cuál es la MEJOR práctica para protegerlas?",
    options: [
      'Cambiar las contraseñas cada semana a cualquier combinación de 4 caracteres.',
      'Implementar MFA + contraseñas de mínimo 12 caracteres con mayúsculas, números y símbolos.',
      'Usar siempre la misma contraseña fuerte para no olvidarla.',
      'Deshabilitar las cuentas que no se usen todos los días.'
    ],
    correct: 1,
    hint: 'Una sola capa no basta: combina algo que sabes con algo que tienes.',
    feedbackCorrect: '✅ ¡Correcto! La combinación de contraseñas robustas (12+ caracteres, complejidad) + Autenticación Multifactor (MFA) es el estándar de oro. El MFA añade una segunda capa de verificación que detiene el 99.9% de los ataques de credenciales comprometidas.',
    feedbackWrong: '❌ Incorrecto. La mejor práctica es: contraseñas largas y complejas (12+ caracteres) COMBINADAS con MFA. Esto asegura que aunque la contraseña sea comprometida, el atacante no pueda acceder sin el segundo factor.',
    karma: 2000,
    unlocks: 'ev4'
  },
  {
    speaker: 'leo',
    topic: 'Respuesta a incidentes',
    text: '¡Detecté LockBit 3.0 en el servidor principal! Tenemos backups de hace 5 días. ¿Cuál debe ser nuestro PRIMER paso?',
    options: [
      'Pagar el rescate de 5 BTC para recuperar los archivos lo antes posible.',
      'Reiniciar todos los servidores esperando que el malware desaparezca.',
      'Aislar inmediatamente los sistemas afectados de la red para contener la propagación.',
      'Esperar a que el antivirus lo detecte y elimine automáticamente.'
    ],
    correct: 2,
    hint: 'Antes de curar al paciente, hay que evitar que el contagio se propague.',
    feedbackCorrect: '✅ ¡Perfecto! El aislamiento inmediato es CRÍTICO. Desconectar los sistemas afectados de la red evita que el ransomware se propague a otros servidores. Nunca se debe pagar el rescate (no garantiza recuperación y financia el crimen).',
    feedbackWrong: '❌ Incorrecto. El primer paso es AISLAR los sistemas afectados. Pagar el rescate no garantiza la recuperación y financia actividades criminales. Reiniciar puede borrar evidencias forenses. El antivirus ya fue evadido por el malware.',
    karma: 2000,
    unlocks: 'ev5'
  },
  {
    speaker: 'deiver',
    topic: 'Protección de datos',
    text: '2,3 GB de datos personales de estudiantes salieron hacia servidores en Rusia. ¿Qué solución técnica habría PREVENIDO esta exfiltración?',
    options: [
      'Deshabilitar el acceso a internet de todos los estudiantes.',
      'Implementar DLP (Data Loss Prevention) con monitoreo de tráfico saliente anómalo.',
      'Cambiar el sistema operativo de los servidores a otra plataforma.',
      'Reducir el número de estudiantes inscritos en la universidad.'
    ],
    correct: 1,
    hint: 'Busca la herramienta diseñada para vigilar qué datos SALEN de la red.',
    feedbackCorrect: '✅ ¡Excelente! Las soluciones DLP monitorizan y controlan qué datos pueden salir de la red corporativa. Combinadas con un SIEM que detecte anomalías de tráfico, habrían alertado al equipo ante la transferencia masiva e inusual de datos.',
    feedbackWrong: '❌ Incorrecto. La solución técnica adecuada es DLP (Data Loss Prevention): sistemas que inspeccionan el tráfico de red en busca de transferencias no autorizadas de información sensible y las bloquean o alertan al equipo de seguridad.',
    karma: 2000,
    unlocks: 'ev6'
  },
  {
    speaker: 'daira',
    topic: 'Código seguro',
    text: 'Para cerrar la vulnerabilidad SQL Injection de SisteMAT, ¿qué cambio de código es el CORRECTO?',
    options: [
      'Cambiar el nombre de la tabla en la base de datos para que sea más difícil de adivinar.',
      'Agregar más complejidad a la contraseña de la base de datos.',
      "Usar consultas parametrizadas: PreparedStatement con '?' en lugar de concatenar strings.",
      'Limitar las consultas SQL a máximo 100 caracteres de longitud.'
    ],
    correct: 2,
    hint: 'La clave es separar el código SQL de los datos que escribe el usuario.',
    feedbackCorrect: "✅ ¡Correcto! Las consultas parametrizadas (Prepared Statements) son la solución definitiva contra SQLi. En lugar de concatenar el input directamente, se usa un placeholder '?' y el driver de BD trata el input siempre como dato, nunca como código SQL. ¡Has completado la investigación!",
    feedbackWrong: '❌ Incorrecto. La única solución real es usar Prepared Statements / Consultas Parametrizadas. Esto separa el código SQL de los datos del usuario, haciendo imposible que un atacante altere la lógica de la consulta.',
    karma: 3000,
    unlocks: null
  }
];
