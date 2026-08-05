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
    title: 'Desarrollador Full Stack con foco en Backend',
    description:
      'Desarrollo sistemas de gestión y aplicaciones operativas con Rust, TypeScript, React, React Native y PostgreSQL.',
    languageTag: 'es-AR',
    locale: 'es_AR',
    alternateLocale: 'en_US',
    cv: '/cv-sebastian-ojeda.pdf',
    workMode:
      'Remoto prioritario, con disponibilidad híbrida o presencial en Mendoza y reubicación evaluable.',
    roles: [
      'Backend Developer',
      'Full-Stack Developer con foco en backend',
      'Rust Developer junior/intermediate',
      'Software Developer para sistemas de gestión y operaciones',
    ],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'Intermedio, en desarrollo' },
    ],
  },
  en: {
    ...sharedSite,
    title: 'Backend-Focused Full-Stack Developer',
    description:
      'I build management systems and operational applications with Rust, TypeScript, React, React Native, and PostgreSQL.',
    languageTag: 'en-US',
    locale: 'en_US',
    alternateLocale: 'es_AR',
    cv: '/cv-sebastian-ojeda-en.pdf',
    workMode:
      'Remote-first, available for hybrid or on-site work in Mendoza, with relocation considered for the right opportunity.',
    roles: [
      'Backend Developer',
      'Backend-Focused Full-Stack Developer',
      'Junior/Intermediate Rust Developer',
      'Software Developer for management and operational systems',
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
    socialImageAlt: 'Portfolio profesional de Sebastián Ojeda, desarrollador backend y full stack.',
    skipLink: 'Ir al contenido',
    navigationLabel: 'Navegación principal',
    nav: {
      projects: 'Proyectos',
      process: 'Proceso',
      experience: 'Experiencia',
      contact: 'Contacto',
      cv: 'CV',
    },
    languageSwitch: 'EN',
    languageSwitchAria: 'View the portfolio in English',
    home: {
      eyebrow: 'Backend-focused full-stack developer',
      context:
        'Trabajo desde el análisis del dominio hasta la implementación, las pruebas y el despliegue. Mi experiencia con sistemas empresariales e integraciones me ayuda a convertir procesos reales en software confiable.',
      viewProjects: 'Ver proyectos',
      downloadCv: 'Descargar CV',
      workflowAria: 'Enfoque de trabajo',
      workflow: ['Dominio', 'Arquitectura', 'Implementación', 'QA', 'Operación'],
      evidenceEyebrow: 'Evidencia de trabajo',
      projectsTitle: 'Proyectos destacados',
      projectsIntro:
        'Tres soluciones con objetivos distintos: profundidad técnica, operación móvil y entrega comercial.',
      processEyebrow: 'Proceso',
      processTitle: 'Cómo trabajo',
      capabilitiesEyebrow: 'Capacidades',
      capabilitiesTitle: 'Tecnología organizada alrededor del problema',
      experienceEyebrow: 'Contexto operativo',
      experienceTitle: 'Sistemas empresariales, integraciones y procesos reales',
      experienceParagraphs: [
        'Mi experiencia incluye administración SAP, integraciones SAP PI/PO y trabajo con procesos operativos. Ese contexto influye en cómo diseño software: considero actores, excepciones, trazabilidad, continuidad y calidad de datos desde el comienzo.',
        'Me interesa construir sistemas de gestión, aplicaciones móviles y herramientas internas donde la arquitectura técnica esté conectada con una necesidad concreta.',
      ],
      contactEyebrow: 'Contacto',
      contactTitle: 'Busco oportunidades en backend, full stack y software operativo',
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
    socialImageAlt: 'Professional portfolio of Sebastián Ojeda, backend and full-stack developer.',
    skipLink: 'Skip to content',
    navigationLabel: 'Primary navigation',
    nav: {
      projects: 'Projects',
      process: 'Process',
      experience: 'Experience',
      contact: 'Contact',
      cv: 'Resume',
    },
    languageSwitch: 'ES',
    languageSwitchAria: 'Ver el portfolio en español',
    home: {
      eyebrow: 'Backend-focused full-stack developer',
      context:
        'I work from domain analysis through implementation, testing, and deployment. My background in enterprise systems and integrations helps me turn real operational processes into reliable software.',
      viewProjects: 'View projects',
      downloadCv: 'Download resume',
      workflowAria: 'Engineering approach',
      workflow: ['Domain', 'Architecture', 'Implementation', 'QA', 'Operations'],
      evidenceEyebrow: 'Work evidence',
      projectsTitle: 'Featured projects',
      projectsIntro:
        'Three solutions with different goals: technical depth, mobile operations, and commercial delivery.',
      processEyebrow: 'Process',
      processTitle: 'How I work',
      capabilitiesEyebrow: 'Capabilities',
      capabilitiesTitle: 'Technology organized around the problem',
      experienceEyebrow: 'Operational context',
      experienceTitle: 'Enterprise systems, integrations, and real-world processes',
      experienceParagraphs: [
        'My experience includes SAP administration, SAP PI/PO integrations, and operational processes. That background shapes how I design software: I consider actors, exceptions, traceability, continuity, and data quality from the beginning.',
        'I am interested in building management systems, mobile applications, and internal tools where technical architecture is directly connected to a concrete operational need.',
      ],
      contactEyebrow: 'Contact',
      contactTitle: 'Open to backend, full-stack, and operational software opportunities',
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
      description: 'Identifico usuarios, procesos, restricciones y riesgos antes de elegir una solución técnica.',
    },
    {
      title: 'Diseñar el flujo',
      description: 'Defino estados, responsabilidades, datos y recorridos para reducir ambigüedad y deuda temprana.',
    },
    {
      title: 'Construir la solución',
      description: 'Implemento backend, interfaces, persistencia e integraciones con una arquitectura proporcional.',
    },
    {
      title: 'Validar la calidad',
      description: 'Integro pruebas, seguridad, accesibilidad y revisión de UX dentro del desarrollo.',
    },
    {
      title: 'Preparar la operación',
      description: 'Documento, automatizo controles y considero observabilidad, despliegue y recuperación.',
    },
  ],
  en: [
    {
      title: 'Understand the domain',
      description: 'I identify users, processes, constraints, and risks before choosing a technical solution.',
    },
    {
      title: 'Design the workflow',
      description: 'I define states, responsibilities, data, and user journeys to reduce ambiguity and early debt.',
    },
    {
      title: 'Build the solution',
      description: 'I implement backend services, interfaces, persistence, and integrations with proportional architecture.',
    },
    {
      title: 'Validate quality',
      description: 'I integrate testing, security, accessibility, and UX review into the development process.',
    },
    {
      title: 'Prepare operations',
      description: 'I document, automate controls, and consider observability, deployment, and recovery.',
    },
  ],
} as const;

export const capabilityGroupsByLanguage = {
  es: [
    {
      title: 'Backend y arquitectura',
      description: 'Rust, Axum, NestJS, APIs REST, autenticación, RBAC y modelado de dominio.',
    },
    {
      title: 'Aplicaciones web y móviles',
      description: 'React, React Native, Vue, Astro y TypeScript con foco en flujos y responsive design.',
    },
    {
      title: 'Datos e integración',
      description: 'PostgreSQL, SQLx, Prisma, migraciones, SAP Basis y SAP PI/PO.',
    },
    {
      title: 'Calidad e infraestructura',
      description: 'Docker, GitHub Actions, pruebas, seguridad, observabilidad y rendimiento.',
    },
  ],
  en: [
    {
      title: 'Backend and architecture',
      description: 'Rust, Axum, NestJS, REST APIs, authentication, RBAC, and domain modeling.',
    },
    {
      title: 'Web and mobile applications',
      description: 'React, React Native, Vue, Astro, and TypeScript focused on workflows and responsive design.',
    },
    {
      title: 'Data and integration',
      description: 'PostgreSQL, SQLx, Prisma, migrations, SAP Basis, and SAP PI/PO.',
    },
    {
      title: 'Quality and infrastructure',
      description: 'Docker, GitHub Actions, testing, security, observability, and performance.',
    },
  ],
} as const;

export function getLanguageRoot(language: Language) {
  return language === 'en' ? '/en/' : '/';
}

export function getProjectPath(language: Language, slug: string) {
  return `${language === 'en' ? '/en' : ''}/projects/${slug}/`;
}

export function getAlternatePath(pathname: string, language: Language) {
  if (language === 'es') {
    if (pathname === '/404.html') return '/en/404/';
    return pathname === '/' ? '/en/' : `/en${pathname}`;
  }

  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname === '/en/404' || pathname === '/en/404/') return '/404.html';
  return pathname.startsWith('/en/') ? pathname.slice(3) : pathname;
}

export const site = siteByLanguage.es;
export const processSteps = processStepsByLanguage.es;
export const capabilityGroups = capabilityGroupsByLanguage.es;
