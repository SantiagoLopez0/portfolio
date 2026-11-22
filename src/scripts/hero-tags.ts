/**
 * Física de los tags del hero (decisiones de Santiago, 22 nov 2026):
 * - Hover: si el cursor pasa rápido y toca un tag, sale empujado en la dirección del
 *   contacto (más lejos cuanto más rápido va el mouse) y vuelve a su lugar suave, sin rebote.
 *   Si el cursor llega a velocidad normal o lenta (para agarrarlo), solo se sacude en su sitio.
 * - Drag: se puede agarrar y lanzar con inercia dentro del hero; al soltarlo (o al terminar
 *   la inercia) vuelve de inmediato a su posición, sin pausa ni rebote.
 * Solo en dispositivos con mouse y sin "reducir movimiento". En touch los tags quedan quietos.
 */
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const ENABLED_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Empujón mínimo y máximo del hover, en px. */
const PUSH_MIN = 24;
const PUSH_MAX = 110;
/** px de empujón por cada px/ms de velocidad del cursor. */
const PUSH_PER_SPEED = 60;
/** Giro máximo extra del empujón, en grados. */
const PUSH_ROTATION = 10;
/**
 * Velocidad (px/ms) a partir de la cual el hover empuja. Por debajo, el cursor
 * "quiere agarrar" y el tag solo se sacude. 0.6 px/ms ≈ cruzar 600px en un segundo.
 */
const PUSH_SPEED = 0.6;
/** Giro de la sacudida, en grados. */
const WIGGLE_ROTATION = 6;
/** Duración máxima del lanzamiento con inercia al soltar, en segundos. */
const THROW_MAX = 0.35;
/** Regreso a casa: suave, sin rebote. */
const RETURN_DURATION = 0.6;
const RETURN_EASE = 'power3.out';

// Medición de la velocidad del cursor.
/** Si el mouse no se movió en este tiempo (ms), se considera quieto: velocidad 0. */
const IDLE_AFTER = 60;
/** Intervalo mínimo entre muestras (ms): evita picos cuando el navegador agrupa eventos. */
const MIN_SAMPLE_DT = 8;
/** Suavizado de la velocidad (0–1): peso de la muestra nueva. */
const SMOOTHING = 0.35;

function returnHome(el: HTMLElement) {
  return gsap.to(el, {
    x: 0,
    y: 0,
    rotation: 0,
    duration: RETURN_DURATION,
    ease: RETURN_EASE,
    overwrite: 'auto',
  });
}

export function initHeroTags(stage: HTMLElement, bounds: HTMLElement) {
  const tags = gsap.utils.toArray<HTMLElement>('[data-hero-tag]', stage);
  if (!tags.length) return;

  const mm = gsap.matchMedia();

  mm.add(ENABLED_QUERY, () => {
    // Velocidad suavizada del cursor (px/ms).
    let lastX = 0;
    let lastY = 0;
    let lastSample = 0;
    let lastMove = 0;
    let vx = 0;
    let vy = 0;

    const trackPointer = (event: PointerEvent) => {
      const now = performance.now();
      lastMove = now;
      const dt = now - lastSample;
      if (dt < MIN_SAMPLE_DT) return;
      // Tras una pausa larga, empieza de cero en vez de arrastrar la velocidad vieja.
      const fresh = dt > IDLE_AFTER || lastSample === 0;
      const ix = fresh ? 0 : (event.clientX - lastX) / dt;
      const iy = fresh ? 0 : (event.clientY - lastY) / dt;
      vx = fresh ? ix : vx + (ix - vx) * SMOOTHING;
      vy = fresh ? iy : vy + (iy - vy) * SMOOTHING;
      lastX = event.clientX;
      lastY = event.clientY;
      lastSample = now;
    };
    window.addEventListener('pointermove', trackPointer, { passive: true });

    /** Velocidad actual: 0 si el mouse está quieto. */
    const currentSpeed = () => (performance.now() - lastMove > IDLE_AFTER ? 0 : Math.hypot(vx, vy));

    const cleanups = tags.map((el) => {
      const [draggable] = Draggable.create(el, {
        type: 'x,y',
        inertia: true,
        // Lanzamiento corto: el regreso empieza casi al soltar.
        minDuration: 0,
        maxDuration: THROW_MAX,
        bounds,
        edgeResistance: 0.75,
        zIndexBoost: true,
        onPress() {
          gsap.killTweensOf(el);
        },
        onRelease() {
          // Sin lanzamiento (soltó quieto): vuelve ya.
          if (!this.isThrowing) returnHome(el);
        },
        onThrowComplete() {
          returnHome(el);
        },
      });

      const onEnter = (event: PointerEvent) => {
        if (draggable.isPressed || draggable.isThrowing) return;
        // Mientras el tag se mueve (empujón o regreso) no reacciona: evita que,
        // al volver y pasar bajo un cursor quieto, salga empujado otra vez.
        if (gsap.isTweening(el)) return;

        const speed = currentSpeed();

        // Velocidad normal o lenta: intención de agarrar. Solo una sacudida en su sitio.
        if (speed < PUSH_SPEED) {
          gsap
            .timeline()
            .to(el, {
              rotation: gsap.utils.random([-1, 1]) * WIGGLE_ROTATION,
              duration: 0.15,
              ease: 'power2.out',
            })
            .to(el, { rotation: 0, duration: 0.35, ease: RETURN_EASE });
          return;
        }

        const rect = el.getBoundingClientRect();
        let dx = rect.left + rect.width / 2 - event.clientX;
        let dy = rect.top + rect.height / 2 - event.clientY;
        let length = Math.hypot(dx, dy);

        // Entró justo por el centro: usa la dirección del movimiento del cursor.
        if (length < 1) {
          dx = vx;
          dy = vy;
          length = Math.hypot(dx, dy) || 1;
        }

        const distance = gsap.utils.clamp(PUSH_MIN, PUSH_MAX, speed * PUSH_PER_SPEED);

        gsap
          .timeline()
          .to(el, {
            x: (dx / length) * distance,
            y: (dy / length) * distance,
            rotation: gsap.utils.random(-PUSH_ROTATION, PUSH_ROTATION),
            duration: 0.35,
            ease: 'power3.out',
          })
          .to(el, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: RETURN_DURATION,
            ease: 'power2.inOut',
          });
      };

      el.addEventListener('pointerenter', onEnter);

      return () => {
        el.removeEventListener('pointerenter', onEnter);
        draggable.kill();
      };
    });

    return () => {
      window.removeEventListener('pointermove', trackPointer);
      cleanups.forEach((cleanup) => cleanup());
      gsap.killTweensOf(tags);
      gsap.set(tags, { clearProps: 'transform,zIndex' });
    };
  });
}
