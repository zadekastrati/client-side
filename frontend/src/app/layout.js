import './globals.css';

export const metadata = {
  title: 'Your Website',
  description: 'A modern website built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
