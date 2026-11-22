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
- Animación: **GSAP** (instalado, aún sin uso). Todo efecto respeta `prefers-reduced-motion`.
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

Ideas de movimiento aprobadas (se implementan después del layout, no antes, salvo que Santiago pida adelantar una): tags del hero con física (**hecho**, ver "Ajustes de Santiago"); hover de What I do que cambia también el fondo; contador animado en el dato del About; animación en scroll en Selected work; preview en video al hover de las WorkCard; header que cambia al hacer scroll.

## Reglas del design system (resumen operativo)

- **Escala fluida en rem**: todo valor del diseño (a 1440px) se escribe `px / 16` en rem. La base del `html` escala (`global.css`). Bordes de 1px/1.5px se quedan en px. Botones y tags usan **em** sobre una base de `0.875rem`.
- **Temas**: dark por defecto. Las secciones claras usan `data-theme="light"` en su wrapper; los componentes no cambian, solo los tokens.
- **Nunca valores sueltos** de color, espacio, radio o tipografía: siempre `var(--token)`. Si falta un token, se pregunta; no se inventa.
- Color 90/10: neutros llevan todo; `--accent` (azul #0297DE) en muy pocos puntos (botón relleno, índice activo de ServiceList, un tag). Acentos como texto solo sobre oscuro o ≥ 24px; sobre claro, como relleno. Texto encima de un acento: `--on-accent` / `--on-accent-alt`. El negro es `#02070A`, nunca `#000`.
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

- **Hover**: nada de color de acento. Todo elemento interactivo baja a `opacity: var(--hover-opacity)` (0.8) con la clase `.hover-fade`. El foco con teclado sigue con anillo `--accent`.
- **Textos de body**: siempre peso 500 e interlineado 1.3 (`--text-body*`). Tamaño máximo 1.5rem (24px a 1440).
- **Label** (`.label`, `--text-label`): mayúsculas, 700, 0.75rem, Inter. Links del header y cue de Scroll.
- **Header**: wordmark, cada link y el Menu repartidos con `space-between` (mismo espacio entre todos); `padding-block: .5rem`, `min-height: 0`, gutter lateral el de `.container`. Menu: hamburguesa a la izquierda y la palabra a la derecha, gap `--space-2`, mayúsculas, 2rem, peso 200 (pidió 100; Bricolage no baja de 200).
- **Hero**: línea de apoyo en `--text-body` con `--ink` al 90%. Todos los tags del hero con el estilo por defecto (sin azul).
- **Tags del hero con física** (`src/scripts/hero-tags.ts`, GSAP + Draggable + InertiaPlugin). **Sin rebote ni pausas** (pedido de Santiago): todo regreso es `power3.out`/`power2.inOut`, nunca `elastic`. Hover: solo un cursor rápido (≥ 0.6 px/ms) empuja el tag (24–110px según la velocidad) y vuelve en 0.6s; a velocidad normal o lenta solo se sacude, para poder agarrarlo. La velocidad del cursor se suaviza, ignora ráfagas de eventos (< 8ms) y vale 0 si el mouse está quieto (> 60ms); un tag en movimiento no reacciona al hover (evita empujones fantasma al volver bajo un cursor quieto). Drag con lanzamiento corto (inercia máx. 0.35s) y regreso inmediato. Solo con mouse (`hover: hover` y `pointer: fine`) y sin `prefers-reduced-motion`. Probado con Chrome por DevTools Protocol.

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
- **Secciones construidas** (escritorio; mobile pendiente): Header (`src/components/sections/Header.astro`, fijo, transparente → fondo translúcido con blur al hacer scroll; el botón Menu aún no abre nada) y Hero (`Hero.astro`). Componente `ui/Tag.astro`. Siguen: Logos, Selected work + popup, What I do, Process, About, FAQ, Contact + Footer, overlay del menú.
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
- Variables globales de layout en `global.css`: `--em-base` (0.875rem, base de los componentes en em: tags, botones) y `--header-height` (compensa el header fijo; también `scroll-padding-top`).
- Commits pequeños y descriptivos. Trabajar en ramas; no hacer push ni merge a `main` sin que Santiago lo pida.
