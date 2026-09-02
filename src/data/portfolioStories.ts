import type { Language } from './site';

export const primaryStorySlugs = [
  'ai-commerce-platform',
  'hms-cloudflare',
  'agentic-engineering-governance',
  'uspaya',
] as const;

export const secondaryCaseSlugs = [
  'alquileres-uspa',
  'gasflow',
] as const;

export const portfolioStoriesByLanguage = {
  es: {
    eyebrow: 'Engineering stories',
    title: 'Cuatro historias de ingeniería, no una colección de demos',
    intro:
      'Los casos principales muestran sistemas que evolucionan bajo restricciones reales: IA con autoridad acotada, migración brownfield, gobierno agentic basado en evidencia y logística transaccional multi-actor.',
    secondaryEyebrow: 'Casos secundarios',
    secondaryTitle: 'Profundidad adicional según el rol',
    secondaryIntro:
      'Alquileres Uspallata refuerza backend, workflows e integraciones; GasFlow refuerza mobile, logística y software operativo.',
  },
  en: {
    eyebrow: 'Engineering stories',
    title: 'Four engineering stories, not a collection of demos',
    intro:
      'The primary cases show systems evolving under real constraints: AI with bounded authority, brownfield migration, evidence-based agentic governance, and transactional multi-actor logistics.',
    secondaryEyebrow: 'Secondary cases',
    secondaryTitle: 'Additional depth depending on the role',
    secondaryIntro:
      'Alquileres Uspallata reinforces backend, workflows and integrations; GasFlow reinforces mobile, logistics and operational software.',
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  intro: string;
  secondaryEyebrow: string;
  secondaryTitle: string;
  secondaryIntro: string;
}>;
