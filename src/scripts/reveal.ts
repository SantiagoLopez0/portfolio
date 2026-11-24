/**
 * Animaciones de entrada con el scroll (pedido de Santiago, 24 nov 2026). El hero no se anima.
 *
 * Marcado en los componentes, `data-reveal-item` en cada elemento:
 * - `text`: el texto se divide en líneas (SplitText) y cada línea sube desde abajo con
 *   máscara, de arriba hacia abajo. Las líneas se recalculan según el ancho (autoSplit).
 * - `slide`: el elemento sube suave desde abajo.
 * - `group`: los hijos del elemento suben juntos, en una sola animación.
 *
 * - Ocultos por defecto: `global.css` los oculta desde el primer pintado (html.js); aquí se
 *   preparan y se muestran al animar.
 * - Cada elemento dispara con su propio borde superior al 80% del viewport (offset del 20%,
 *   para que haya recorrido de scroll y la animación se vea). Si varios entran a la vez, van
 *   en orden del DOM (izquierda antes que derecha) con STEP segundos entre uno y otro.
 * - Los disparadores se crean cuando termina el preloader. Los elementos que no se ven en
 *   este tamaño de pantalla (listas de mobile/escritorio) quedan en su estado final.
 * - Con "reducir movimiento" no hay animaciones (global.css tampoco los oculta).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { whenPreloaderDone } from '@/scripts/preloader';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Separación entre elementos que entran a la vez, en segundos. */
const STEP = 0.1;
/** Espera máxima de un elemento dentro de un grupo que entra a la vez, en segundos. */
const MAX_DELAY = 0.5;
const EASE = 'power3.out';
/** Offset del 20%: el borde superior del elemento tiene que llegar al 80% del viewport. */
const START = 'top 80%';

interface Entry {
  el: HTMLElement;
  anim?: gsap.core.Animation;
  started: boolean;
}

export function initReveals() {
  // Se decide una sola vez al cargar.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const entries = [...document.querySelectorAll<HTMLElement>('[data-reveal-item]')].map((el) => {
    const entry: Entry = { el, started: false };
    const kind = el.dataset.revealItem;

    if (kind === 'text') {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'reveal-line',
        autoSplit: true,
        // Al recalcular líneas (resize, fuentes) SplitText pasa el progreso a la nueva.
        onSplit(self) {
          entry.anim = gsap.from(self.lines, {
            yPercent: 110,
            duration: 1,
            ease: EASE,
            stagger: 0.08,
            paused: !entry.started,
          });
          // Las líneas ya están escondidas bajo su máscara: el bloque puede mostrarse.
          gsap.set(el, { visibility: 'visible' });
          return entry.anim;
        },
      });
    } else if (kind === 'group') {
      entry.anim = gsap.from([...el.children], {
        y: 60,
        autoAlpha: 0,
        duration: 1.1,
        ease: EASE,
        paused: true,
      });
      gsap.set(el, { visibility: 'visible' });
    } else {
      entry.anim = gsap.from(el, { y: 60, autoAlpha: 0, duration: 1.1, ease: EASE, paused: true });
    }
    return entry;
  });

  const start = (entry: Entry) => {
    entry.started = true;
    entry.anim?.play();
  };

  whenPreloaderDone().then(() => {
    const byEl = new Map(entries.map((e) => [e.el, e]));
    const visible = entries.filter((e) => e.el.getClientRects().length > 0);

    // Los que no se ven en este tamaño de pantalla quedan en su estado final.
    entries
      .filter((e) => !visible.includes(e))
      .forEach((e) => {
        e.started = true;
        e.anim?.progress(1);
        gsap.set(e.el, { visibility: 'visible' });
      });

    ScrollTrigger.batch(
      visible.map((e) => e.el),
      {
        start: START,
        once: true,
        onEnter: (batch) => {
          // Los que ya quedaron por encima de la pantalla (scroll rápido o salto a un ancla)
          // se completan al instante; el escalón es solo para los que se ven.
          let k = 0;
          batch.forEach((el) => {
            const entry = byEl.get(el as HTMLElement);
            if (!entry) return;
            if (el.getBoundingClientRect().bottom < 0) {
              start(entry);
              entry.anim?.progress(1);
              return;
            }
            // Escalón con tope: tras un salto a un ancla entran muchos a la vez y ninguno
            // debería esperar más de MAX_DELAY.
            gsap.delayedCall(Math.min(k++ * STEP, MAX_DELAY), () => start(entry));
          });
        },
      },
    );
    ScrollTrigger.refresh();
  });
}
