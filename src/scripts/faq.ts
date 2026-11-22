/**
 * FAQ: cada pregunta abre y cierra su respuesta por su cuenta (no se cierran las demás).
 * Todas cerradas al cargar. La animación de altura es CSS (Faq.astro); aquí solo se
 * cambian `aria-expanded` del botón y `data-open` de la fila.
 */
export function initFaq(list: HTMLElement) {
  list.querySelectorAll<HTMLButtonElement>('[data-faq-toggle]').forEach((button) => {
    const item = button.closest<HTMLElement>('[data-faq-item]');
    if (!item) return;

    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      item.toggleAttribute('data-open', open);
    });
  });
}
