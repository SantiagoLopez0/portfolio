import { defineArrayMember, defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';

/**
 * Proyecto de "Selected work".
 * - Pestaña "Card": lo que muestra la WorkCard del wireframe (índice, título, tags, año, media).
 * - Pestaña "Case study": el contenido simple del popup que abre cada card.
 */
export const project = defineType({
  name: 'project',
  title: 'Work',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'card', title: 'Card', default: true },
    { name: 'caseStudy', title: 'Case study' },
  ],
  fields: [
    // ── Card ─────────────────────────────────────────────
    defineField({
      name: 'title',
      type: 'string',
      group: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'card',
      description: 'Identifica el case study (enlace directo al popup).',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      group: 'card',
      validation: (rule) => rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'card',
      description: 'Stack o tipo de proyecto. Máximo 3.',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'cover',
      type: 'image',
      group: 'card',
      description: 'Imagen de la card, 16:9.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) => rule.required().warning('Describe la imagen para accesibilidad.'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previewVideo',
      type: 'file',
      group: 'card',
      description: 'Opcional. Clip corto (MP4/WebM, sin audio) que se reproduce al hacer hover.',
      options: { accept: 'video/mp4,video/webm' },
    }),
    defineField({
      name: 'order',
      type: 'number',
      group: 'card',
      description: 'Posición en Selected work (1 = primero).',
      validation: (rule) => rule.integer().min(1),
    }),

    // ── Case study ───────────────────────────────────────
    defineField({
      name: 'client',
      type: 'string',
      group: 'caseStudy',
    }),
    defineField({
      name: 'role',
      type: 'string',
      group: 'caseStudy',
      description: 'Qué hiciste. Ej.: "Diseño y desarrollo en Webflow".',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      group: 'caseStudy',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      group: 'caseStudy',
      rows: 3,
      description: 'Resumen de una o dos frases: el reto y el resultado.',
      validation: (rule) => rule.max(280).warning('Mejor corto: máximo 280 caracteres.'),
    }),
    defineField({
      name: 'body',
      type: 'array',
      group: 'caseStudy',
      description: 'Texto del case study. Simple: párrafos, subtítulos y listas.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Subtítulo', value: 'h3' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      group: 'caseStudy',
      description: 'Capturas del proyecto.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (rule) =>
                rule.required().warning('Describe la imagen para accesibilidad.'),
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Orden en la home',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'year', direction: 'desc' },
      ],
    },
    {
      title: 'Año, más reciente',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', year: 'year', client: 'client', media: 'cover' },
    prepare({ title, year, client, media }) {
      return {
        title,
        subtitle: [year, client].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
