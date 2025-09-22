import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VaultNote - Sichere verschlüsselte Notizen',
  description: 'Erstelle verschlüsselte Notizen, die sich selbst zerstören. Zero-Knowledge-Encryption garantiert deine Privatsphäre.',
  keywords: ['encryption', 'secure notes', 'privacy', 'zero-knowledge', 'markdown'],
  authors: [{ name: 'VaultNote' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'VaultNote - Sichere verschlüsselte Notizen',
    description: 'Erstelle verschlüsselte Notizen, die sich selbst zerstören.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
