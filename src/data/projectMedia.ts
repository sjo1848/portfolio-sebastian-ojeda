export const projectMedia = {
  'hms-elite': {
    src: 'https://raw.githubusercontent.com/sjo1848/hotel-management-system/b2f300df3450c7a1eb1f75539fdca7627802055c/docs/screenshots/03-dashboard.png',
    alt: 'Dashboard operativo de HMS Elite con indicadores de ocupación, llegadas, salidas, reservas y caja del turno.',
    caption:
      'Dashboard verificado con datos demo reproducibles y capturado mediante Playwright en una resolución de 1440 por 900 píxeles.',
    width: 1440,
    height: 900,
  },
  'jm-soluciones': {
    src: '/media/jm-guide-desktop.webp',
    alt: 'Resultado del orientador interactivo de JM Soluciones con una recomendación de servicio, zona seleccionada y estado del trabajo.',
    caption:
      'Flujo del orientador verificado por GitHub Actions en el commit 0a00f7f44735, sin datos personales ni identificadores de clientes.',
    width: 480,
    height: 221,
  },
} as const;

export type ProjectMediaSlug = keyof typeof projectMedia;

export function getProjectMedia(slug: string) {
  return projectMedia[slug as ProjectMediaSlug] ?? null;
}
