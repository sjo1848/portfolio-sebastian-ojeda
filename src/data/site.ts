export type Language = 'es' | 'en';

const sharedSite = {
  name: 'Sebastián Ojeda',
  location: 'Mendoza, Argentina',
  themeColor: '#111820',
  backgroundColor: '#f7f4ed',
  github: 'https://github.com/sjo1848',
  sameAs: ['https://github.com/sjo1848'],
  linkedin: null as string | null,
  email: 'sebastian.ojeda.dev@gmail.com',
  portrait: false,
} as const;

export const siteByLanguage = {
  es: {
    ...sharedSite,
    title: 'Full-Stack Software Developer · Backend, IA y Automatización',
    description:
      'Construyo productos y sistemas end-to-end: backend, interfaces, datos, integraciones, infraestructura y automatización con IA cuando aporta valor.',
    languageTag: 'es-AR',
    locale: 'es_AR',
    alternateLocale: 'en_US',
    cv: '/cv-sebastian-ojeda.pdf',
    workMode:
      'Remoto prioritario, con disponibilidad híbrida o presencial en Mendoza y reubicación evaluable.',
    roles: [
      'Full-Stack Developer',
      'Backend Developer',
      'Software Developer',
      'Applied AI / Agentic Software Developer',
      'Software Developer para automatización y sistemas operativos',
    ],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'Intermedio, en desarrollo' },
    ],
  },
  en: {
    ...sharedSite,
    title: 'Full-Stack Software Developer · Backend, AI and Automation',
    description:
      'I build end-to-end products and systems across backend services, interfaces, data, integrations, infrastructure and AI-powered automation when it adds value.',
    languageTag: 'en-US',
    locale: 'en_US',
    alternateLocale: 'es_AR',
    cv: '/cv-sebastian-ojeda-en.pdf',
    workMode:
      'Remote-first, available for hybrid or on-site work in Mendoza, with relocation considered for the right opportunity.',
    roles: [
      'Full-Stack Developer',
      'Backend Developer',
      'Software Developer',
      'Applied AI / Agentic Software Developer',
      'Software Developer for automation and operational systems',
    ],
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'Intermediate, actively improving' },
    ],
  },
} as const;

