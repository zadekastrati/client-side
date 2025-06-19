// 'use client'; // needed because SessionProvider uses React hooks

import './globals.css';
import SessionProviderWrapper from './SessionProviderWrapper'; // fix the relative path

export const metadata = {
  title: 'Your Website',
  description: 'A modern website built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
