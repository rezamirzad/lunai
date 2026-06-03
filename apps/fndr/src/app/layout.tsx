import React from 'react';
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FNDR lead Finder',
  description: 'AI-driven lead discovery engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
