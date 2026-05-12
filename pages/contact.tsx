import { Mail, Phone, Clock, MapPin, Share2, Instagram, MessageSquare, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="pb-section-gap">
      {/* Hero Header */}
      <header className="px-margin-mobile max-w-7xl mx-auto mb-stack-lg pt-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif text-5xl md:text-7xl text-primary leading-tight mb-4"
        >
          We'd Love to Hear From You
        </motion.h1>
        <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
          Our concierge team is dedicated to providing you with a seamless and elegant beauty experience.
        </p>
      </header>

      <div className="px-margin-mobile max-w-7xl mx-auto space-y-section-gap">
        <div className="grid lg:grid-cols-2 gap-stack-lg items-start">
          {/* Contact Form */}
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-outline-variant/20">
            <h2 className="font-serif text-2xl text-on-surface mb-stack-md">Send a Message</h2>
            <form className="space-y-stack-md">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  className="w-full bg-background border border-outline-variant/40 rounded-full px-6 py-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline/40 text-sm" 
                  placeholder="Elias Thorne" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  className="w-full bg-background border border-outline-variant/40 rounded-full px-6 py-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline/40 text-sm" 
                  placeholder="hello@lumiere.com" 
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full bg-background border border-outline-variant/40 rounded-full px-6 py-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface-variant text-sm appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Product Support</option>
                  <option>Order Status</option>
                  <option>Partnerships</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  className="w-full bg-background border border-outline-variant/40 rounded-3xl px-6 py-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline/40 resize-none text-sm" 
                  placeholder="How can we assist you today?" 
                  rows={4}
                ></textarea>
              </div>
              <button className="w-full bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] py-5 rounded-full hover:bg-primary-container transition-all shadow-lg active:scale-95">
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="p-8 border border-outline-variant/20 rounded-3xl bg-surface-variant/10 flex flex-col items-start">
              <Mail className="text-primary mb-6" size={32} />
              <h3 className="font-serif text-xl text-on-surface mb-2">Email</h3>
              <p className="text-base text-on-surface-variant">concierge@lumierebeauty.com</p>
              <p className="text-xs text-outline font-semibold mt-1">24-hour response time guarantee.</p>
            </div>
            <div className="p-8 border border-outline-variant/20 rounded-3xl bg-surface-variant/10 flex flex-col items-start">
              <Phone className="text-primary mb-6" size={32} />
              <h3 className="font-serif text-xl text-on-surface mb-2">Phone</h3>
              <p className="text-base text-on-surface-variant">+1 (888) 555-LUMI</p>
              <p className="text-xs text-outline font-semibold mt-1">Monday – Friday, 9am – 6pm EST</p>
            </div>
            <div className="p-8 border border-outline-variant/20 rounded-3xl bg-surface-variant/10 flex flex-col items-start">
              <Clock className="text-primary mb-6" size={32} />
              <h3 className="font-serif text-xl text-on-surface mb-2">Hours</h3>
              <p className="text-base text-on-surface-variant font-semibold">Boutique: 10am – 8pm</p>
              <p className="text-base text-on-surface-variant font-semibold">Support: 9am – 6pm</p>
            </div>
          </section>
        </div>

        {/* Boutiques */}
        <section className="space-y-stack-md">
          <div className="flex justify-between items-end">
            <h2 className="font-serif text-3xl text-on-surface">Visit Our Boutiques</h2>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest underline underline-offset-4 hover:opacity-70">View All</button>
          </div>
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl group">
            <img 
              className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 transition-transform duration-1000" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEZXzr9ub-PUHZC69D3kFldoqdZCLNmMPgscY-PfZpnvZtudxOCaWA84jPleemqjs0dMQSyrD8w2YyjPTgNX56Ba5DTS3wxA-zuaOY1MJSnXUBWwokh9EuK-QcgWjMiTlqgjshzBazZwo2PtEO2EQfqAz7IJNy-MrvHNOqs-IDovtRyWOYCm11X_UXYtBKJpxA3a-X_rwgRUO0nIysRG187bu7SM2ntv7vauxx31r3AomsRmZVrZAb9DjWTJFnZu9hJoGCdIx4vUQ" 
              alt="Boutique"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-auto p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 max-w-md">
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1">Flagship Store</p>
              <h4 className="font-serif text-2xl text-white mb-2">Fifth Avenue, New York</h4>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin size={16} />
                <span className="text-sm font-semibold">745 Fifth Ave, NY 10151</span>
              </div>
            </div>
            
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-on-surface hover:text-primary transition-colors">
                <Plus size={20} />
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-on-surface hover:text-primary transition-colors">
                <Minus size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Socials */}
        <section className="text-center py-stack-lg border-t border-outline-variant/30 flex flex-col items-center">
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-8">Join the Community</h3>
          <div className="flex justify-center gap-8">
            {[
              { icon: Share2, label: 'Share' },
              { icon: Instagram, label: 'Instagram' },
              { icon: MessageSquare, label: 'Chat' }
            ].map((social, i) => (
              <motion.a 
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="text-primary flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/5 transition-colors">
                  <social.icon size={28} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
