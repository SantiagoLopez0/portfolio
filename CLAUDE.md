# CLAUDE.md — Portafolio Santiago López (V2026, Astro + Sanity)

Portafolio personal de Santiago López, Web Developer (Webflow, Next.js, Astro + Sanity, GSAP, CRO & SEO), Colombia.
Es un rebuild desde cero: **no reutilizar nada del portafolio anterior en Next.js** (código, estilos ni decisiones de diseño).
Ese código quedó en el tag `legacy-nextjs-v2026` y en la rama `legacy/nextjs`, solo como referencia histórica y para recuperar assets (fotos, logos, Resume.pdf) si Santiago lo pide.

## Fuentes de verdad (leer antes de construir cualquier sección)

| Qué                                          | Dónde                                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| Decisiones de layout y secciones de la home  | `docs/wireframe/wireframe-home.md`                                      |
| Wireframe visual (V1 aprobado, 19 nov 2026)  | `docs/wireframe/wireframe-home.pdf` (y `.html`, el artifact exportado)  |
| Principios, color, tipografía, reglas de uso | `docs/design-system/README.md`                                          |
| Tokens (fuente de verdad)                    | `docs/design-system/tokens.json` → `tokens.css`                         |
| Specs de componentes                         | `docs/design-system/components/<Componente>/README.md` + `preview.html` |

`docs/` es material de referencia: no se edita para "arreglar" el sitio. Si el sitio necesita un cambio de diseño, se pregunta a Santiago y luego se actualizan ambos.
Si algo del wireframe y del design system se contradice, manda el design system (es posterior) y se avisa.

## Stack

- **pnpm 9**, Node ≥ 22.23 (`.nvmrc` = 24). El repo **es el sitio**: Astro vive en la raíz y el Studio es un anexo en `studio/`.
  - Raíz — **Astro 7**, salida estática (`output: 'static'`), TypeScript estricto. Deploy previsto en Vercel con la raíz del repo (sin adapter mientras sea estático).
  - `studio/` — **Sanity Studio v6** standalone, con su **propio `package.json` y `pnpm-lock.yaml`** (no es un workspace): así Vercel solo instala lo del sitio. Se despliega con `sanity deploy` a `*.sanity.studio`. No se embebe en Astro. `tsconfig.json` de la raíz excluye `studio/`.
- Datos: `@sanity/client` directo (no `@sanity/astro`, que arrastra React + sanity como peers solo para embeber el Studio). GROQ con `defineQuery` de `groq`. Portable Text con `astro-portabletext`. Imágenes con `@sanity/image-url`.
- Tipos: **Sanity TypeGen** genera `sanity.types.ts` (raíz) desde el schema y las consultas (`pnpm typegen`). `overloadClientMethods` tipa `client.fetch()` solo.
- Estilos: **CSS plano con custom properties** + `<style>` con scope de Astro. Sin Tailwind ni CSS-in-JS. Los tokens están en `src/styles/tokens.css`.
- Animación: **GSAP** (Draggable + InertiaPlugin en los tags del hero, ScrollTrigger en Selected work). Todo efecto respeta `prefers-reduced-motion`.
- Fuentes: API de Fonts de Astro (`astro.config.mjs`) — Bricolage Grotesque (display) vía Google Fonts, Inter (body) vía Fontsource y The Night Watch (accent) local en `src/assets/fonts/`. Astro descarga las de Google/Fontsource en el build y las sirve desde el propio sitio.
- JS en cliente: el mínimo. Astro components + `<script>` para interacciones. Añadir un framework de islas (React, etc.) solo si una interacción lo justifica de verdad, y preguntando antes.

## Comandos (desde la raíz)

```bash
pnpm run bootstrap    # instala el sitio y el Studio (cada uno con su lockfile)
pnpm dev              # sitio (localhost:4321)
pnpm studio           # Studio (localhost:3333)
pnpm build            # astro check + astro build → dist/
pnpm check            # astro check (tipos y diagnósticos)
pnpm typegen          # extrae schema y regenera sanity.types.ts
pnpm schema:deploy    # sanity schemas deploy (para MCP y Studio desplegado)
pnpm studio:deploy    # sanity deploy (Studio en *.sanity.studio)
pnpm format           # prettier (incluye .astro)
```

Para levantar el dev server de Astro en segundo plano desde un agente: `pnpm astro dev --background` (y `astro dev stop|status|logs`).

## Estructura

