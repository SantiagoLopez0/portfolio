/**
 * What I do: cambia la opción activa de la lista (y el texto de la izquierda).
 * - Mouse: al pasar por encima de una fila (pointerenter con pointerType "mouse").
 * - Touch y clic: al tocar o hacer clic.
 * - Teclado (patrón de pestañas): flechas arriba/abajo, Home y End mueven el foco y activan.
 */
export function initServiceList(root: HTMLElement) {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-service-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-service-panel]')];
  if (!tabs.length) return;

  let active = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'),
  );

  const activate = (index: number) => {
    if (index === active) return;
    active = index;
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel, i) => (panel.hidden = i !== index));
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') activate(index);
    });
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const next =
        event.key === 'ArrowDown' || event.key === 'ArrowRight'
          ? index === last
            ? 0
            : index + 1
          : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
            ? index === 0
              ? last
              : index - 1
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? last
                : null;
      if (next === null) return;
      event.preventDefault();
      activate(next);
      tabs[next].focus();
    });
  });
}
