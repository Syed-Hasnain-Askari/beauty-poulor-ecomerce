import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import { SlidersHorizontal, Star, ShoppingCart, Heart, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRODUCTS = [
  {
    id: 'radiance-elixir',
    brand: 'Lumière Maison',
    name: 'Radiance Elixir Serum',
    price: 84,
    rating: 4.9,
    reviews: 124,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy3veFy8viS4peVR_EQCxqR7oqUlber9hRD2xkalkeduNJYSoF-0wORPtV3nhmAMa5mpV-6hQ_QYTLbRboZcikFY0Su0NeO0Uu7bTamjr8D2BuedoAzkRJM3uILN8dzwiwV7qzj4ZH4qLfcng72p6CxLyyDtYO2L68tAfMQrPaO8Sx_3a-y9NX9FU0XNaPuZQe06hh4ci79Js8oKc6VgYvT5hmtbA68FLuSZeCPOtbqKc6ue8tQTmnN1MW3w2oFzb-wTQz8RVQgd8'
  },
  {
    id: 'hydra-soothe',
    brand: 'Pure Essence',
    name: 'Hydra-Soothe Cream',
    price: 62,
    rating: 4.7,
    reviews: 89,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjeDd0UqrzSJLQenK7cQX3W07MiZa3EZaGhTAmnSRZGIttSwy5k7pIE0utr-H1fGUlbONbA8lJo7OIqbEYhnRgemY_u92UQPsSAu8Qmmwr5a1w5TMy86RrikHJjN09rhdNfzLC6suKmL98lBz81lgZaeuZzynSsbReRp5J097L04gxrEGpyCvCqwNyWO5lRHuDG8Q6XUaUxGKusWUymwl6Y84T5jEPtwQfxL-XjykOgEwC5CpHgf52hd6J74Kme6wbjl6wsAPCDAY'
  },
  {
    id: 'night-recovery',
    brand: 'Flora & Fauna',
    name: 'Night Recovery Oil',
    price: 95,
    rating: 5.0,
    reviews: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdKc_ufOnqBw1TXqXmbc4EYTlHqfqxdC-cwJD2vqN7CMND2mu7frkobGk1u-dTsncHA6s1Z1-mCJy1Mk3OZPL9NuBOW-B7VhPBIttKd64ruod6W1LnhntAqSoS4PShI8ssC6VUh9NLm04KelYYlGQvFdC1-xv53gw706e-qaPotsPWh8t4bct_Y1PHNqEAU_LCmykAL1GvAV9QIB26UaLOI5P3GbRJtgoUi9PlR-uCJpObK2YXUrlKUkvT-H5fByxZtpBBOrl0MlY'
  },
  {
    id: 'velvet-cleanser',
    brand: 'Base Studio',
    name: 'Gentle Velvet Cleanser',
    price: 38,
    rating: 4.8,
    reviews: 215,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPH4sXyYaV5uWhxuDRyTNAxBBpP2JSr7CknjNHcIxAZunT9KqqvrIdPsYm_3ZvfjAM-JkLUx2UXmdtymzugl6DvHYUXz2v_SfdQQHBGSoiEeFD2LxU3tJ8SBUWwhxHtfZwD7EaputcwhbDesRjlpAE_KBmKH0ocEFBy-vbkLcnM9WJjtoHhgZOHmTiXzUVybGkll7Ix1HCfXJcM_NHSuZfCtBVVzEzfwVSG04m_NSCGS3ZNd9jlF7Q8GXFOCe2zjku1rjSz0r8m0Q'
  }
];

const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand)));