export const copyByLanguage = {
  es: {
    portfolioLabel: 'Portfolio profesional',
    socialImageAlt: 'Portfolio profesional de Sebastián Ojeda, desarrollador full-stack enfocado en backend, IA aplicada, automatización y sistemas operativos.',
    skipLink: 'Ir al contenido',
    navigationLabel: 'Navegación principal',
    nav: {
      projects: 'Proyectos',
      process: 'Método',
      experience: 'Experiencia',
      contact: 'Contacto',
      cv: 'CV',
    },
    languageSwitch: 'EN',
    languageSwitchAria: 'View the portfolio in English',
    home: {
      eyebrow: 'Full-stack software developer',
      context:
        'Trabajo de punta a punta: modelo el dominio, diseño APIs y datos, construyo interfaces e integraciones, preparo despliegue y calidad, e incorporo IA cuando mejora interpretación, contexto o automatización sin ceder reglas y decisiones críticas.',
      viewProjects: 'Ver casos de estudio',
      downloadCv: 'Descargar CV',
      workflowAria: 'Enfoque de trabajo',
      workflow: ['Producto', 'Backend', 'Interfaces', 'Datos + Integraciones', 'QA + Operación'],
      evidenceEyebrow: 'Evidencia de trabajo',
      projectsTitle: 'Casos destacados',
      projectsIntro:
        'Cuatro casos principales muestran desarrollo full-stack, backend, workflows, datos, cloud e IA aplicada sobre problemas y restricciones concretas.',
      processEyebrow: 'Método',
      processTitle: 'Construcción verificable de sistemas end-to-end',
      processIntro:
        'Project Method convierte cada fase en un resultado revisable: parte del problema y la evidencia, hace explícitas arquitectura y autoridad, y usa automatización y agentes sin ocultar decisiones críticas.',
      capabilitiesEyebrow: 'Capacidades',
      capabilitiesTitle: 'Full-stack con backend, datos, cloud e IA aplicada',
      experienceEyebrow: 'Contexto operativo',
      experienceTitle: 'Software conectado con procesos, integraciones y operación real',
      experienceParagraphs: [
        'Mi experiencia incluye SAP Basis, integraciones SAP PI/PO y trabajo con procesos operativos. Ese contexto influye en cómo diseño software: considero actores, excepciones, permisos, trazabilidad, continuidad y calidad de datos desde el comienzo.',
        'Incorporo IA cuando aporta una ventaja concreta. Combino modelos y agentes con APIs, datos, interfaces, políticas, Human-in-the-Loop, testing, CI/CD y observabilidad para que la automatización opere dentro de límites explícitos.',
      ],
      contactEyebrow: 'Contacto',
      contactTitle: 'Busco oportunidades Full-Stack, Backend, Applied AI y automatización',
      englishLevel: 'Inglés intermedio en desarrollo y práctica profesional.',
      sendEmail: 'Enviar email',
      viewGithub: 'Ver GitHub',
    },
    project: {
      technologiesAria: 'Tecnologías de',
      viewCaseStudy: 'Ver caso de estudio',
      viewCode: 'Ver código',
      state: 'Estado',
      role: 'Rol',
      year: 'Año',
      backToProjects: 'Volver a proyectos',
      mainStack: 'Stack principal',
      pendingEvidence:
        'Las capturas verificadas se incorporarán cuando correspondan a una versión reproducible.',
    },
    notFound: {
      description:
        'La página solicitada no existe o fue trasladada dentro del portafolio profesional de Sebastián Ojeda.',
      title: 'Página no encontrada',
      eyebrow: 'Error 404',
      heading: 'Esta página no está disponible.',
      body: 'El enlace puede estar desactualizado o la dirección puede contener un error.',
      action: 'Volver al inicio',
    },
  },
  en: {
    portfolioLabel: 'Professional portfolio',
    socialImageAlt: 'Professional portfolio of Sebastián Ojeda, a full-stack developer focused on backend engineering, applied AI, automation and operational systems.',
    skipLink: 'Skip to content',
    navigationLabel: 'Primary navigation',
    nav: {
      projects: 'Projects',
      process: 'Method',
      experience: 'Experience',
      contact: 'Contact',
      cv: 'Resume',
    },
    languageSwitch: 'ES',
    languageSwitchAria: 'Ver el portfolio en español',
    home: {
      eyebrow: 'Full-stack software developer',
      context:
        'I work end to end: modeling the domain, designing APIs and data, building interfaces and integrations, preparing deployment and quality, and adding AI when it improves interpretation, context or automation without giving up control of critical rules and decisions.',
      viewProjects: 'View case studies',
      downloadCv: 'Download resume',
      workflowAria: 'Engineering approach',
      workflow: ['Product', 'Backend', 'Interfaces', 'Data + Integrations', 'QA + Operations'],
      evidenceEyebrow: 'Work evidence',
      projectsTitle: 'Featured case studies',
      projectsIntro:
        'Four primary cases demonstrate full-stack development, backend engineering, workflows, data, cloud and applied AI across concrete problems and constraints.',
      processEyebrow: 'Method',
      processTitle: 'Verifiable end-to-end system delivery',
      processIntro:
        'Project Method turns every phase into a reviewable outcome: it starts from the problem and evidence, makes architecture and authority explicit, and uses automation and agents without hiding critical decisions.',
      capabilitiesEyebrow: 'Capabilities',
      capabilitiesTitle: 'Full-stack engineering across backend, data, cloud and applied AI',
      experienceEyebrow: 'Operational context',
      experienceTitle: 'Software connected to processes, integrations and real operations',
      experienceParagraphs: [
        'My background includes SAP Basis, SAP PI/PO integrations and operational processes. That context shapes how I design software: I consider actors, exceptions, permissions, traceability, continuity and data quality from the beginning.',
        'I add AI when it provides a concrete advantage. I combine models and agents with APIs, data, interfaces, policies, Human-in-the-Loop, testing, CI/CD and observability so automation operates within explicit boundaries.',
      ],
      contactEyebrow: 'Contact',
      contactTitle: 'Open to Full-Stack, Backend, Applied AI and automation opportunities',
      englishLevel: 'Intermediate English, actively improving through professional practice.',
      sendEmail: 'Send email',
      viewGithub: 'View GitHub',
    },
    project: {
      technologiesAria: 'Technologies used in',
      viewCaseStudy: 'View case study',
      viewCode: 'View code',
      state: 'Status',
      role: 'Role',
      year: 'Year',
      backToProjects: 'Back to projects',
      mainStack: 'Core stack',
      pendingEvidence:
        'Verified screenshots will be added when they correspond to a reproducible build.',
    },
    notFound: {
      description:
        'The requested page does not exist or has moved within Sebastián Ojeda’s professional portfolio.',
      title: 'Page not found',
      eyebrow: 'Error 404',
      heading: 'This page is not available.',
      body: 'The link may be outdated or the address may contain an error.',
      action: 'Return home',
    },
  },
} as const;

