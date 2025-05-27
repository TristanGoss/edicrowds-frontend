// check code line coverage. Yes, I know you can use c8 to do this, but I'm developing on windows and the c8 install is flakey there.
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Workaround for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const summaryPath = join(__dirname, '../../coverage/coverage-summary.json');

try {
  const raw = await readFile(summaryPath, 'utf-8');
  const summary = JSON.parse(raw);
  const coverage = summary.total.lines.pct;

  if (coverage < 30) {
    console.error(`\x1b[31m Test line coverage too low: ${coverage}% (expected ≥ 30%) \x1b[0m`);
    process.exit(1);
  } else {
    console.log(`Test line coverage sufficient: ${coverage}%`);
  }
} catch (err) {
  console.error('\x1b[31m Failed to read coverage report: \x1b[0m', err);
  process.exit(1);
}
