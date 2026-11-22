import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // `sanity deploy` publica el Studio en https://santiago-lopez.sanity.studio
  studioHost: 'santiago-lopez',
  // Id de la app del Studio en Sanity: evita que `sanity deploy` lo pregunte.
  deployment: {
    appId: 'id1bmgg4xual2jeoxjj47y6c',
  },
  // TypeGen lee las consultas del sitio (raíz del repo) y escribe los tipos en ../sanity.types.ts
  typegen: {
    path: '../src/**/*.{ts,astro}',
    schema: 'schema.json',
    generates: '../sanity.types.ts',
    overloadClientMethods: true,
  },
});