```
.
├── CLAUDE.md
├── docs/                      # wireframe + design system (referencia, no se edita)
├── package.json               # el sitio (Astro)
├── astro.config.mjs           # env schema (astro:env), fuentes, output
├── .env.example               # PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, ...
├── sanity.types.ts            # generado por TypeGen (no editar)
├── public/
├── src/
│   ├── assets/fonts/          # fuentes locales (The Night Watch)
│   ├── components/
│   │   ├── ui/                # componentes del design system: Button, Tag, ...
│   │   └── sections/          # secciones de la home: Hero, Logos, Work, Services, ...
│   ├── layouts/BaseLayout.astro
│   ├── lib/sanity/            # client.ts, image.ts, queries.ts
│   ├── pages/index.astro      # la home (única página)
│   └── styles/                # tokens.css (copia adaptada) + global.css (reset y escala)
└── studio/                    # Sanity Studio (anexo, package.json propio)
    ├── package.json
    ├── sanity.config.ts
    ├── sanity.cli.ts          # projectId/dataset, studioHost + config de TypeGen
    └── schemaTypes/           # index.ts registra los tipos; documents/ y objects/
```

Convenciones de archivos: componentes Astro en PascalCase (`WorkCard.astro`); schemas y utilidades en kebab-case (`process-step.ts`), cada schema exporta una const con su nombre (`export const processStep = defineType(...)`). Alias `@/*` → `src/*`.

## La página (V1)

Una sola página con anchors; los case studies se abren en **popup** (no hay rutas por proyecto en la V1). Orden y tema de cada sección:

| #   | Sección          | Anchor      | Tema                                  | Notas clave                                                                                                                                                                                                  |
| --- | ---------------- | ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| —   | Header           | —           | sobre el hero                         | Wordmark izq., Work/Services/Contact al centro, botón "Menu" der. Transparente arriba → sólido o blur al hacer scroll. Menu abre overlay con todos los links (Work, Services, Process, About, FAQ, Contact). |
| 01  | Hero             | `#hero`     | oscuro sobre video/imagen + `overlay` | H1 gigante (`display-hero`, 15rem) en dos líneas en diagonal: arriba-izq. / abajo-der. Tags "sticker" rotados alrededor. Línea de apoyo + cue "Scroll". Sin CTAs.                                            |
| —   | Logos            | —           | —                                     | "Websites delivered for" + logos reales (marquee simple).                                                                                                                                                    |
| 02  | Selected work    | `#work`     | claro                                 | 4 `WorkCard` apiladas a ancho completo; cada una abre popup de case study.                                                                                                                                   |
| 03  | What I do        | `#services` | oscuro                                | `ServiceList`: lista grande a la derecha, título + descripción a la izquierda que cambian con hover (tap en touch).                                                                                          |
| 04  | Process          | `#process`  | `surface-raised`                      | 4 tarjetas de pasos.                                                                                                                                                                                         |
| 05  | About            | `#about`    | claro                                 | Foto vertical, dato grande, bloque INFO (`accent-display`, The Night Watch) con [Perfil] [Stack] [Logros] [Idiomas].                                                                                         |
| 06  | FAQ              | `#faq`      | claro / raised                        | 6 `FaqItem` en acordeón + intro + botón "Contactar".                                                                                                                                                         |
| 07  | Contact + Footer | `#contact`  | oscuro                                | Misma sección separada por una línea. Disponibilidad, CTA (`display-xl`), correo, botones; footer con links, redes, ©, hora local, "Volver arriba".                                                          |

Fuera de la V1: testimonios y formulario de contacto. Mobile se trabaja después, a mano, con Santiago.

Ideas de movimiento aprobadas (se implementan después del layout, no antes, salvo que Santiago pida adelantar una): tags del hero con drag and drop (**hecho**, ver "Ajustes de Santiago"); hover de What I do que cambia también el fondo; contador animado en el dato del About (**hecho**); animación en scroll en Selected work (**hecho**: pila de cards, ver "Selected work"); preview en video al hover de las WorkCard; header que cambia al hacer scroll.

## Reglas del design system (resumen operativo)

