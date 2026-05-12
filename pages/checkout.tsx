import { useState } from 'react';
import { Apple, CreditCard, ChevronDown, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Checkout() {
  const [step, setStep] = useState(1);

  return (
    <div className="pt-8 pb-section-gap px-margin-mobile max-w-lg mx-auto">
      {/* Step Progress */}
      <nav className="flex justify-between items-center mb-stack-lg px-2">
        {[
          { id: 1, label: 'Information' },
          { id: 2, label: 'Shipping' },
          { id: 3, label: 'Payment' }
        ].map((s) => (
          <div key={s.id} className={`flex flex-col items-center gap-1 transition-opacity ${step >= s.id ? 'opacity-100' : 'opacity-30'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s.id ? 'text-primary' : 'text-on-surface-variant'}`}>
              {s.label}
            </span>
            <div className={`h-1 w-12 rounded-full transition-colors ${step >= s.id ? 'bg-primary' : 'bg-outline-variant'}`}></div>
          </div>
        ))}
      </nav>

      {/* Express Checkout */}
      <section className="mb-stack-lg space-y-stack-md">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-center">Express Checkout</h2>
        <button className="w-full bg-on-background text-white py-4 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-sm">
          <Apple size={20} className="fill-white" />
          <span className="text-sm font-bold">Pay with Apple Pay</span>
        </button>
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-outline-variant/30"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-on-surface-variant tracking-widest">OR</span>
          <div className="flex-grow border-t border-outline-variant/30"></div>
        </div>
      </section>

      {/* Form */}
      <form className="space-y-stack-lg">
        {/* Contact */}
        <div className="space-y-stack-md">
          <h3 className="font-serif text-xl text-on-surface">Contact Information</h3>
          <div className="space-y-stack-sm">
            <input 
              className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
              placeholder="Email Address" 
              type="email" 
            />
            <div className="flex items-center gap-3 px-4">
              <input 
                id="newsletter" 
                type="checkbox" 
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary ring-offset-0 cursor-pointer"
              />
              <label htmlFor="newsletter" className="text-xs text-on-surface-variant font-semibold cursor-pointer">
                Email me with news and offers
              </label>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="space-y-stack-md">
          <h3 className="font-serif text-xl text-on-surface">Shipping Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="First Name" />
            <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Last Name" />
          </div>
          <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Address" />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="City" />
            <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Postal Code" />
          </div>
          <div className="relative">
            <select className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm appearance-none focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>France</option>
              <option>Canada</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" size={20} />
          </div>
        </div>

        {/* Payment Preview */}
        <div className="space-y-stack-md pt-stack-lg border-t border-outline-variant/30">
          <h3 className="font-serif text-xl text-on-surface">Payment Method</h3>
          <div className="p-6 border border-outline-variant rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-primary" size={24} />
              <span className="text-sm font-bold uppercase tracking-widest">Credit Card</span>
            </div>
            <div className="space-y-4">
              <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-surface-variant/10 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-surface-variant/10 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="MM / YY" />
                <input className="w-full h-14 px-6 rounded-full border border-outline-variant bg-surface-variant/10 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="CVV" />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          className="w-full bg-primary text-white h-16 rounded-full font-serif text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-stack-lg"
        >
          Continue to Payment
        </button>
      </form>

      {/* Mini Order Summary */}
      <aside className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-outline-variant/30 p-margin-mobile z-40 shadow-2xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex -space-x-4">
              {[
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCODjv68h5jTICRyYqlW3bEboJcm_jSDUSnCH42qb61dZHc84ISGvPsvQCNzhTewh5tzSfcb6uXQTeSJLIli5Vy08qgY_nOEBXq8ik9MTSphoxcMJY6kkUClFiemkxO5ZWFAWa-TfXNW26_5nx9BGfFOuD6uDHRZsCjjfOcueADzuHSIfwsbhmvhJjLZr8R3UxNaOoRpOvexXoVN9Ts-FkqUrOEZuIcoXq89xR9pRDDI1ltFTWXbXUtRieex6R_Bj2qP0DhsOmr7I0',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAVbbNQamUJrf-I_18K_htTglXfk5K5uFrBUzyCSOLpIapsEwiuyrsHgJ9sdXaKC1So40RhXybxaplGFybYs6Z2rDxY9xc1B_9FqAKmqohPVD4Uo6ekm5WiuRQ8lDp89R70UccEMbR0pwh9dRJVI4AUx80LT2DO4T1UZjWg9v7QidloOglEJVoyoPYQC9D0WY764x1grUPOWa9oSwKcAzArq7XPVwmFTPN_T4205uyxTtaqXfZZUT7gBxhotMAO2SP_JDWZ7rgReu0'
              ].map((img, i) => (
                <div key={i} className="w-12 h-12 rounded-lg border-2 border-white overflow-hidden relative shadow-md">
                  <img src={img} className="w-full h-full object-cover" alt="product" />
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">1</span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total</p>
              <p className="font-serif text-2xl text-primary">$184.00</p>
            </div>
          </div>
          <button className="w-full text-primary text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 hover:opacity-70 transition-opacity">
            Show details
            <ChevronDown size={14} />
          </button>
        </div>
      </aside>
    </div>
  );
}
