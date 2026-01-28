#!/usr/bin/env node

/**
 * AUTO-REVISION COMPLETA DEL PROYECTO TESTFORGE
 *
 * Ejecuta 6 categorias de validacion:
 * 1. Compilacion y Sintaxis
 * 2. Valores Hardcodeados
 * 3. Manejo de Errores
 * 4. Codigo Duplicado
 * 5. Best Practices
 * 6. Seguridad
 *
 * Uso: npm run auto-review
 */

import { spawn } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';
import chalk from 'chalk';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  // Directorios a analizar
  srcDirs: ['app', 'components', 'lib', 'hooks', 'utils', 'services'],
  // Extensiones de codigo
  codeExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  // Archivos a ignorar
  ignorePatterns: ['node_modules', '.next', 'dist', '.git', '*.test.*', '*.spec.*'],
  // Directorio para reportes
  reportsDir: 'docs/reviews',
  // Limite de lineas por archivo
  maxLinesPerFile: 500,
  // Limite de uso de 'any'
  maxAnyUsage: 0,
};

// ═══════════════════════════════════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════════════════════════════════

const results = {
  categories: {},
  totalIssues: 0,
  criticalIssues: 0,
  startTime: null,
  endTime: null,
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════════════════

function formatTime(ms) {
  if (ms < 1000) return `${ms}ms`;
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}s`;
}

function getDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function getDateTime() {
  return new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
}

function printHeader(text) {
  console.log('');
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log(chalk.cyan.bold(`   ${text}`));
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log('');
}

function printSection(text) {
  console.log('');
  console.log(chalk.yellow(`--- ${text} ---`));
  console.log('');
}

function printResult(passed, message) {
  if (passed) {
    console.log(chalk.green(`   ✅ ${message}`));
  } else {
    console.log(chalk.red(`   ❌ ${message}`));
  }
}

function printWarning(message) {
  console.log(chalk.yellow(`   ⚠️  ${message}`));
}

function printInfo(message) {
  console.log(chalk.gray(`   ℹ️  ${message}`));
}

function printIssue(severity, file, line, message) {
  const colors = {
    CRITICO: chalk.red.bold,
    ALTO: chalk.red,
    MEDIO: chalk.yellow,
    BAJO: chalk.gray,
  };
  const color = colors[severity] || chalk.white;
  const location = line ? `${file}:${line}` : file;
  console.log(color(`   [${severity}] ${location} - ${message}`));
}

// ═══════════════════════════════════════════════════════════════════════════
// OBTENCION DE ARCHIVOS
// ═══════════════════════════════════════════════════════════════════════════

function shouldIgnore(filePath) {
  return CONFIG.ignorePatterns.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

function getAllFiles(dir, files = []) {
  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);

    if (shouldIgnore(fullPath)) continue;

    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (CONFIG.codeExtensions.includes(extname(entry))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getSourceFiles() {
  const files = [];

  for (const dir of CONFIG.srcDirs) {
    if (existsSync(dir)) {
      getAllFiles(dir, files);
    }
  }

  return files;
}

// ═══════════════════════════════════════════════════════════════════════════
// EJECUTAR COMANDO
// ═══════════════════════════════════════════════════════════════════════════

async function runCommand(command, args = []) {
  return new Promise((resolve) => {
    const proc = spawn(command, args, {
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd(),
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      resolve({
        success: code === 0,
        stdout,
        stderr,
        exitCode: code,
      });
    });

    proc.on('error', (error) => {
      resolve({
        success: false,
        stdout: '',
        stderr: error.message,
        exitCode: 1,
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIA 1: COMPILACION Y SINTAXIS
// ═══════════════════════════════════════════════════════════════════════════

async function checkCompilationAndSyntax() {
  printSection('CATEGORIA 1: COMPILACION Y SINTAXIS');

  const issues = [];
  let passed = true;

  // 1.1 TypeScript compilation
  console.log(chalk.blue('   Ejecutando verificacion TypeScript...'));
  const tscResult = await runCommand('npx', ['tsc', '--noEmit']);

  if (!tscResult.success) {
    passed = false;
    const errors = tscResult.stdout.split('\n').filter(line => line.includes('error'));
    errors.forEach(error => {
      const match = error.match(/(.+)\((\d+),\d+\):\s*error\s*TS\d+:\s*(.+)/);
      if (match) {
        issues.push({
          severity: 'ALTO',
          file: match[1],
          line: match[2],
          message: match[3],
        });
      }
    });
    printResult(false, `TypeScript: ${errors.length} errores encontrados`);
  } else {
    printResult(true, 'TypeScript compila sin errores');
  }

  // 1.2 Verificar package.json
  console.log(chalk.blue('   Verificando dependencias...'));
  if (existsSync('package.json')) {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

    // Verificar imports en archivos
    const files = getSourceFiles();
    const missingDeps = new Set();

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const importMatches = content.matchAll(/import\s+.*\s+from\s+['"]([^./][^'"]+)['"]/g);

      for (const match of importMatches) {
        const pkg = match[1].split('/')[0];
        if (pkg.startsWith('@')) {
          const scopedPkg = match[1].split('/').slice(0, 2).join('/');
          if (!allDeps[scopedPkg] && !scopedPkg.startsWith('@/')) {
            missingDeps.add(scopedPkg);
          }
        } else if (!allDeps[pkg] && !['react', 'next'].includes(pkg)) {
          // Algunos packages vienen con Next.js
          if (!pkg.startsWith('next/')) {
            missingDeps.add(pkg);
          }
        }
      }
    }

    if (missingDeps.size > 0) {
      printWarning(`Posibles dependencias faltantes: ${[...missingDeps].join(', ')}`);
    } else {
      printResult(true, 'Todas las dependencias estan instaladas');
    }
  }

  // 1.3 ESLint
  console.log(chalk.blue('   Ejecutando ESLint...'));
  const lintResult = await runCommand('npm', ['run', 'lint']);

  if (!lintResult.success) {
    const errorCount = (lintResult.stdout.match(/error/gi) || []).length;
    if (errorCount > 0) {
      passed = false;
      printResult(false, `ESLint: ${errorCount} errores encontrados`);
    }
  } else {
    printResult(true, 'ESLint: sin errores');
  }

  results.categories['Compilacion y Sintaxis'] = {
    passed,
    issues,
    status: passed ? 'APROBADO' : 'ERRORES',
  };

  return passed;
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIA 2: VALORES HARDCODEADOS
// ═══════════════════════════════════════════════════════════════════════════

async function checkHardcodedValues() {
  printSection('CATEGORIA 2: VALORES HARDCODEADOS');

  const issues = [];
  let passed = true;

  const files = getSourceFiles();

  // Patrones a buscar
  const patterns = {
    apiKeys: [
      /['"]sk-[a-zA-Z0-9]{20,}['"]/g,
      /['"]pk_[a-zA-Z0-9]{20,}['"]/g,
      /api[_-]?key\s*[:=]\s*['"][^'"]{10,}['"]/gi,
      /secret[_-]?key\s*[:=]\s*['"][^'"]{10,}['"]/gi,
    ],
    credentials: [
      /password\s*[:=]\s*['"][^'"]+['"]/gi,
      /secret\s*[:=]\s*['"][^process][^'"]+['"]/gi,
      /token\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/gi,
    ],
    urls: [
      /['"]https?:\/\/(?!localhost|127\.0\.0\.1|example\.com)[^'"]+['"]/g,
    ],
    ports: [
      /:\s*(3000|8080|5432|27017|6379)\b/g,
    ],
  };

  let apiKeysFound = 0;
  let urlsFound = 0;
  let credentialsFound = 0;

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const relativePath = relative(process.cwd(), file);

    // Ignorar archivos de configuracion permitidos
    if (relativePath.includes('config/') || relativePath.includes('.example')) {
      continue;
    }

    lines.forEach((line, index) => {
      // Ignorar comentarios
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
        return;
      }

      // API Keys
      patterns.apiKeys.forEach(pattern => {
        if (pattern.test(line)) {
          apiKeysFound++;
          issues.push({
            severity: 'CRITICO',
            file: relativePath,
            line: index + 1,
            message: 'Posible API key hardcodeada detectada',
          });
          passed = false;
        }
      });

      // Credentials
      patterns.credentials.forEach(pattern => {
        if (pattern.test(line) && !line.includes('process.env')) {
          credentialsFound++;
          issues.push({
            severity: 'CRITICO',
            file: relativePath,
            line: index + 1,
            message: 'Posible credencial hardcodeada detectada',
          });
          passed = false;
        }
      });

      // URLs (solo advertencia)
      patterns.urls.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches && !line.includes('process.env') && !line.includes('example')) {
          urlsFound++;
          // Solo advertencia, no falla
          issues.push({
            severity: 'MEDIO',
            file: relativePath,
            line: index + 1,
            message: `URL hardcodeada: ${matches[0].substring(0, 50)}...`,
          });
        }
      });
    });
  }

  // Verificar .env.example existe
  const envExampleExists = existsSync('.env.example') || existsSync('.env.local.example');

  printResult(apiKeysFound === 0, `API keys hardcodeadas: ${apiKeysFound} encontradas`);
  printResult(credentialsFound === 0, `Credenciales hardcodeadas: ${credentialsFound} encontradas`);
  printInfo(`URLs hardcodeadas: ${urlsFound} encontradas (revisar manualmente)`);
  printResult(envExampleExists, '.env.example existe');

  if (issues.length > 0) {
    console.log('');
    console.log(chalk.yellow('   Issues encontrados:'));
    issues.slice(0, 10).forEach(issue => {
      printIssue(issue.severity, issue.file, issue.line, issue.message);
    });
    if (issues.length > 10) {
      printInfo(`... y ${issues.length - 10} issues mas`);
    }
  }

  results.categories['Valores Hardcodeados'] = {
    passed,
    issues,
    status: passed ? 'APROBADO' : (apiKeysFound > 0 || credentialsFound > 0 ? 'ERRORES' : 'ADVERTENCIAS'),
    stats: { apiKeysFound, urlsFound, credentialsFound },
  };

  return passed;
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIA 3: MANEJO DE ERRORES
// ═══════════════════════════════════════════════════════════════════════════

async function checkErrorHandling() {
  printSection('CATEGORIA 3: MANEJO DE ERRORES');

  const issues = [];
  let asyncWithoutTryCatch = 0;
  let thenWithoutCatch = 0;
  let criticalOpsWithoutHandling = 0;

  const files = getSourceFiles();

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const relativePath = relative(process.cwd(), file);

    // Buscar async/await sin try-catch (analisis simplificado)
    let inAsyncFunction = false;
    let hasTryCatch = false;
    let asyncStartLine = 0;
    let braceCount = 0;

    lines.forEach((line, index) => {
      // Detectar inicio de funcion async
      if (line.includes('async') && (line.includes('function') || line.includes('=>'))) {
        inAsyncFunction = true;
        asyncStartLine = index + 1;
        hasTryCatch = false;
        braceCount = 0;
      }

      if (inAsyncFunction) {
        braceCount += (line.match(/{/g) || []).length;
        braceCount -= (line.match(/}/g) || []).length;

        if (line.includes('try') && line.includes('{')) {
          hasTryCatch = true;
        }

        // Fin de la funcion
        if (braceCount <= 0 && asyncStartLine !== index + 1) {
          if (!hasTryCatch && content.substring(
            lines.slice(0, asyncStartLine - 1).join('\n').length,
            lines.slice(0, index + 1).join('\n').length
          ).includes('await')) {
            asyncWithoutTryCatch++;
            issues.push({
              severity: 'MEDIO',
              file: relativePath,
              line: asyncStartLine,
              message: 'Funcion async con await sin try-catch',
            });
          }
          inAsyncFunction = false;
        }
      }

      // Buscar .then() sin .catch()
      if (line.includes('.then(') && !content.substring(
        lines.slice(0, index).join('\n').length,
        lines.slice(0, Math.min(index + 5, lines.length)).join('\n').length
      ).includes('.catch(')) {
        thenWithoutCatch++;
        issues.push({
          severity: 'BAJO',
          file: relativePath,
          line: index + 1,
          message: 'Promise con .then() sin .catch() cercano',
        });
      }

      // Operaciones criticas sin manejo de errores
      const criticalOps = ['JSON.parse', 'fs.readFile', 'fs.writeFile', 'fetch('];
      criticalOps.forEach(op => {
        if (line.includes(op) && !lines.slice(Math.max(0, index - 3), index).some(l => l.includes('try'))) {
          // Verificar si esta dentro de un try-catch
          const prevLines = lines.slice(Math.max(0, index - 10), index).join('\n');
          if (!prevLines.includes('try {') && !prevLines.includes('try{')) {
            criticalOpsWithoutHandling++;
            issues.push({
              severity: 'MEDIO',
              file: relativePath,
              line: index + 1,
              message: `${op} sin manejo de errores visible`,
            });
          }
        }
      });
    });
  }

  const passed = asyncWithoutTryCatch < 5 && criticalOpsWithoutHandling < 3;

  printResult(asyncWithoutTryCatch === 0, `Funciones async sin try-catch: ${asyncWithoutTryCatch}`);
  printResult(thenWithoutCatch === 0, `.then() sin .catch(): ${thenWithoutCatch}`);
  printResult(criticalOpsWithoutHandling === 0, `Operaciones criticas sin manejo: ${criticalOpsWithoutHandling}`);

  if (issues.length > 0 && issues.length <= 5) {
    console.log('');
    console.log(chalk.yellow('   Issues encontrados:'));
    issues.forEach(issue => {
      printIssue(issue.severity, issue.file, issue.line, issue.message);
    });
  } else if (issues.length > 5) {
    console.log('');
    printInfo(`${issues.length} issues de manejo de errores encontrados`);
  }

  results.categories['Manejo de Errores'] = {
    passed,
    issues,
    status: passed ? 'APROBADO' : 'ADVERTENCIAS',
    stats: { asyncWithoutTryCatch, thenWithoutCatch, criticalOpsWithoutHandling },
  };

  return passed;
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIA 4: CODIGO DUPLICADO
// ═══════════════════════════════════════════════════════════════════════════

async function checkDuplicateCode() {
  printSection('CATEGORIA 4: CODIGO DUPLICADO');

  const issues = [];
  const stringOccurrences = new Map();
  const codeBlocks = new Map();

  const files = getSourceFiles();

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const relativePath = relative(process.cwd(), file);

    // Buscar strings repetidos (>20 caracteres)
    const stringMatches = content.matchAll(/['"]([^'"]{20,})['"]/g);
    for (const match of stringMatches) {
      const str = match[1];
      if (!stringOccurrences.has(str)) {
        stringOccurrences.set(str, []);
      }
      stringOccurrences.get(str).push(relativePath);
    }

    // Buscar bloques de codigo similares (simplificado)
    const lines = content.split('\n');
    for (let i = 0; i < lines.length - 5; i++) {
      const block = lines.slice(i, i + 5).join('\n').trim();
      if (block.length > 100 && !block.includes('import') && !block.includes('export')) {
        const normalized = block.replace(/\s+/g, ' ');
        if (!codeBlocks.has(normalized)) {
          codeBlocks.set(normalized, []);
        }
        codeBlocks.get(normalized).push({ file: relativePath, line: i + 1 });
      }
    }
  }

  // Analizar strings repetidos
  let repeatedStrings = 0;
  stringOccurrences.forEach((files, str) => {
    if (files.length >= 3) {
      repeatedStrings++;
      issues.push({
        severity: 'BAJO',
        file: files[0],
        line: null,
        message: `String repetido ${files.length} veces: "${str.substring(0, 40)}..."`,
      });
    }
  });

  // Analizar bloques duplicados
  let duplicateBlocks = 0;
  codeBlocks.forEach((locations, block) => {
    if (locations.length >= 2) {
      duplicateBlocks++;
      issues.push({
        severity: 'MEDIO',
        file: locations[0].file,
        line: locations[0].line,
        message: `Bloque de codigo duplicado en ${locations.length} lugares`,
      });
    }
  });

  const passed = duplicateBlocks < 5 && repeatedStrings < 10;

  printResult(repeatedStrings < 10, `Strings repetidos (3+ veces): ${repeatedStrings}`);
  printResult(duplicateBlocks < 5, `Bloques de codigo duplicados: ${duplicateBlocks}`);

  if (duplicateBlocks > 0 || repeatedStrings > 0) {
    printInfo('Considera extraer strings a constantes y codigo a funciones reutilizables');
  }

  results.categories['Codigo Duplicado'] = {
    passed,
    issues,
    status: passed ? 'APROBADO' : 'ADVERTENCIAS',
    stats: { repeatedStrings, duplicateBlocks },
  };

  return passed;
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIA 5: BEST PRACTICES
// ═══════════════════════════════════════════════════════════════════════════

async function checkBestPractices() {
  printSection('CATEGORIA 5: BEST PRACTICES');

  const issues = [];
  let anyUsage = 0;
  let largeFiles = 0;
  let missingTypes = 0;

  const files = getSourceFiles();

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const relativePath = relative(process.cwd(), file);

    // Verificar tamano de archivo
    if (lines.length > CONFIG.maxLinesPerFile) {
      largeFiles++;
      issues.push({
        severity: 'BAJO',
        file: relativePath,
        line: null,
        message: `Archivo con ${lines.length} lineas (max recomendado: ${CONFIG.maxLinesPerFile})`,
      });
    }

    // Buscar uso de 'any'
    lines.forEach((line, index) => {
      // Ignorar comentarios
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
        return;
      }

      // Buscar : any o as any
      if (/:\s*any\b/.test(line) || /as\s+any\b/.test(line)) {
        anyUsage++;
        issues.push({
          severity: 'MEDIO',
          file: relativePath,
          line: index + 1,
          message: 'Uso de tipo "any" detectado',
        });
      }

      // Buscar funciones sin tipos de retorno (simplificado)
      if (/function\s+\w+\([^)]*\)\s*{/.test(line) && !line.includes(':')) {
        missingTypes++;
      }
    });
  }

  const passed = anyUsage <= CONFIG.maxAnyUsage && largeFiles === 0;

  printResult(anyUsage === 0, `Uso de "any": ${anyUsage} instancias`);
  printResult(largeFiles === 0, `Archivos grandes (>${CONFIG.maxLinesPerFile} lineas): ${largeFiles}`);
  printInfo(`Funciones sin tipo de retorno explicito: ${missingTypes}`);

  // Verificar nomenclatura (muestra de archivos)
  const badNaming = files.filter(f => {
    const name = f.split(/[/\\]/).pop();
    // Los componentes deben ser PascalCase, utilidades kebab-case o camelCase
    if (name.includes('Component') || name.includes('Page')) {
      return !/^[A-Z]/.test(name);
    }
    return false;
  });

  printResult(badNaming.length === 0, `Nomenclatura de archivos: ${badNaming.length} inconsistencias`);

  results.categories['Best Practices'] = {
    passed,
    issues,
    status: passed ? 'APROBADO' : 'ADVERTENCIAS',
    stats: { anyUsage, largeFiles, missingTypes },
  };

  return passed;
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIA 6: SEGURIDAD
// ═══════════════════════════════════════════════════════════════════════════

async function checkSecurity() {
  printSection('CATEGORIA 6: SEGURIDAD');

  const issues = [];
  let passed = true;

  // Verificar .gitignore
  let gitignoreOk = true;
  const requiredIgnores = ['.env', '.env.local', 'node_modules', '.next'];

  if (existsSync('.gitignore')) {
    const gitignore = readFileSync('.gitignore', 'utf-8');

    for (const pattern of requiredIgnores) {
      if (!gitignore.includes(pattern)) {
        gitignoreOk = false;
        issues.push({
          severity: 'ALTO',
          file: '.gitignore',
          line: null,
          message: `Falta patron: ${pattern}`,
        });
      }
    }
  } else {
    gitignoreOk = false;
    issues.push({
      severity: 'CRITICO',
      file: '.gitignore',
      line: null,
      message: 'Archivo .gitignore no existe',
    });
    passed = false;
  }

  printResult(gitignoreOk, '.gitignore configurado correctamente');

  // Verificar package-lock.json existe
  const lockExists = existsSync('package-lock.json');
  printResult(lockExists, 'package-lock.json existe');

  if (!lockExists) {
    issues.push({
      severity: 'MEDIO',
      file: 'package-lock.json',
      line: null,
      message: 'No existe package-lock.json (puede causar inconsistencias)',
    });
  }

  // Buscar inyecciones potenciales
  const files = getSourceFiles();
  let injectionRisks = 0;

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const relativePath = relative(process.cwd(), file);

    lines.forEach((line, index) => {
      // Command injection
      if (/exec\(|spawn\(|execSync\(/.test(line) && !line.includes('//')) {
        injectionRisks++;
        issues.push({
          severity: 'ALTO',
          file: relativePath,
          line: index + 1,
          message: 'Posible riesgo de command injection',
        });
      }

      // Path traversal
      if (/\.\.\/|\.\.\\/.test(line) && (line.includes('readFile') || line.includes('writeFile'))) {
        injectionRisks++;
        issues.push({
          severity: 'MEDIO',
          file: relativePath,
          line: index + 1,
          message: 'Posible riesgo de path traversal',
        });
      }

      // SQL injection (si aplica)
      if (/`.*\$\{.*\}.*`/.test(line) && (line.toLowerCase().includes('select') || line.toLowerCase().includes('insert'))) {
        injectionRisks++;
        issues.push({
          severity: 'ALTO',
          file: relativePath,
          line: index + 1,
          message: 'Posible riesgo de SQL injection',
        });
      }
    });
  }

  printResult(injectionRisks === 0, `Riesgos de inyeccion: ${injectionRisks} detectados`);

  // Verificar que secrets no se loguean
  let loggedSecrets = 0;
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    if (/console\.(log|info|debug)\(.*password|secret|token|key/i.test(content)) {
      loggedSecrets++;
    }
  }

  printResult(loggedSecrets === 0, `Secrets en logs: ${loggedSecrets} detectados`);

  if (injectionRisks > 0 || !gitignoreOk || loggedSecrets > 0) {
    passed = false;
  }

  results.categories['Seguridad'] = {
    passed,
    issues,
    status: passed ? 'APROBADO' : 'ERRORES',
    stats: { gitignoreOk, lockExists, injectionRisks, loggedSecrets },
  };

  return passed;
}

// ═══════════════════════════════════════════════════════════════════════════
// GENERAR REPORTE
// ═══════════════════════════════════════════════════════════════════════════

function generateReport() {
  const date = getDate();
  const dateTime = getDateTime();

  const categoriesPassed = Object.values(results.categories).filter(c => c.passed).length;
  const totalCategories = Object.keys(results.categories).length;

  let totalIssues = 0;
  let criticalIssues = 0;

  Object.values(results.categories).forEach(cat => {
    totalIssues += cat.issues.length;
    criticalIssues += cat.issues.filter(i => i.severity === 'CRITICO').length;
  });

  let generalStatus;
  if (categoriesPassed === totalCategories) {
    generalStatus = 'APROBADO';
  } else if (categoriesPassed >= 4) {
    generalStatus = 'REQUIERE ATENCION';
  } else {
    generalStatus = 'CRITICO';
  }

  // Construir reporte
  let report = `=================================================
AUTO-REVISION DEL PROYECTO TESTFORGE
Fecha: ${dateTime}
=================================================

RESUMEN EJECUTIVO:
- Estado general: ${generalStatus}
- Categorias aprobadas: ${categoriesPassed}/${totalCategories}
- Issues encontrados: ${totalIssues}
- Issues criticos: ${criticalIssues}

---
`;

  // Agregar cada categoria
  Object.entries(results.categories).forEach(([name, data]) => {
    const statusIcon = data.passed ? '✅ APROBADO' : (data.status === 'ERRORES' ? '❌ ERRORES' : '⚠️ ADVERTENCIAS');

    report += `
CATEGORIA: ${name.toUpperCase()}
Estado: ${statusIcon}

`;

    if (data.stats) {
      report += 'Resultados:\n';
      Object.entries(data.stats).forEach(([key, value]) => {
        report += `- ${key}: ${value}\n`;
      });
    }

    if (data.issues.length > 0) {
      report += '\nIssues encontrados:\n';
      data.issues.slice(0, 20).forEach(issue => {
        const location = issue.line ? `${issue.file}:${issue.line}` : issue.file;
        report += `- [${issue.severity}] ${location} - ${issue.message}\n`;
      });
      if (data.issues.length > 20) {
        report += `... y ${data.issues.length - 20} issues mas\n`;
      }
    }

    report += '\n---\n';
  });

  // Recomendaciones
  report += `
RECOMENDACIONES:
`;

  if (criticalIssues > 0) {
    report += '1. [URGENTE] Resolver issues criticos de seguridad\n';
  }
  if (results.categories['Valores Hardcodeados']?.stats?.apiKeysFound > 0) {
    report += '2. Mover API keys a variables de entorno\n';
  }
  if (results.categories['Best Practices']?.stats?.anyUsage > 0) {
    report += '3. Eliminar uso de tipo "any" en TypeScript\n';
  }
  if (results.categories['Manejo de Errores']?.stats?.asyncWithoutTryCatch > 0) {
    report += '4. Agregar try-catch a funciones async\n';
  }

  report += `
=================================================
Generado automaticamente por TestForge Auto-Review
=================================================
`;

  // Guardar reporte
  if (!existsSync(CONFIG.reportsDir)) {
    mkdirSync(CONFIG.reportsDir, { recursive: true });
  }

  const reportPath = join(CONFIG.reportsDir, `auto-review-${date}.md`);
  writeFileSync(reportPath, report);

  return { report, reportPath, generalStatus, categoriesPassed, totalCategories };
}

// ═══════════════════════════════════════════════════════════════════════════
// MOSTRAR RESUMEN EN CONSOLA
// ═══════════════════════════════════════════════════════════════════════════

function printFinalSummary(reportData) {
  const { generalStatus, categoriesPassed, totalCategories, reportPath } = reportData;

  printHeader('RESUMEN FINAL DE AUTO-REVISION');

  // Estado general con color
  const statusColors = {
    'APROBADO': chalk.green.bold,
    'REQUIERE ATENCION': chalk.yellow.bold,
    'CRITICO': chalk.red.bold,
  };

  console.log(`   Estado General: ${statusColors[generalStatus](generalStatus)}`);
  console.log(`   Categorias: ${categoriesPassed}/${totalCategories} aprobadas`);
  console.log('');

  // Tabla de categorias
  console.log(chalk.cyan('   Detalle por categoria:'));
  console.log('');

  Object.entries(results.categories).forEach(([name, data]) => {
    const icon = data.passed ? chalk.green('✅') : chalk.red('❌');
    const status = data.passed ? chalk.green('PASS') : chalk.red('FAIL');
    console.log(`   ${icon} ${status}  ${name}`);
  });

  console.log('');
  console.log(chalk.gray(`   📄 Reporte guardado en: ${reportPath}`));
  console.log('');

  // Mensaje final
  if (generalStatus === 'APROBADO') {
    console.log(chalk.green.bold('   🎉 ¡Proyecto en excelente estado!'));
  } else if (generalStatus === 'REQUIERE ATENCION') {
    console.log(chalk.yellow.bold('   ⚠️  El proyecto requiere atencion en algunas areas'));
  } else {
    console.log(chalk.red.bold('   🚨 El proyecto tiene issues criticos que deben resolverse'));
  }

  console.log('');
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log('');
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  results.startTime = Date.now();

  printHeader('🔍 AUTO-REVISION COMPLETA - TESTFORGE');

  console.log(chalk.gray(`   Fecha: ${getDateTime()}`));
  console.log(chalk.gray(`   Directorio: ${process.cwd()}`));
  console.log('');

  // Ejecutar todas las categorias
  await checkCompilationAndSyntax();
  await checkHardcodedValues();
  await checkErrorHandling();
  await checkDuplicateCode();
  await checkBestPractices();
  await checkSecurity();

  results.endTime = Date.now();

  // Generar y guardar reporte
  const reportData = generateReport();

  // Mostrar resumen
  printFinalSummary(reportData);

  console.log(chalk.gray(`   ⏱️  Tiempo total: ${formatTime(results.endTime - results.startTime)}`));
  console.log('');

  // Exit code basado en estado
  const exitCode = reportData.generalStatus === 'CRITICO' ? 1 : 0;
  process.exit(exitCode);
}

main().catch((error) => {
  console.error(chalk.red('Error ejecutando auto-revision:'), error);
  process.exit(1);
});
