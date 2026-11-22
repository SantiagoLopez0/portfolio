/**
 * Smooth scroll global con Lenis (decisión de Santiago, 22 nov 2026), con sus valores
 * por defecto de suavizado. Ajustes necesarios para integrarlo:
 * - Lenis corre en el ticker de GSAP (no con autoRaf) y avisa a ScrollTrigger en cada
 *   scroll, para que las animaciones atadas al scroll (pila de Selected work) vayan
 *   sincronizadas con el scroll suavizado.
 * - anchors: Lenis maneja los links a #secciones (respeta scroll-padding-top del header fijo).
 * Con "reducir movimiento" no se inicia: queda el scroll nativo.
 * Para zonas con scroll propio (popup de case study, overlay del menú) usar el atributo
 * data-lenis-prevent en el contenedor. Otros scripts importan `lenis` desde aquí
 * (p. ej. para detenerlo con lenis.stop() mientras un popup está abierto).
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis: Lenis | null = reducedMotion ? null : new Lenis({ anchors: true });

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
