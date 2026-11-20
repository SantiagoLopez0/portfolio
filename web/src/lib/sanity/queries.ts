// Consultas GROQ del sitio. Reglas:
// - Siempre con `defineQuery` (de 'groq') y asignadas a una constante con nombre único:
//     export const HOME_QUERY = defineQuery(`*[_type == "home"][0]{ ... }`);
// - Proyectar solo los campos que usa la vista.
// - Después de cambiar una consulta o el schema: `pnpm typegen` desde la raíz.

export {};
