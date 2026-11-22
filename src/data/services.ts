/**
 * What I do: servicios de la lista (provisional). Cuando exista el tipo `service` en
 * Sanity (nombre, descripción corta, media de fondo opcional, orden), esto se reemplaza
 * por una consulta GROQ; el componente ya recibe la lista desde fuera.
 */
export interface Service {
  name: string;
  description: string;
}

export const servicesTitle = 'What I do';

export const services: Service[] = [
  {
    name: 'Webflow',
    description:
      'Marketing sites your team can edit on their own: clean CMS structure, reusable components and interactions built in.',
  },
  {
    name: 'Next.js',
    description:
      'Fast, custom front ends for products and content-heavy sites, connected to the CMS and tools you already use.',
  },
  {
    name: 'Astro + Sanity',
    description:
      'Lightweight sites with a flexible content model: static pages that load instantly and a Studio built around your content.',
  },
  {
    name: 'GSAP & animation',
    description:
      'Motion that supports the story: scroll-driven sections, page transitions and micro-interactions that stay smooth.',
  },
  {
    name: 'CRO & SEO',
    description:
      'Technical SEO, Core Web Vitals and testable landing pages, so the site brings in and converts the right traffic.',
  },
];
