import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const target = resolve(process.argv[2] ?? 'dist/social-card.png');
const expectedWidth = 1200;
const expectedHeight = 630;
const minimumBytes = 20_000;
const maximumBytes = 1_000_000;
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function fail(message) {
  console.error(`Social card validation failed: ${message}`);
  process.exit(1);
}

let image;
let metadata;

try {
  [image, metadata] = await Promise.all([readFile(target), stat(target)]);
} catch (error) {
  fail(`cannot read ${target}: ${error instanceof Error ? error.message : String(error)}`);
}

if (image.length < 24) fail('file is too short to be a valid PNG.');
if (!image.subarray(0, 8).equals(pngSignature)) fail('invalid PNG signature.');
if (image.toString('ascii', 12, 16) !== 'IHDR') fail('missing PNG IHDR header.');

const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);

if (width !== expectedWidth || height !== expectedHeight) {
  fail(`expected ${expectedWidth}x${expectedHeight}, received ${width}x${height}.`);
}

if (metadata.size < minimumBytes) fail(`file is unexpectedly small (${metadata.size} bytes).`);
if (metadata.size > maximumBytes) fail(`file exceeds the ${maximumBytes}-byte budget (${metadata.size} bytes).`);

console.log(`Social card validation passed: ${width}x${height}, ${metadata.size} bytes.`);
