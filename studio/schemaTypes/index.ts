import type { SchemaTypeDefinition } from 'sanity';
import { project } from './documents/project';

// Registrar aquí cada tipo del schema. Un archivo solo existe para el Studio
// cuando su tipo está en este array. Modelo de contenido: ver CLAUDE.md.

export const schemaTypes: SchemaTypeDefinition[] = [project];