- **Escala fluida en rem**: todo valor del diseño (a 1440px) se escribe `px / 16` en rem. La base del `html` escala (`global.css`). Bordes de 1px/1.5px se quedan en px. Botones y tags usan **em** sobre una base de `0.875rem`.
- **Temas**: dark por defecto. Las secciones claras usan `data-theme="light"` en su wrapper; los componentes no cambian, solo los tokens. **Todo el sitio va oscuro** (decisión de Santiago, 22 nov 2026), aunque el wireframe marque secciones claras. **Excepción: Contact + Footer**, que va en tema claro (`#fff`) como fondo de contraste.
- **Nunca valores sueltos** de color, espacio, radio o tipografía: siempre `var(--token)`. Si falta un token, se pregunta; no se inventa.
- Color 90/10: neutros llevan todo; `--accent` (azul #0297DE) en muy pocos puntos (botón relleno, índice activo de ServiceList, un tag). Acentos como texto solo sobre oscuro o ≥ 24px; sobre claro, como relleno. Texto encima de un acento: `--on-accent` / `--on-accent-alt`. El design system pide negro `#02070A` y nunca `#000`, pero **Santiago cambió el fondo principal a `#000`** (ver "Ajustes de Santiago").
- **Líneas, no sombras** (`--line`, `--line-strong`).
- Tipografía: `display-hero` una sola vez por página; `accent-display` (The Night Watch) una sola vez y nunca < 40px. Botones siempre en mayúsculas; el botón relleno es 19px/700 y no se reduce (contraste).
- Iconos: SVG inline de trazo 2px, extremos redondeados, color `ink`. Las flechas de botones son SVG (trazo 2.2px), nunca caracteres.
- Índices `01`, `02` o `( 01 )` en listas grandes. Etiquetas editoriales entre corchetes `[Perfil]`. Sin emojis.
- Gutter `--space-12`, ancho máximo 1344px (`.container`), padding de sección `--space-30` (o `--space-24` compacto).
- Tipografía display: **Bricolage Grotesque** (Google Fonts, variable 400–700), registrada con la variable genérica `--font-display-face`: cambiar de fuente display = cambiar solo esa entrada en `astro.config.mjs`. **Jokker (Displaay) está fuera** por decisión de Santiago (20 nov 2026): no hay licencia confirmada a su nombre (le pasaron los OTF de otro comprador). No volver a añadir Jokker ni ningún archivo de fuente comercial al repo, que es público; `.gitignore` bloquea `*.otf` y `src/assets/fonts/jokker/`. Si algún día tiene licencia web propia: usar los WOFF2 de la licencia y descargarlos en el build desde un almacenamiento privado (opción "repo privado de fuentes + token en Vercel"), nunca commitearlos.
- `src/styles/tokens.css` es una copia de `docs/design-system/tokens.css` con dos cambios: sin `@font-face` y con los stacks apuntando a las variables de Astro (`--font-display-face`, `--font-inter`, `--font-night-watch`). Si el design system cambia, se actualiza a mano manteniendo esas diferencias.

Componentes ya especificados: Button, Tag, Header, WorkCard, ServiceList, FaqItem. Pendientes de diseño (se definen al maquetar, con Santiago): ProcessCard, bloque About, Contact + Footer, overlay del menú, popup de case study.

## Idioma

- **Todo el sitio en inglés** (decisión de Santiago, 22 nov 2026): navegación, contenido, `aria-label`, `alt` y metadatos. `<html lang="en">`.
- El Studio de Sanity (descripciones de campos) puede seguir en español: es la herramienta de Santiago, no el sitio.
- Comunicación con Santiago y comentarios de código: en español.

## Ajustes de Santiago sobre el design system

Mandan sobre `docs/design-system`. Los de tokens viven en `src/styles/tokens-overrides.css` (cargado después de `tokens.css`, que queda como copia fiel).

- **Fondo principal negro puro** (22 nov 2026): `--surface-base` del tema oscuro es `#000` (en `tokens-overrides.css`), no `#02070A`. `surface-raised` (`#0d1317`: popup, placeholders, Process) sigue igual. Santiago no quiere grises oscuros como fondo de contraste.
- **Hover**: nada de color de acento. Tres comportamientos (22 nov 2026):
  - **Links con estilo de nav option** (`.label`: header, cue de Scroll, links y "Back to top" del footer, Close y "Visit live site" del popup): clase global **`.link-line`** — subrayado de 1px que crece de izquierda a derecha al entrar y se recoge también hacia la derecha al salir (`::after` con `scaleX` y `transform-origin` que cambia de lado). Sin cambio de opacidad.
  - **Botones y links del menú**: **roll** (`ui/RollText.astro` + clase `.roll-host` en el elemento con hover; estilos en `global.css`): el contenido sube y sale por arriba mientras una copia (`aria-hidden`) entra desde abajo; al salir del hover **retrocede** (transición de 0.55s, no keyframes). Sin opacidad ni color. Solo con mouse y sin reduced motion; también con foco de teclado.
  - El botón Menu no tiene efecto de hover. El resto (wordmark, nombre y correo del footer, preguntas del FAQ, cards): `opacity: var(--hover-opacity)` (0.8), con `.hover-fade` o en su componente.
  - El foco con teclado sigue con anillo `--accent` (y en `.link-line` también muestra el subrayado).
- **Textos de body**: siempre peso 500 e interlineado 1.3 (`--text-body*`). Tamaño máximo 1.5rem (24px a 1440).
- **Label** (`.label`, `--text-label`): mayúsculas, 700, 0.75rem, Inter. Links del header y cue de Scroll.
- **Header**: wordmark, cada link y el Menu repartidos con `space-between` (mismo espacio entre todos); `padding-block: .5rem`, `min-height: 0`, gutter lateral el de `.container`. Menu: hamburguesa a la izquierda y la palabra a la derecha, gap `--space-2`, mayúsculas, 2rem, peso 200 (pidió 100; Bricolage no baja de 200). Wordmark a 1.55rem. Al hacer scroll: **sin fondo**, solo `backdrop-filter: blur(20px)` y la línea inferior.
- **Hero**: línea de apoyo en `--text-body` con `--ink` al 90%. Sin azul en los tags.
- **Tags iguales en todo el sitio**: el estilo por defecto del Tag es vidrio (`--tag-glass-bg`, blanco al 10%, y `backdrop-filter: blur(--tag-glass-blur)` de 20px) en lugar del `#333` del design system. Ya no hay variante `glass`; quedan `accent` y `alt` sin uso.
- **Degradado del hero** (22 nov 2026): sobre el velo, `--hero-gradient` (negro `#000` arriba y abajo, transparente del 28% al 72%).
- **H1 del hero con `will-change: transform`**: Santiago lo veía más delgado al hacer scroll. En Chrome headless no se reproduce (el texto es idéntico en reposo y apenas ~3% más claro en pleno scroll); la hipótesis es el cambio de suavizado de Windows (ClearType ↔ escala de grises) con posiciones de scroll fraccionarias de Lenis. En su propia capa se rasteriza una vez y no cambia. Si sigue pasando, la alternativa que aceptó Santiago es pasar el H1 a Inter.
- **Fondo del hero**: foto panorámica de Bogotá (`src/assets/hero/hero-1.jpg`, 1584×672, original "Hero 1.jpeg" fuera del repo) con `filter: grayscale(1)` y velo `--hero-overlay` (negro puro al 60%: primero 45% y luego +15 puntos; no el `--overlay` del sistema). Astro la sirve en WebP a 640/960/1280/1584px (53–250 KB), `loading="eager"` y `fetchpriority="high"` por ser el LCP. A más de 1584px de ancho se amplía: si aparece una versión más grande, reemplazar el archivo.
- **Tags del hero: drag and drop libre** (`src/scripts/hero-tags.ts`, GSAP Draggable + InertiaPlugin). **Sin animación en hover y sin regreso a la posición inicial** (decisión de Santiago, 22 nov 2026; antes hubo hover con empujón y regreso, se descartó). Los tags se arrastran, se lanzan con inercia corta (máx. 0.35s) y se quedan donde caen, dentro del escenario del H1 (`[data-hero-stage]`: bajo el header, sobre la línea de apoyo, dentro de los márgenes). El último arrastrado queda encima. Al recargar vuelven a su sitio. Solo con mouse (`hover: hover` y `pointer: fine`) y sin `prefers-reduced-motion`; en touch quedan quietos. Probado con Chrome por DevTools Protocol.

## Logos ("Websites delivered for")

- Originales en la carpeta `Logos/` fuera del repo; versiones listas para el sitio en `src/assets/logos/` (kebab-case) y la lista en `src/data/clients.ts`.
- **Convertidos a blanco en el archivo, nunca con filtros CSS** (un `filter: brightness(0) invert(1)` vuelve blanco todo lo opaco y aparecen bloques). SVG: se cambian los valores de color (`fill`, `stroke`, `stop-color`) a `#FFFFFF` fuera de `<mask>`/`<clipPath>`, que quedan intactos. Raster: si el logo tiene colores superpuestos se pasan a grises por luminancia (0.35–1) para que no se fundan; se recortan los márgenes transparentes.
- Sección oscura: etiqueta a la izquierda y marquee CSS (dos copias de la lista, la segunda `aria-hidden`; 45s; fundido en los bordes). Logos a opacidad 0.8, en mobile 1. Con `prefers-reduced-motion` no se anima y la lista hace wrap.
- Altura de cada logo por área (mismo peso visual): `sqrt(20 / proporción)` rem, entre 1.25 y 2.75rem; ajuste fino con `scale` en `clients.ts`.
- Notas: `sprii.svg` contenía el logo de **Unit21.ai** (así se llama en el sitio). Candybox solo vino como AVIF de 210×50 px: se ve suave en pantallas retina, pedir SVG o una versión más grande.

## Selected work y popup de case study

- `Work.astro` (`#work`, oscura como todo el sitio): H2 centrado y sin conteo; del título a las cards 3.5rem − 10%. 4 `WorkCard` con 3.5rem entre ellas (56px del README; no hay token). Media a ancho completo con proporción 1344/420 y `radius-lg`.
- **Pila al hacer scroll** (pedido de Santiago, 22 nov 2026): cada card es `sticky` y **todas se pegan en el mismo punto** (`--stack-top`: header + `space-8`). La que llega tapa por completo a la anterior, que mientras tanto se encoge hacia su centro hasta `STACK_SCALE` (0.5, en `src/scripts/work-stack.ts`, GSAP ScrollTrigger con scrub) y queda escondida detrás. **Las cards encogidas no deben verse** (ajuste de Santiago: una pila visible, con franjas asomando, le quitaba atención al trabajo; se probó y se descartó). Las posiciones se miden en flujo normal (lo pegado no sirve para calcular el scroll) y se vuelven a medir en cada refresh. Las cards tienen fondo opaco (`surface-base`) para tapar a la de abajo. Al terminar la lista, todas se sueltan a la vez. Con reduced motion: ni sticky ni escala.
- Datos: `getSelectedWork()` (`src/lib/work.ts`) con `SELECTED_WORK_QUERY` (4 proyectos por `order` asc y luego `year` desc). **Si no hay proyectos publicados usa `src/data/work-placeholders.ts`** (contenido provisional, pedido por Santiago el 22 nov 2026); al publicar el primero en Sanity, el sitio pasa solo a los reales. Un error de red no cae a placeholders: el build falla. Sin `cover`, la card muestra `MediaPlaceholder` (la X del design system).
- Imágenes de Sanity con `imageSet()` (`src/lib/sanity/image.ts`): `src` + `srcset` en formato automático, recortadas respetando el hotspot cuando se pasa una proporción.
- Toda la card abre el popup: el `<button>` vive dentro del `h3` y su `::after` cubre la card (un botón no puede contener un heading). Hover: la media y la fila de texto a `--hover-opacity` (no la card entera: con la pila se vería la card de abajo).
- Popup (`ui/CaseStudy.astro` + `src/scripts/case-study.ts`): `<dialog>` nativo con `showModal()` (foco atrapado, Escape y vuelta del foco a la card los da el navegador); también cierra con el botón Close y con clic en el fondo. Panel oscuro (`surface-raised`) de hasta 72rem con scroll propio (`data-lenis-prevent`); `lenis.stop()` mientras está abierto (y `overflow: hidden` en `html` si Lenis no corre). Entrada con fundido y subida corta (`@starting-style`), sin animación con reduced motion. Orden: barra sticky (Case study / Close), portada 16:9, título (`h2`) + resumen (`body-lg`), ficha Client / Role / Year / Stack, cuerpo en Portable Text, galería y link "Visit live site". **Diseño propuesto por Claude**, pendiente de ajustes de Santiago.
- Probado por CDP a 1440: cards de 1344×420, apertura con clic y con Enter, scroll dentro del popup sin mover la página, cierre con Escape, fondo y Close, foco de vuelta en la card.

## What I do (ServiceList)

- `Services.astro` (`#services`, oscura): columna izquierda de 24rem a `calc(space-16 * 2.15)` de la lista, con el nombre en estilo de link del nav (`.label`) en `ink-muted` y la descripción (`body-lg`) de la opción activa; lista a la derecha (display 2.75rem, 600, −0.04em; el design system pedía hasta 4.75rem) con índice `( 01 )` y separadores `--line`. H2 "What I do" visualmente oculto (el wireframe no muestra título).
- **Opacidad de los títulos** (ajuste de Santiago, 22 nov 2026): todos en `ink` a 0.6; la activa y la que está bajo el mouse a 1 y con `padding-left` de 1rem (se corre a la derecha con transición) (en lugar de `ink-muted` / `ink` del design system). La primera es la activa por defecto. El índice de la activa va en `accent` (punto azul previsto en el design system).
- Cambia la activa (`src/scripts/service-list.ts`): hover con mouse, clic o tap en touch, y teclado. Al salir de la lista se queda la última. Semántica de pestañas (`tablist` / `tab` / `tabpanel`, flechas, Home y End): las 5 descripciones están en el HTML y la de la izquierda es el panel activo, que entra con un fundido corto (sin animación con reduced motion).
- Pendiente (idea aprobada): que el hover cambie también un video o imagen de fondo.

## Process (oculta)

- `Process.astro` (`#process`): versión básica del wireframe. H2 a la izquierda y 4 tarjetas en fila (`surface-base` con borde `--line` y `radius-lg` sobre la sección en `surface-raised`): índice, título (`h4`) y texto abajo. Textos placeholder en `src/data/process.ts`.
- **Oculta** (decisión de Santiago, 22 nov 2026): no tiene contenido y puede trabajarla después del lanzamiento. `showProcess = false` en `src/data/process.ts` hace que `index.astro` no la renderice (no sale en el HTML). Para mostrarla: `true`, y añadir "Process" al overlay del menú (que no debe enlazar a `#process` mientras esté oculta).

## Menú

- Botón "Menu" del header (Bricolage Grotesque 200, 2rem, mayúsculas; sin efecto de hover) con hamburguesa que pasa a **X** (las líneas de arriba y abajo giran al centro, la del medio se va; 0.45s).
- Al abrir (referencia Boncho, pedido de Santiago 22 nov 2026): un **panel claro (`#eaeaea`, como la bottom section) aparece de abajo hacia arriba** con `clip-path` (0.6s), arriba de la página y detrás del header, alto según el contenido con mínimo 32vh. Del navbar quedan solo el wordmark y "Menu" (pasan a tinta negra; los 3 links del centro se ocultan; sin blur). Velo negro al 50% sobre el resto de la página.
- Contenido: links a la derecha, alineados con "Menu" (Work, Services, Process solo si `showProcess`, About, FAQ, Contact) y el correo a la izquierda, todos como títulos pequeños (`h4`) con el **roll** de los botones. Entran escalonados.
- `src/scripts/menu.ts`: abre y cierra con el botón, se cierra con Escape (el foco vuelve al botón), clic en el velo o al elegir un link (Lenis hace el scroll al ancla). `aria-expanded` y `aria-label` del botón cambian; el panel queda `inert` cerrado; Lenis se detiene mientras está abierto. El panel va fuera del `<header>`: el `backdrop-filter` del header lo encerraría si fuera hijo.

## About

- `About.astro` (`#about`): **1 a 1 con el wireframe** (pedido de Santiago, 22 nov 2026), pero en fondo oscuro como el resto. Foto vertical de 32.5rem × mín. 47.5rem con `radius-sm` a la izquierda (placeholder mientras `about.photo` sea null); a `space-12`, la columna derecha reparte arriba la etiqueta (`body-sm`, `ink-muted`) y el dato grande (display 18.75rem, 600, interlineado 0.78, −0.05em, en `--line-strong` como el gris tenue del wireframe) y abajo "Info" + 4 bloques en dos columnas (gap `space-12` × 2.5rem): etiqueta con el componente Tag y sin corchetes (ajustes de Santiago) y texto en `body`.
- "Info" en la fuente display (Bricolage Grotesque, 3.5rem, peso 400, +0.02em, mayúsculas), como en el wireframe. **No usar The Night Watch aquí** (se probó y Santiago la cambió, 22 nov 2026); por ahora la fuente accent no tiene uso en la página.
- **Contador** (`src/scripts/count-up.ts`): el dato grande cuenta de `00` a su valor (`data-count-up`, hoy 26) en 1.6s con `power2.out` cuando entra en pantalla (borde superior al 85% del viewport), una sola vez. Mantiene los ceros a la izquierda y usa cifras tabulares. El HTML trae el valor final (sin JS o con reduced motion se queda así) y los lectores de pantalla leen solo el valor final.
- H2 "About" visualmente oculto (el wireframe no muestra título). Textos entre corchetes = huecos por llenar (dato grande, bio, logros, idiomas). La etiqueta del dato sigue pendiente (26 = ¿edad, años, proyectos?).

## FAQ

- `Faq.astro` (`#faq`, oscura): **mismas columnas que What I do** (izquierda de 24rem, separación `calc(space-16 * 2.15)`; pedido de Santiago). Izquierda: H2 "FAQ", intro (`body`, `ink-muted`, máx. 20rem) y botón `outline-bold` "Contact" a `#contact`. Derecha: 6 preguntas (FaqItem): línea superior en `ink`, filas separadas con `--line`, pregunta en `h4` dentro de un `<button aria-expanded>` con icono más/menos, respuesta en `body` `ink-muted` de máx. 32.5rem.
- **Acordeón** (`src/scripts/faq.ts`): todas cerradas al cargar; cada una se abre y cierra por su cuenta (no cierra las demás). Animación suave solo con CSS: la respuesta es un grid que pasa de `0fr` a `1fr` (0.45s) con fundido del texto y la línea vertical del más que se encoge; cerrada queda con `visibility: hidden` (fuera del foco y del árbol de accesibilidad). Sin animación con reduced motion.
- Las preguntas y respuestas son un borrador mío; el contenido real lo define Santiago.

## Button

- `ui/Button.astro` (design system): `filled` (accent, 19px/700, flecha →), `outline` (borde 1px, 18px/400, flecha ↗) y `outline-bold` (borde 1.5px, 18px/700, sin icono). Mayúsculas, pill, fuente display, medidas en em sobre `--em-base`. Hover: el contenido sube y vuelve a entrar desde abajo (ver "Hover"). **Padding de 0.45em** en todos los lados y en todas las variantes (ajuste de Santiago, en lugar de los 13 × 26px del design system).

## Bottom section (Contact + Footer)

Santiago la llama **"bottom section"**.


- `Contact.astro`: un `<div class="closing" data-theme="light">` **fuera de `<main>`** con `<section id="contact">` y `<footer>` (así el footer es el pie de la página). Fondo de contraste **`#eaeaea`** (elegido por Santiago, 22 nov 2026, tras ver blanco, blanco roto, azul, naranja, foto del hero y negro con borde; nada de gris oscuro), con los tokens del tema claro y **esquinas superiores redondeadas** (`--closing-radius: 2rem`; el `radius-lg` se pierde a escala de sección): se ve como una tarjeta por encima de todo.
- Contact (wireframe): centrado, 32px entre piezas: disponibilidad con punto `accent` en estilo de link del nav (`.label`; un tag de vidrio no se vería en fondo claro), H2 en `display-xl`, correo subrayado (1.5rem/500) y botones `filled` "Email me" + `outline` "Book a call" ↗. Footer: línea `--line` al ancho del contenido, marca + rol, links del nav (Process solo si `showProcess`), redes (LinkedIn, GitHub; sin `href` se muestran como texto), ©, hora local de Bogotá en vivo (`src/scripts/local-time.ts`) y "Back to top"; toda la fila de abajo en `.label` color `ink`, igual que "Back to top".
- **Efecto de tarjeta** (`src/scripts/closing-reveal.ts`): mientras la tarjeta sube, la última `<section>` de `<main>` baja a la mitad de la velocidad del scroll (GSAP ScrollTrigger, scrub, desde que la tarjeta asoma hasta el final de la página), así queda por debajo de la tarjeta. **Solo se desplaza, no se encoge** (Santiago lo pidió así al verlo con escala). Sin efecto con reduced motion.
- Pendientes de contenido: correo, link de agenda, links de redes. Ojo: si la tarjeta llega a quedar bajo el header (pantallas bajas o mobile), el texto blanco del header no se ve sobre el fondo claro.

## Sanity: modelo de contenido

Todo el contenido editable sale de Sanity; nada de textos de contenido hardcodeados en componentes (las etiquetas de UI sí pueden ir en código).

**Implementado:** `project` (título "Work", `studio/schemaTypes/documents/project.ts`), con dos pestañas (field groups):

- **Card** (la WorkCard del wireframe): `title`, `slug`, `year`, `tags` (≤ 3), `cover` (imagen 16:9 con hotspot y `alt`), `previewVideo` (archivo MP4/WebM opcional para el hover), `order` (posición en Selected work). El índice `01…04` se calcula en el front por orden, no se guarda.
- **Case study** (el popup, deliberadamente simple): `client`, `role`, `liveUrl`, `summary` (≤ 280), `body` (Portable Text: párrafos, `h3`, bullets, strong/em y links) y `gallery` (imágenes con `alt`).

**Propuesta (aún sin implementar, una por una cuando Santiago lo pida):**

- **Singletons**: `siteSettings` (nombre, rol, ubicación, correo, link de agenda, redes, disponibilidad, SEO por defecto, imagen OG) y `home` (H1 del hero en dos líneas, tags del hero, línea de apoyo, media de fondo, títulos/intro de cada sección, dato grande del About, bloques INFO, foto, CTA de contacto).
- **Colecciones**: `service` (nombre, descripción corta, media de fondo opcional, orden), `processStep` (título, descripción, orden), `faq` (pregunta, respuesta, orden), `client` (nombre, logo, url, orden).
- **Objetos**: `seo`, `link`, `media` (imagen con alt o video con poster).
- Orden manual con un campo `orderRank` o `order` numérico; la home elige y ordena los 4 proyectos destacados.
- Singletons fijados en el Structure del Studio (sin "crear nuevo").

Reglas Sanity: usar `defineType`/`defineField`/`defineArrayMember`; registrar cada tipo en `schemaTypes/index.ts`; tras cambiar schema o consultas correr `pnpm typegen`; consultas con nombres únicos y proyecciones mínimas; el sitio solo lee contenido publicado. Antes de escribir código de Sanity, consultar las reglas del MCP de Sanity (`list_sanity_rules` / `get_sanity_rules`: `schema`, `groq`, `astro`, `image`, `portable-text`, `seo`).

## Variables de entorno

- `.env` (raíz) — `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` (default `production`), `PUBLIC_SANITY_STUDIO_URL`, `SANITY_API_READ_TOKEN` (opcional, solo servidor). Declaradas y tipadas en `env.schema` de `astro.config.mjs`; se leen desde `astro:env/client` o `astro:env/server`, nunca con `import.meta.env` suelto.
- `studio/.env` — `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`.
- Los `.env` no se commitean (solo los `.env.example`). Tokens y secretos nunca en código ni en commits.
- Mientras `PUBLIC_SANITY_PROJECT_ID` esté vacío, `sanityClient` es `null` e `isSanityConfigured` es `false`: el build no debe romperse por eso.

## Estado actual y pendientes

- Setup listo: Astro en la raíz + Studio en `studio/`, Astro + fuentes + tokens + escala fluida, clientes de Sanity, TypeGen configurado. Schema `project` hecho (tipos en `sanity.types.ts`).
- **Secciones construidas** (escritorio; mobile pendiente): Header (`src/components/sections/Header.astro`, fijo, transparente → solo blur al hacer scroll; el botón Menu aún no abre nada), Hero (`Hero.astro`), Logos (`Logos.astro`) Selected work (`Work.astro`, con placeholders) y What I do (`Services.astro`, textos provisionales en `src/data/services.ts`). Process (`Process.astro`) está hecha en versión básica pero **oculta** (ver "Process"). About (`About.astro`, contenido provisional en `src/data/about.ts`) FAQ (`Faq.astro`, borrador en `src/data/faq.ts`) y Contact + Footer (`Contact.astro`, provisional en `src/data/contact.ts`). Componentes `ui/`: Tag, Button, WorkCard, CaseStudy, MediaPlaceholder. Siguen: About, FAQ, Contact + Footer, overlay del menú.
- **Contenido provisional** en `src/data/site.ts` (nombre, nav, textos y tags del hero) mientras no existan los singletons `siteSettings`/`home`. Cuando se creen, ese archivo se reemplaza por consultas GROQ; los componentes no cambian porque ya reciben el contenido desde fuera.
- **Proyecto de Sanity conectado**: "Portfolio", project ID `etaah5um`, dataset `production` (público), organización "Santiago Lopez". CORS: `http://localhost:3333` (Studio, con credenciales) y `http://localhost:4321` (Astro, sin credenciales). No usar `j4xqm16v` (renombrado "portfolio - no use") ni `27zero` (de un cliente). Al tener dominio: añadirlo a CORS.
- **Schema desplegado** en `etaah5um/production` (`sanity schemas deploy`): las herramientas MCP ya ven `project`. Después de cada cambio de schema: `pnpm typegen` y `pnpm schema:deploy`.
- **CLI de Sanity**: Santiago también trabaja con otra cuenta de Sanity (BenorMedia). El CLI tiene una sola sesión a la vez; si `schemas deploy` o `deploy` fallan con "Unauthorized / missing grants", es que el CLI está con la otra cuenta: pedirle que corra `npx sanity login` con la cuenta de la org "Santiago Lopez". El Studio local usa la sesión del navegador y no depende de eso.
- Falta el dominio final (`site` en `astro.config.mjs`).
- **Studio desplegado** en https://santiago-lopez.sanity.studio (redirige al dashboard de la org, `@on31SsbFa`; appId `id1bmgg4xual2jeoxjj47y6c` en `studio/sanity.cli.ts`). Para publicar cambios del Studio: `pnpm studio:deploy`. Los nombres `portfolio` y `santiagolopez` estaban tomados por otros.
- Pendientes de contenido (de Santiago): H1 del hero, dato grande del About, contenido de FAQ, textos y tags de proyectos, servicios y proceso, logos de clientes reales.
- Deploy: Vercel con la raíz del repo (framework Astro, build `pnpm build`, salida `dist/`), más un webhook de Sanity → deploy hook de Vercel para reconstruir al publicar.

## Forma de trabajo

- Construir sección por sección, en el orden de la página, mostrando cada una antes de pasar a la siguiente. Layout primero; movimiento después.
- Antes de construir un componente, leer su README en `docs/design-system/components/` y su `preview.html`.
- HTML semántico y accesible: landmarks, un solo `h1`, foco visible, `aria-expanded` en acordeones y menú, `alt` en imágenes, overlay del menú y popups con manejo de foco y `Escape`.
- Rendimiento: imágenes de Sanity con tamaño y formato (`urlFor(...).width().auto('format')`), `loading="lazy"` fuera del primer viewport, videos con `poster`, `muted`, `playsinline` y sin autoplay pesado en mobile.
- Verificar con `pnpm build` (incluye `astro check`) antes de dar algo por terminado, y revisar el render real: `pnpm build && pnpm preview --port 4329` en segundo plano + capturas headless con Chrome (`chrome.exe --headless=new --window-size=1440,900 --screenshot=<ruta>`) a 1440, 1920 y 1280×720. El navegador integrado no abre localhost.
- **CSS con prefijos**: escribir siempre la versión `-webkit-` **antes** de la estándar (p. ej. `-webkit-backdrop-filter` y luego `backdrop-filter`). El minificador del build conserva solo la última de dos declaraciones equivalentes; con el orden al revés se perdía el `backdrop-filter` estándar y Chrome no aplicaba el blur.
- **Smooth scroll**: Lenis (`src/scripts/smooth-scroll.ts`, cargado en `BaseLayout`), valores de suavizado por defecto más `anchors` (respeta `scroll-padding-top`). Corre en el `gsap.ticker` (no `autoRaf`) y llama a `ScrollTrigger.update` en cada scroll, para que las animaciones de scroll vayan sincronizadas. No se inicia con `prefers-reduced-motion`. Exporta `lenis` (o `null`): usarlo para `lenis.stop()`/`start()` con popups y menú, y poner `data-lenis-prevent` en contenedores con scroll propio. El `scroll-behavior: smooth` nativo solo aplica si Lenis no está activo (`html:not(.lenis)`).
- Variables globales de layout en `global.css`: `--em-base` (0.875rem, base de los componentes en em: tags, botones) y `--header-height` (compensa el header fijo; también `scroll-padding-top`).
- Commits pequeños y descriptivos. Trabajar en ramas; no hacer push ni merge a `main` sin que Santiago lo pida.
