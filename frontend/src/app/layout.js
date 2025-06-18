import './globals.css';

export const metadata = {
  title: 'Event Ticketing',
  description: 'A website for event ticketing'
}
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
