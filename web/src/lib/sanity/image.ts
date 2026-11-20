import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { dataset, projectId } from './client';

const builder = createImageUrlBuilder({ projectId: projectId ?? '', dataset });

/** URL de una imagen de Sanity: `urlFor(img).width(1600).auto('format').url()`. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
