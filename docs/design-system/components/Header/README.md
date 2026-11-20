# Header

Barra de navegación que forma parte del hero: wordmark a la izquierda, tres links centrados y el botón Menu a la derecha.

- Links del centro: Work, Services y Contact, todos anchors a su sección. El resto de las secciones viven en el menú.
- **Menu:** el texto "Menu" en grande (28px, Jokker, peso 500) junto a una hamburguesa de tres líneas. Sin fondo, borde ni pill. Abre un overlay a pantalla completa con todos los links (aún sin diseñar).
- Sobre el hero es transparente, con el texto en `ink` y fondo de video o imagen con `overlay`. Al hacer scroll pasa a fondo sólido `surface-base` o con `backdrop-filter: blur` (por decidir en el desarrollo).
- Hover de los links y del Menu en `accent`; foco visible con anillo de 2px en `accent`.
- El botón Menu necesita `aria-label` porque la hamburguesa es decorativa.
