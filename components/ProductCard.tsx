import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="flex flex-col group w-full"
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-stack-sm shadow-sm bg-surface-variant/20">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          <Image 
            alt={product.name} 
            src={product.image} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </Link>
        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-sm hover:scale-110 active:scale-90 transition-transform z-10">
          <Heart size={18} />
        </button>
      </div>
      
      <div className="px-1">
        <p className="text-[10px] text-secondary font-bold tracking-widest uppercase">{product.brand}</p>
        <h3 className="font-serif text-base text-on-surface font-medium truncate mt-0.5">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="fill-secondary text-secondary" />
          <span className="text-[10px] font-semibold text-on-surface-variant">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-stack-sm">
          <span className="font-serif text-xl text-on-surface">${product.price}.00</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow-sm hover:scale-110 active:scale-90 transition-all">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
