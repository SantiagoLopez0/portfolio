/**
 * Física de los tags del hero (decisión de Santiago, 22 nov 2026):
 * - Hover: al tocar el borde de un tag con el cursor, sale empujado en la dirección
 *   del contacto (más lejos cuanto más rápido va el mouse) y vuelve a su lugar con rebote.
 *   Si el cursor llega lento (para agarrarlo), solo se sacude en su sitio: así se puede arrastrar.
 * - Drag: se puede agarrar y lanzar con inercia dentro del hero; al soltarlo, vuelve
 *   a su posición tras una pausa para que el H1 nunca quede tapado.
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
/** Por debajo de esta velocidad (px/ms) el cursor "quiere agarrar": sin empujón, solo sacudida. */
const GRAB_SPEED = 0.35;
/** Giro de la sacudida al llegar lento, en grados. */
const WIGGLE_ROTATION = 6;
/** Pausa antes de volver a casa después de un drag, en segundos. */
const RETURN_DELAY = 0.8;

function returnHome(el: HTMLElement, delay = 0) {
  return gsap.to(el, {
    x: 0,
    y: 0,
    rotation: 0,
    delay,
    duration: 1.4,
    ease: 'elastic.out(1, 0.45)',
    overwrite: 'auto',
  });
}

export function initHeroTags(stage: HTMLElement, bounds: HTMLElement) {
  const tags = gsap.utils.toArray<HTMLElement>('[data-hero-tag]', stage);
  if (!tags.length) return;

  const mm = gsap.matchMedia();

  mm.add(ENABLED_QUERY, () => {
    // Velocidad del cursor (px/ms) para graduar el empujón.
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();
    let vx = 0;
    let vy = 0;

    const trackPointer = (event: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      vx = (event.clientX - lastX) / dt;
      vy = (event.clientY - lastY) / dt;
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };
    window.addEventListener('pointermove', trackPointer, { passive: true });

    const cleanups = tags.map((el) => {
      const [draggable] = Draggable.create(el, {
        type: 'x,y',
        inertia: true,
        bounds,
        edgeResistance: 0.75,
        zIndexBoost: true,
        onPress() {
          gsap.killTweensOf(el);
        },
        onRelease() {
          // Sin lanzamiento (soltó quieto): vuelve directamente.
          if (!this.isThrowing) returnHome(el, RETURN_DELAY);
        },
        onThrowComplete() {
          returnHome(el, RETURN_DELAY);
        },
      });

      const push = (event: PointerEvent) => {
        if (draggable.isPressed || draggable.isThrowing) return;

        const speed = Math.hypot(vx, vy);

        // Cursor lento = intención de agarrar: el tag solo se sacude en su sitio,
        // así no se escapa de la mano. Cursor rápido = empujón.
        if (speed < GRAB_SPEED) {
          gsap.killTweensOf(el);
          gsap
            .timeline()
            .to(el, {
              rotation: gsap.utils.random([-1, 1]) * WIGGLE_ROTATION,
              duration: 0.15,
              ease: 'power2.out',
            })
            .add(returnHome(el));
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
        const x = (gsap.getProperty(el, 'x') as number) + (dx / length) * distance;
        const y = (gsap.getProperty(el, 'y') as number) + (dy / length) * distance;

        gsap.killTweensOf(el);
        gsap
          .timeline()
          .to(el, {
            x,
            y,
            rotation: gsap.utils.random(-PUSH_ROTATION, PUSH_ROTATION),
            duration: 0.35,
            ease: 'power3.out',
          })
          .add(returnHome(el));
      };

      el.addEventListener('pointerenter', push);

      return () => {
        el.removeEventListener('pointerenter', push);
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
