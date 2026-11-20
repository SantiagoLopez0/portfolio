# Button

Botón pill en Jokker con tres variantes tomadas de las referencias de Santiago: relleno con flecha, outline fino con flecha y outline en negrita. Todo el texto de los botones va en mayúsculas.

- **Forma común:** texto en mayúsculas (`text-transform: uppercase`), `border-radius: 8.33em`, `letter-spacing` −0.02em, `line-height` 1.15, centrado con flex, gap de .45em entre texto e icono, padding 13px arriba y abajo y 26px a los lados, sin subrayado.
- **Relleno (default):** fondo y borde `accent`, texto `white`, 19px, peso 700, con flecha → en SVG. Un solo botón relleno por pantalla. El blanco sobre el azul da 3.2:1, que solo cumple en texto grande; por eso es 19px en negrita y no se debe reducir.
- **Outline fino:** borde de 1px en `ink`, sin relleno, texto `ink` de 18px peso 400, con flecha ↗ en SVG. En hover se llena con `ink`.
- **Outline en negrita:** borde de 1.5px en `ink`, sin relleno, texto de 18px peso 700, sin icono. En hover se llena con `ink`.
- Hover del relleno: opacidad .88. Foco visible: anillo de 2px en `ink`.
- Las flechas son SVG con trazo de 2.2px, nunca caracteres de texto.
- El consumidor aporta el texto y el destino (`href`); las flechas acompañan solo a los CTAs que llevan a otra parte.
