# CyberGuard — El Sistema Comprometido · Proyecto académico

Narrativa interactiva de ciberseguridad: simula un ataque ransomware (LockBit 3.0) a la Universidad IUNAV y el trabajo del equipo para investigar y restaurar la seguridad.

## Qué se puede hacer

- **Elegir investigador líder** (Deiver, Leo o Daira), cada uno con una ventaja distinta.
- **Jugar**: 6 decisiones con temporizador, bonus por velocidad, combos por racha, pistas 50/50 y atajos de teclado (A–D / 1–4, Enter).
- **Evidencias**: se desbloquean al responder y se analizan con un clic para ganar karma.
- **Riesgos**: filtros por nivel y karma por cada riesgo estudiado.
- **Laboratorio**: minijuego "¿Phishing o legítimo?" y probador de contraseñas con tiempo estimado de descifrado.
- **Menú de partida** (☰ o clic en tu avatar): cambiar de investigador sin perder el progreso o reiniciar la partida.
- **Logros**, sonidos (silenciables), confeti y récord personal guardado en el navegador.

## Stack

- HTML + CSS + JavaScript vanilla, sin dependencias ni build.

## Estructura

```text
index.html          # Pantallas y orden de carga de estilos y scripts
css/
  base.css          # Variables, reset y animaciones
  layout.css        # Pantallas, nav, pestañas y footer
  components.css    # Botones, toasts, modal, chips...
  intro.css  sections.css  quiz.css  lab.css  final.css
js/
  core/             # Estado, karma, sonido, efectos, logros, storage
  data/             # Contenido: personajes, preguntas, evidencias, riesgos, correos, logros
  ui/               # Un módulo por sección (intro, tabs, quiz, evidencias, riesgos, laboratorio, final, menú)
  main.js           # Arranque
```

## Puesta en marcha

No requiere instalación. Abre `index.html` en el navegador o sirve la carpeta con:

```sh
python3 -m http.server
```
