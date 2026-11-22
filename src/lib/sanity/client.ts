import { createClient, type SanityClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from 'astro:env/client';

/** Fecha fija de la API de Sanity. Cambiarla solo a propósito, nunca a una fecha dinámica. */
export const apiVersion = '2026-11-20';

export const projectId = PUBLIC_SANITY_PROJECT_ID;
export const dataset = PUBLIC_SANITY_DATASET;

/** `false` mientras no exista el proyecto de Sanity (PUBLIC_SANITY_PROJECT_ID vacío). */
export const isSanityConfigured = Boolean(projectId);

/**
 * Cliente de solo lectura para contenido publicado. El sitio es estático: las consultas
 * corren en build, por eso `useCdn: false` (datos frescos en cada deploy).
 */
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null;
