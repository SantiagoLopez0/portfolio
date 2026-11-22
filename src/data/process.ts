/**
 * Process: 4 pasos (contenido provisional). Santiago no tiene contenido todavía y puede
 * trabajarla después del lanzamiento (22 nov 2026), por eso la sección está oculta con
 * `showProcess`. Para mostrarla: poner `true` (y añadir "Process" al overlay del menú).
 * Cuando exista el tipo `processStep` en Sanity, esto se reemplaza por una consulta GROQ.
 */
export interface ProcessStep {
  title: string;
  description: string;
}

/** Oculta la sección Process en la home hasta que haya contenido. */
export const showProcess = false;

export const processTitle = 'Process';

export const processSteps: ProcessStep[] = [
  {
    title: 'Discovery',
    description: 'Placeholder text. Goals, audience and scope, and what the site needs to do.',
  },
  {
    title: 'Design',
    description: 'Placeholder text. Structure, content and the visual direction of the site.',
  },
  {
    title: 'Build',
    description: 'Placeholder text. Development, CMS setup, motion and performance.',
  },
  {
    title: 'Launch',
    description: 'Placeholder text. QA, SEO, go-live and handoff so your team can run it.',
  },
];
