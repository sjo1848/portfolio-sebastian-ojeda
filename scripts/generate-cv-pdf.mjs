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
    title: 'DESARROLLADOR FULL STACK CON FOCO EN BACKEND',
    contact: 'Mendoza, Argentina | sebastian.ojeda.dev@gmail.com | github.com/sjo1848',
    availability: 'Remoto prioritario | Híbrido o presencial en Mendoza | Relocalización evaluable | Inglés intermedio',
    sections: {
      profile: 'Perfil profesional',
      skills: 'Competencias técnicas',
      projects: 'Proyectos destacados',
      experience: 'Experiencia relevante',
      education: 'Formación',
    },
    profile:
      'Desarrollador full stack orientado a backend, con experiencia en SAP Basis, integraciones y administración de sistemas y bases de datos. Construyo sistemas de gestión y aplicaciones operativas con Rust, TypeScript, PostgreSQL, React y React Native. Trabajo desde el análisis del dominio hasta APIs, persistencia, seguridad, pruebas automatizadas, CI/CD y despliegue.',
    skills: [
      ['Backend:', 'Rust, Axum, NestJS, Node.js, APIs REST, JWT, RBAC y modelado de dominio.'],
      ['Web y móvil:', 'React, React Native, Vue, Astro y TypeScript; responsive design y flujos operativos.'],
      ['Datos e infraestructura:', 'PostgreSQL, SQLx, Prisma, MySQL, MongoDB, Docker, Linux y GitHub Actions.'],
      ['Sistemas empresariales:', 'SAP R/3, S/4HANA, Basis, Solution Manager, SAP HANA, Sybase e integraciones PI/PO.'],
    ],
    projects: [
      {
        title: 'HMS Elite - SaaS multi-hotel | Rust, Axum, React, PostgreSQL',
        bullets: [
          'Modelado de reservas, habitaciones, huéspedes, facturación, housekeeping, reportes y auditoría.',
          'Multi-tenancy, RBAC, row-level security, transacciones, OpenAPI, CI y observabilidad.',
        ],
        url: 'github.com/sjo1848/hotel-management-system',
      },
      {
        title: 'GasFlow - Pedidos, entregas y stock | React Native, Rust, PostgreSQL',
        bullets: [
          'Flujos de administrador y repartidor, entregas programadas, asignaciones y conciliación de envases.',
          'JWT, trazabilidad, eventos de auditoría, métricas y pruebas de backend y aplicación móvil.',
        ],
        url: 'github.com/sjo1848/gasflow',
      },
      {
        title: 'JM Soluciones Eléctricas - Sitio comercial | Astro, TypeScript, Tailwind CSS',
        bullets: [
          'Landing mobile-first para servicios eléctricos, con UX orientada a conversión, SEO local y consulta guiada por WhatsApp.',
          'Contenido tipado, Vitest, preflight reproducible, contenedor Nginx y controles automáticos de release.',
        ],
        url: 'github.com/sjo1848/jm-soluciones',
      },
    ],
    experience: [
      {
        title: 'Gotechy - Consultor SAP Basis / Integrador de sistemas / Administrador de bases de datos',
        bullets: [
          'Administración y soporte de plataformas SAP, bases de datos e integraciones en entornos empresariales.',
          'Resolución de incidencias, continuidad de servicios, soporte a usuarios técnicos y documentación.',
        ],
      },
      {
        title: 'Rubinzal Culzoni - Servicio técnico de PC / Programador PHP Jr.',
        bullets: ['Soporte a usuarios, mantenimiento de equipos y desarrollo básico de aplicaciones en PHP.'],
      },
      {
        title: 'Serví Red - Administración / Soporte técnico',
        bullets: ['Gestión de servicios, atención a clientes, conectividad y configuración de routers.'],
      },
      {
        title: 'Línea Construcciones - Instalaciones eléctricas y redes',
        bullets: ['Tendido UTP, instalación y configuración de routers, obra eléctrica y soporte técnico en campo.'],
      },
    ],
    additionalExperience:
      'Experiencia adicional: administración y contabilidad en Nativa S.A.; mantenimiento en MAPSA/Penitentes; trabajos eléctricos autónomos.',
    education: [
      'Ingeniería en Sistemas de Información - UTN FRSF - 4.º año cursado (incompleto).',
      'Ingeniería Electrónica - UTN FRN - 3.º año cursado (incompleto).',
      'Gestor en Logística Minera - ISTEEC - en curso.',
      'Perito Mercantil, orientación Auxiliar Contable - C.P.E.M. N.º 37.',
      'Electricista domiciliario - UOCRA.',
    ],
    complementary:
      'Formación complementaria: Power BI Intermedio, Introducción a la Ciencia de Datos y Business English - Santander Open Academy.',
    footer: 'Sebastián Ojeda | CV tecnológico | Agosto 2026',
    pdfTitle: 'CV Sebastian Ojeda - Backend Full Stack',
    pdfSubject: 'Curriculum profesional orientado a backend y full stack',
  },
  {
    language: 'en',
    outputPath: path.join(process.cwd(), 'public', 'cv-sebastian-ojeda-en.pdf'),
    name: 'SEBASTIÁN OJEDA',
    title: 'BACKEND-FOCUSED FULL-STACK DEVELOPER',
    contact: 'Mendoza, Argentina | sebastian.ojeda.dev@gmail.com | github.com/sjo1848',
    availability: 'Remote-first | Hybrid or on-site in Mendoza | Relocation considered | Intermediate English',
    sections: {
      profile: 'Professional profile',
      skills: 'Technical skills',
      projects: 'Featured projects',
      experience: 'Relevant experience',
      education: 'Education',
    },
    profile:
      'Backend-focused full-stack developer with experience in SAP Basis, integrations, systems administration, and databases. I build management systems and operational applications with Rust, TypeScript, PostgreSQL, React, and React Native. I work from domain analysis through APIs, persistence, security, automated testing, CI/CD, and deployment.',
    skills: [
      ['Backend:', 'Rust, Axum, NestJS, Node.js, REST APIs, JWT, RBAC, and domain modeling.'],
      ['Web and mobile:', 'React, React Native, Vue, Astro, and TypeScript; responsive design and operational workflows.'],
      ['Data and infrastructure:', 'PostgreSQL, SQLx, Prisma, MySQL, MongoDB, Docker, Linux, and GitHub Actions.'],
      ['Enterprise systems:', 'SAP R/3, S/4HANA, Basis, Solution Manager, SAP HANA, Sybase, and PI/PO integrations.'],
    ],
    projects: [
      {
        title: 'HMS Elite - Multi-hotel SaaS | Rust, Axum, React, PostgreSQL',
        bullets: [
          'Reservations, rooms, guests, billing, housekeeping, reporting, and audit-domain modeling.',
          'Multi-tenancy, RBAC, row-level security, transactions, OpenAPI, CI, and observability.',
        ],
        url: 'github.com/sjo1848/hotel-management-system',
      },
      {
        title: 'GasFlow - Orders, deliveries, and stock | React Native, Rust, PostgreSQL',
        bullets: [
          'Administrator and driver workflows, scheduled deliveries, assignment, and cylinder reconciliation.',
          'JWT, traceability, audit events, metrics, and backend and mobile application testing.',
        ],
        url: 'github.com/sjo1848/gasflow',
      },
      {
        title: 'JM Soluciones - Commercial website | Astro, TypeScript, Tailwind CSS',
        bullets: [
          'Mobile-first electrical-services landing page with conversion-focused UX, local SEO, and guided WhatsApp inquiries.',
          'Typed content, Vitest, reproducible preflight, Nginx container, and automated release controls.',
        ],
        url: 'github.com/sjo1848/jm-soluciones',
      },
    ],
    experience: [
      {
        title: 'Gotechy - SAP Basis Consultant / Systems Integrator / Database Administrator',
        bullets: [
          'Administration and support of SAP platforms, databases, and integrations in enterprise environments.',
          'Incident resolution, service continuity, technical user support, and documentation.',
        ],
      },
      {
        title: 'Rubinzal Culzoni - PC Support Technician / Junior PHP Developer',
        bullets: ['User support, computer maintenance, and basic PHP application development.'],
      },
      {
        title: 'Serví Red - Administration / Technical Support',
        bullets: ['Service management, customer support, connectivity, and router configuration.'],
      },
      {
        title: 'Línea Construcciones - Electrical and Network Installations',
        bullets: ['UTP cabling, router installation and configuration, electrical work, and field technical support.'],
      },
    ],
    additionalExperience:
      'Additional experience: administration and accounting at Nativa S.A.; maintenance at MAPSA/Penitentes; independent electrical work.',
    education: [
      'Information Systems Engineering - UTN FRSF - completed coursework through year 4 (incomplete degree).',
      'Electronic Engineering - UTN FRN - completed coursework through year 3 (incomplete degree).',
      'Mining Logistics Management Program - ISTEEC - in progress.',
      'Commercial high-school diploma with accounting specialization - C.P.E.M. No. 37.',
      'Residential Electrician - UOCRA.',
    ],
    complementary:
      'Additional training: Intermediate Power BI, Introduction to Data Science, and Business English - Santander Open Academy.',
    footer: 'Sebastián Ojeda | Technology resume | August 2026',
    pdfTitle: 'Resume Sebastian Ojeda - Backend Full Stack',
    pdfSubject: 'Professional resume focused on backend and full-stack development',
  },
];

