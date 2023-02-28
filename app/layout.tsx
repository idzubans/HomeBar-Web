/* eslint-disable @next/next/no-head-element */
import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <div className='container h-screen flex justify-center items-center'>
          {children}
        </div>
      </body>
    </html>
  );
}
