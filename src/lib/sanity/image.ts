import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { dataset, projectId } from './client';

const builder = createImageUrlBuilder({ projectId: projectId ?? '', dataset });

/** URL de una imagen de Sanity: `urlFor(img).width(1600).auto('format').url()`. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * `src` + `srcset` de una imagen de Sanity en formato automático (WebP/AVIF).
 * Con `aspect` (ancho / alto) recorta respetando el hotspot y el crop del Studio.
 */
export function imageSet(source: SanityImageSource, widths: number[], aspect?: number) {
  const url = (width: number) => {
    let image = urlFor(source).width(width).auto('format').quality(80);
    if (aspect) image = image.height(Math.round(width / aspect)).fit('crop');
    return image.url();
  };
  const largest = Math.max(...widths);
  return {
    src: url(largest),
    srcset: widths.map((width) => `${url(width)} ${width}w`).join(', '),
  };
}