function buildPdf(resume) {
  const commands = [];
  let y = TOP;

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

  function drawRule(baselineY) {
    commands.push(`${ACCENT[0]} ${ACCENT[1]} ${ACCENT[2]} RG`);
    commands.push('0.65 w');
    commands.push(`${MARGIN_X} ${baselineY.toFixed(2)} m ${(PAGE_WIDTH - MARGIN_X).toFixed(2)} ${baselineY.toFixed(2)} l S`);
  }

  function addParagraph(text, { size = 8, bold = false, fill = TEXT, indent = 0, gapAfter = 2, lineHeight = size * 1.18 } = {}) {
    const width = PAGE_WIDTH - 2 * MARGIN_X - indent;
    const lines = wrapText(text, width, size, bold);
    for (const line of lines) {
      drawText(line, MARGIN_X + indent, y, { size, bold, fill });
      y -= lineHeight;
    }
    y -= gapAfter;
  }

  function addSection(title) {
    y -= 2;
    drawText(title.toUpperCase(), MARGIN_X, y, { size: 9.7, bold: true });
    y -= 2.8;
    drawRule(y);
    y -= 11.6;
  }

  function addItemTitle(text) {
    const lines = wrapText(text, PAGE_WIDTH - 2 * MARGIN_X, 8.55, true);
    for (const line of lines) {
      drawText(line, MARGIN_X, y, { size: 8.55, bold: true });
      y -= 10.1;
    }
    y -= 0.4;
  }

  function addBullet(text) {
    const prefix = '- ';
    const size = 7.85;
    const indent = 8;
    const width = PAGE_WIDTH - 2 * MARGIN_X - indent;
    const lines = wrapText(text, width - estimateWidth(prefix, size), size, false);
    lines.forEach((line, index) => {
      drawText(index === 0 ? `${prefix}${line}` : line, MARGIN_X + (index === 0 ? 1 : indent), y, { size });
      y -= 9.15;
    });
    y -= 0.1;
  }

  drawCentered(resume.name, y, { size: 19.2, bold: true });
  y -= 21.5;
  drawCentered(resume.title, y, { size: 10.5, bold: true, fill: ACCENT });
  y -= 13.4;
  drawCentered(resume.contact, y, { size: 7.9, fill: MUTED });
  y -= 10.5;
  drawCentered(resume.availability, y, { size: 7.35, fill: MUTED });
  y -= 12.5;

  addSection(resume.sections.profile);
  addParagraph(resume.profile, { size: 8.05, gapAfter: 2.2, lineHeight: 9.55 });

  addSection(resume.sections.skills);
  for (const [label, detail] of resume.skills) {
    drawText(label, MARGIN_X, y, { size: 7.95, bold: true });
    drawText(detail, MARGIN_X + 126, y, { size: 7.95 });
    y -= 9.65;
  }
  y -= 0.4;

  addSection(resume.sections.projects);
  for (const project of resume.projects) {
    addItemTitle(project.title);
    for (const bullet of project.bullets) addBullet(bullet);
    addParagraph(project.url, { size: 7.6, fill: ACCENT, gapAfter: 1.2, lineHeight: 8.8 });
  }

  addSection(resume.sections.experience);
  for (const item of resume.experience) {
    addItemTitle(item.title);
    for (const bullet of item.bullets) addBullet(bullet);
  }
  addParagraph(resume.additionalExperience, { size: 7.7, gapAfter: 0.8, lineHeight: 9.0 });

  addSection(resume.sections.education);
  for (const item of resume.education) addBullet(item);
  addParagraph(resume.complementary, { size: 7.7, lineHeight: 9.0, gapAfter: 0 });

  if (y < BOTTOM) {
    throw new Error(`${resume.language} resume content overflowed the page: y=${y.toFixed(2)}`);
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

  return { pdf, remainingSpace: y - BOTTOM };
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
