#!/usr/bin/env node

/**
 * Script de validación completa para TestForge
 * Ejecuta todas las validaciones del proyecto y muestra un resumen
 *
 * Uso: npm run validate:verbose
 */

import { spawn } from 'child_process';
import chalk from 'chalk';

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════

const VALIDATIONS = [
  {
    name: 'Type-check',
    command: 'npm',
    args: ['run', 'type-check'],
    description: 'Verificando tipos TypeScript...',
    icon: '📘',
  },
  {
    name: 'Lint',
    command: 'npm',
    args: ['run', 'lint'],
    description: 'Ejecutando ESLint...',
    icon: '🔍',
  },
  {
    name: 'Format',
    command: 'npm',
    args: ['run', 'format:check'],
    description: 'Verificando formato con Prettier...',
    icon: '✨',
  },
  {
    name: 'Build',
    command: 'npm',
    args: ['run', 'build'],
    description: 'Compilando proyecto Next.js...',
    icon: '🏗️',
  },
];

// ═══════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════

function formatTime(ms) {
  if (ms < 1000) return `${ms}ms`;
  const seconds = (ms / 1000).toFixed(1);
  return `${seconds}s`;
}

function printHeader() {
  console.log('');
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log(chalk.cyan.bold('   🧪 TESTFORGE - VALIDACIÓN COMPLETA DEL PROYECTO'));
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log('');
}

function printDivider() {
  console.log(chalk.gray('───────────────────────────────────────────────────────────────'));
}

// ═══════════════════════════════════════════════════════════════
// EJECUCIÓN DE VALIDACIONES
// ═══════════════════════════════════════════════════════════════

async function runValidation(validation) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    console.log('');
    console.log(chalk.blue(`${validation.icon} [${validation.name}] ${validation.description}`));
    console.log('');

    const proc = spawn(validation.command, validation.args, {
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd(),
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      const output = data.toString();
      stdout += output;
      // Mostrar output en tiempo real con indentación
      output.split('\n').forEach((line) => {
        if (line.trim()) {
          console.log(chalk.gray(`   ${line}`));
        }
      });
    });

    proc.stderr.on('data', (data) => {
      const output = data.toString();
      stderr += output;
      // Mostrar errores en tiempo real
      output.split('\n').forEach((line) => {
        if (line.trim()) {
          console.log(chalk.red(`   ${line}`));
        }
      });
    });

    proc.on('close', (code) => {
      const duration = Date.now() - startTime;
      const success = code === 0;

      console.log('');
      if (success) {
        console.log(chalk.green(`   ✓ ${validation.name} completado (${formatTime(duration)})`));
      } else {
        console.log(chalk.red(`   ✗ ${validation.name} falló (${formatTime(duration)})`));
      }

      resolve({
        name: validation.name,
        success,
        duration,
        stdout,
        stderr,
        exitCode: code,
      });
    });

    proc.on('error', (error) => {
      const duration = Date.now() - startTime;
      console.log(chalk.red(`   ✗ ${validation.name} error: ${error.message}`));
      resolve({
        name: validation.name,
        success: false,
        duration,
        stdout: '',
        stderr: error.message,
        exitCode: 1,
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// RESUMEN FINAL
// ═══════════════════════════════════════════════════════════════

function printSummary(results, totalDuration) {
  const passed = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const total = results.length;

  console.log('');
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log(chalk.cyan.bold('   📊 RESUMEN DE VALIDACIÓN'));
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log('');

  // Mostrar resultado de cada validación
  results.forEach((result) => {
    const status = result.success ? chalk.green('✓ PASS') : chalk.red('✗ FAIL');
    const time = chalk.gray(`(${formatTime(result.duration)})`);
    console.log(`   ${status}  ${result.name} ${time}`);
  });

  console.log('');
  printDivider();
  console.log('');

  // Estadísticas
  const passRate = ((passed / total) * 100).toFixed(0);

  if (failed === 0) {
    console.log(chalk.green.bold(`   🎉 ¡Todas las validaciones pasaron!`));
    console.log('');
    console.log(chalk.green(`   ${passed}/${total} validaciones exitosas (${passRate}%)`));
  } else {
    console.log(chalk.red.bold(`   ⚠️  Algunas validaciones fallaron`));
    console.log('');
    console.log(chalk.yellow(`   ${passed}/${total} validaciones exitosas (${passRate}%)`));
    console.log(chalk.red(`   ${failed} validación(es) fallida(s)`));
  }

  console.log('');
  console.log(chalk.gray(`   ⏱️  Tiempo total: ${formatTime(totalDuration)}`));
  console.log('');
  console.log(chalk.cyan('═══════════════════════════════════════════════════════════════'));
  console.log('');

  // Sugerencias si hay errores
  if (failed > 0) {
    console.log(chalk.yellow('   💡 Sugerencias:'));
    console.log(
      chalk.gray('      - Ejecuta "npm run validate:fix" para auto-corregir lint y formato')
    );
    console.log(chalk.gray('      - Revisa los errores de TypeScript arriba'));
    console.log(chalk.gray('      - Corrige los errores de build antes de hacer commit'));
    console.log('');
  }
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  const startTime = Date.now();

  printHeader();

  const results = [];

  for (const validation of VALIDATIONS) {
    printDivider();
    const result = await runValidation(validation);
    results.push(result);
  }

  const totalDuration = Date.now() - startTime;

  printSummary(results, totalDuration);

  // Exit code basado en resultados
  const hasFailures = results.some((r) => !r.success);
  process.exit(hasFailures ? 1 : 0);
}

main().catch((error) => {
  console.error(chalk.red('Error inesperado:'), error);
  process.exit(1);
});
