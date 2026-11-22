/**
 * Hora local del footer: escribe la hora de la zona de `data-local-time` (p. ej.
 * America/Bogota) en formato 24 h y la actualiza al cambiar de minuto.
 */
export function initLocalTime(el: HTMLTimeElement) {
  const timeZone = el.dataset.localTime;
  if (!timeZone) return;

  const format = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const render = () => {
    const now = new Date();
    el.textContent = format.format(now);
    el.dateTime = now.toISOString();
    // Siguiente actualización justo al empezar el próximo minuto.
    window.setTimeout(render, 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()));
  };

  render();
}
