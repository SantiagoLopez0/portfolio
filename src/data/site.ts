// Contenido provisional mientras no existen los schemas de Sanity (siteSettings / home).
// Todo el texto de la página sale de aquí o de Sanity, nunca escrito dentro de los componentes.
// Cuando se cree el singleton correspondiente, estos datos se reemplazan por consultas GROQ.

export const site = {
  name: 'Santiago López',
  /** Links del centro del header. El resto de secciones vive en el menú. */
  primaryNav: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
};

export type HeroTagPlacement =
  'top-left' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right';

export interface HeroTag {
  label: string;
  variant?: 'default' | 'accent' | 'alt';
  placement: HeroTagPlacement;
  /** Rotación del sticker, de -6 a 6 grados (design system → Tag). */
  rotate: number;
}

export const hero = {
  /** H1 en dos líneas: la primera arriba a la izquierda, la segunda abajo a la derecha. Texto final por definir. */
  titleLines: ['Web', 'Developer'] as [string, string],
  /** Tags provisionales alrededor del H1. */
  tags: [
    { label: 'Webflow', placement: 'top-left', rotate: -6 },
    { label: 'Next.js', placement: 'top-right', rotate: 5 },
    { label: 'Astro + Sanity', placement: 'middle-left', rotate: 4 },
    { label: 'Colombia', placement: 'middle-right', rotate: -4 },
    { label: 'GSAP', placement: 'bottom-left', rotate: -3 },
    { label: 'Disponible', variant: 'accent', placement: 'bottom-right', rotate: 6 },
  ] satisfies HeroTag[],
  /** Línea de apoyo: propuesta de valor (provisional). */
  lead: 'Diseño y desarrollo sitios web rápidos, editables y con movimiento, en Webflow, Next.js y Astro.',
  scrollLabel: 'Scroll',
  scrollHref: '#work',
  /** Fondo: imagen o video (pendiente). Sin media, el hero queda sobre surface-base. */
  media: null as null | { type: 'image' | 'video'; src: string; poster?: string; alt?: string },
};
