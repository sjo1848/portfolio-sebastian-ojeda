export const projectMedia = {
  'hms-elite': {
    src: 'https://raw.githubusercontent.com/sjo1848/hotel-management-system/b2f300df3450c7a1eb1f75539fdca7627802055c/docs/screenshots/03-dashboard.png',
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
  'jm-soluciones': {
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
} as const;

export type ProjectMediaSlug = keyof typeof projectMedia;

export function getProjectMedia(slug: string) {
  return projectMedia[slug as ProjectMediaSlug] ?? null;
}
