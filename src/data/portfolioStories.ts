import type { Language } from './site';

export const primaryStorySlugs = [
  'hms-cloudflare',
  'alquileres-uspa',
  'ai-commerce-platform',
  'uspaya',
] as const;

export const secondaryCaseSlugs = [
  'gasflow',
  'agentic-engineering-governance',
] as const;

export const portfolioStoriesByLanguage = {
  es: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Sistemas construidos alrededor de problemas reales',
    intro:
      'Cuatro casos principales muestran cómo conecto producto, backend, interfaces, datos e integración. Cada caso documenta el problema, las decisiones y la evidencia disponible.',
    secondaryEyebrow: 'Casos complementarios',
    secondaryTitle: 'Más profundidad según el problema',
    secondaryIntro:
      'GasFlow amplía el trabajo hacia mobile y logística; Agentic Engineering Governance muestra automatización, QA y gobierno de workflows con agentes.',
  },
  en: {
    eyebrow: 'Selected work',
    title: 'Systems built around real problems',
    intro:
      'Four primary cases show how I connect product, backend, interfaces, data and integrations. Each case documents the problem, key decisions and available evidence.',
    secondaryEyebrow: 'Complementary cases',
    secondaryTitle: 'Additional depth depending on the problem',
    secondaryIntro:
      'GasFlow extends the work into mobile and logistics; Agentic Engineering Governance demonstrates automation, QA and governance for agent-driven workflows.',
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  intro: string;
  secondaryEyebrow: string;
  secondaryTitle: string;
  secondaryIntro: string;
}>;