export default function Category() {
  const router = useRouter();
  const { id } = router.query;
  const categoryName = useMemo(() => {
    if (!router.isReady || !id) {
      return 'Skincare';
    }

    const idStr = Array.isArray(id) ? id[0] : id;
    return idStr.charAt(0).toUpperCase() + idStr.slice(1);
  }, [router.isReady, id]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const priceMatch = product.price <= maxPrice;
      const ratingMatch = product.rating >= minRating;
      return brandMatch && priceMatch && ratingMatch;
    });
  }, [selectedBrands, maxPrice, minRating]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setMaxPrice(200);
    setMinRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative min-h-screen">
      <section className="mb-stack-lg">
        <h2 className="font-serif text-4xl md:text-5xl text-on-surface tracking-tight">{categoryName}</h2>
        <p className="text-sm text-on-surface-variant mt-2 max-w-md">
          Discover editorial-grade formulas designed for lasting radiance and skin health.
        </p>
      </section>

      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm py-stack-md -mx-margin-mobile px-margin-mobile">
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full border-[1.5px] border-on-background text-on-background text-xs font-semibold hover:bg-surface-variant transition-all active:scale-95"
          >
            <SlidersHorizontal size={20} />
            Filter & Sort
          </button>
          <div className="hidden md:flex gap-2 items-center text-xs font-semibold text-on-surface-variant">
            {filteredProducts.length} Products
          </div>
        </div>

        <div className="flex gap-2 mt-stack-md overflow-x-auto no-scrollbar py-1">
          {selectedBrands.map(brand => (
            <div key={brand} className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap shadow-sm">
              {brand}
              <X size={14} className="cursor-pointer" onClick={() => toggleBrand(brand)} />
            </div>
          ))}
          {maxPrice < 200 && (
            <div className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap shadow-sm">
              Under ${maxPrice}
              <X size={14} className="cursor-pointer" onClick={() => setMaxPrice(200)} />
            </div>
          )}
          {minRating > 0 && (
            <div className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap shadow-sm">
              {minRating}+ Stars
              <X size={14} className="cursor-pointer" onClick={() => setMinRating(0)} />
            </div>
          )}
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-gutter mt-stack-md">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-on-surface-variant">No products match your filters.</p>
            <button onClick={clearFilters} className="mt-4 text-primary font-bold uppercase tracking-widest text-xs underline">Clear All</button>
          </div>
        )}
      </section>

      {/* Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[70] bg-on-background/30 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[85%] md:w-96 bg-background z-[80] shadow-2xl flex flex-col"
            >
              <div className="p-margin-mobile flex justify-between items-center border-b border-outline-variant/30">
                <h3 className="font-serif text-2xl text-on-surface">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-surface-variant/20 rounded-full">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-margin-mobile space-y-stack-lg">
                {/* Brands */}
                <div>
                  <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest mb-stack-sm">Brands</h4>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map(brand => (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
                          selectedBrands.includes(brand) 
                            ? 'bg-primary text-white border-primary' 
                            : 'border-outline-variant hover:border-primary'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest mb-stack-sm">Max Price</h4>
                  <input 
                    type="range" 
                    min="40" 
                    max="200" 
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-variant rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <span>$40</span>
                    <span className="text-primary">${maxPrice}</span>
                    <span>$200</span>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest mb-stack-sm">Minimum Rating</h4>
                  <div className="space-y-3">
                    {[4.5, 4.0, 3.5].map((rating) => (
                      <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input 
                            type="radio"
                            name="rating"
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="appearance-none w-5 h-5 border border-outline-variant rounded-full checked:border-primary transition-all cursor-pointer"
                          />
                          {minRating === rating && <div className="absolute w-2.5 h-2.5 bg-primary rounded-full" />}
                        </div>
                        <div className="flex gap-1 text-secondary">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < Math.floor(rating) ? 'fill-secondary' : ''} />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-on-surface-variant group-hover:text-primary transition-colors">{rating} & Up</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-margin-mobile border-t border-outline-variant/30 grid grid-cols-2 gap-4">
                <button onClick={clearFilters} className="py-4 text-xs font-semibold uppercase tracking-widest hover:text-primary transition-colors">Clear All</button>
                <button onClick={() => setIsFilterOpen(false)} className="py-4 bg-primary text-white rounded-full text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-primary-container transition-colors">
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
