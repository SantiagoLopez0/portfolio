/**
 * Contact + Footer: contenido provisional. Los textos entre corchetes y los `href` vacíos
 * son huecos por llenar (correo, link de agenda, redes). Cuando exista el singleton
 * `siteSettings` en Sanity, esto se reemplaza por una consulta GROQ.
 */
import { showProcess } from '@/data/process';

export const contact = {
  availability: 'Available for new projects',
  title: 'Have a project in mind?',
  /** Correo de contacto. Vacío = placeholder (el link apunta a #contact). */
  email: '',
  emailPlaceholder: '[email@domain.com]',
  primaryCta: { label: 'Email me' },
  /** Link de agenda (Cal.com, Calendly...). Vacío = placeholder. */
  secondaryCta: { label: 'Book a call', href: '' },
};

export const footer = {
  role: 'Web Developer · Colombia',
  /** Zona horaria de la hora local del footer. */
  timeZone: 'America/Bogota',
  timeLabel: 'Bogotá',
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    ...(showProcess ? [{ label: 'Process', href: '#process' }] : []),
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ],
  /** Redes. `href` vacío = aún sin link (se muestra como texto). */
  socials: [
    { label: 'LinkedIn', href: '' },
    { label: 'GitHub', href: '' },
  ],
  backToTop: { label: 'Back to top', href: '#hero' },
};
