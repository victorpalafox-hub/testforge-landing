import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BRAND } from '@/lib/config/brand';

// Validar variables de entorno al iniciar (solo en servidor)
// Si falta alguna variable requerida, la app fallará aquí con mensaje claro
import '@/lib/config/env.config';

// Configurar Inter (fuente principal)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Configurar JetBrains Mono (fuente monospace)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: BRAND.name,
  description: BRAND.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-gray-100`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
