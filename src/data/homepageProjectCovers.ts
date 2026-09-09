import type { ProjectMediaImage } from './projectMedia';

const hmsCloudflareEvidenceBase =
  'https://github.com/sjo1848/hms-cloudflare/raw/dd7d536848708346ca9616e0f54b0fc48ace0b07/output/playwright';

export const homepageProjectCovers = {
  'hms-cloudflare': {
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
} satisfies Record<string, ProjectMediaImage>;

export function getHomepageProjectCover(slug: string): ProjectMediaImage | null {
  return homepageProjectCovers[slug as keyof typeof homepageProjectCovers] ?? null;
}
