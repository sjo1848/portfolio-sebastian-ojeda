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
    title: 'Software Developer · IA, Automatización y Sistemas Operativos',
    description:
      'Construyo sistemas end-to-end que combinan IA, automatización, backend, interfaces y controles operativos verificables.',
    languageTag: 'es-AR',
    locale: 'es_AR',
    alternateLocale: 'en_US',
    cv: '/cv-sebastian-ojeda.pdf',
    workMode:
      'Remoto prioritario, con disponibilidad híbrida o presencial en Mendoza y reubicación evaluable.',
    roles: [
      'Software Developer',
      'Applied AI / Agentic Software Developer',
      'Backend Developer',
      'Full-Stack Developer',
      'Software Developer para automatización y sistemas operativos',
    ],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'Intermedio, en desarrollo' },
    ],
  },
  en: {
    ...sharedSite,
    title: 'Software Developer · AI, Automation & Operational Systems',
    description:
      'I build end-to-end systems that combine AI, automation, backend services, interfaces and verifiable operational controls.',
    languageTag: 'en-US',
    locale: 'en_US',
    alternateLocale: 'es_AR',
    cv: '/cv-sebastian-ojeda-en.pdf',
    workMode:
      'Remote-first, available for hybrid or on-site work in Mendoza, with relocation considered for the right opportunity.',
    roles: [
      'Software Developer',
      'Applied AI / Agentic Software Developer',
      'Backend Developer',
      'Full-Stack Developer',
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
    socialImageAlt: 'Portfolio profesional de Sebastián Ojeda, software developer enfocado en IA, automatización y sistemas operativos.',
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
      eyebrow: 'AI-first software developer',
      context:
        'Diseño software desde el dominio y la arquitectura hasta la operación. Uso IA donde aporta interpretación, contexto o automatización, y mantengo reglas, permisos, datos críticos y side effects bajo controles deterministas y verificables.',
      viewProjects: 'Ver casos de estudio',
      downloadCv: 'Descargar CV',
      workflowAria: 'Enfoque de trabajo',
      workflow: ['Dominio', 'Arquitectura', 'IA + Automatización', 'QA', 'Operación'],
      evidenceEyebrow: 'Evidencia de trabajo',
      projectsTitle: 'Casos destacados',
      projectsIntro:
        'Cinco casos que muestran software completo, sistemas agentic, migración cloud, experiencias móviles y operaciones reales, con repositorios y límites de evidencia explícitos.',
      processEyebrow: 'Método',
      processTitle: 'Construcción verificable de software y sistemas AI-first',
      processIntro:
        'Project Method convierte cada fase en un resultado revisable: parte del problema y la evidencia, separa autoridad técnica de aceptación humana y usa agentes y automatización sin ocultar decisiones críticas.',
      capabilitiesEyebrow: 'Capacidades',
      capabilitiesTitle: 'IA sobre una base de ingeniería completa',
      experienceEyebrow: 'Contexto operativo',
      experienceTitle: 'Software conectado con procesos, integraciones y operación real',
      experienceParagraphs: [
        'Mi experiencia incluye SAP Basis, integraciones SAP PI/PO y trabajo con procesos operativos. Ese contexto influye en cómo diseño software: considero actores, excepciones, permisos, trazabilidad, continuidad y calidad de datos desde el comienzo.',
        'Mi enfoque AI-first no reemplaza ingeniería por prompts. Combino modelos y agentes con APIs, datos, interfaces, políticas, Human-in-the-Loop, testing, CI/CD y observabilidad para que la automatización opere dentro de límites explícitos.',
      ],
      contactEyebrow: 'Contacto',
      contactTitle: 'Busco oportunidades en software, Applied AI, automatización y sistemas operativos',
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
    socialImageAlt: 'Professional portfolio of Sebastián Ojeda, software developer focused on AI, automation and operational systems.',
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
      eyebrow: 'AI-first software developer',
      context:
        'I design software from domain and architecture through operations. I use AI where interpretation, context or automation adds value, while keeping rules, permissions, critical data and side effects behind deterministic and verifiable controls.',
      viewProjects: 'View case studies',
      downloadCv: 'Download resume',
      workflowAria: 'Engineering approach',
      workflow: ['Domain', 'Architecture', 'AI + Automation', 'QA', 'Operations'],
      evidenceEyebrow: 'Work evidence',
      projectsTitle: 'Featured case studies',
      projectsIntro:
        'Five cases showing complete software systems, agentic workflows, cloud migration, mobile experiences and real operations, with repositories and explicit evidence boundaries.',
      processEyebrow: 'Method',
      processTitle: 'Verifiable software and AI-first system delivery',
      processIntro:
        'Project Method turns every phase into a reviewable outcome: it starts from the problem and evidence, separates technical authority from human acceptance, and uses agents and automation without hiding critical decisions.',
      capabilitiesEyebrow: 'Capabilities',
      capabilitiesTitle: 'AI built on complete software engineering',
      experienceEyebrow: 'Operational context',
      experienceTitle: 'Software connected to processes, integrations and real operations',
      experienceParagraphs: [
        'My background includes SAP Basis, SAP PI/PO integrations and operational processes. That context shapes how I design software: I consider actors, exceptions, permissions, traceability, continuity and data quality from the beginning.',
        'My AI-first approach does not replace engineering with prompts. I combine models and agents with APIs, data, interfaces, policies, Human-in-the-Loop, testing, CI/CD and observability so automation operates within explicit boundaries.',
      ],
      contactEyebrow: 'Contact',
      contactTitle: 'Open to software, Applied AI, automation and operational systems opportunities',
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
      title: 'IA y sistemas agentic',
      description: 'LLMs, model routing, tool calling, Human-in-the-Loop, policies, contexto confiable, evaluación, telemetría y fallback.',
    },
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
      title: 'Calidad y operación',
      description: 'GitHub Actions, Playwright, Vitest, E2E, seguridad, observabilidad, recovery, CI/CD y evidence gates.',
    },
  ],
  en: [
    {
      title: 'AI and agentic systems',
      description: 'LLMs, model routing, tool calling, Human-in-the-Loop, policies, trusted context, evaluation, telemetry and fallback.',
    },
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
