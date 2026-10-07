window.CG = window.CG || {};
CG.data = CG.data || {};

CG.data.emails = [
  {
    id: 'mail-credenciales',
    from: 'Soporte SisteMAT &lt;soporte@iunav-soporte.net&gt;',
    subject: '⚠ Actualización urgente de credenciales',
    body: 'Su cuenta será suspendida en 24 horas. Ingrese aquí para verificar su contraseña: <code>http://iunav-soporte.net/login</code>',
    phishing: true,
    explain: 'Dominio falso (iunav-soporte.net), urgencia artificial y te pide la contraseña. Ninguna institución legítima solicita credenciales por correo.'
  },
  {
    id: 'mail-examenes',
    from: 'Coordinación Académica &lt;coordinacion@iunav.edu&gt;',
    subject: 'Calendario de exámenes finales',
    body: 'Te compartimos el calendario de exámenes del semestre. También puedes consultarlo directamente en el portal oficial <code>iunav.edu/calendario</code>.',
    phishing: false,
    explain: 'Dominio oficial, sin urgencia ni solicitud de datos, y te remite al portal que ya conoces.'
  },
  {
    id: 'mail-rector',
    from: 'Rectoría IUNAV &lt;rector.iunav@gmail.com&gt;',
    subject: 'Favor urgente y confidencial',
    body: 'Estoy en una reunión y necesito que compres 5 tarjetas de regalo de $100 para un evento. Envíame los códigos por este medio. No llames, no puedo atender.',
    phishing: true,
    explain: 'Fraude del CEO: cuenta gratuita en vez del dominio oficial, urgencia, secreto y tarjetas de regalo. Verifica siempre por otro canal.'
  },
  {
    id: 'mail-biblioteca',
    from: 'Biblioteca IUNAV &lt;biblioteca@iunav.edu&gt;',
    subject: 'Recordatorio: devolución de libro',
    body: 'Tu préstamo de "Redes de Computadoras" vence el viernes. Puedes renovarlo en persona o desde el portal de la biblioteca.',
    phishing: false,
    explain: 'Remitente oficial, información esperada y no te pide hacer clic en enlaces ni entregar datos.'
  },
  {
    id: 'mail-banco',
    from: 'Banco Nacional &lt;alertas@bancon4cional-seguro.com&gt;',
    subject: 'Su pago de matrícula fue RECHAZADO',
    body: 'Para evitar la pérdida de su cupo, descargue el comprobante adjunto: <code>Comprobante_Pago.pdf.exe</code>',
    phishing: true,
    explain: 'Doble extensión .pdf.exe (es un programa, no un PDF), dominio con un "4" en lugar de "a" y amenaza para presionarte.'
  },
  {
    id: 'mail-simulacro',
    from: 'Equipo de TI &lt;ti@iunav.edu&gt;',
    subject: 'Resultados del simulacro de seguridad',
    body: 'Gracias por participar en el simulacro de phishing de esta semana. Recuerda: TI nunca te pedirá tu contraseña. Reporta correos sospechosos a <code>seguridad@iunav.edu</code>.',
    phishing: false,
    explain: 'Dominio oficial y un mensaje que te recuerda buenas prácticas, sin pedirte nada a cambio.'
  }
];
