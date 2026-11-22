/**
 * Popups de case study: abre el <dialog> que indica `data-case-open`, cierra con el botón
 * `data-case-close`, con Escape (nativo) o con clic en el fondo. Mientras está abierto,
 * Lenis se detiene para que la página de atrás no se mueva; al cerrar, el foco vuelve a la
 * card (lo hace el navegador al cerrar un modal abierto con showModal()).
 */
import { lenis } from '@/scripts/smooth-scroll';

export function initCaseStudies(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>('[data-case-open]').forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.caseOpen ?? '');
    if (!(dialog instanceof HTMLDialogElement)) return;

    trigger.addEventListener('click', () => {
      dialog.showModal();
      dialog.scrollTop = 0;
      lenis?.stop();
    });
  });

  root.querySelectorAll<HTMLDialogElement>('dialog.case').forEach((dialog) => {
    dialog.addEventListener('close', () => lenis?.start());
    dialog.addEventListener('click', (event) => {
      // El panel llena el <dialog>: un clic que llega al propio dialog es en el fondo.
      const target = event.target as HTMLElement;
      if (target === dialog || target.closest('[data-case-close]')) dialog.close();
    });
  });
}
