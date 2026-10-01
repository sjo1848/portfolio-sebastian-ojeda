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
      projects: 'Trabajo',
      about: 'Sobre mí',
      contact: 'Contacto',
      cv: 'CV',
    },
    languageSwitch: 'EN',
    languageSwitchAria: 'View the portfolio in English',
    home: {
      downloadCv: 'Descargar CV',
      contactEyebrow: 'Contacto',
      contactTitle: 'Busco oportunidades Full-Stack y Backend.',
      contactBody: 'Remoto prioritario desde Mendoza, Argentina. Puedo evaluar modalidad híbrida, presencial o reubicación según la oportunidad.',
      englishLevel: 'Inglés intermedio en desarrollo y práctica profesional.',
      sendEmail: 'Enviar email',
      copyEmail: 'Copiar email',
      copyingEmail: 'Copiando…',
      emailCopied: 'Email copiado.',
      emailCopyError: 'No se pudo copiar. Podés usar el enlace para enviar un email.',
      viewGithub: 'Ver GitHub',
    },
    project: {
      technologiesAria: 'Tecnologías de',
      viewCaseStudy: 'Ver caso de estudio',
      viewCode: 'Ver GitHub',
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
      projects: 'Work',
      about: 'About',
      contact: 'Contact',
      cv: 'Resume',
    },
    languageSwitch: 'ES',
    languageSwitchAria: 'Ver el portfolio en español',
    home: {
      downloadCv: 'Download resume',
      contactEyebrow: 'Contact',
      contactTitle: 'Open to Full-Stack and Backend opportunities.',
      contactBody: 'Remote-first from Mendoza, Argentina. Hybrid, on-site and relocation can be considered for the right opportunity.',
      englishLevel: 'Intermediate English, actively improving through professional practice.',
      sendEmail: 'Send email',
      copyEmail: 'Copy email',
      copyingEmail: 'Copying…',
      emailCopied: 'Email copied.',
      emailCopyError: 'Could not copy. You can use the email link to send a message instead.',
      viewGithub: 'View GitHub',
    },
    project: {
      technologiesAria: 'Technologies used in',
      viewCaseStudy: 'View case study',
      viewCode: 'View GitHub',
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
      proofSlugs: ['hms-cloudflare', 'alquileres-uspa'],
    },
    {
      title: 'Interfaces web y móviles',
      description: 'React, React Native, Vue, Astro y TypeScript con foco en flujos operativos, accesibilidad y responsive design.',
      proofSlugs: ['alquileres-uspa'],
    },
    {
      title: 'Datos, cloud e integración',
      description: 'PostgreSQL, SQLx, Prisma, D1/SQLite, Cloudflare Workers, Docker, SAP Basis y SAP PI/PO.',
      proofSlugs: ['hms-cloudflare'],
    },
    {
      title: 'IA y sistemas agentic',
      description: 'LLMs, model routing, tool calling, Human-in-the-Loop, policies, contexto confiable, evaluación, telemetría y fallback.',
      proofSlugs: ['ai-commerce-platform'],
    },
    {
      title: 'Calidad y operación',
      description: 'GitHub Actions, Playwright, Vitest, E2E, seguridad, observabilidad, recovery, CI/CD y evidence gates.',
      proofSlugs: ['hms-cloudflare', 'ai-commerce-platform'],
    },
  ],
  en: [
    {
      title: 'Backend and architecture',
      description: 'TypeScript, Node.js, Rust, Axum, NestJS, Hono, REST APIs, OpenAPI, authentication, RBAC and domain modeling.',
      proofSlugs: ['hms-cloudflare', 'alquileres-uspa'],
    },
    {
      title: 'Web and mobile interfaces',
      description: 'React, React Native, Vue, Astro and TypeScript focused on operational workflows, accessibility and responsive design.',
      proofSlugs: ['alquileres-uspa'],
    },
    {
      title: 'Data, cloud and integration',
      description: 'PostgreSQL, SQLx, Prisma, D1/SQLite, Cloudflare Workers, Docker, SAP Basis and SAP PI/PO.',
      proofSlugs: ['hms-cloudflare'],
    },
    {
      title: 'AI and agentic systems',
      description: 'LLMs, model routing, tool calling, Human-in-the-Loop, policies, trusted context, evaluation, telemetry and fallback.',
      proofSlugs: ['ai-commerce-platform'],
    },
    {
      title: 'Quality and operations',
      description: 'GitHub Actions, Playwright, Vitest, E2E, security, observability, recovery, CI/CD and evidence gates.',
      proofSlugs: ['hms-cloudflare', 'ai-commerce-platform'],
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
export const capabilityGroups = capabilityGroupsByLanguage.es;
