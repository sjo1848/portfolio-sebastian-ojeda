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
    eyebrow: 'Selected work',
    title: 'Cuatro casos de producto e ingeniería end-to-end',
    intro:
      'Los casos principales muestran desarrollo full-stack sobre problemas concretos: operación hotelera, publicación y gestión de alojamientos, comercio asistido por IA y logística transaccional multi-actor.',
    secondaryEyebrow: 'Casos complementarios',
    secondaryTitle: 'Profundidad adicional según el rol',
    secondaryIntro:
      'GasFlow refuerza mobile, logística y software operativo; Agentic Engineering Governance muestra automatización, QA y gobierno de workflows con agentes.',
  },
  en: {
    eyebrow: 'Selected work',
    title: 'Four end-to-end product and engineering case studies',
    intro:
      'The primary cases demonstrate full-stack delivery across concrete problems: hotel operations, accommodation publishing and management, AI-assisted commerce, and transactional multi-actor logistics.',
    secondaryEyebrow: 'Complementary cases',
    secondaryTitle: 'Additional depth depending on the role',
    secondaryIntro:
      'GasFlow reinforces mobile, logistics and operational software; Agentic Engineering Governance demonstrates automation, QA and governance for agent-driven workflows.',
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  intro: string;
  secondaryEyebrow: string;
  secondaryTitle: string;
  secondaryIntro: string;
}>;
