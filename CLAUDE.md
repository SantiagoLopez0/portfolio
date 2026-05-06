# CLAUDE.md — Portfolio Santiago López

## Contexto del proyecto
Portfolio personal de Santiago López. Desarrollador web especializado en Webflow y Next.js.

## Stack
- Next.js 15, React 19, TypeScript
- Tailwind CSS + CSS Modules
- Poppins via next/font/google (pesos: 400, 500, 600, 700)
- pnpm como manejador de paquetes
- Deploy en Vercel vía GitHub

## Sistema de diseño
- Fondo: `#ffffff`
- Texto principal: `#000000`
- Texto muted: `#6b6b6b`
- Botones: `#000000`, border-radius `8px`
- Overlay cards: `rgba(0,0,0,0.45)` → hover `rgba(0,0,0,0.65)`
- Espaciado entre secciones: `120px`
- Padding horizontal: clase `.container` → `48px` cada lado, max-width `1440px`

## Componentes compartidos (ya creados, no recrear)
- `Button` — props: `href`, `text`, `theme` (dark | light)
- `Tag` — props: `text`, `variant` (default | outline | dark)
- `LogoSlider` — props: `title`, `logos`
- `Header`, `Footer`

## Datos
- Proyectos en `src/data/projects.ts` — interfaz `Project`: id, title, description, tags, image, url, featured, category

## Estructura de componentes
```
src/components/
├── Home/
│   ├── Hero/
│   ├── WhatIDo/
│   ├── Work/
│   ├── About/
│   └── Contact/
└── Shared/
    ├── Button/
    ├── Tag/
    ├── LogoSlider/
    ├── Header/
    └── Footer/
```

## Reglas estrictas
- Siempre usar CSS Modules para estilos, nunca inline styles
- Usar el componente Button existente para todos los CTAs
- Usar el componente Tag existente para todas las etiquetas
- Usar next/image para todas las imágenes
- Cada componente nuevo necesita: ComponentName.tsx, componentName.module.css, index.ts
- No agregar dependencias sin preguntar primero
- Responder siempre en español
