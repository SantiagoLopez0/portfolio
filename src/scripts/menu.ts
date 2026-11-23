/**
 * Menú (panel de links). Abre y cierra con el botón "Menu" del header, se cierra con
 * Escape, con clic en el velo y al elegir un link (Lenis hace el scroll al ancla).
 * Estado: `data-menu-open` en <html> (panel y velo) y en el header (X, links ocultos).
 * La página sigue haciendo scroll con el menú abierto (pedido de Santiago, 22 nov 2026).
 * Cerrado, el panel queda `inert`.
 */

export function initMenu() {
  const header = document.querySelector<HTMLElement>('.site-header');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-menu]');
  const backdrop = document.querySelector<HTMLElement>('[data-menu-backdrop]');
  if (!header || !toggle || !panel) return;

  const root = document.documentElement;
  let open = false;

  const set = (next: boolean) => {
    if (next === open) return;
    open = next;
    root.dataset.menuOpen = String(open);
    header.dataset.menuOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    panel.inert = !open;
  };

  toggle.addEventListener('click', () => set(!open));
  backdrop?.addEventListener('click', () => set(false));
  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      set(false);
      toggle.focus();
    }
  });
}
