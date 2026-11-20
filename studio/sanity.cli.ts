import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Hostname de `sanity deploy` (queda en https://<studioHost>.sanity.studio).
  // studioHost: 'santiagolopez',
  typegen: {
    path: '../web/src/**/*.{ts,astro}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
});
