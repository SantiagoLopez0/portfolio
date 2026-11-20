# Portafolio — Santiago López

Portafolio personal (V2026), construido con **Astro 7** y **Sanity Studio v6** en un monorepo de pnpm.

```
web/      → sitio (Astro, estático)
studio/   → Sanity Studio (standalone)
docs/     → wireframe de la home y design system
```

## Empezar

Requisitos: Node ≥ 22.23 (ver `.nvmrc`) y pnpm 9.

```bash
pnpm install
cp web/.env.example web/.env        # completar PUBLIC_SANITY_PROJECT_ID
cp studio/.env.example studio/.env  # completar SANITY_STUDIO_PROJECT_ID
pnpm dev                            # web en :4321, studio en :3333
```

## Scripts

| Comando              | Qué hace                                                |
| -------------------- | ------------------------------------------------------- |
| `pnpm dev`           | Astro y Studio en paralelo                              |
| `pnpm build`         | `astro check` + build estático en `web/dist`            |
| `pnpm typegen`       | Regenera `web/sanity.types.ts` desde schema y consultas |
| `pnpm deploy:studio` | Despliega el Studio en `*.sanity.studio`                |
| `pnpm format`        | Prettier                                                |

La versión anterior (Next.js) quedó en el tag `legacy-nextjs-v2026` y la rama `legacy/nextjs`.

Guía de desarrollo y decisiones: [`CLAUDE.md`](CLAUDE.md).
