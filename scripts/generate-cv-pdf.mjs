import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 38;
const TOP = 807;
const BOTTOM = 34;
const TEXT = [0.067, 0.094, 0.125];
const MUTED = [0.192, 0.235, 0.271];
const ACCENT = [0.541, 0.282, 0.157];
const COLUMN_GAP = 16;
const LEFT_WIDTH = 324;
const RIGHT_X = MARGIN_X + LEFT_WIDTH + COLUMN_GAP;
const RIGHT_WIDTH = PAGE_WIDTH - MARGIN_X - RIGHT_X;

const cp1252 = new Map([
  ['€', 0x80], ['‚', 0x82], ['ƒ', 0x83], ['„', 0x84], ['…', 0x85], ['†', 0x86], ['‡', 0x87],
  ['ˆ', 0x88], ['‰', 0x89], ['Š', 0x8a], ['‹', 0x8b], ['Œ', 0x8c], ['Ž', 0x8e], ['‘', 0x91],
  ['’', 0x92], ['“', 0x93], ['”', 0x94], ['•', 0x95], ['–', 0x96], ['—', 0x97], ['˜', 0x98],
  ['™', 0x99], ['š', 0x9a], ['›', 0x9b], ['œ', 0x9c], ['ž', 0x9e], ['Ÿ', 0x9f],
]);

function encodeWinAnsi(text) {
  const bytes = [];
  for (const char of text) {
    const code = char.codePointAt(0);
    if (code <= 0xff) bytes.push(code);
    else if (cp1252.has(char)) bytes.push(cp1252.get(char));
    else bytes.push(0x3f);
  }
  return Buffer.from(bytes).toString('hex').toUpperCase();
}

