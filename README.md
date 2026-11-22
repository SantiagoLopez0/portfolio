# Portafolio — Santiago López

Portafolio personal (V2026). El sitio es **Astro 7** (en la raíz) y el contenido viene de **Sanity**, cuyo Studio vive en `studio/` con su propio `package.json`.

```
src/  public/   → sitio (Astro, estático)
studio/         → Sanity Studio (standalone)
docs/           → wireframe de la home y design system
```

## Empezar

Requisitos: Node ≥ 22.23 (ver `.nvmrc`) y pnpm 9.

```bash
pnpm run bootstrap                  # instala el sitio y el Studio
cp .env.example .env
cp studio/.env.example studio/.env
pnpm dev                            # sitio en :4321
pnpm studio                         # Studio en :3333
```

## Scripts

| Comando              | Qué hace                                            |
| -------------------- | --------------------------------------------------- |
| `pnpm dev`           | Sitio en desarrollo                                 |
| `pnpm build`         | `astro check` + build estático en `dist/`           |
| `pnpm studio`        | Studio en desarrollo                                |
| `pnpm typegen`       | Regenera `sanity.types.ts` desde schema y consultas |
| `pnpm schema:deploy` | Sube el schema a Sanity                             |
| `pnpm studio:deploy` | Despliega el Studio en `*.sanity.studio`            |
| `pnpm format`        | Prettier                                            |

La versión anterior (Next.js) quedó en el tag `legacy-nextjs-v2026` y la rama `legacy/nextjs`.

Guía de desarrollo y decisiones: [`CLAUDE.md`](CLAUDE.md).
