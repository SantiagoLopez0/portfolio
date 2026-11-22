/**
 * About: contenido provisional (Santiago aún no define el dato grande ni los textos).
 * Los textos entre corchetes son huecos del wireframe por llenar. Cuando exista el
 * singleton `home` en Sanity (dato grande, bloques INFO, foto), esto se reemplaza por una
 * consulta GROQ; el componente ya recibe el contenido desde fuera.
 */
import type { ImageMetadata } from 'astro';

export interface AboutBlock {
  label: string;
  text: string;
}

export const about = {
  title: 'About',
  /** Foto vertical (retrato, escritorio o detalle). null = placeholder. */
  photo: null as { src: ImageMetadata; alt: string } | null,
  stat: {
    label: '[Key figure: age, years or projects]',
    value: '16',
  },
  infoTitle: 'Info',
  blocks: [
    {
      label: '[Profile]',
      text: '[Short bio: who you are, where you are based and how you work with clients and teams.]',
    },
    { label: '[Stack]', text: 'Webflow, Next.js, Astro, Sanity, GSAP' },
    {
      label: '[Achievements]',
      text: '[Awards, features or results worth highlighting.]',
    },
    { label: '[Languages]', text: '[Languages]' },
  ] satisfies AboutBlock[],
};