function color([r, g, b]) {
  return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`;
}

function estimateWidth(text, size, bold = false) {
  let units = 0;
  for (const char of text) {
    if (char === ' ') units += 0.28;
    else if ('ilI.,:;!|'.includes(char)) units += 0.24;
    else if ('mwMW@%'.includes(char)) units += 0.78;
    else if (/[A-ZÁÉÍÓÚÑ]/.test(char)) units += 0.62;
    else if (/[0-9]/.test(char)) units += 0.52;
    else units += 0.49;
  }
  return units * size * (bold ? 1.02 : 1);
}

function wrapText(text, maxWidth, size, bold = false) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && estimateWidth(candidate, size, bold) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const resumes = [
  {
    language: 'es',
    outputPath: path.join(process.cwd(), 'public', 'cv-sebastian-ojeda.pdf'),
    name: 'SEBASTIÁN OJEDA',
    title: 'SOFTWARE DEVELOPER | AI-FIRST | FULL STACK & SYSTEMS',
    contact: 'Mendoza, Argentina | sebastian.ojeda.dev@gmail.com | github.com/sjo1848 | sebastian-ojeda.pages.dev',
    availability: 'Remoto | Híbrido o presencial en Mendoza | Relocalización evaluable | Inglés intermedio',
    sections: {
      profile: 'Perfil profesional',
      skills: 'Competencias',
      projects: 'Proyectos seleccionados',
      experience: 'Experiencia profesional',
      method: 'Método AI-first',
      education: 'Formación',
    },
    profile:
      'Desarrollador de software orientado a construir soluciones end-to-end para procesos reales. Trabajo desde dominio y arquitectura hasta backend, interfaces, datos, integraciones, testing, CI/CD y operación. Desarrollo sistemas multi-tenant, migraciones cloud/serverless y experiencias AI/agentic con tool calling gobernado, Human-in-the-Loop, auditoría, idempotencia y fallback determinista.',
    skills: [
      ['AI / Agentic', 'LLMs, model routing, tool calling, HITL, policies, telemetry y fallback.'],
      ['Backend', 'TypeScript, Node.js, NestJS, Rust/Axum, Hono, REST y OpenAPI.'],
      ['Frontend / Mobile', 'React, Vue 3, React Native, Vite y Tailwind.'],
      ['Datos / Cloud', 'PostgreSQL, SQLx, Prisma, SQLite/D1, Docker, Workers y Linux.'],
      ['Quality / Enterprise', 'Playwright, Vitest, E2E, GitHub Actions, SAP Basis, PI/PO y CPI.'],
    ],
    projects: [
      {
        title: 'AI Commerce Platform - Agent Core multi-tenant',
        stack: 'TypeScript | LLMs | Tooling | Staging',
        bullets: [
          'Separa interpretación LLM de autoridad operacional mediante tools registradas, contexto confiable, políticas, HITL, auditoría e idempotencia.',
          'Integra HMS para disponibilidad, cotización y reservas; incluye evaluación de modelos, telemetría de latencia/costo y QA adversarial.',
        ],
        url: 'github.com/sjo1848/ai-commerce-platform',
      },
      {
        title: 'HMS Elite - Sistema hotelero multi-hotel',
        stack: 'Rust/Axum | PostgreSQL | React/TypeScript',
        bullets: [
          'Reservas, check-in/out, habitaciones, housekeeping, cargos y pagos con dominio modular y contratos OpenAPI.',
          'RBAC, aislamiento por hotel, RLS selectivo, CI full-stack, E2E browser/mobile, seguridad y recovery.',
        ],
        url: 'github.com/sjo1848/hotel-management-system',
      },
      {
        title: 'HMS Cloudflare - Migración brownfield cloud-native',
        stack: 'Workers | Hono | D1/SQLite | React',
        bullets: [
          'Migración parity-first a Workers + D1 preservando comportamiento, reglas de dominio y autorización.',
          'Control plane + D1 por hotel, Cloudflare Access, RBAC, regresiones, browser journeys y backup/restore rehearsal.',
        ],
        url: 'github.com/sjo1848/hms-cloudflare',
      },
      {
        title: 'GasFlow - Mobile Delivery Operations',
        stack: 'React Native | Rust/Axum | PostgreSQL',
        bullets: [
          'MVP móvil para pedidos programados, asignación de repartidores, entregas, stock y conciliación de envases.',
          'JWT, auditoría, métricas/request IDs, persistencia móvil y CI con pruebas de backend y app.',
        ],
        url: 'github.com/sjo1848/gasflow',
      },
      {
        title: 'Alquileres Uspallata - Catálogo y gestión',
        stack: 'NestJS | Vue 3 | PostgreSQL | Prisma',
        bullets: [
          'Catálogo público y flujos OWNER/ADMIN para revisión, publicación, disponibilidad, contacto y auditoría.',
        ],
        url: 'github.com/sjo1848/alquileres-uspa',
      },
    ],
    experience: [
      {
        title: 'Gotechy - Consultor SAP Basis e Integraciones | 2022-2023',
        bullets: [
          'SAP/HANA, jobs, dumps, certificados y backups; diagnóstico de incidencias y continuidad operativa.',
          'PI/PO, CPI, IDoc y workflows/automatización con SAP BTP/BPA.',
        ],
      },
      {
        title: 'Rubinzal Culzoni - Soporte Técnico / Programador PHP Jr.',
        bullets: ['Soporte a usuarios, troubleshooting y desarrollo/mantenimiento de aplicaciones PHP.'],
      },
    ],
    method: [
      'Project Method / Harness con objetivos y criterios de salida verificables, Task Contracts, estado canónico y trazabilidad.',
      'Critic independiente, Integration Review, Human Gates y evidencia de CI antes de declarar PASS.',
    ],
    education: [
      'UTN - estudios universitarios incompletos en Ingeniería en Sistemas de Información e Ingeniería Electrónica.',
      'Gestor en Logística Minera - ISTEEC - en curso.',
      'Power BI Intermedio, Introducción a Ciencia de Datos y Business English - Santander Open Academy.',
    ],
    footer: 'Sebastián Ojeda | Software Developer | Septiembre 2026',
    pdfTitle: 'CV Sebastian Ojeda - Software Developer AI-First',
    pdfSubject: 'Curriculum profesional de desarrollo de software, sistemas AI-first y plataformas operativas',
  },
  {
    language: 'en',
    outputPath: path.join(process.cwd(), 'public', 'cv-sebastian-ojeda-en.pdf'),
    name: 'SEBASTIÁN OJEDA',
    title: 'SOFTWARE DEVELOPER | AI-FIRST | FULL STACK & SYSTEMS',
    contact: 'Mendoza, Argentina | sebastian.ojeda.dev@gmail.com | github.com/sjo1848 | sebastian-ojeda.pages.dev',
    availability: 'Remote | Hybrid or on-site in Mendoza | Relocation considered | Intermediate English',
    sections: {
      profile: 'Professional profile',
      skills: 'Skills',
      projects: 'Selected projects',
      experience: 'Professional experience',
      method: 'AI-first method',
      education: 'Education',
    },
    profile:
      'Software developer focused on building end-to-end solutions for real operational processes. I work from domain and architecture through backend, interfaces, data, integrations, testing, CI/CD and operations. I build multi-tenant systems, cloud/serverless migrations and AI/agentic experiences with governed tool calling, Human-in-the-Loop, auditability, idempotency and deterministic fallback.',
    skills: [
      ['AI / Agentic', 'LLMs, model routing, tool calling, HITL, policies, telemetry, and fallback.'],
      ['Backend', 'TypeScript, Node.js, NestJS, Rust/Axum, Hono, REST, and OpenAPI.'],
      ['Frontend / Mobile', 'React, Vue 3, React Native, Vite, and Tailwind.'],
      ['Data / Cloud', 'PostgreSQL, SQLx, Prisma, SQLite/D1, Docker, Workers, and Linux.'],
      ['Quality / Enterprise', 'Playwright, Vitest, E2E, GitHub Actions, SAP Basis, PI/PO, and CPI.'],
    ],
    projects: [
      {
        title: 'AI Commerce Platform - Multi-tenant Agent Core',
        stack: 'TypeScript | LLMs | Tooling | Staging',
        bullets: [
          'Separates LLM interpretation from operational authority through registered tools, trusted context, policies, HITL, auditability and idempotency.',
          'Integrates with HMS for availability, quoting and reservations; includes model evaluation, latency/cost telemetry and adversarial QA.',
        ],
        url: 'github.com/sjo1848/ai-commerce-platform',
      },
      {
        title: 'HMS Elite - Multi-hotel management system',
        stack: 'Rust/Axum | PostgreSQL | React/TypeScript',
        bullets: [
          'Reservations, check-in/out, rooms, housekeeping, charges and payments with modular domain boundaries and OpenAPI contracts.',
          'RBAC, hotel isolation, selective RLS, full-stack CI, browser/mobile E2E, security and recovery.',
        ],
        url: 'github.com/sjo1848/hotel-management-system',
      },
      {
        title: 'HMS Cloudflare - Brownfield cloud-native migration',
        stack: 'Workers | Hono | D1/SQLite | React',
        bullets: [
          'Parity-first migration to Workers + D1 while preserving observable behavior, domain rules and authorization.',
          'Control plane + per-hotel D1, Cloudflare Access, RBAC, regressions, browser journeys and backup/restore rehearsal.',
        ],
        url: 'github.com/sjo1848/hms-cloudflare',
      },
      {
        title: 'GasFlow - Mobile Delivery Operations',
        stack: 'React Native | Rust/Axum | PostgreSQL',
        bullets: [
          'Mobile MVP for scheduled orders, driver assignment, deliveries, stock and cylinder reconciliation.',
          'JWT, audit events, metrics/request IDs, mobile persistence and CI with backend and app tests.',
        ],
        url: 'github.com/sjo1848/gasflow',
      },
      {
        title: 'Alquileres Uspallata - Rental catalog and management',
        stack: 'NestJS | Vue 3 | PostgreSQL | Prisma',
        bullets: [
          'Public catalog plus OWNER/ADMIN workflows for review, publication, availability, contact and audit.',
        ],
        url: 'github.com/sjo1848/alquileres-uspa',
      },
    ],
    experience: [
      {
        title: 'Gotechy - SAP Basis & Integrations Consultant | 2022-2023',
        bullets: [
          'SAP/HANA, jobs, dumps, certificates and backups; incident diagnosis and service continuity.',
          'PI/PO, CPI, IDoc and workflows/automation with SAP BTP/BPA.',
        ],
      },
      {
        title: 'Rubinzal Culzoni - Technical Support / Junior PHP Developer',
        bullets: ['User support, troubleshooting, and PHP application development and maintenance.'],
      },
    ],
    method: [
      'Project Method / Harness with verifiable objectives and exit criteria, Task Contracts, canonical state and traceability.',
      'Independent Critic, Integration Review, Human Gates and CI evidence before declaring PASS.',
    ],
    education: [
      'UTN - incomplete university studies in Information Systems Engineering and Electronic Engineering.',
      'Mining Logistics Management Program - ISTEEC - in progress.',
      'Intermediate Power BI, Introduction to Data Science, and Business English - Santander Open Academy.',
    ],
    footer: 'Sebastián Ojeda | Software Developer | September 2026',
    pdfTitle: 'Resume Sebastian Ojeda - AI-First Software Developer',
    pdfSubject: 'Professional resume focused on software development, AI-first systems and operational platforms',
  },
];

function buildPdf(resume) {
  const commands = [];

  function drawText(text, x, baselineY, { size = 8, bold = false, fill = TEXT } = {}) {
    commands.push('BT');
    commands.push(color(fill));
    commands.push(`/${bold ? 'F2' : 'F1'} ${size.toFixed(2)} Tf`);
    commands.push(`1 0 0 1 ${x.toFixed(2)} ${baselineY.toFixed(2)} Tm`);
    commands.push(`<${encodeWinAnsi(text)}> Tj`);
    commands.push('ET');
  }

  function drawCentered(text, baselineY, options = {}) {
    const width = estimateWidth(text, options.size ?? 8, options.bold ?? false);
    drawText(text, (PAGE_WIDTH - width) / 2, baselineY, options);
  }

  function drawRule(x, width, baselineY) {
    commands.push(`${ACCENT[0]} ${ACCENT[1]} ${ACCENT[2]} RG`);
    commands.push('0.65 w');
    commands.push(`${x.toFixed(2)} ${baselineY.toFixed(2)} m ${(x + width).toFixed(2)} ${baselineY.toFixed(2)} l S`);
  }

  function addParagraph(text, x, width, y, { size = 8, bold = false, fill = TEXT, gapAfter = 2, lineHeight = size * 1.18 } = {}) {
    const lines = wrapText(text, width, size, bold);
    for (const line of lines) {
      drawText(line, x, y, { size, bold, fill });
      y -= lineHeight;
    }
    return y - gapAfter;
  }

  function addSection(title, x, width, y, { size = 10.0 } = {}) {
    y -= 1.5;
    drawText(title.toUpperCase(), x, y, { size, bold: true });
    y -= 2.7;
    drawRule(x, width, y);
    return y - 11.1;
  }

  function addItemTitle(text, x, width, y, { size = 9.05 } = {}) {
    const lines = wrapText(text, width, size, true);
    for (const line of lines) {
      drawText(line, x, y, { size, bold: true });
      y -= 9.8;
    }
    return y - 0.2;
  }

  function addBullet(text, x, width, y, { size = 8.15, gapAfter = 0.5 } = {}) {
    const prefix = '- ';
    const indent = 7.5;
    const lines = wrapText(text, width - indent - estimateWidth(prefix, size), size, false);
    lines.forEach((line, index) => {
      drawText(index === 0 ? `${prefix}${line}` : line, x + (index === 0 ? 0 : indent), y, { size });
      y -= 9.7;
    });
    return y - gapAfter;
  }

  let y = TOP;
  drawCentered(resume.name, y, { size: 19.2, bold: true });
  y -= 21.5;
  drawCentered(resume.title, y, { size: 10.5, bold: true, fill: ACCENT });
  y -= 13.4;
  drawCentered(resume.contact, y, { size: 7.9, fill: MUTED });
  y -= 10.5;
  drawCentered(resume.availability, y, { size: 7.35, fill: MUTED });
  y -= 12.5;

  y = addSection(resume.sections.profile, MARGIN_X, PAGE_WIDTH - 2 * MARGIN_X, y);
  y = addParagraph(resume.profile, MARGIN_X, PAGE_WIDTH - 2 * MARGIN_X, y, { size: 8.65, gapAfter: 4, lineHeight: 10.35 });

  let leftY = y;
  let rightY = y;

  leftY = addSection(resume.sections.projects, MARGIN_X, LEFT_WIDTH, leftY);
  for (const project of resume.projects) {
    leftY = addItemTitle(project.title, MARGIN_X, LEFT_WIDTH, leftY);
    leftY = addParagraph(project.stack, MARGIN_X, LEFT_WIDTH, leftY, { size: 7.9, bold: true, fill: MUTED, gapAfter: 1.0, lineHeight: 9.0 });
    for (const bullet of project.bullets) leftY = addBullet(bullet, MARGIN_X, LEFT_WIDTH, leftY);
    leftY = addParagraph(project.url, MARGIN_X, LEFT_WIDTH, leftY, { size: 7.7, fill: ACCENT, gapAfter: 3.4, lineHeight: 8.9 });
  }

  leftY = addSection(resume.sections.experience, MARGIN_X, LEFT_WIDTH, leftY);
  for (const item of resume.experience) {
    leftY = addItemTitle(item.title, MARGIN_X, LEFT_WIDTH, leftY, { size: 8.75 });
    for (const bullet of item.bullets) leftY = addBullet(bullet, MARGIN_X, LEFT_WIDTH, leftY, { size: 8.05 });
    leftY -= 1.2;
  }

  rightY = addSection(resume.sections.skills, RIGHT_X, RIGHT_WIDTH, rightY);
  for (const [label, detail] of resume.skills) {
    rightY = addParagraph(label, RIGHT_X, RIGHT_WIDTH, rightY, { size: 8.35, bold: true, gapAfter: 0.6, lineHeight: 9.3 });
    rightY = addParagraph(detail, RIGHT_X, RIGHT_WIDTH, rightY, { size: 7.95, fill: MUTED, gapAfter: 4.6, lineHeight: 9.2 });
  }

  rightY = addSection(resume.sections.method, RIGHT_X, RIGHT_WIDTH, rightY);
  for (const item of resume.method) {
    rightY = addBullet(item, RIGHT_X, RIGHT_WIDTH, rightY, { size: 7.9, gapAfter: 2.8 });
  }

  rightY = addSection(resume.sections.education, RIGHT_X, RIGHT_WIDTH, rightY);
  for (const item of resume.education) {
    rightY = addBullet(item, RIGHT_X, RIGHT_WIDTH, rightY, { size: 7.9, gapAfter: 2.6 });
  }

  const minY = Math.min(leftY, rightY);
  if (minY < BOTTOM + 20) {
    throw new Error(`${resume.language} resume content overflowed the page: y=${minY.toFixed(2)}`);
  }

  drawCentered(resume.footer, 22, { size: 6.7, fill: [0.4, 0.4, 0.4] });

  const content = commands.join('\n');
  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`;
  objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  objects[6] = `<< /Length ${Buffer.byteLength(content, 'binary')} >>\nstream\n${content}\nendstream`;
  objects[7] = `<< /Title (${resume.pdfTitle}) /Author (Sebastian Ojeda) /Subject (${resume.pdfSubject}) >>`;

  let pdf = '%PDF-1.7\n%\xE2\xE3\xCF\xD3\n';
  const offsets = [0];
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = Buffer.byteLength(pdf, 'binary');
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefOffset = Buffer.byteLength(pdf, 'binary');
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return { pdf, remainingSpace: minY - BOTTOM };
}

const requestedOutput = process.argv[2];
const selectedResumes = requestedOutput
  ? [{ ...resumes[0], outputPath: path.resolve(requestedOutput) }]
  : resumes;

for (const resume of selectedResumes) {
  const { pdf, remainingSpace } = buildPdf(resume);
  await mkdir(path.dirname(resume.outputPath), { recursive: true });
  await writeFile(resume.outputPath, Buffer.from(pdf, 'binary'));
  console.log(`Generated ${resume.outputPath}; remaining vertical space: ${remainingSpace.toFixed(1)} pt`);
}
