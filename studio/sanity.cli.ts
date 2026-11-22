import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // `sanity deploy` publica el Studio en https://<studioHost>.sanity.studio (nombre global).
  // "portfolio" ya está tomado. TODO: definir el nombre con Santiago.
  // studioHost: '',
  // TypeGen lee las consultas del sitio (raíz del repo) y escribe los tipos en ../sanity.types.ts
  typegen: {
    path: '../src/**/*.{ts,astro}',
    schema: 'schema.json',
    generates: '../sanity.types.ts',
    overloadClientMethods: true,
  },
});
