import Link from 'next/link';
import { X, Minus, Plus, Info, ArrowRight, Gift } from 'lucide-react';
import { motion } from 'motion/react';

const ITEMS = [
  {
    id: 1,
    name: 'Radiance Silk Foundation',
    shade: 'Rose Glow',
    price: 58.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRgcq6OjDez3v7wQkccESYf2pyEn6-DgfxjtZ0mE15Nb0hM16hr4eDltIbCZLU_FtgjgaWEA0-kdBKk4Ih1isODHvC-dlmbAoav_h0Z0tnzEi-Ei694SJy2bvojbEwQen9I3xt5e7nGUS3QHJCi2VdaMsrD5qysDk3m8Z5A_JQCxji73SgTKNDig9kx8Y9i8j_c9LBoMSy-dEZVinjt_6ZQMXp9mtUsdDjfiKlGotF0DCb6fL8xEChfYKUgvl9F7owVPjM8kqLOlg'
  },
  {
    id: 2,
    name: 'Velvet Lip & Cheek',
    shade: 'Petal',
    price: 34.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGJr3or0PLfn2p2FokwXPQ6JM_Pxm7AkjZD3_XVPHf1HxRwcEZh35LKhLFQrdmJZG6iMfZJIK0ZNPDOW0nTflFur70dcMln36876jeXQSh-XwcJoPf5I0e-FBuKNEVt2OhinyTHvrxDwuYB7XuWDUxPoVdbk-u3kpoLuhMYFJHLJLe3sMUYdJikruemOfcA-ARx0tuqtUxyTtd4s_YLfVxC_3bDBP9A6l0Tmx52sXblEvh4i_ctsi-H2gH85k375m2NKevKOXA-JY'
  }
];

export default function Cart() {
  const subtotal = ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="px-margin-mobile py-stack-lg max-w-2xl mx-auto pb-48">
      {/* Header */}
      <div className="mb-stack-md flex justify-between items-baseline">
        <h2 className="font-serif text-3xl">Your Bag</h2>
        <span className="text-sm text-on-surface-variant">({ITEMS.length} Items)</span>
      </div>

      {/* Gift Callout */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-stack-md p-4 bg-primary/10 text-primary rounded-2xl flex items-center gap-4 border border-primary/20 shadow-sm"
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <Gift size={20} className="fill-primary" />
        </div>
        <p className="text-sm font-semibold tracking-tight">You've unlocked a Deluxe Mini Serum!</p>
      </motion.div>

      {/* Items List */}
      <div className="space-y-stack-md">
        {ITEMS.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl flex gap-4 shadow-sm border border-outline-variant/20">
            <div className="w-24 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-surface-variant/30">
              <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
            </div>
            <div className="flex-grow flex flex-col justify-between py-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg text-on-surface">{item.name}</h3>
                  <p className="text-xs text-on-surface-variant">Shade: <span className="font-semibold text-primary">{item.shade}</span></p>
                </div>
                <button className="text-on-surface-variant hover:text-error transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center border border-outline-variant rounded-full px-2 py-1">
                  <button className="p-1 hover:text-primary"><Minus size={14} /></button>
                  <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                  <button className="p-1 hover:text-primary"><Plus size={14} /></button>
                </div>
                <span className="font-serif text-lg text-primary">${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <section className="mt-section-gap space-y-stack-md">
        <div className="flex gap-3">
          <input 
            className="flex-grow bg-white border border-outline-variant focus:ring-1 focus:ring-primary focus:border-primary rounded-full px-6 py-3 text-sm transition-all outline-none" 
            placeholder="Discount Code" 
            type="text"
          />
          <button className="bg-on-background text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-90">Apply</button>
        </div>

        <div className="bg-surface-variant/10 p-6 rounded-2xl border border-outline-variant/30">
          <h3 className="font-serif text-xl mb-4">Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-on-surface-variant">
              <span className="text-sm uppercase tracking-widest font-semibold opacity-70">Subtotal</span>
              <span className="text-sm font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span className="text-sm uppercase tracking-widest font-semibold opacity-70">Shipping</span>
                <Info size={14} className="opacity-50" />
              </div>
              <span className="text-sm font-bold text-secondary">Free</span>
            </div>
            <div className="pt-4 border-t border-outline-variant/40 flex justify-between items-baseline">
              <span className="font-serif text-xl">Total</span>
              <span className="font-serif text-2xl text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Progress */}
        <div className="p-4 bg-surface-variant/5 rounded-2xl border border-outline-variant/20">
          <div className="flex justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest">Free Shipping Unlocked!</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Over $75.00</span>
          </div>
          <div className="h-1.5 w-full bg-outline-variant/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-full"></div>
          </div>
        </div>
      </section>

      {/* Checkout CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl p-margin-mobile border-t border-outline-variant/30 shadow-xl z-50">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/checkout" 
            className="w-full bg-primary text-white font-serif py-5 rounded-full text-lg font-semibold tracking-wide shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Proceed to Checkout
            <ArrowRight size={20} />
          </Link>
          <p className="text-center mt-3 text-[10px] text-on-surface-variant uppercase tracking-widest font-bold opacity-60">
            Secure Payment & Carbon Neutral Shipping
          </p>
        </div>
      </div>
    </div>
  );
}
