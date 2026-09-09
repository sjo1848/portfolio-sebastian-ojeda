type Language = 'es' | 'en';

type LocalizedText = Record<Language, string>;

interface ProjectMediaBase {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  width: number;
  height: number;
}

export interface ProjectMediaImage extends ProjectMediaBase {
  kind: 'image';
}

export interface ProjectMediaGif extends ProjectMediaBase {
  kind: 'gif';
}

export type ProjectMediaAsset = ProjectMediaImage | ProjectMediaGif;

export interface ProjectMediaSet {
  cover: ProjectMediaImage;
  gallery: readonly ProjectMediaAsset[];
}

const hmsScreenshotBase = 'https://raw.githubusercontent.com/sjo1848/hotel-management-system/b2f300df3450c7a1eb1f75539fdca7627802055c/docs/screenshots';
const hmsWalkthroughBase = 'https://raw.githubusercontent.com/sjo1848/hotel-management-system/4df56a6217caab611f2f5fcbd98bde8386bb5629/docs/media';

export const projectMedia = {
  'hms-elite': {
    cover: {
      kind: 'image',
      src: `${hmsScreenshotBase}/03-dashboard.png`,
      alt: {
        es: 'Dashboard operativo de HMS Elite con indicadores de ocupación, llegadas, salidas, reservas y caja del turno.',
        en: 'HMS Elite operations dashboard with occupancy, arrivals, departures, reservations, and shift cash indicators.',
      },
      caption: {
        es: 'Dashboard verificado con datos demo reproducibles y capturado mediante Playwright en una resolución de 1440 por 900 píxeles.',
        en: 'Dashboard verified with reproducible demo data and captured through Playwright at a resolution of 1440 by 900 pixels.',
      },
      width: 1440,
      height: 900,
    },
    gallery: [
      {
        kind: 'image',
        src: `${hmsScreenshotBase}/04-bookings.png`,
        alt: {
          es: 'Workspace de recepción de HMS Elite con llegadas, huéspedes en casa, salidas y reservas del turno.',
          en: 'HMS Elite front desk workspace with arrivals, in-house guests, departures, and shift bookings.',
        },
        caption: {
          es: 'Recepción: recorrido operativo del turno sobre el dataset demo verificado.',
          en: 'Front desk: operational shift workflow over the verified demo dataset.',
        },
        width: 1440,
        height: 900,
      },
      {
        kind: 'gif',
        src: `${hmsWalkthroughBase}/hms-reception-workflow.gif`,
        alt: {
          es: 'GIF animado del flujo principal de recepción de HMS Elite en escritorio.',
          en: 'Animated GIF of the main HMS Elite front desk workflow on desktop.',
        },
        caption: {
          es: 'Walkthrough desktop de recepción capturado desde el runtime con datos sintéticos; muestra navegación y estados reales del flujo principal.',
          en: 'Desktop front desk walkthrough captured from the runtime with synthetic data; it shows real navigation and states of the main workflow.',
        },
        width: 960,
        height: 600,
      },
      {
        kind: 'gif',
        src: `${hmsWalkthroughBase}/hms-mobile-reception.gif`,
        alt: {
          es: 'GIF animado del flujo mobile de recepción de HMS Elite con navegación, walk-in y revisión.',
          en: 'Animated GIF of the HMS Elite mobile front desk flow with navigation, walk-in, and review.',
        },
        caption: {
          es: 'Walkthrough mobile de recepción capturado desde el runtime con datos sintéticos y sin información personal real.',
          en: 'Mobile front desk walkthrough captured from the runtime with synthetic data and no real personal information.',
        },
        width: 390,
        height: 844,
      },
      {
        kind: 'image',
        src: `${hmsScreenshotBase}/04-calendar.png`,
        alt: {
          es: 'Calendario de HMS Elite organizado por habitación y fecha para visualizar reservas y disponibilidad.',
          en: 'HMS Elite calendar organized by room and date to visualize bookings and availability.',
        },
        caption: {
          es: 'Planning board por habitación y fecha, incluyendo conflictos y estados fuera de servicio.',
          en: 'Planning board by room and date, including conflicts and out-of-service states.',
        },
        width: 1440,
        height: 900,
      },
      {
        kind: 'image',
        src: `${hmsScreenshotBase}/04-rooms.png`,
        alt: {
          es: 'Inventario de habitaciones de HMS Elite con estados operativos y tarifas.',
          en: 'HMS Elite room inventory with operational states and rates.',
        },
        caption: {
          es: 'Habitaciones: inventario operativo con estados disponible, ocupada, limpieza y mantenimiento.',
          en: 'Rooms: operational inventory with available, occupied, cleaning, and maintenance states.',
        },
        width: 1440,
        height: 900,
      },
      {
        kind: 'image',
        src: `${hmsScreenshotBase}/04-housekeeping.png`,
        alt: {
          es: 'Workspace de housekeeping de HMS Elite con cola de limpieza y mantenimiento.',
          en: 'HMS Elite housekeeping workspace with cleaning and maintenance queues.',
        },
        caption: {
          es: 'Housekeeping: cola del turno para habitaciones por limpiar, en limpieza, listas y mantenimiento.',
          en: 'Housekeeping: shift queue for rooms to clean, in cleaning, ready, and under maintenance.',
        },
        width: 1440,
        height: 900,
      },
      {
        kind: 'image',
        src: `${hmsScreenshotBase}/04-reports.png`,
        alt: {
          es: 'Panel de reportes de HMS Elite con indicadores financieros, ocupación e información de caja.',
          en: 'HMS Elite reports dashboard with financial indicators, occupancy, and cash information.',
        },
        caption: {
          es: 'Reportes: cockpit financiero con ingresos, ocupación y caja sobre datos demo reproducibles.',
          en: 'Reports: financial cockpit with revenue, occupancy, and cash over reproducible demo data.',
        },
        width: 1440,
        height: 900,
      },
    ],
  },
  'jm-soluciones': {
    cover: {
      kind: 'image',
      src: '/media/jm-guide-desktop.webp',
      alt: {
        es: 'Resultado del orientador interactivo de JM Soluciones con una recomendación de servicio, zona seleccionada y estado del trabajo.',
        en: 'JM Soluciones interactive guide result with a service recommendation, selected area, and work status.',
      },
      caption: {
        es: 'Flujo del orientador verificado por GitHub Actions en el commit 0a00f7f44735, sin datos personales ni identificadores de clientes.',
        en: 'Guide workflow verified by GitHub Actions at commit 0a00f7f44735, with no personal data or customer identifiers.',
      },
      width: 480,
      height: 221,
    },
    gallery: [],
  },
} satisfies Record<string, ProjectMediaSet>;

export type ProjectMediaSlug = keyof typeof projectMedia;

export function getProjectMedia(slug: string): ProjectMediaSet | null {
  return projectMedia[slug as ProjectMediaSlug] ?? null;
}
