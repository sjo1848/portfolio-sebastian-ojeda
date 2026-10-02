import type { ProjectMediaImage, ProjectMediaSet } from './projectMedia';

const hmsCloudflareEvidenceBase = '/media/projects/hms-cloudflare';
const alquileresEvidenceBase = '/media/projects/alquileres-uspa';

export const homepageProjectMedia = {
  'hms-cloudflare': {
    cover: {
      kind: 'image',
      src: `${hmsCloudflareEvidenceBase}/cf-i04-reception-cover-authorized.png`,
      alt: {
        es: 'Vista local de recepción de HMS Cloudflare con un fixture de prueba autorizado.',
        en: 'Local HMS Cloudflare reception preview with an authorized test fixture.',
      },
      caption: {
        es: 'Vista previa de regresión local · fixture sintético autorizado; no es Product Acceptance ni un release de producción.',
        en: 'Local regression preview · authorized synthetic fixture; not Product Acceptance or a production release.',
      },
      width: 1440,
      height: 900,
    },
    gallery: [],
  },
  'alquileres-uspa': {
    cover: {
      kind: 'image',
      src: `${alquileresEvidenceBase}/catalog-results-desktop-1440x1200.png`,
      alt: {
        es: 'Catálogo público de Alquileres Uspallata con publicaciones demo, imágenes sintéticas, precios, disponibilidad y acceso al detalle.',
        en: 'Alquileres Uspallata public catalog with demo listings, synthetic images, prices, availability, and detail access.',
      },
      caption: {
        es: 'Catálogo generado desde el runtime real con PostgreSQL, API Nest y frontend Vue; propiedades e imágenes son fixtures sintéticos reproducibles.',
        en: 'Catalog generated from the real runtime with PostgreSQL, Nest API, and Vue frontend; properties and images are reproducible synthetic fixtures.',
      },
      width: 1440,
      height: 1200,
    },
    gallery: [],
  },
} satisfies Record<string, ProjectMediaSet>;

export function getHomepageProjectMedia(slug: string): ProjectMediaSet | null {
  return homepageProjectMedia[slug as keyof typeof homepageProjectMedia] ?? null;
}

export function getHomepageProjectCover(slug: string): ProjectMediaImage | null {
  return getHomepageProjectMedia(slug)?.cover ?? null;
}
