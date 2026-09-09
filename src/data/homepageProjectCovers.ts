import type { ProjectMediaImage, ProjectMediaSet } from './projectMedia';

const hmsCloudflareEvidenceBase =
  'https://github.com/sjo1848/hms-cloudflare/raw/dd7d536848708346ca9616e0f54b0fc48ace0b07/output/playwright';

export const homepageProjectMedia = {
  'hms-cloudflare': {
    cover: {
      kind: 'image',
      src: `${hmsCloudflareEvidenceBase}/cf-i04-reception-lifecycle.png`,
      alt: {
        es: 'Flujo de recepción de HMS Cloudflare capturado por la regresión Playwright del proyecto.',
        en: 'HMS Cloudflare reception workflow captured by the project Playwright regression suite.',
      },
      caption: {
        es: 'Evidencia local versionada del flujo de recepción sobre la migración Cloudflare; no representa aceptación remota ni un despliegue productivo.',
        en: 'Versioned local evidence of the reception workflow on the Cloudflare migration; it does not represent remote acceptance or a production deployment.',
      },
      width: 1024,
      height: 900,
    },
    gallery: [
      {
        kind: 'image',
        src: `${hmsCloudflareEvidenceBase}/cf-i05-integrated-housekeeping.png`,
        alt: {
          es: 'Flujo integrado de housekeeping de HMS Cloudflare capturado por Playwright.',
          en: 'HMS Cloudflare integrated housekeeping workflow captured by Playwright.',
        },
        caption: {
          es: 'Regresión local del workspace de housekeeping sobre el runtime migrado a Cloudflare.',
          en: 'Local regression evidence of the housekeeping workspace on the Cloudflare-migrated runtime.',
        },
        width: 1024,
        height: 1770,
      },
      {
        kind: 'image',
        src: `${hmsCloudflareEvidenceBase}/cf-i06-billing.png`,
        alt: {
          es: 'Pantalla de facturación de HMS Cloudflare capturada durante la regresión Playwright.',
          en: 'HMS Cloudflare billing screen captured during the Playwright regression.',
        },
        caption: {
          es: 'Evidencia local del flujo de facturación; la captura documenta comportamiento de producto, no aceptación remota.',
          en: 'Local billing-flow evidence; the screenshot documents product behavior, not remote acceptance.',
        },
        width: 1024,
        height: 2039,
      },
      {
        kind: 'image',
        src: `${hmsCloudflareEvidenceBase}/cf-i07-admin.png`,
        alt: {
          es: 'Superficie administrativa de HMS Cloudflare verificada por Playwright.',
          en: 'HMS Cloudflare administrative surface verified by Playwright.',
        },
        caption: {
          es: 'Regresión local de la superficie administrativa versionada en el repositorio fuente.',
          en: 'Local regression of the administrative surface versioned in the source repository.',
        },
        width: 1024,
        height: 980,
      },
    ],
  },
} satisfies Record<string, ProjectMediaSet>;

export function getHomepageProjectMedia(slug: string): ProjectMediaSet | null {
  return homepageProjectMedia[slug as keyof typeof homepageProjectMedia] ?? null;
}

export function getHomepageProjectCover(slug: string): ProjectMediaImage | null {
  return getHomepageProjectMedia(slug)?.cover ?? null;
}
