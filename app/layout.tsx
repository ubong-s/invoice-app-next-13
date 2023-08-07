import './globals.css';
import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import { Navbar } from '@/components/navbar';

import { ModalProvider } from '@/providers/modal-provider';
import { AuthProvider } from '@/providers/auth-provider';
import ToastProvider from '@/providers/toast-provider';

const font = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoicify',
  description: 'Invoicify',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <AuthProvider>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
