import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de CSS de manera inteligente
 * - Maneja clases condicionales con clsx
 * - Resuelve conflictos de Tailwind con tailwind-merge
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * cn('text-red-500', isActive && 'text-blue-500') // => 'text-blue-500' (si isActive)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
