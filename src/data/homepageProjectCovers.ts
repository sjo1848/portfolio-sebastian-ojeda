import type { ProjectMediaImage, ProjectMediaSet } from './projectMedia';

const hmsCloudflareEvidenceBase =
  'https://github.com/sjo1848/hms-cloudflare/raw/dd7d536848708346ca9616e0f54b0fc48ace0b07/output/playwright';
const uspayaEvidenceBase =
  'https://github.com/sjo1848/UspaYa/raw/2abc58a3ea7efb131df248472ea4473d67445760/docs/media/portfolio';

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
  uspaya: {
    cover: {
      kind: 'image',
      src: `${uspayaEvidenceBase}/uspaya-operations-mobile.png`,
      alt: {
        es: 'Superficie de Operaciones de UspaYa con un pedido demo listo y todavía sin repartidor asignado.',
        en: 'UspaYa Operations surface with a demo order ready and still awaiting courier assignment.',
      },
      caption: {
        es: 'Captura del runtime local reproducible con PostgreSQL, API y frontend reales; usa exclusivamente datos sembrados de demostración.',
        en: 'Screenshot from the reproducible local runtime with real PostgreSQL, API, and frontend; it uses seeded demo data only.',
      },
      width: 1107,
      height: 1908,
    },
    gallery: [
      {
        kind: 'image',
        src: `${uspayaEvidenceBase}/uspaya-customer-mobile.png`,
        alt: {
          es: 'Flujo de cliente de UspaYa con comercio y productos del dataset demo.',
          en: 'UspaYa customer flow with the demo commerce and product dataset.',
        },
        caption: {
          es: 'Superficie de cliente capturada después de levantar el runtime y aplicar el seed determinista.',
          en: 'Customer surface captured after starting the runtime and applying the deterministic seed.',
        },
        width: 1107,
        height: 3339,
      },
      {
        kind: 'image',
        src: `${uspayaEvidenceBase}/uspaya-merchant-mobile.png`,
        alt: {
          es: 'Bandeja de Comercio de UspaYa mostrando un pedido demo pendiente de revisión.',
          en: 'UspaYa Merchant inbox showing a demo order pending review.',
        },
        caption: {
          es: 'Bandeja autoritativa del comercio durante el mismo recorrido E2E reproducible.',
          en: 'Authoritative merchant inbox during the same reproducible E2E workflow.',
        },
        width: 1107,
        height: 2022,
      },
      {
        kind: 'image',
        src: `${uspayaEvidenceBase}/uspaya-courier-mobile.png`,
        alt: {
          es: 'Flujo de Repartidor de UspaYa con custodia confirmada y destino demo disponible.',
          en: 'UspaYa Courier flow with custody confirmed and the demo destination available.',
        },
        caption: {
          es: 'Estado del repartidor después de la asignación y confirmación de custodia en el runtime de prueba.',
          en: 'Courier state after assignment and custody confirmation in the test runtime.',
        },
        width: 1107,
        height: 3150,
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
