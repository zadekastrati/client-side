import './globals.css';
import { Toaster } from 'react-hot-toast';
import SessionProviderWrapper from './SessionProviderWrapper';

export const metadata = {
  title: 'Event Ticketing',
  description: 'A website for event ticketing'
}
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