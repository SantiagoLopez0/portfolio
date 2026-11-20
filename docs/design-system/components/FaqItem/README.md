# FaqItem

Fila de acordeón del FAQ: pregunta en `h4` y, al abrirla, una respuesta corta.

- Superficie `surface-raised`; la primera línea de la lista lleva borde `ink` y las filas se separan con `line`.
- Icono de menos (abierto) o más (cerrado), trazo de 2px en `ink`.
- La pregunta es un `<button>` con `aria-expanded`; la respuesta va en `ink-muted` y no pasa de 520px de ancho.
- Foco visible con anillo de 2px en `accent`.
- El consumidor aporta pregunta y respuesta. El contenido real del FAQ se define más adelante.
