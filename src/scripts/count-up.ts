/**
 * Contador: anima un número desde 0 hasta el valor del atributo `data-count-up` cuando el
 * elemento entra en pantalla (una sola vez). Conserva los dígitos del valor final con
 * ceros a la izquierda ("16" → 00, 01, … 16). El HTML ya trae el valor final: sin JS o
 * con "reducir movimiento" no se anima y se queda así.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DURATION = 1.6;

export function initCountUp(el: HTMLElement) {
  const target = Number.parseInt(el.dataset.countUp ?? '', 10);
  if (!Number.isFinite(target)) return;
  const digits = (el.dataset.countUp ?? '').length;
  const format = (value: number) => String(Math.round(value)).padStart(digits, '0');

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const counter = { value: 0 };
    el.textContent = format(0);

    const tween = gsap.to(counter, {
      value: target,
      duration: DURATION,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => {
        el.textContent = format(counter.value);
      },
    });

    // Arranca cuando el número entra en pantalla (borde superior al 85% del viewport).
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      tween.kill();
      el.textContent = format(target);
    };
  });
}
