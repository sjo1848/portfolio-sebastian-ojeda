import type { Language } from './site';

type HumanStory = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  signals: string[];
  ariaLabel: string;
};

export const humanStoryByLanguage: Record<Language, HumanStory> = {
  es: {
    eyebrow: 'Un poco sobre mí',
    title: 'No llegué al software por un camino recto. Y eso terminó siendo una ventaja.',
    paragraphs: [
      'Soy Sebastián Ojeda, desarrollador radicado en Uspallata, Mendoza. Mi recorrido pasó por soporte, infraestructura, SAP e integraciones, operaciones y desarrollo; por eso aprendí temprano que un sistema es mucho más que su interfaz.',
      'Me gusta entender el problema antes de elegir la tecnología: qué necesita la persona que lo usa, dónde se rompe el proceso y qué tiene que seguir funcionando cuando el escenario no es perfecto. Esa es la clase de problema que más disfruto convertir en software.',
      'Soy curioso y casi siempre estoy aprendiendo algo, desde arquitectura, datos o SAP hasta idiomas y dominios nuevos. Fuera de la pantalla, la montaña es una parte importante de mi vida y de haber elegido vivir en Uspallata.',
    ],
    signals: ['Uspallata · Mendoza', 'Montaña', 'Aprendizaje continuo'],
    ariaLabel: 'Rasgos personales',
  },
  en: {
    eyebrow: 'A little about me',
    title: 'My path into software was not a straight line. That became an advantage.',
    paragraphs: [
      'I’m Sebastián Ojeda, a software developer based in Uspallata, Mendoza. My background crosses technical support, infrastructure, SAP and integrations, operations, and software development, so I learned early that a system is much more than its interface.',
      'I like to understand the problem before choosing the technology: what the person using it needs, where the process breaks, and what still has to work when the situation is not ideal. Those are the problems I most enjoy turning into software.',
      'I am naturally curious and usually learning something, from architecture, data or SAP to languages and unfamiliar domains. Away from the screen, the mountains are an important part of my life and of why I chose to live in Uspallata.',
    ],
    signals: ['Uspallata · Mendoza', 'Mountains', 'Continuous learning'],
    ariaLabel: 'Personal signals',
  },
};