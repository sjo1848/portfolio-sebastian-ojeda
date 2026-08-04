import { spawn } from 'node:child_process';

const productionSiteUrl = 'https://portfolio-sebastian-ojeda.pages.dev';
const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error('Usage: node scripts/run-with-site-url.mjs <command> [...args]');
  process.exit(1);
}

const child = spawn(command, args, {
  stdio: 'inherit',
  env: {
    ...process.env,
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || productionSiteUrl,
  },
  shell: process.platform === 'win32',
});

child.once('error', (error) => {
  console.error(`Failed to start ${command}: ${error.message}`);
  process.exit(1);
});

child.once('exit', (code, signal) => {
  if (signal) {
    console.error(`${command} terminated by signal ${signal}`);
    process.exit(1);
  }

  process.exit(code ?? 1);
});
