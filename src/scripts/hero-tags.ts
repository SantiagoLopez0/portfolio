/**
 * Tags del hero con drag and drop libre (decisión de Santiago, 22 nov 2026):
 * - Sin animación en hover.
 * - Se arrastran y se lanzan con una inercia corta dentro del área del H1 (entre el
 *   header y la línea de apoyo, dentro de los márgenes de la página), y se quedan
 *   donde caen (no vuelven a su posición inicial). Al recargar, vuelven a su sitio.
 * Solo en dispositivos con mouse y sin "reducir movimiento". En touch los tags quedan
 * quietos para no interferir con el scroll.
 */
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const ENABLED_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Duración máxima del deslizamiento por inercia al soltar, en segundos. */
const THROW_MAX = 0.35;

export function initHeroTags(stage: HTMLElement) {
  const tags = gsap.utils.toArray<HTMLElement>('[data-hero-tag]', stage);
  if (!tags.length) return;

  const mm = gsap.matchMedia();

  mm.add(ENABLED_QUERY, () => {
    const draggables = Draggable.create(tags, {
      type: 'x,y',
      inertia: true,
      minDuration: 0,
      maxDuration: THROW_MAX,
      // Límite: el escenario del H1. Así no tapan el header ni la línea de apoyo.
      bounds: stage,
      edgeResistance: 0.75,
      // El último tag arrastrado queda por encima de los demás y del H1.
      zIndexBoost: true,
    });

    return () => {
      draggables.forEach((draggable) => draggable.kill());
      gsap.killTweensOf(tags);
      gsap.set(tags, { clearProps: 'transform,zIndex' });
    };
  });
}
