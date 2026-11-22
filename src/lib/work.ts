import type { SELECTED_WORK_QUERY_RESULT } from '../../sanity.types';
import { sanityClient } from '@/lib/sanity/client';
import { SELECTED_WORK_QUERY } from '@/lib/sanity/queries';
import { workPlaceholders } from '@/data/work-placeholders';

type QueryItem = SELECTED_WORK_QUERY_RESULT[number];

/**
 * Proyecto de Selected work tal como lo usan WorkCard y el popup de case study.
 * `cover` es null solo en los placeholders (en Sanity es obligatorio).
 */
export type WorkItem = Omit<QueryItem, 'cover'> & { cover: QueryItem['cover'] | null };

/**
 * Los 4 proyectos de Selected work desde Sanity. Mientras el dataset no tenga proyectos
 * publicados (o no haya proyecto de Sanity configurado), devuelve los placeholders.
 * Un error de red no se oculta: el build falla antes que publicar placeholders por error.
 */
export async function getSelectedWork(): Promise<{ items: WorkItem[]; isPlaceholder: boolean }> {
  const items = sanityClient ? await sanityClient.fetch(SELECTED_WORK_QUERY) : [];
  if (items.length) return { items, isPlaceholder: false };
  return { items: workPlaceholders, isPlaceholder: true };
}
