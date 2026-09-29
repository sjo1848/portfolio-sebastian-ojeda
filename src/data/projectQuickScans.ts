import type { Language } from './site';

export interface ProjectQuickScanCopy {
  eyebrow: string;
  title: string;
  problemLabel: string;
  problem: string;
  systemLabel: string;
  system: string;
  evidenceLabel: string;
  evidence: string;
  limitationsLabel: string;
  limitations: string;
  repositoryLabel: string;
  demoLabel: string;
  noPublicDemo: string;
  continue: string;
}

type LocalizedScan = Record<Language, ProjectQuickScanCopy>;

export const projectQuickScans: Record<string, LocalizedScan> = {
  'hms-cloudflare': {
    en: {
      eyebrow: 'Project overview',
      title: 'The migration, ownership and evidence at a glance',
      problemLabel: 'Problem',
      problem: 'Move a hotel operations system to a new runtime and data topology while preserving workflows, permissions, hotel isolation and recoverability.',
      systemLabel: 'System',
      system: 'Workers and Hono route requests through a control database for identity and membership plus a separate operational D1 database per hotel.',
      evidenceLabel: 'Evidence and validation',
      evidence: 'Local automated and browser regressions cover role boundaries, tenant isolation and operational flows; a local backup-and-restore rehearsal is documented.',
      limitationsLabel: 'Limitations',
      limitations: 'Remote Product Acceptance, accepted mobile evidence, production readiness and release remain separate gates; none is claimed here.',
      repositoryLabel: 'Repository',
      demoLabel: 'Demo',
      noPublicDemo: 'No public demo link is provided.',
      continue: 'Read the full technical case',
    },
    es: {
      eyebrow: 'Resumen del proyecto',
      title: 'Migración, aporte y evidencia en síntesis',
      problemLabel: 'Problema',
      problem: 'Migrar un sistema de operaciones hoteleras a otro runtime y topología de datos preservando flujos, permisos, aislamiento entre hoteles y recuperabilidad.',
      systemLabel: 'Sistema',
      system: 'Workers y Hono enrutan solicitudes entre una base de control para identidad y membresías y una base D1 operativa separada por hotel.',
      evidenceLabel: 'Evidencia y validación',
      evidence: 'Las regresiones automatizadas y de navegador locales cubren roles, aislamiento entre hoteles y flujos operativos; hay un ensayo local documentado de backup y restore.',
      limitationsLabel: 'Límites',
      limitations: 'La aceptación remota, la evidencia mobile aceptada, la preparación para producción y el release son gates separados; aquí no se afirman.',
      repositoryLabel: 'Repositorio',
      demoLabel: 'Demo',
      noPublicDemo: 'No se proporciona un enlace a una demo pública.',
      continue: 'Leer el caso técnico completo',
    },
  },
  'alquileres-uspa': {
    en: {
      eyebrow: 'Project overview',
      title: 'Product problem, system shape and current evidence',
      problemLabel: 'Problem',
      problem: 'A listing needs controlled review and publication, freshness-aware availability and owner contact without exposing private operational data.',
      systemLabel: 'System',
      system: 'A NestJS API and Vue interface use Prisma and PostgreSQL, separating public catalog data from owner and administration workflows.',
      evidenceLabel: 'Evidence and validation',
      evidence: 'The repository contains API and authorization tests plus reproducible catalog and listing captures made with synthetic data.',
      limitationsLabel: 'Limitations',
      limitations: 'The review/publication and administrative-audit walkthroughs are not shown here. There is no public deployment; reservations, payments and real-time flows are out of scope.',
      repositoryLabel: 'Repository',
      demoLabel: 'Demo',
      noPublicDemo: 'No public demo link is provided.',
      continue: 'Read the full technical case',
    },
    es: {
      eyebrow: 'Resumen del proyecto',
      title: 'Problema de producto, sistema y evidencia actual',
      problemLabel: 'Problema',
      problem: 'Cada publicación requiere revisión y publicación controladas, disponibilidad con fecha de actualización y contacto con el propietario sin exponer datos operativos privados.',
      systemLabel: 'Sistema',
      system: 'Una API NestJS y una interfaz Vue usan Prisma y PostgreSQL, con separación entre catálogo público y flujos de propietarios y administración.',
      evidenceLabel: 'Evidencia y validación',
      evidence: 'El repositorio contiene pruebas de API y autorización, además de capturas reproducibles del catálogo y las propiedades con datos sintéticos.',
      limitationsLabel: 'Límites',
      limitations: 'Aquí no se muestran recorridos de revisión/publicación ni auditoría administrativa. No hay despliegue público; reservas, pagos y flujos en tiempo real quedan fuera del alcance.',
      repositoryLabel: 'Repositorio',
      demoLabel: 'Demo',
      noPublicDemo: 'No se proporciona un enlace a una demo pública.',
      continue: 'Leer el caso técnico completo',
    },
  },
  'ai-commerce-platform': {
    en: {
      eyebrow: 'Project overview',
      title: 'Applied AI connected to operations with bounded authority',
      problemLabel: 'Problem',
      problem: 'Let a language model interpret hotel requests without giving it trusted identity, permissions, database access or authority over operational side effects.',
      systemLabel: 'System',
      system: 'The model interprets intent and proposes tool plans; Agent Core, policies and HMS retain trusted context, authorization and execution authority.',
      evidenceLabel: 'Evidence and validation',
      evidence: 'Phase 2.5 documents controlled HMS staging for availability, quoting, reservation, cancellation, HITL approval and replay controls, plus synthetic cross-repository E2E.',
      limitationsLabel: 'Limitations',
      limitations: 'Phase 2.6 remains under evaluation. The Phase 2.5 staging evidence is not a claim of production operation or public product acceptance for the current phase.',
      repositoryLabel: 'Repository',
      demoLabel: 'Demo',
      noPublicDemo: 'No public demo link is provided.',
      continue: 'Read the full technical case',
    },
    es: {
      eyebrow: 'Resumen del proyecto',
      title: 'IA aplicada a operaciones con autoridad delimitada',
      problemLabel: 'Problema',
      problem: 'Permitir que un modelo interprete solicitudes hoteleras sin entregarle identidad confiable, permisos, acceso directo a la base ni autoridad sobre efectos operativos.',
      systemLabel: 'Sistema',
      system: 'El modelo interpreta la intención y propone herramientas; Agent Core, las políticas y HMS conservan el contexto confiable, la autorización y la autoridad de ejecución.',
      evidenceLabel: 'Evidencia y validación',
      evidence: 'La fase 2.5 documenta pruebas controladas en staging de HMS para disponibilidad, cotización, reservas, cancelaciones, aprobación HITL y controles de replay, además de E2E sintético entre repositorios.',
      limitationsLabel: 'Límites',
      limitations: 'La fase 2.6 continúa en evaluación. La evidencia de staging de la fase 2.5 no afirma operación en producción ni aceptación pública del producto en la fase actual.',
      repositoryLabel: 'Repositorio',
      demoLabel: 'Demo',
      noPublicDemo: 'No se proporciona un enlace a una demo pública.',
      continue: 'Leer el caso técnico completo',
    },
  },
};

export function getProjectQuickScan(slug: string, lang: Language): ProjectQuickScanCopy | null {
  const copy = projectQuickScans[slug]?.[lang];
  return copy ?? null;
}
