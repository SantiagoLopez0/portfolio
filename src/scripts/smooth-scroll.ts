/**
 * Smooth scroll global con Lenis (decisión de Santiago, 22 nov 2026), con sus valores
 * por defecto de suavizado. Ajustes necesarios para integrarlo:
 * - autoRaf: Lenis corre su propio loop de requestAnimationFrame.
 * - anchors: Lenis maneja los links a #secciones (respeta scroll-padding-top del header fijo).
 * Con "reducir movimiento" no se inicia: queda el scroll nativo.
 * Para zonas con scroll propio (popup de case study, overlay del menú) usar el atributo
 * data-lenis-prevent en el contenedor. Otros scripts importan `lenis` desde aquí
 * (p. ej. para detenerlo con lenis.stop() mientras un popup está abierto).
 */
import Lenis from 'lenis';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis: Lenis | null = reducedMotion
  ? null
  : new Lenis({ autoRaf: true, anchors: true });
