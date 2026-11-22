/**
 * FAQ: borrador de preguntas y respuestas (el contenido real lo define Santiago). Cuando
 * exista el tipo `faq` en Sanity (pregunta, respuesta, orden), esto se reemplaza por una
 * consulta GROQ; el componente ya recibe la lista desde fuera.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}

export const faq = {
  title: 'FAQ',
  intro: 'Quick answers about how I work. If yours is not here, just ask.',
  cta: { label: 'Contact', href: '#contact' },
  items: [
    {
      question: 'How long does a project take?',
      answer:
        'Most marketing sites take 3 to 6 weeks from kickoff to launch, depending on the number of pages, the content and the motion involved.',
    },
    {
      question: 'Do you also design, or only develop?',
      answer:
        'Both. I can build from your team’s designs in Figma or take care of the design myself, keeping it simple to maintain.',
    },
    {
      question: 'Webflow, Next.js or Astro: which one is right for me?',
      answer:
        'It depends on who edits the site and what it needs to do. We pick the platform together in the first call, based on your team and goals.',
    },
    {
      question: 'Can my team edit the site after launch?',
      answer:
        'Yes. Every site ships with a CMS set up around your content and a short walkthrough, so your team can update it without me.',
    },
    {
      question: 'Do you offer support after launch?',
      answer:
        'Yes. I include a support period after launch and can stay on for ongoing improvements, new pages and experiments.',
    },
    {
      question: 'How do we get started?',
      answer:
        'Send me a message with a bit about your project and timeline. I will reply within two business days to set up a call.',
    },
  ] satisfies FaqEntry[],
};
