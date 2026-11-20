# Wireframe Home — decisiones y sugerencias para el desarrollo

**Estado:** wireframe V1 aprobado (19 nov 2026). Artifact Design: "Wireframe Home — Portafolio Santiago López". Una sola página con anchors; los case studies van en popup. Solo home. Los estilos de tags y botones, y el sistema de diseño, se definen después del layout.

## Decisiones tomadas
- **Header:** parte del hero. Transparente arriba; sólido o con backdrop-filter blur al hacer scroll (se resuelve en el desarrollo). Wordmark a la izquierda, 3 opciones centradas (Work, Services, Contact) y botón "Menu" a la derecha. El menú abre un overlay tipo Boncho con todos los links (Work, Services, Process, About, FAQ, Contact).
- **Hero:** H1 gigante estilo Boncho, en dos líneas que ocupan casi todo el ancho: la primera arriba a la izquierda y la segunda abajo a la derecha, en diagonal (wireframe: "Web / Developer"; el texto final está por definir). Tags alrededor del H1 (las pills son provisionales). Fondo de video o imagen. Sin fila de info (Colombia / hora local / disponibilidad), porque Colombia y Disponible ya son tags; la hora local puede ir en el footer. Sin botones de CTA: el header ya tiene Work y Contact. Si se quiere uno solo, "Ver trabajos". Abajo: línea de apoyo y cue de "Scroll".
- **Logos:** barra simple con el texto "Websites delivered for" y logos de sitios entregados. Solo clientes reales y reconocibles.
- **Selected work:** 4 cards apiladas a ancho completo, cada una abre un popup de case study. Animación en scroll: después.
- **What I do:** fondo oscuro, lista grande a la derecha (Webflow, Next.js, Astro + Sanity, GSAP & animación, CRO & SEO) y texto a la izquierda que cambia en hover. Se queda así.
- **Process:** 4 pasos, se queda así.
- **About:** estilo Kaisei: foto vertical, dato grande, bloque INFO con etiquetas [Perfil], [Stack], [Logros], [Idiomas]. Se queda así.
- **FAQ:** 6 preguntas en acordeón; el contenido se define después.
- **Contact + Footer:** misma sección oscura separada por una línea. Se queda así.
- **Fuera:** testimonios y formulario de contacto.

## Ideas para aplicar en el desarrollo (propuestas por Claude, aprobadas)
1. Tags del hero que se mueven con el cursor.
2. Hover de la lista de What I do que cambie también el video o la imagen de fondo.
3. Dato grande del About como contador animado.
4. Animación en scroll en Selected work.
5. Preview en video al hacer hover en las cards de work.

## Pendientes de contenido
- H1 del hero: nombre o título.
- Dato grande del About (edad, años de experiencia, número de proyectos).
- Contenido de FAQ.
- Textos y tags de proyectos, servicios y proceso.
- Versión mobile (se trabaja manualmente después).
