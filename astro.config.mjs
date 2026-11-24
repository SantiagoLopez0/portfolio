// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: dominio final (canonical, sitemap, OG) → site: 'https://...',
  output: 'static',

  env: {
    schema: {
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: 'client',
        access: 'public',
        default: 'production',
      }),
      PUBLIC_SANITY_STUDIO_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      // Solo servidor/build: lectura de drafts para previews. Nunca exponer al cliente.
      SANITY_API_READ_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },

  // Fuentes del design system (docs/design-system/README.md → Tipografía).
  fonts: [
    // display: Bricolage Grotesque (Google Fonts, variable 200–700). Astro la descarga en el build
    // y la sirve desde el propio sitio. Jokker queda fuera hasta confirmar licencia (ver CLAUDE.md).
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display-face',
      weights: ['200 700'], // 200 para el Menu (peso ligero), 400–700 para títulos y UI
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    // Logo del preloader: la misma Bricolage en 700 con tamaño óptico 96 (como el HTML original
    // del preloader). Archivo aparte para no cambiar cómo se ve la display en el resto del sitio.
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-preloader',
      weights: ['700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
      options: { experimental: { variableAxis: { opsz: [96] } } },
    },
    // body
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    // accent: solo el INFO del About

    {
      provider: fontProviders.local(),
      name: 'The Night Watch',
      cssVariable: '--font-night-watch',
      fallbacks: ['serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/TheNightWatch.ttf'], weight: 400, style: 'normal' }],
      },
    },
  ],
});
