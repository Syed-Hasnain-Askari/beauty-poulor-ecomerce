import type { Metadata } from 'next';
import '../styles/index.css';
import AppRouterChrome from '../components/AppRouterChrome';

export const metadata: Metadata = {
  title: 'Lumiere Beauty',
  description: 'Luxury beauty ecommerce experience built with Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterChrome>{children}</AppRouterChrome>
      </body>
    </html>
  );
}
