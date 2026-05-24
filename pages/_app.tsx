import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { CartProvider } from '../lib/cart-context';
import '../styles/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
