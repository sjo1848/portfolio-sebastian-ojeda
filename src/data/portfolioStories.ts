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
    eyebrow: 'TRABAJO SELECCIONADO',
    title: 'Sistemas construidos alrededor de restricciones operativas reales.',
    intro: 'Tres casos con foco backend, ownership, arquitectura y evidencia disponible.',
    secondaryEyebrow: 'TRABAJO ADICIONAL',
    secondaryTitle: 'Otros proyectos',
    operatingMindset: {
      eyebrow: 'CÓMO TRABAJO',
      title: 'Entender el sistema. Construir end-to-end. Verificar los límites.',
      items: [
        { title: 'Entender sistemas', description: 'Mapeo actores, estados, restricciones, autoridad y fallos antes de tratar la UI o la API como si fueran todo el problema.' },
        { title: 'Construir end-to-end', description: 'Conecto backend, datos, integraciones e interfaces con una arquitectura proporcional al problema.' },
        { title: 'Verificar límites', description: 'Uso pruebas, validación en navegador, controles de seguridad y evidencia operacional para separar un PASS técnico de una aceptación o release.' },
      ],
      context: 'Mi experiencia en soporte, infraestructura, SAP e integraciones mantiene este enfoque conectado con procesos operativos reales.',
    },
  },
  en: {
    eyebrow: 'SELECTED WORK',
    title: 'Systems built around real operational constraints.',
    intro: 'Three backend-oriented cases showing ownership, architecture and available evidence.',
    secondaryEyebrow: 'ADDITIONAL WORK',
    secondaryTitle: 'More projects',
    operatingMindset: {
      eyebrow: 'HOW I WORK',
      title: 'Understand the system. Build end-to-end. Verify the boundaries.',
      items: [
        { title: 'Understand systems', description: 'I map actors, states, constraints, authority and failure paths before treating the UI or API as the whole problem.' },
        { title: 'Build end-to-end', description: 'I connect backend services, data, integrations and interfaces with architecture proportional to the problem.' },
        { title: 'Verify boundaries', description: 'I use tests, browser validation, security checks and operational evidence to distinguish technical PASS from product or release claims.' },
      ],
      context: 'My background in support, infrastructure, SAP and integrations keeps this work grounded in real operational processes.',
    },
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  intro: string;
  secondaryEyebrow: string;
  secondaryTitle: string;
  operatingMindset: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
    context: string;
  };
}>;
