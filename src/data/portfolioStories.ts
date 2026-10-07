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
    secondaryEyebrow: 'TRABAJO ADICIONAL',
    secondaryTitle: 'Otros proyectos',
    operatingMindset: {
      eyebrow: 'CÓMO TRABAJO',
      title: 'Entender el sistema. Construir end-to-end. Verificar los límites.',
      items: [
        { title: 'Entender el sistema', description: 'Mapeo actores, estados, restricciones, autoridad y fallos antes de tratar la UI o la API como si fueran todo el problema.' },
        { title: 'Construir end-to-end', description: 'Conecto backend, datos, integraciones e interfaces con una arquitectura proporcional al problema.' },
        { title: 'Verificar los límites', description: 'Uso pruebas, validación en navegador, controles de seguridad y evidencia operacional para separar un PASS técnico de una aceptación o release.' },
      ],
      agentic: 'Combino prácticas de ingeniería de software —modelado, arquitectura, pruebas, seguridad y observabilidad— con agentes de IA para acelerar análisis, implementación y verificación, manteniendo criterio humano, trazabilidad y control sobre las decisiones críticas.',
      context: 'Mi experiencia en soporte, infraestructura, SAP e integraciones mantiene este enfoque conectado con procesos operativos reales.',
    },
  },
  en: {
    eyebrow: 'SELECTED WORK',
    title: 'Systems built around real operational constraints.',
    secondaryEyebrow: 'ADDITIONAL WORK',
    secondaryTitle: 'More projects',
    operatingMindset: {
      eyebrow: 'HOW I WORK',
      title: 'Understand the system. Build end-to-end. Verify the boundaries.',
      items: [
        { title: 'Understand the system', description: 'I map actors, states, constraints, authority and failure paths before treating the UI or API as the whole problem.' },
        { title: 'Build end-to-end', description: 'I connect backend services, data, integrations and interfaces with architecture proportional to the problem.' },
        { title: 'Verify the boundaries', description: 'I use tests, browser validation, security checks and operational evidence to distinguish technical PASS from product or release claims.' },
      ],
      agentic: 'I combine software-engineering practices—modeling, architecture, testing, security and observability—with AI agents to accelerate analysis, implementation and verification while keeping human judgment, traceability and control over critical decisions.',
      context: 'My background in support, infrastructure, SAP and integrations keeps this work grounded in real operational processes.',
    },
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  secondaryEyebrow: string;
  secondaryTitle: string;
  operatingMindset: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
    agentic: string;
    context: string;
  };
}>;
