import type { Language } from './site';

export const primaryStorySlugs = [
  'hms-cloudflare',
  'alquileres-uspa',
  'ai-commerce-platform',
] as const;

export const secondaryCaseSlugs = [
  'uspaya',
  'gasflow',
  'agentic-engineering-governance',
  'hms-elite',
  'jm-soluciones',
  'taco-loco',
] as const;

export const portfolioStoriesByLanguage = {
  es: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Sistemas construidos alrededor de problemas reales',
    intro:
      'Tres proyectos con foco backend, mi aporte y la evidencia disponible.',
    secondaryEyebrow: 'Casos complementarios',
    secondaryTitle: 'Más profundidad según el problema',
    secondaryIntro:
      'Otros proyectos complementan el recorrido con trabajo en producto, mobile, logística, sistemas empresariales y automatización.',
  },
  en: {
    eyebrow: 'Selected work',
    title: 'Systems built around real problems',
    intro:
      'Three backend-oriented projects, my role and the available evidence.',
    secondaryEyebrow: 'Complementary cases',
    secondaryTitle: 'Additional depth depending on the problem',
    secondaryIntro:
      'Other projects add work across product, mobile, logistics, enterprise systems and automation.',
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  intro: string;
  secondaryEyebrow: string;
  secondaryTitle: string;
  secondaryIntro: string;
}>;
