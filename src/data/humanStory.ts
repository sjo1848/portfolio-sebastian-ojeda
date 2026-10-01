import type { Language } from './site';

type HumanStory = {
  title: string;
  paragraphs: string[];
};

export const humanStoryByLanguage: Record<Language, HumanStory> = {
  es: {
    title: 'Un poco sobre mí',
    paragraphs: [
      'Vivo en Uspallata, Mendoza. Antes de concentrarme en desarrollo trabajé en soporte, infraestructura, SAP e integraciones, y ese recorrido me enseñó a mirar el software dentro de procesos reales y no como piezas aisladas.',
      'Me mueven los problemas difíciles y los dominios nuevos. Fuera de la pantalla corro, camino y paso tiempo en la montaña; vivir en Uspallata mantiene cerca ese contraste.',
    ],
  },
  en: {
    title: 'A little about me',
    paragraphs: [
      'I live in Uspallata, Mendoza. Before focusing on software development I worked across support, infrastructure, SAP and integrations, which taught me to see software inside real processes rather than as isolated pieces.',
      'I am driven by difficult problems and new domains. Away from the screen I run, hike and spend time in the mountains; living in Uspallata keeps that contrast close.',
    ],
  },
};
