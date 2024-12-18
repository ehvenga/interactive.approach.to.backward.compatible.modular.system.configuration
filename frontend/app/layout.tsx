import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auto-M-Design: An Interactive Approach',
  description: 'Solve your system configuration problems with Autoblox',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Navbar />
        <div className='bg-gray-100 flex-grow'>{children}</div>
      </body>
    </html>
  );
}
