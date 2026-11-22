// Logos de "Websites delivered for" (provisional hasta el schema `client` en Sanity).
// Los archivos de src/assets/logos ya vienen convertidos a blanco (y grises donde hace falta)
// sobre fondo transparente; ver CLAUDE.md → "Logos". No aplicarles filtros CSS.
import type { ImageMetadata } from 'astro';

import benorMedia from '@/assets/logos/benor-media.svg';
import candybox from '@/assets/logos/candybox.png';
import foundersMakers from '@/assets/logos/founders-makers.png';
import garaje from '@/assets/logos/garaje.png';
import matchday from '@/assets/logos/matchday.svg';
import orchestra from '@/assets/logos/orchestra.svg';
import subject from '@/assets/logos/subject.svg';
import surfe from '@/assets/logos/surfe.svg';
import talkpush from '@/assets/logos/talkpush.svg';
import twentySevenZero from '@/assets/logos/27zero.svg';
import unit21 from '@/assets/logos/unit21.svg';

export interface ClientLogo {
  name: string;
  logo: ImageMetadata;
  /** Ajuste óptico opcional sobre la altura calculada (1 = sin cambio). */
  scale?: number;
}

export const clientsLabel = 'Websites delivered for';

export const clients: ClientLogo[] = [
  { name: 'BenorMedia', logo: benorMedia },
  { name: 'Founders & Makers', logo: foundersMakers },
  { name: 'Garaje', logo: garaje },
  { name: 'Matchday', logo: matchday },
  { name: 'Orchestra', logo: orchestra },
  { name: 'Subject', logo: subject },
  { name: 'Talkpush', logo: talkpush },
  { name: 'Candybox', logo: candybox },
  { name: '27zero', logo: twentySevenZero },
  { name: 'Unit21.ai', logo: unit21 },
  { name: 'Surfe', logo: surfe },
];
