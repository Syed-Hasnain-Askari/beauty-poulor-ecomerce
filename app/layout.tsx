import type { Metadata } from 'next';
import '../styles/index.css';
import AppRouterChrome from '../components/AppRouterChrome';
import { CartProvider } from '../lib/cart-context';

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
        <CartProvider>
          <AppRouterChrome>{children}</AppRouterChrome>
        </CartProvider>
      </body>
    </html>
  );
}
