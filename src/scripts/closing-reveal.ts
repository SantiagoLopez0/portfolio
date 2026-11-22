/**
 * Contact + Footer como tarjeta (pedido de Santiago, 22 nov 2026): mientras la tarjeta
 * sube, la última sección de <main> baja más despacio que el scroll, así parece que se
 * queda atrás, por debajo de la tarjeta. Solo se desplaza: no se encoge (ajuste de
 * Santiago). Atado al scroll (scrub).
 * Sin efecto con "reducir movimiento".
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Parte del recorrido de la tarjeta que la sección de atrás "acompaña" hacia abajo. */
const LAG = 0.5;

export function initClosingReveal(card: HTMLElement) {
  // La última <section> de <main> (el último hijo puede ser un <script> de Astro).
  const main = card.previousElementSibling;
  const sections = main ? main.querySelectorAll<HTMLElement>(':scope > section') : [];
  const behind = sections[sections.length - 1];
  if (!behind) return;

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(
      behind,
      { y: 0 },
      {
        // Desde que la tarjeta asoma abajo hasta que la página llega al final.
        y: () => Math.min(card.offsetHeight, window.innerHeight) * LAG,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    return () => gsap.set(behind, { clearProps: 'transform' });
  });
}
