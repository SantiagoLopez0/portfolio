/**
 * Animaciones de entrada con el scroll (pedido de Santiago, 24 nov 2026). El hero no se anima.
 *
 * Marcado (en los componentes):
 * - `data-reveal` en la sección: dispara cuando su borde superior llega al 85% del viewport.
 * - `data-reveal-item="text"`: el texto se divide en líneas (SplitText) y cada línea sube
 *   desde abajo con máscara, de arriba hacia abajo. Las líneas se recalculan solas según el
 *   ancho de pantalla (autoSplit).
 * - `data-reveal-item="slide"`: el elemento sube suave desde abajo.
 * - `data-reveal-item="group"`: los hijos del elemento suben juntos, en una sola animación.
 * Dentro de una sección los items van en orden del DOM (izquierda antes que derecha), con un
 * escalón de STEP segundos; solo cuentan los visibles (en mobile hay listas que en escritorio
 * están ocultas y al revés).
 *
 * Los estados iniciales se aplican al cargar (debajo del preloader); los disparadores se crean
 * cuando el preloader termina, para que nada se anime mientras está tapado.
 * Con "reducir movimiento" no hay animaciones.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { whenPreloaderDone } from '@/scripts/preloader';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Separación entre items de una misma sección, en segundos. */
const STEP = 0.1;
const EASE = 'power3.out';

interface Entry {
  el: HTMLElement;
  anim?: gsap.core.Animation;
  started: boolean;
}

export function initReveals() {
  // Se decide una sola vez al cargar (gsap.matchMedia revertía y rehacía todo ante eventos
  // de cambio del media query, y las entradas quedaban a medias).
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];

    const controllers = sections.map((section) => {
      const elements = [
        ...(section.hasAttribute('data-reveal-item') ? [section] : []),
        ...section.querySelectorAll<HTMLElement>('[data-reveal-item]'),
      ];

      const entries: Entry[] = elements.map((el) => {
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
              return entry.anim;
            },
          });
        } else {
          const targets = kind === 'group' ? [...el.children] : el;
          entry.anim = gsap.from(targets, {
            y: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: EASE,
            paused: true,
          });
        }
        return entry;
      });

      const play = () => {
        const visible = entries.filter((e) => e.el.getClientRects().length > 0);
        // Los ocultos (p. ej. la lista de mobile en escritorio) quedan en su estado final.
        entries
          .filter((e) => !visible.includes(e))
          .forEach((e) => {
            e.started = true;
            e.anim?.progress(1);
          });
        visible.forEach((e, k) =>
          gsap.delayedCall(k * STEP, () => {
            e.started = true;
            e.anim?.play();
          }),
        );
      };

      return { section, play };
    });

    whenPreloaderDone().then(() => {
      controllers.forEach(({ section, play }) =>
        ScrollTrigger.create({ trigger: section, start: 'top 85%', once: true, onEnter: play }),
      );
      ScrollTrigger.refresh();
    });
  }
}
