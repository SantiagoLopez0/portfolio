/**
 * Preloader: la animación es la del HTML original ("preloader/Preloader SL.html"). La entrada
 * del nombre conserva sus tiempos; lo que sigue va más rápido (ajuste de Santiago, 24 nov
 * 2026: máximo ~500ms para quedar en "SL" y ~500ms para partirse en dos). Al terminar de partirse en dos, se quita del DOM, se
 * desbloquea el scroll y se avisa con el evento `preloader:done` (y `data-preloaded` en
 * <html>). Con "reducir movimiento" se salta y avisa de inmediato.
 */
import { lenis } from '@/scripts/smooth-scroll';

export const PRELOADER_DONE = 'preloader:done';

/** Resuelve cuando el preloader terminó (o si no hay preloader). */
export function whenPreloaderDone(): Promise<void> {
  if (document.documentElement.dataset.preloaded === 'true') return Promise.resolve();
  return new Promise((resolve) =>
    window.addEventListener(PRELOADER_DONE, () => resolve(), { once: true }),
  );
}

function finish(stage: HTMLElement | null) {
  stage?.remove();
  document.documentElement.style.removeProperty('overflow');
  lenis?.start();
  document.documentElement.dataset.preloaded = 'true';
  window.dispatchEvent(new Event(PRELOADER_DONE));
}

export function runPreloader() {
  const stage = document.querySelector<HTMLElement>('[data-preloader]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!stage || reduced) {
    finish(stage);
    return;
  }

  // Siempre empieza arriba (si no, el navegador restaura el scroll de la visita anterior).
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  document.documentElement.style.overflow = 'hidden';
  lenis?.stop();

  const halfTop = stage.querySelector<HTMLElement>('.half.top')!;
  const halfBottom = stage.querySelector<HTMLElement>('.half.bottom')!;

  // Cada mitad lleva su propia copia del logo, animadas en sincronía
  const logos = [...stage.querySelectorAll<HTMLElement>('[data-logo]')].map((layer) => {
    layer.innerHTML = `
      <div class="logo" aria-hidden="true">
        <div class="row" data-text="Santiago"></div>
        <div class="row" data-text="López"></div>
      </div>`;
    const root = layer.firstElementChild as HTMLElement;
    const rows = [...root.querySelectorAll<HTMLElement>('.row')];
    rows.forEach((row) => {
      row.innerHTML = [...(row.dataset.text ?? '')]
        .map(
          (ch, i) =>
            `<span class="c${i === 0 ? ' keep' : ''}"><span class="in">${ch}${i === 0 ? '<i class="bl"></i>' : ''}</span></span>`,
        )
        .join('');
    });
    return {
      root,
      rows,
      all: [...root.querySelectorAll<HTMLElement>('.c')],
      keeps: [...root.querySelectorAll<HTMLElement>('.c.keep')],
      others: [...root.querySelectorAll<HTMLElement>('.c:not(.keep)')],
    };
  });

  const inner = (c: HTMLElement) => c.firstElementChild as HTMLElement;
  const EASE_IN_OUT = 'cubic-bezier(.76,0,.24,1)';
  const EASE_OUT = 'cubic-bezier(.16,1,.3,1)';
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const A = (el: HTMLElement, kf: Keyframe[], opts: KeyframeAnimationOptions) =>
    el.animate(kf, { fill: 'both', ...opts }).finished;

  const setH = () => stage.style.setProperty('--h', stage.clientHeight + 'px');
  window.addEventListener('resize', setH);

  async function run() {
    const family = getComputedStyle(logos[0].root).fontFamily;
    try {
      await document.fonts.load(`700 100px ${family}`);
    } catch {
      /* si la fuente falla, sigue con la de respaldo */
    }
    await document.fonts.ready;
    setH();

    // 1 · Entrada: letras suben con stagger
    await Promise.all(
      logos.flatMap((l) =>
        l.all.map((c, i) =>
          A(inner(c), [{ transform: 'translateY(115%)' }, { transform: 'translateY(0)' }], {
            duration: 900,
            delay: i * 45,
            easing: EASE_OUT,
          }),
        ),
      ),
    );
    await sleep(300);

    // Medición (sin layout animado: todo se mueve solo con transform, sin vibración)
    const L0 = logos[0];
    const em = parseFloat(getComputedStyle(L0.root).fontSize);
    const cx = halfTop.clientWidth / 2;
    const cy = window.innerHeight / 2;
    const rS = L0.keeps[0].getBoundingClientRect();
    const rL = L0.keeps[1].getBoundingClientRect();
    const yS = L0.keeps[0].querySelector('.bl')!.getBoundingClientRect().bottom; // línea base S
    const yL = L0.keeps[1].querySelector('.bl')!.getBoundingClientRect().bottom; // línea base L
    const ctx = document.createElement('canvas').getContext('2d')!;
    ctx.font = `700 ${em}px ${family}`;
    const sBottom = yS + ctx.measureText('S').actualBoundingBoxDescent;
    const lTop = yL - ctx.measureText('L').actualBoundingBoxAscent;
    const gap = Math.max(em * 0.035, 5); // espacio a cada lado del corte
    const dx = em * 0.27; // diagonal horizontal
    const t1 = { x: cx - dx - (rS.left + rS.width / 2), y: cy - gap - sBottom }; // S → arriba-izquierda
    const t2 = { x: cx + dx - (rL.left + rL.width / 2), y: cy + gap - lTop }; // L → abajo-derecha

    // 2 · Las demás letras se desvanecen en su sitio; S y L se deslizan juntas
    // Original: FADE 650, MOVE 1300, MOVE_DELAY 250, stagger 25ms (~1.55s). Ahora ~500ms.
    const FADE = 300;
    const MOVE = 500;
    const MOVE_DELAY = 0;
    const tasks: Promise<Animation>[] = [];
    logos.forEach((l) => {
      l.others.forEach((c, i) => {
        tasks.push(
          A(
            inner(c),
            [
              { opacity: 1, filter: 'blur(0px)' },
              { opacity: 0, filter: 'blur(6px)' },
            ],
            { duration: FADE, delay: i * 15, easing: 'ease-in' },
          ),
        );
      });
      [t1, t2].forEach((t, k) => {
        tasks.push(
          A(
            l.keeps[k],
            [{ transform: 'translate(0,0)' }, { transform: `translate(${t.x}px,${t.y}px)` }],
            { duration: MOVE, delay: MOVE_DELAY, easing: EASE_IN_OUT },
          ),
        );
      });
    });
    await Promise.all(tasks);
    await sleep(250);

    // 3 · Salida: el fondo se parte en dos, arriba sube y abajo baja, y se ve el sitio
    await Promise.all([
      A(halfTop, [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], {
        duration: 500,
        easing: EASE_IN_OUT,
      }),
      A(halfBottom, [{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }], {
        duration: 500,
        easing: EASE_IN_OUT,
      }),
    ]);
  }

  run()
    .catch(() => {
      /* ante cualquier error, el sitio no puede quedar tapado */
    })
    .finally(() => {
      window.removeEventListener('resize', setH);
      finish(stage);
    });
}