export const processStepsByLanguage = {
  es: [
    {
      title: 'Entender el dominio',
      description: 'Identifico usuarios, procesos, restricciones, fuentes de verdad y riesgos antes de elegir una solución técnica o incorporar IA.',
    },
    {
      title: 'Diseñar autoridad y flujo',
      description: 'Defino estados, responsabilidades, tools, permisos, datos y Human Gates para separar interpretación de autoridad operacional.',
    },
    {
      title: 'Construir el sistema',
      description: 'Implemento backend, interfaces, persistencia, integraciones, automatización y componentes AI/agentic con una arquitectura proporcional.',
    },
    {
      title: 'Evaluar y validar',
      description: 'Integro tests, seguridad, evaluación adversarial, accesibilidad, UX y revisión independiente dentro del desarrollo.',
    },
    {
      title: 'Preparar la operación',
      description: 'Documento, automatizo controles y considero telemetría, costo, despliegue, fallback, recuperación y aceptación humana.',
    },
  ],
  en: [
    {
      title: 'Understand the domain',
      description: 'I identify users, processes, constraints, sources of truth and risks before choosing a technical solution or adding AI.',
    },
    {
      title: 'Design authority and flow',
      description: 'I define states, responsibilities, tools, permissions, data and Human Gates to separate interpretation from operational authority.',
    },
    {
      title: 'Build the system',
      description: 'I implement backend services, interfaces, persistence, integrations, automation and AI/agentic components with proportional architecture.',
    },
    {
      title: 'Evaluate and validate',
      description: 'I integrate testing, security, adversarial evaluation, accessibility, UX and independent review into development.',
    },
    {
      title: 'Prepare operations',
      description: 'I document, automate controls and consider telemetry, cost, deployment, fallback, recovery and human acceptance.',
    },
  ],
} as const;

export const methodPhasesByLanguage = {
  es: [
    { name: 'IDEA', description: 'Hipótesis clara' },
    { name: 'DISCOVERY', description: 'Evidencia real' },
    { name: 'DEFINITION', description: 'Alcance explícito' },
    { name: 'DESIGN', description: 'Autoridad y solución' },
    { name: 'BUILD', description: 'Incremento ejecutable' },
    { name: 'VALIDATE', description: 'Prueba independiente' },
    { name: 'RELEASE', description: 'Entrega controlada' },
    { name: 'LEARN', description: 'Evolución informada' },
  ],
  en: [
    { name: 'IDEA', description: 'Clear hypothesis' },
    { name: 'DISCOVERY', description: 'Real evidence' },
    { name: 'DEFINITION', description: 'Explicit scope' },
    { name: 'DESIGN', description: 'Authority and solution' },
    { name: 'BUILD', description: 'Executable increment' },
    { name: 'VALIDATE', description: 'Independent proof' },
    { name: 'RELEASE', description: 'Controlled delivery' },
    { name: 'LEARN', description: 'Informed evolution' },
  ],
} as const;

export const capabilityGroupsByLanguage = {
  es: [
    {
      title: 'Backend y arquitectura',
      description: 'TypeScript, Node.js, Rust, Axum, NestJS, Hono, APIs REST, OpenAPI, autenticación, RBAC y modelado de dominio.',
    },
    {
      title: 'Interfaces web y móviles',
      description: 'React, React Native, Vue, Astro y TypeScript con foco en flujos operativos, accesibilidad y responsive design.',
    },
    {
      title: 'Datos, cloud e integración',
      description: 'PostgreSQL, SQLx, Prisma, D1/SQLite, Cloudflare Workers, Docker, SAP Basis y SAP PI/PO.',
    },
    {
      title: 'IA y sistemas agentic',
      description: 'LLMs, model routing, tool calling, Human-in-the-Loop, policies, contexto confiable, evaluación, telemetría y fallback.',
    },
    {
      title: 'Calidad y operación',
      description: 'GitHub Actions, Playwright, Vitest, E2E, seguridad, observabilidad, recovery, CI/CD y evidence gates.',
    },
  ],
  en: [
    {
      title: 'Backend and architecture',
      description: 'TypeScript, Node.js, Rust, Axum, NestJS, Hono, REST APIs, OpenAPI, authentication, RBAC and domain modeling.',
    },
    {
      title: 'Web and mobile interfaces',
      description: 'React, React Native, Vue, Astro and TypeScript focused on operational workflows, accessibility and responsive design.',
    },
    {
      title: 'Data, cloud and integration',
      description: 'PostgreSQL, SQLx, Prisma, D1/SQLite, Cloudflare Workers, Docker, SAP Basis and SAP PI/PO.',
    },
    {
      title: 'AI and agentic systems',
      description: 'LLMs, model routing, tool calling, Human-in-the-Loop, policies, trusted context, evaluation, telemetry and fallback.',
    },
    {
      title: 'Quality and operations',
      description: 'GitHub Actions, Playwright, Vitest, E2E, security, observability, recovery, CI/CD and evidence gates.',
    },
  ],
} as const;

export function getLanguageRoot(language: Language) {
  return language === 'es' ? '/es/' : '/';
}

export function getProjectPath(language: Language, slug: string) {
  return `${language === 'es' ? '/es' : ''}/projects/${slug}/`;
}

export function getAlternatePath(pathname: string, language: Language) {
  if (language === 'en') {
    if (pathname === '/404.html') return '/es/404/';
    return pathname === '/' ? '/es/' : `/es${pathname}`;
  }

  if (pathname === '/es' || pathname === '/es/') return '/';
  if (pathname === '/es/404' || pathname === '/es/404/') return '/404.html';
  return pathname.startsWith('/es/') ? pathname.slice(3) : pathname;
}

export const site = siteByLanguage.es;
export const processSteps = processStepsByLanguage.es;
export const capabilityGroups = capabilityGroupsByLanguage.es;
