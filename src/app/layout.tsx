import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
import './font_families.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import _GoogleAnalytics from './lib/components/_GoogleAnalytics';
import SessionProvider from './lib/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rybio.link | Link In Bio Page-Builder',
  description: 'Rybio.link | Link In Bio Page-Builder'
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <_GoogleAnalytics />
          <main>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
