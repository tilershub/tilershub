import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#003049'
};

export const metadata: Metadata = {
  title: { default: 'TILERSHUB', template: '%s | TILERSHUB' },
  description: 'Find verified tilers in Sri Lanka, request quotes, and get quick estimates.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}