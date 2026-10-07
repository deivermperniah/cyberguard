## Reglas de comportamiento (obligatorias)

- Haz SOLO el cambio mínimo necesario para resolver lo que se pide. Nada de "mientras estaba aquí, también...".
- No generes código, archivos ni carpetas que no se hayan pedido, salvo que sean indispensables para el cambio.
- No refactorices, reorganices ni "mejores" código que no forme parte de la tarea.
- No modifiques estilos, layout ni estructura visual si no se pidió.
- No agregues comentarios ni documentación dentro del código salvo que se pida.
- Si hay dudas sobre el alcance, pregunta antes de tocar código adicional.
- Nada de lógica compleja: prefiere la solución más simple que funcione.

## Stack

- HTML + CSS + JavaScript vanilla, separados en módulos (`index.html`, `css/`, `js/`).
- Sin frameworks, sin dependencias y sin build. Los scripts son clásicos (`defer`), no ES modules, para que funcione abriendo `index.html` directamente.
- Estilos con variables CSS y diseño responsive.

## Estructura

- `index.html`: marcado de las pantallas (intro, juego, final), el nav con pestañas (Historia, Protagonistas, Evidencias, Riesgos, Jugar, Laboratorio), los modales (logros y menú de partida) y el orden de carga de CSS/JS.
- `css/`: `base.css` (variables, reset, animaciones), `layout.css` (pantallas, nav, pestañas, footer), `components.css` (botones, toasts, modal, chips), y un archivo por sección (`intro`, `sections`, `quiz`, `lab`, `final`).
- `js/core/`: estado (`state.js`), karma, sonido (WebAudio), efectos (`fx.js`: toasts, confeti, shake), logros y `localStorage` (`storage.js`).
- `js/data/`: contenido editable (personajes, preguntas, evidencias, riesgos, correos del laboratorio, logros).
- `js/ui/`: un módulo por sección; cada uno expone `init`/`render` en el namespace global `CG`.
- `js/main.js`: inicializa todo y define `CG.showScreen` y `CG.restart`.

## Convenciones

- Todo el código cuelga del namespace global `window.CG`; no crear globales sueltas.
- El contenido (textos, preguntas, evidencias...) vive en `js/data/`; la UI lo renderiza.
- Si se agrega un archivo JS, añadirlo en `index.html` respetando el orden: `core` → `data` → `ui` → `main.js`.
- Las pestañas se cambian con `CG.tabs.show('seccion')` o con atributos `data-tab` / `data-goto` en el HTML.
- Sumar karma siempre con `CG.karma.add(cantidad, elementoOrigen)`.
- Usar las variables CSS ya definidas (colores neón, `--border-glow`, etc.) en vez de colores sueltos.
- Textos de la interfaz en español.

## Fuera de alcance por ahora

No agregar frameworks, build ni backend.

## Verificación

- Abrir `index.html` en el navegador y comprobar las pestañas y las interacciones (quiz con temporizador, evidencias, riesgos, laboratorio, logros, pantalla final).
- Revisar la consola del navegador sin errores.
- Revisar el responsive en móvil.

## Git y commits

- Commits pequeños, uno por cambio, solo cuando el usuario lo pida.
- Nunca hacer push, crear ramas ni reescribir el historial sin que se pida.
- Formato: `<tipo>: <descripción breve en inglés, minúsculas, imperativo>`.
- Tipos permitidos: feat, fix, style, refactor, chore, docs.
- Máximo ~60 caracteres, sin punto final.

## Development

No requiere servidor ni instalación. Abre `index.html` directamente en el navegador o, si prefieres un servidor local:

```
python3 -m http.server
```

## Documentation

Referencia de HTML, CSS y JavaScript: https://developer.mozilla.org
