import type { Language } from './site';

export type ProofMode =
  | 'live-product'
  | 'controlled-demo'
  | 'recorded-walkthrough'
  | 'visual-evidence'
  | 'repository-case-only';

export type ProofReadiness = 'available' | 'pending-external-gate' | 'unavailable';

export interface ProofArtifact {
  path: string;
  sha256?: string;
}

export interface ProjectProof {
  preferredProofMode: ProofMode;
  currentProofMode: ProofMode;
  proofReadiness: ProofReadiness;
  /** Verified internal route/hash or exact approved external URL; null means no dedicated CTA. */
  proofHref: Readonly<Record<Language, string>> | null;
  proofProvenance: {
    sourceRepository: string | null;
    sourceCommit: string | null;
    dataClassification:
      | 'authorized-test-fixture'
      | 'synthetic-deterministic'
      | 'controlled-staging-not-published'
      | 'unverified-not-publishable'
      | 'repository-documentation-only'
      | 'private-artifacts-not-cleared'
      | 'synthetic-demo-seed'
      | 'business-content-review-required';
    artifacts: readonly ProofArtifact[];
  };
  proofLimitations: Readonly<Record<Language, string>>;
}

const verifiedPortfolioRoute = (en: string, es: string = en): Readonly<Record<Language, string>> => ({
  en,
  es,
});

/**
 * `preferredProofMode` is the approved strategic target. `currentProofMode` and
 * `proofHref` describe only the evidence that can safely be reached today.
 * `proofReadiness` is readiness of the preferred mode and never changes a
 * project's lifecycle/status.
 */
