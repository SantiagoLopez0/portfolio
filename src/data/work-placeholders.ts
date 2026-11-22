/**
 * Contenido provisional de Selected work (Santiago, 22 nov 2026: "info placeholder por
 * ahora"). Se usa solo mientras no haya proyectos publicados en Sanity; en cuanto exista
 * uno, el sitio muestra los de Sanity y esto deja de usarse.
 */
import type { WorkItem } from '@/lib/work';

let key = 0;
const span = (text: string) => ({ _type: 'span' as const, _key: `s${++key}`, text, marks: [] });
const block = (text: string, style: 'normal' | 'h3' = 'normal') => ({
  _type: 'block' as const,
  _key: `b${++key}`,
  style,
  markDefs: [],
  children: [span(text)],
});
const bullet = (text: string) => ({ ...block(text), listItem: 'bullet' as const, level: 1 });

const body = (challenge: string, solution: string, results: string[]) => [
  block('The challenge', 'h3'),
  block(challenge),
  block('What I built', 'h3'),
  block(solution),
  block('Results', 'h3'),
  ...results.map(bullet),
];

const base = { cover: null, gallery: null, liveUrl: null };

export const workPlaceholders: WorkItem[] = [
  {
    ...base,
    _id: 'placeholder-1',
    title: 'Project name',
    slug: 'project-one',
    year: 2026,
    tags: ['Webflow', 'GSAP', 'CMS'],
    client: 'Client name',
    role: 'Design & development',
    summary:
      'Placeholder summary. One or two lines about the client, what the site needed to do and the outcome.',
    body: body(
      'Placeholder text. What the client needed and why the old site was getting in the way.',
      'Placeholder text. The stack, the key decisions and the parts that make this project stand out.',
      ['Placeholder result one', 'Placeholder result two'],
    ),
  },
  {
    ...base,
    _id: 'placeholder-2',
    title: 'Project name',
    slug: 'project-two',
    year: 2026,
    tags: ['Next.js', 'Sanity'],
    client: 'Client name',
    role: 'Development',
    summary:
      'Placeholder summary. One or two lines about the client, what the site needed to do and the outcome.',
    body: body(
      'Placeholder text. What the client needed and why the old site was getting in the way.',
      'Placeholder text. The stack, the key decisions and the parts that make this project stand out.',
      ['Placeholder result one', 'Placeholder result two'],
    ),
  },
  {
    ...base,
    _id: 'placeholder-3',
    title: 'Project name',
    slug: 'project-three',
    year: 2025,
    tags: ['Astro', 'Sanity', 'SEO'],
    client: 'Client name',
    role: 'Design & development',
    summary:
      'Placeholder summary. One or two lines about the client, what the site needed to do and the outcome.',
    body: body(
      'Placeholder text. What the client needed and why the old site was getting in the way.',
      'Placeholder text. The stack, the key decisions and the parts that make this project stand out.',
      ['Placeholder result one', 'Placeholder result two'],
    ),
  },
  {
    ...base,
    _id: 'placeholder-4',
    title: 'Project name',
    slug: 'project-four',
    year: 2025,
    tags: ['Webflow', 'CRO'],
    client: 'Client name',
    role: 'Development',
    summary:
      'Placeholder summary. One or two lines about the client, what the site needed to do and the outcome.',
    body: body(
      'Placeholder text. What the client needed and why the old site was getting in the way.',
      'Placeholder text. The stack, the key decisions and the parts that make this project stand out.',
      ['Placeholder result one', 'Placeholder result two'],
    ),
  },
];
