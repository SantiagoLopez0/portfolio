# Santiago López — Portafolio

Sistema de diseño base (V1) del portafolio personal de Santiago López, Webflow y Next.js developer. Una sola página con anchors, base oscura con secciones claras de relevo, tipografía grande y juego controlado: minimalista, sofisticado, editorial, experimental y playful.

Este sistema nace del wireframe de la home y no hereda nada del portafolio anterior. Es una base para iterar: se pueden cambiar tipografía y acento sin rehacer componentes.

## Principios

1. **Base oscura, no todo oscuro.** El hero (sobre video), What I do y Contact + Footer son oscuros. Work, About y FAQ son claros. Process usa una superficie elevada. Las secciones claras reutilizan los mismos tokens con `data-theme="light"`.
2. **Tipografía como protagonista.** El H1 del hero ocupa casi todo el ancho. Todo lo demás es contenido, espacio y líneas finas.
3. **Acento 90/10.** Blanco, negro y grises llevan el sistema; el azul aparece en pocos puntos: botones principales, el índice activo de la lista de servicios, un tag.
4. **El juego va en puntos concretos.** Tags rotados sobre el H1, hovers inesperados, el texto decorativo del About. La grilla, los espacios y los bordes se mantienen disciplinados.
5. **Líneas, no sombras.** Separación con hairlines (`line`), nada de sombras.

## Contenido

- Idioma: la interfaz mezcla inglés para secciones (Work, Services, Process, About, FAQ, Contact) y español para el contenido de cada una. Decidirlo en el desarrollo y mantenerlo.
- Índices en dos dígitos (`01`, `02`) o entre paréntesis en listas grandes (`( 01 )`).
- Etiquetas editoriales entre corchetes en el About: `[Perfil]`, `[Stack]`.
- Sin emojis. Sin testimonios ni formulario de contacto en la V1.

## Fundamentos visuales

### Color
- **Neutros:** `surface-base`, `surface-raised`, `ink`, `ink-muted`, `line`, `line-strong`. El negro es `#02070A`, no `#000`.
- **Acento principal:** `accent` (#0297DE, azul), con `on-accent` (#02070A) para el texto encima.
- **Acento alterno:** `accent-alt` (#FF4B0F, naranja), con `on-accent-alt` (#02070A). Sirve para probar el sistema en naranja o para un punto de énfasis. Un amarillo queda pendiente por si se quiere explorar.
- **Fijos de componentes:** `white` y `tag-bg` (#333333) no cambian entre temas; los usan los tags.
- **Contraste:** los dos acentos sobre blanco no sirven para texto pequeño (azul 3.2:1, naranja 3.35:1). Sobre claro se usan como relleno con el texto oscuro encima, o como texto de 24px o más. El texto blanco sobre el azul da 3.2:1: solo cumple en texto grande, por eso el botón relleno usa 19px en negrita y no se debe reducir.
- **Media:** imagen o video de fondo en el hero con `overlay` u `overlay-strong`. Las cards de work no llevan velo.

### Tipografía
- **Títulos y UI (`display`):** el objetivo es **Jokker** (Displaay), una grotesca con carácter. Está primera en la pila, pero su archivo todavía no está cargado en el sistema; mientras tanto se ve **Bricolage Grotesque** como sustituto. Al cargar el archivo `.otf` en `fonts/` y declararlo en `tokens.json`, el cambio es automático. La licencia de Santiago cubre un proyecto, así que antes de usarla en el portafolio hay que confirmar que su EULA lo permite. Jokker en Regular no trae negrita: al cambiar hay que ajustar `fontWeight` de los estilos Display.
- **Cuerpo (`body`):** **Inter**.
- **Decorativa (`accent`):** **The Night Watch** (gratuita), solo para un momento decorativo (el INFO del About). Por su trazo fino y decorativo, nunca en tamaños menores a 40px ni en texto que haya que leer.
- **Base del em: 0.875rem (14px a 1440).** Botones y tags usan unidades em sobre esa base, así escalan con la página. Los previews fijan `font-size: 0.875rem` en el body para reproducirlo.

### Botones, tags y menú
- **Botón:** pill (`border-radius: 8.33em`) en Jokker, con tres variantes: relleno con flecha → (texto blanco de 19px en negrita), outline fino con flecha ↗ y outline en negrita. Todo el texto de los botones va en mayúsculas. Ver el componente Button.
- **Tag:** Jokker `1.2em`, `line-height` 1.15, `letter-spacing` −0.02em, texto `white`, fondo `tag-bg`, `border-radius` 1.55em y padding .25em .65em.
- **Menu:** el texto "Menu" en grande (28px, Jokker) junto a una hamburguesa, sin fondo, borde ni pill.
- Los botones siguen tres referencias que aportó Santiago. Los tags y el menú siguen los estilos de Founders & Makers.

### Espaciado y forma
- Gutter horizontal `space-12` (3rem), ancho máximo de contenido 1344px.
- Padding vertical de sección `space-30` (7.5rem), o `space-24` en secciones compactas.
- Bloques de media: `radius-lg`. Foto del About: `radius-sm`.

### Movimiento (para el desarrollo, aún sin diseñar)
Tags del hero que siguen el cursor, cambio del fondo en el hover de What I do, contador animado en el About, animación en scroll en Selected work, preview en video en las cards de work, header transparente que pasa a sólido o con blur al hacer scroll.

## Escala fluida (rem)

Todos los tamaños, espaciados y radios están en `rem`, calculados desde el diseño en 1440px (`px / 16`). Lo que escala es la base del `html`, así el H1 (15rem) ocupa siempre la misma proporción de pantalla.

```css
html { font-size: clamp(10px, 1.111vw, 22px); }   /* 16px a 1440px */
@media (max-width: 768px) { html { font-size: clamp(10px, 4.1vw, 18px); } } /* diseño mobile en 390px */
```

- Un valor del diseño en px se escribe `px / 16` en rem (24px → `1.5rem`).
- Los bordes de 1px y 1.5px se quedan en px.
- Los previews del sistema usan la base de 16px; la escala fluida solo se aplica en el sitio.
- El mínimo en px evita texto ilegible; el máximo evita que crezca sin límite en pantallas grandes.

## Iconografía

Solo trazos simples en SVG: flecha, más y menos del FAQ, hamburguesa del Menu. Trazo de 2px, extremos redondeados, color `ink`.

## Reglas de uso

- Texto sobre `surface-base` y `surface-raised` en `ink` o `ink-muted`.
- Los acentos como texto: solo sobre oscuro o a 24px o más; sobre claro, como relleno.
- Un solo `display-hero` por página; `accent-display` una sola vez.
- El texto sobre un acento va en `on-accent` o `on-accent-alt`.
- Cambiar de acento = intercambiar los valores de `accent` y `accent-alt`; los componentes no cambian.

## Componentes

Button, Tag, Header, WorkCard, ServiceList y FaqItem. Quedan pendientes ProcessCard, el bloque About (foto, dato grande e INFO), Contact + Footer y el overlay del menú; se agregan cuando se maqueten.
