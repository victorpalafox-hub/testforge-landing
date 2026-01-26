/**
 * Este script busca patrones de hardcodeo en el código
 * Claude Code puede ejecutarlo antes de hacer commits
 */

import { glob } from 'glob';
import * as fs from 'fs';

const FORBIDDEN_PATTERNS = [
  // Precios hardcodeados (números que parecen precios MXN)
  /(?<!\w)(145|235|285|190|475|570|760)(?!\w)/g,
  // Emails hardcodeados
  /['"`][\w.-]+@(?!example\.com)[\w.-]+\.[a-z]+['"`]/gi,
  // URLs hardcodeadas (excepto localhost)
  /['"`]https?:\/\/(?!localhost)[\w.-]+['"`]/gi,
];

const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', '.git'];
const INCLUDE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

async function validateNoHardcodes() {
  const files = await glob('**/*', {
    ignore: EXCLUDE_DIRS.map((d) => `**/${d}/**`),
  });

  const issues: { file: string; line: number; match: string }[] = [];

  for (const file of files) {
    if (!INCLUDE_EXTENSIONS.some((ext) => file.endsWith(ext))) continue;
    if (file.includes('config/')) continue; // Config files are OK
    if (file.includes('scripts/')) continue; // Scripts are OK

    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      FORBIDDEN_PATTERNS.forEach((pattern) => {
        const matches = line.match(pattern);
        if (matches) {
          issues.push({
            file,
            line: index + 1,
            match: matches[0],
          });
        }
      });
    });
  }

  if (issues.length > 0) {
    console.error('❌ Se encontraron posibles hardcodeos:\n');
    issues.forEach(({ file, line, match }) => {
      console.error(`  ${file}:${line} → "${match}"`);
    });
    process.exit(1);
  }

  console.log('✅ No se encontraron hardcodeos');
}

validateNoHardcodes();
