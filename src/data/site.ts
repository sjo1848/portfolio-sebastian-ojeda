export const site = {
  name: 'Sebastián Ojeda',
  title: 'Desarrollador Full Stack con foco en Backend',
  description:
    'Desarrollo sistemas de gestión y aplicaciones operativas con Rust, TypeScript, React, React Native y PostgreSQL.',
  location: 'Mendoza, Argentina',
  languageTag: 'es-AR',
  locale: 'es_AR',
  themeColor: '#111820',
  backgroundColor: '#f7f4ed',
  github: 'https://github.com/sjo1848',
  sameAs: ['https://github.com/sjo1848'],
  linkedin: null as string | null,
  email: 'sebastian.ojeda.dev@gmail.com',
  cv: '/CV_Sebastian_Ojeda_Backend_FullStack.pdf',
  portrait: false,
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
} as const;

export const processSteps = [
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
] as const;

export const capabilityGroups = [
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
] as const;
