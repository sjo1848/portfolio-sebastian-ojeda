import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

// Defense in depth: old locally generated CV PDFs must never enter a Pages build.
for (const name of ['cv-sebastian-ojeda.pdf', 'cv-sebastian-ojeda-en.pdf']) {
  try {
    await unlink(resolve('public', name));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}
