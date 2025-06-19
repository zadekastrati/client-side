import './globals.css';
import { Toaster } from 'react-hot-toast';
import SessionProviderWrapper from './SessionProviderWrapper';

export const metadata = {
  title: 'Your Website',
  description: 'A modern website built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Toaster position="top-center" />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}