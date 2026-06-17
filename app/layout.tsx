import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import './globals.css';
import './reset.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { montserrat, dmSans } from '@/app/fonts';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import 'modern-normalize';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${dmSans.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