export const projectProofs = {
  'hms-cloudflare': {
    preferredProofMode: 'recorded-walkthrough',
    currentProofMode: 'visual-evidence',
    proofReadiness: 'pending-external-gate',
    proofHref: verifiedPortfolioRoute('#visual-evidence', '#evidencia-visual'),
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/hms-cloudflare',
      sourceCommit: 'dd7d536848708346ca9616e0f54b0fc48ace0b07',
      dataClassification: 'authorized-test-fixture',
      artifacts: [
        { path: '/media/projects/hms-cloudflare/cf-i04-reception-cover-authorized.png', sha256: '8e9d6e1f99ce46502ffb98fd3d955a69de2607e23a8fb41039c66469e2c673fd' },
        { path: '/media/projects/hms-cloudflare/cf-i04-reception-authorized.png', sha256: '7c88509f2520b0027723a9b07423114627b6ee2e7ac54c9a65582ac69e780378' },
        { path: '/media/projects/hms-cloudflare/cf-i05-housekeeping-authorized.png', sha256: '9d64973880788129623d1f67cd6d04089dde5a71c072bb99dbc34958f6acd533' },
        { path: '/media/projects/hms-cloudflare/cf-i06-billing-authorized.png', sha256: '000281ddcd08a777e50bdd3a114e1349cb0bab4ee9c54d13155ee4378c8bbec8' },
        { path: '/media/projects/hms-cloudflare/cf-i07-admin-authorized.png', sha256: 'b2e64b05add48abf65bbc98432fd07ce46620292acf4cad46fee1e6acd12e87f' },
      ],
    },
    proofLimitations: {
      en: 'These are local regression screenshots with authorized test fixtures, not remote product acceptance, accepted mobile evidence, production readiness or release.',
      es: 'Son capturas de regresiones locales con fixtures autorizados, no aceptación remota, evidencia mobile aceptada, preparación para producción ni release.',
    },
  },
  'alquileres-uspa': {
    preferredProofMode: 'live-product',
    currentProofMode: 'visual-evidence',
    proofReadiness: 'pending-external-gate',
    proofHref: verifiedPortfolioRoute('#gallery-alquileres-uspa'),
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/alquileres-uspa',
      sourceCommit: '5bcde39e0ca8abd2d5d2e0a9e9c90c5b3bf47a51',
      dataClassification: 'synthetic-deterministic',
      artifacts: [
        { path: '/media/projects/alquileres-uspa/catalog-results-desktop-1440x1200.png', sha256: 'b5f734fbaa270ddf73e055d41f6b510d9e669d6d001e571b653f2acf1ddd36a0' },
        { path: '/media/projects/alquileres-uspa/listing-detail-desktop-1440x1200.png', sha256: 'f12dc2b7334d956f4f3c4598cafc0c8159793f7fc0d7007857e5ae22a692e7b3' },
        { path: '/media/projects/alquileres-uspa/catalog-results-mobile-390x844.png', sha256: '3fee3939f6ee7fb3f578bc830d909ef6f08ec5551dcbff88b1a9faf87c514a6c' },
      ],
    },
    proofLimitations: {
      en: 'These are reproducible synthetic captures of the NestJS/Vue product. There is no public deployment. Review/publication and administrative-audit workflows are not shown; reservations, payments and real-time flows are out of scope. A live link depends on the community product’s own release gates.',
      es: 'Son capturas sintéticas reproducibles del producto NestJS/Vue. No hay despliegue público. No muestran revisión/publicación ni auditoría administrativa; reservas, pagos y flujos en tiempo real quedan fuera. Un enlace live depende de los gates de release del producto comunitario.',
    },
  },
  'ai-commerce-platform': {
    preferredProofMode: 'recorded-walkthrough',
    currentProofMode: 'repository-case-only',
    proofReadiness: 'pending-external-gate',
    proofHref: null,
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/ai-commerce-platform',
      sourceCommit: '05d808f6b16053113d42119705bf42196cc85f4d',
      dataClassification: 'controlled-staging-not-published',
      artifacts: [],
    },
    proofLimitations: {
      en: 'Phase 2.5 controlled-staging results are described in the case, but no public walkthrough artifact is available. Phase 2.6 remains under evaluation and is not presented as production or accepted release.',
      es: 'Los resultados de staging controlado de la fase 2.5 se describen en el caso, pero no hay un walkthrough público disponible. La fase 2.6 continúa en evaluación y no se presenta como producción o release aceptado.',
    },
  },
  'uspaya': {
    preferredProofMode: 'recorded-walkthrough',
    currentProofMode: 'repository-case-only',
    proofReadiness: 'pending-external-gate',
    proofHref: null,
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/UspaYa',
      sourceCommit: null,
      dataClassification: 'unverified-not-publishable',
      artifacts: [],
    },
    proofLimitations: {
      en: 'Only the case study and repository are linked. Prior mobile images were removed because their exact displayed values could not be proven synthetic; new evidence requires reproducible synthetic or redacted data and privacy review.',
      es: 'Solo se enlazan el caso y el repositorio. Se retiraron las imágenes mobile anteriores porque no se pudo probar que sus valores fueran sintéticos; nueva evidencia requiere datos sintéticos o redactados, reproducción y revisión de privacidad.',
    },
  },
  'gasflow': {
    preferredProofMode: 'recorded-walkthrough',
    currentProofMode: 'repository-case-only',
    proofReadiness: 'pending-external-gate',
    proofHref: null,
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/gasflow',
      sourceCommit: 'abcf92738ecf6b9819721d08911aa17b0895400c',
      dataClassification: 'repository-documentation-only',
      artifacts: [],
    },
    proofLimitations: {
      en: 'The portfolio has no verified mobile capture or walkthrough and no public backend link. The repository describes a functional MVP, not a field-validated service.',
      es: 'El portfolio no tiene capturas mobile verificadas ni walkthrough, y no hay enlace a backend público. El repositorio describe un MVP funcional, no un servicio validado en campo.',
    },
  },
  'agentic-engineering-governance': {
    preferredProofMode: 'visual-evidence',
    currentProofMode: 'repository-case-only',
    proofReadiness: 'pending-external-gate',
    proofHref: null,
    proofProvenance: {
      sourceRepository: null,
      sourceCommit: null,
      dataClassification: 'private-artifacts-not-cleared',
      artifacts: [],
    },
    proofLimitations: {
      en: 'No public implementation repository or approved sanitized diagram is available. The case remains a written explanation until artifact owners clear shareable evidence.',
      es: 'No hay repositorio público de implementación ni diagrama sanitizado aprobado. El caso queda como explicación escrita hasta que los propietarios autoricen evidencia compartible.',
    },
  },
  'hms-elite': {
    preferredProofMode: 'visual-evidence',
    currentProofMode: 'visual-evidence',
    proofReadiness: 'available',
    proofHref: verifiedPortfolioRoute('#gallery-hms-elite'),
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/hotel-management-system',
      sourceCommit: '4df56a6217caab611f2f5fcbd98bde8386bb5629',
      dataClassification: 'synthetic-demo-seed',
      artifacts: [
        { path: '/media/projects/hms-elite/ui-actual.png', sha256: 'ba1b6f63a7277f438c8c97c63743aef1e795806a23a9211dc1fe8ceaf312089c' },
        { path: 'https://raw.githubusercontent.com/sjo1848/hotel-management-system/4df56a6217caab611f2f5fcbd98bde8386bb5629/docs/screenshots/04-bookings.png' },
        { path: 'https://raw.githubusercontent.com/sjo1848/hotel-management-system/4df56a6217caab611f2f5fcbd98bde8386bb5629/docs/media/hms-reception-workflow.gif' },
        { path: 'https://raw.githubusercontent.com/sjo1848/hotel-management-system/4df56a6217caab611f2f5fcbd98bde8386bb5629/docs/media/hms-mobile-reception.gif' },
      ],
    },
    proofLimitations: {
      en: 'Screenshots and manually played GIFs use the pinned synthetic demo seed; they show local/runtime evidence, not a hosted hotel product.',
      es: 'Las capturas y GIF reproducidos manualmente usan el seed sintético fijado; muestran evidencia local/del runtime, no un producto hotelero desplegado.',
    },
  },
  'jm-soluciones': {
    preferredProofMode: 'live-product',
    currentProofMode: 'visual-evidence',
    proofReadiness: 'pending-external-gate',
    proofHref: verifiedPortfolioRoute('#project-cover-jm-soluciones'),
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/jm-soluciones',
      sourceCommit: null,
      dataClassification: 'business-content-review-required',
      artifacts: [
        { path: '/media/jm-guide-desktop.webp', sha256: '06dca1b1560436b3b6e0ce4f40e27d386aab521f2ec4daf64f7b7d36844e6d6e' },
      ],
    },
    proofLimitations: {
      en: 'One static capture shows a guide result. The site has no verified public deployment URL; the screenshot does not establish traffic or conversion outcomes.',
      es: 'Una captura estática muestra el resultado del orientador. El sitio no tiene URL pública de despliegue verificada; la imagen no demuestra tráfico ni resultados de conversión.',
    },
  },
  'taco-loco': {
    preferredProofMode: 'visual-evidence',
    currentProofMode: 'visual-evidence',
    proofReadiness: 'available',
    proofHref: verifiedPortfolioRoute('#gallery-taco-loco'),
    proofProvenance: {
      sourceRepository: 'https://github.com/sjo1848/taco-loco-foodtrack',
      sourceCommit: null,
      dataClassification: 'business-content-review-required',
      artifacts: [
        { path: '/media/projects/taco-loco/menu-current-desktop.png', sha256: 'fdf8528fbbc5707464076c4db8a02d4179607f9719cc86f51aafa2c36ecd209d' },
        { path: '/media/projects/taco-loco/menu-current-mobile.png', sha256: '81b043968c7b88bbcaed373433845bb33bb85587dae16fd4c5d5a5fa5944778b' },
      ],
    },
    proofLimitations: {
      en: 'The images document the local MVP menu. Selection does not mean an order, payment, delivery or business acceptance was completed.',
      es: 'Las imágenes documentan el menú del MVP local. Seleccionar productos no significa que se haya completado un pedido, pago, entrega o aceptación del negocio.',
    },
  },
} satisfies Record<string, ProjectProof>;

export type ProjectProofSlug = keyof typeof projectProofs;

export function getProjectProof(slug: string): ProjectProof | null {
  return projectProofs[slug as ProjectProofSlug] ?? null;
}

export function getProofActionLabel(mode: ProofMode, lang: Language): string {
  const labels: Record<ProofMode, Readonly<Record<Language, string>>> = {
    'live-product': { en: 'Open product', es: 'Abrir producto' },
    'controlled-demo': { en: 'View walkthrough', es: 'Ver walkthrough' },
    'recorded-walkthrough': { en: 'View walkthrough', es: 'Ver walkthrough' },
    'visual-evidence': { en: 'View evidence', es: 'Ver evidencia' },
    'repository-case-only': { en: 'View GitHub', es: 'Ver GitHub' },
  };
  return labels[mode][lang];
}
