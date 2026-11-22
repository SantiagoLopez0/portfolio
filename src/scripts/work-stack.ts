/**
 * Selected work: cards que se apilan al hacer scroll (pedido de Santiago, 22 nov 2026).
 * - Cada card es `position: sticky` (CSS en Work.astro) y todas se pegan en el mismo
 *   punto, así la que llega tapa por completo a la anterior.
 * - Mientras la card siguiente sube, la de abajo se encoge hacia su centro hasta
 *   STACK_SCALE y queda escondida detrás (ajuste de Santiago: las cards encogidas no
 *   deben verse, para no quitarle atención a la card activa). Va atada al scroll (scrub).
 * Con "reducir movimiento" no hay sticky ni escala: las cards quedan en lista.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Escala final de una card tapada: 0.5 = se encoge un 50%. */
const STACK_SCALE = 0.5;

export function initWorkStack(list: HTMLElement) {
  const cards = gsap.utils.toArray<HTMLElement>('[data-work-card]', list);
  if (cards.length < 2) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /**
     * Posiciones en flujo normal (sin el desplazamiento del sticky), medidas desde la
     * lista: la posición en pantalla de una card pegada no sirve para calcular el scroll.
     */
    const layout = () => {
      const listTop = list.getBoundingClientRect().top + window.scrollY;
      const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
      let top = listTop;
      return cards.map((card) => {
        const item = {
          top,
          height: card.offsetHeight,
          stickyTop: parseFloat(getComputedStyle(card).top) || 0,
        };
        top += item.height + gap;
        return item;
      });
    };

    // Se vuelven a medir antes de cada refresh de ScrollTrigger (resize, carga de fuentes).
    let positions = layout();
    const measure = () => (positions = layout());
    ScrollTrigger.addEventListener('refreshInit', measure);

    cards.slice(0, -1).forEach((card, i) => {
      gsap.fromTo(
        card,
        { scale: 1 },
        {
          scale: STACK_SCALE,
          ease: 'none',
          transformOrigin: '50% 50%',
          scrollTrigger: {
            // Empieza cuando la card siguiente llega al borde inferior de esta (ya pegada)
            // y termina cuando la siguiente se pega en su sitio.
            start: () => positions[i + 1].top - positions[i].stickyTop - positions[i].height,
            end: () => positions[i + 1].top - positions[i + 1].stickyTop,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', measure);
      gsap.set(cards, { clearProps: 'transform' });
    };
  });
}
