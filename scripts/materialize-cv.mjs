import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceDirectory = path.join(root, 'assets', 'cv');
const outputDirectory = path.join(root, 'public');
const outputName = 'CV_Sebastian_Ojeda_Backend_FullStack.pdf';
const outputPath = path.join(outputDirectory, outputName);
const expectedSha256 = 'f2cf38873fbbe3db9f0352c68b4c8225a82b64205f740b8d29434ccc03944412';

const parts = (await readdir(sourceDirectory))
  .filter((file) => file.startsWith(`${outputName}.part`) && file.endsWith('.b64'))
  .sort((left, right) => left.localeCompare(right, 'en'));

if (parts.length === 0) {
  throw new Error(`No source parts found for ${outputName}.`);
}

const encodedParts = await Promise.all(
  parts.map(async (file) => (await readFile(path.join(sourceDirectory, file), 'utf8')).trim()),
);

const pdf = Buffer.from(encodedParts.join(''), 'base64');
const actualSha256 = createHash('sha256').update(pdf).digest('hex');

if (actualSha256 !== expectedSha256) {
  throw new Error(
    `CV integrity check failed. Expected ${expectedSha256}, received ${actualSha256}.`,
  );
}

if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-'))) {
  throw new Error('Materialized CV does not contain a valid PDF signature.');
}

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, pdf);
console.log(`Materialized ${outputName} from ${parts.length} verified source parts.`);
