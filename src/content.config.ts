import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number().int().positive(),
    featured: z.boolean(),
    category: z.string().min(1),
    summary: z.string().min(40),
    status: z.enum([
      'active-development',
      'functional-mvp',
      'functional-marketing-site',
      'remediation',
      'concept',
    ]),
    statusLabel: z.string().min(1),
    year: z.number().int().min(2020),
    role: z.string().min(1),
    repository: z.string().url(),
    demo: z.string().url().nullable(),
    stack: z.array(z.string().min(1)).min(1).max(8),
    evidenceNeeded: z.array(z.string().min(1)).default([]),
  }),
});

export const collections = { projects };
