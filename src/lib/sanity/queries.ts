// Consultas GROQ del sitio. Reglas:
// - Siempre con `defineQuery` (de 'groq') y asignadas a una constante con nombre único.
// - Proyectar solo los campos que usa la vista.
// - Después de cambiar una consulta o el schema: `pnpm typegen` desde la raíz.
import { defineQuery } from 'groq';

/** Selected work: los 4 proyectos destacados, por el campo `order` (y luego por año). */
export const SELECTED_WORK_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(order asc, year desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    year,
    tags,
    cover { asset, hotspot, crop, alt },
    client,
    role,
    liveUrl,
    summary,
    body,
    gallery[] {
      _key,
      asset,
      hotspot,
      crop,
      alt,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }
`);
