import Link from "next/link";
import Image from "next/image";
import ProductCard from "../components/ProductCard";
import {
	Truck,
	Leaf,
	RefreshCw,
	Star,
	ShoppingBag,
	Heart,
	ShieldCheck,
	ArrowRight,
	Sparkles,
	CheckCircle,
	Zap
} from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = [
	{
		name: "Skincare",
		image:
			"https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
		color: "bg-[#E5D5D0]"
	},
	{
		name: "Makeup",
		image:
			"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
		color: "bg-[#D0D5E5]"
	},
	{
		name: "Fragrance",
		image:
			"https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
		color: "bg-[#E5E0D0]"
	},
	{
		name: "Hair Care",
		image:
			"https://images.unsplash.com/photo-1527799822367-3188572f481b?q=80&w=800&auto=format&fit=crop",
		color: "bg-[#D0E5D5]"
	}
];

const BESTSELLERS = [
	{
		id: "radiance-elixir",
		brand: "LUMIÈRE MAISON",
		name: "Radiance Elixir Serum",
		price: 84,
		rating: 4.8,
		reviews: 124,
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCy3veFy8viS4peVR_EQCxqR7oqUlber9hRD2xkalkeduNJYSoF-0wORPtV3nhmAMa5mpV-6hQ_QYTLbRboZcikFY0Su0NeO0Uu7bTamjr8D2BuedoAzkRJM3uILN8dzwiwV7qzj4ZH4qLfcng72p6CxLyyDtYO2L68tAfMQrPaO8Sx_3a-y9NX9FU0XNaPuZQe06hh4ci79Js8oKc6VgYvT5hmtbA68FLuSZeCPOtbqKc6ue8tQTmnN1MW3w2oFzb-wTQz8RVQgd8"
	},
	{
		id: "hydra-soothe",
		brand: "PURE ESSENCE",
		name: "Hydra-Soothe Cream",
		price: 62,
		rating: 4.9,
		reviews: 89,
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCjeDd0UqrzSJLQenK7cQX3W07MiZa3EZaGhTAmnSRZGIttSwy5k7pIE0utr-H1fGUlbONbA8lJo7OIqbEYhnRgemY_u92UQPsSAu8Qmmwr5a1w5TMy86RrikHJjN09rhdNfzLC6suKmL98lBz81lgZaeuZzynSsbReRp5J097L04gxrEGpyCvCqwNyWO5lRHuDG8Q6XUaUxGKusWUymwl6Y84T5jEPtwQfxL-XjykOgEwC5CpHgf52hd6J74Kme6wbjl6wsAPCDAY"
	},
	{
		id: "night-recovery",
		brand: "FLORA & FAUNA",
		name: "Night Recovery Oil",
		price: 110,
		rating: 5.0,
		reviews: 210,
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuBdKc_ufOnqBw1TXqXmbc4EYTlHqfqxdC-cwJD2vqN7CMND2mu7frkobGk1u-dTsncHA6s1Z1-mCJy1Mk3OZPL9NuBOW-B7VhPBIttKd64ruod6W1LnhntAqSoS4PShI8ssC6VUh9NLm04KelYYlGQvFdC1-xv53gw706e-qaPotsPWh8t4bct_Y1PHNqEAU_LCmykAL1GvAV9QIB26UaLOI5P3GbRJtgoUi9PlR-uCJpObK2YXUrlKUkvT-H5fByxZtpBBOrl0MlY"
	},
	{
		id: "velvet-cleanser",
		brand: "BASE STUDIO",
		name: "Gentle Velvet Cleanser",
		price: 45,
		rating: 4.7,
		reviews: 156,
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCPH4sXyYaV5uWhxuDRyTNAxBBpP2JSr7CknjNHcIxAZunT9KqqvrIdPsYm_3ZvfjAM-JkLUx2UXmdtymzugl6DvHYUXz2v_SfdQQHBGSoiEeFD2LxU3tJ8SBUWwhxHtfZwD7EaputcwhbDesRjlpAE_KBmKH0ocEFBy-vbkLcnM9WJjtoHhgZOHmTiXzUVybGkll7Ix1HCfXJcM_NHSuZfCtBVVzEzfwVSG04m_NSCGS3ZNd9jlF7Q8GXFOCe2zjku1rjSz0r8m0Q"
	}
];

const REVIEWS = [
	{
		name: "Sophia Rhodes",
		headline: "Absolute Magic",
		text: "My skin has never looked so radiant. The Ritual has completely transformed my morning routine.",
		rating: 5,
		product: "Eternal Glow Serum"
	},
	{
		name: "Julianne V.",
		headline: "Modern Luxury",
		text: "The textures are divine and the packaging is simply stunning on my vanity. Worth every penny.",
		rating: 5,
		product: "Velvet Skin Tint"
	},
	{
		name: "Amara K.",
		headline: "The Real Deal",
		text: "Finally, a brand that delivers on its promises. Conscious beauty that actually works.",
		rating: 5,
		product: "Noir Rose Essence"
	}
];

export default function Home() {
	return (
		<div className="flex flex-col w-full overflow-hidden">
			{/* 1. Hero Section */}
			<section className="relative min-h-screen flex flex-col lg:flex-row items-center bg-warm-cream">
				<div className="absolute inset-0 bg-grain z-10 pointer-events-none opacity-[0.05]"></div>

				{/* Left Side: Content */}
				<div className="lg:w-1/2 px-margin-mobile md:px-margin-desktop pt-32 pb-16 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<h1 className="font-serif text-6xl md:text-8xl text-matte-black leading-[1.1] mb-8 tracking-tight">
							Redefine <br /> Your Ritual
						</h1>
						<p className="text-lg md:text-xl text-on-surface-variant max-w-md mb-12 leading-relaxed">
							Experience the convergence of conscious science and editorial
							elegance. Your most radiant self awaits.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
							<Link
								href="/category/all"
								className="bg-deep-rose text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-deep-rose/20 hover:scale-105 transition-transform text-center"
							>
								Shop Now
							</Link>
							<Link
								href="/contact"
								className="border-2 border-matte-black text-matte-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-matte-black hover:text-white transition-all text-center"
							>
								Explore Collection
							</Link>
						</div>
					</motion.div>
				</div>

				{/* Right Side: Image */}
				<div className="lg:w-1/2 w-full h-[60vh] lg:h-screen relative flex items-center justify-center lg:p-12">
					<motion.div
						initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						whileHover={{ scale: 1.02, rotate: -1 }}
						transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
						className="relative w-full h-full max-w-2xl max-h-[80vh] rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] group"
					>
						{/* Subtle Overlay Gradient */}
						<div className="absolute inset-0 bg-gradient-to-t from-matte-black/20 via-transparent to-transparent z-10"></div>

						<Image
							src="/images/banner-image.jpg"
							alt="Lumière Luxury Ritual"
							fill
							priority
							className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>

						{/* Enhanced Floating Badge */}
						<motion.div
							animate={{ y: [0, -10, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
							className="absolute top-12 right-12 bg-white/10 backdrop-blur-xl px-8 py-3 rounded-full border border-white/20 shadow-2xl z-20"
						>
							<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white drop-shadow-sm">
								The 2024 Collection
							</span>
						</motion.div>

						{/* Grain Overlay */}
						<div className="absolute inset-0 bg-grain pointer-events-none opacity-20 z-20"></div>
					</motion.div>
				</div>
			</section>

			{/* 2. Trust Banner */}
			<section className="bg-matte-black py-10">
				<div className="max-w-7xl mx-auto px-margin-mobile">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ icon: Truck, label: "Free Shipping Over $50" },
							{ icon: Leaf, label: "Cruelty Free & Vegan" },
							{ icon: RefreshCw, label: "30-Day Returns" },
							{ icon: ShieldCheck, label: "Dermatologist Tested" }
						].map((item, i) => (
							<div
								key={i}
								className="flex flex-col lg:flex-row items-center justify-center gap-4 text-center lg:text-left group"
							>
								<div className="p-3 bg-warm-cream/5 rounded-full ring-1 ring-gold/20 group-hover:ring-gold/50 transition-all">
									<item.icon size={20} className="text-gold" />
								</div>
								<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80 leading-snug max-w-[120px]">
									{item.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 3. Featured Categories */}
			<section className="py-section-gap px-margin-mobile max-w-7xl mx-auto w-full">
				<h2 className="font-serif text-4xl md:text-5xl text-center mb-16">
					Shop By Category
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{CATEGORIES.map((cat, i) => (
						<Link
							key={cat.name}
							href={`/category/${cat.name.toLowerCase().replace(" ", "-")}`}
							className="group relative flex flex-col"
						>
							<div
								className={`aspect-[3/4] rounded-[24px] overflow-hidden relative shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-gold/30 ${cat.color}`}
							>
								<Image
									src={cat.image}
									alt={cat.name}
									fill
									className="object-cover mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-1000"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-matte-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

								{/* Overlay Text */}
								<div className="absolute bottom-8 left-0 w-full text-center">
									<h4 className="font-serif text-2xl text-white drop-shadow-md">
										{cat.name}
									</h4>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* 4. Bestsellers Section */}
			<section className="py-section-gap bg-white/50">
				<div className="max-w-7xl mx-auto px-margin-mobile">
					<div className="flex justify-between items-end mb-16">
						<div className="relative">
							<h2 className="font-serif text-4xl md:text-5xl">
								Our Bestsellers
							</h2>
							<div className="absolute -bottom-4 left-0 w-24 h-[2px] bg-gold"></div>
						</div>
					</div>

					<div className="flex overflow-x-auto no-scrollbar gap-8 pb-8 snap-x">
						{BESTSELLERS.map((product) => (
							<div key={product.id} className="snap-start flex-shrink-0 w-72">
								<ProductCard product={product} />
							</div>
						))}
					</div>

					<div className="mt-12 text-center">
						<Link
							href="/category/all"
							className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-matte-black hover:text-deep-rose transition-colors relative group"
						>
							View All Products
							<ArrowRight
								size={16}
								className="group-hover:translate-x-2 transition-transform"
							/>
						</Link>
					</div>
				</div>
			</section>

			{/* 5. Promotional Banner */}
			<section className="bg-deep-rose relative py-24 overflow-hidden">
				{/* Decorative Art Mockup (SVG or Image) */}
				<div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
					<svg
						width="400"
						height="400"
						viewBox="0 0 400 400"
						fill="none"
						className="text-gold"
					>
						<path
							d="M100 200C100 100 200 50 200 50M200 350C200 350 300 300 300 200"
							stroke="currentColor"
							strokeWidth="1"
							strokeLinecap="round"
						/>
						<circle
							cx="200"
							cy="200"
							r="150"
							stroke="currentColor"
							strokeWidth="0.5"
							strokeDasharray="4 4"
						/>
					</svg>
				</div>
				<div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block rotate-180">
					<svg
						width="400"
						height="400"
						viewBox="0 0 400 400"
						fill="none"
						className="text-gold"
					>
						<path
							d="M100 200C100 100 200 50 200 50M200 350C200 350 300 300 300 200"
							stroke="currentColor"
							strokeWidth="1"
							strokeLinecap="round"
						/>
					</svg>
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-margin-mobile text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
					>
						<h2 className="font-serif text-5xl md:text-7xl text-white mb-6">
							20% Off Your First Order
						</h2>
						<p className="text-xl text-white/90 mb-12 uppercase tracking-widest font-light">
							Use code <span className="font-bold text-gold">LUMIERE20</span> at
							checkout
						</p>
						<button className="bg-warm-cream text-matte-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-gold hover:text-matte-black transition-all">
							Claim Offer
						</button>
					</motion.div>
				</div>
			</section>

			{/* 6. How It Works */}
			<section className="py-section-gap bg-warm-cream/30">
				<div className="max-w-7xl mx-auto px-margin-mobile">
					<div className="flex flex-col md:flex-row justify-between gap-16 relative">
						{/* Connecting line */}
						<div className="absolute top-1/2 left-0 w-full h-[1px] bg-gold/30 -z-10 hidden md:block"></div>

						{[
							{
								icon: Sparkles,
								title: "Discover",
								text: "Browse our curated collections of conscious luxury."
							},
							{
								icon: Zap,
								title: "Choose",
								text: "Find your perfect match with our tailored skin quiz."
							},
							{
								icon: CheckCircle,
								title: "Glow",
								text: "Experience fast, carbon-neutral delivery to your door."
							}
						].map((step, i) => (
							<div
								key={i}
								className="flex-1 flex flex-col items-center text-center group"
							>
								<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-8 ring-4 ring-gold/10 group-hover:ring-gold/30 group-hover:scale-110 transition-all">
									<step.icon size={32} className="text-deep-rose" />
								</div>
								<h3 className="font-serif text-2xl mb-4">{step.title}</h3>
								<p className="text-on-surface-variant text-sm max-w-[240px] leading-relaxed italic opacity-80">
									{step.text}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 7. Customer Reviews */}
			<section className="py-section-gap px-margin-mobile max-w-7xl mx-auto">
				<h2 className="font-serif text-4xl md:text-5xl text-center mb-16">
					Real Results, Real People
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{REVIEWS.map((review, i) => (
						<motion.div
							key={i}
							whileHover={{ y: -5 }}
							className="bg-warm-cream/50 p-10 rounded-[24px] shadow-sm relative overflow-hidden group"
						>
							<div className="absolute top-0 left-0 w-2 h-full bg-gold/20 group-hover:bg-deep-rose transition-colors"></div>
							<div className="flex text-gold mb-6">
								{[...Array(review.rating)].map((_, j) => (
									<Star key={j} size={16} className="fill-gold" />
								))}
							</div>
							<h4 className="font-bold text-lg mb-4 text-matte-black">
								{review.headline}
							</h4>
							<p className="text-sm text-on-surface-variant mb-12 leading-loose opacity-90">
								"{review.text}"
							</p>

							<div className="mt-auto flex items-center justify-between">
								<div>
									<p className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
										{review.name}
										<ShieldCheck size={14} className="text-deep-rose" />
									</p>
									<p className="text-[10px] text-on-surface-variant mt-1 italic">
										Verified Buyer
									</p>
								</div>
								<div className="px-3 py-1 bg-deep-rose/5 rounded-full border border-deep-rose/10">
									<span className="text-[9px] font-bold text-deep-rose uppercase tracking-tighter">
										{review.product}
									</span>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* 8. Newsletter Section */}
			<section className="mx-margin-mobile lg:mx-margin-desktop mb-section-gap rounded-[40px] overflow-hidden relative shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-br from-warm-cream via-deep-rose/5 to-gold/10"></div>
				<div className="absolute inset-0 bg-grain opacity-10"></div>

				<div className="relative z-10 flex flex-col lg:flex-row p-12 md:p-24 items-center">
					<div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
						<h2 className="font-serif text-4xl md:text-6xl text-matte-black mb-6">
							Join the <br className="hidden lg:block" /> Lumière Circle
						</h2>
						<p className="text-lg text-on-surface-variant max-w-sm leading-relaxed opacity-80">
							Exclusive rituals, early access, and curated luxury delivered to
							your inbox.
						</p>
					</div>

					<div className="lg:w-1/2 w-full flex flex-col items-center lg:items-end">
						<form className="w-full max-w-md flex flex-col sm:flex-row gap-4 mb-4">
							<input
								type="email"
								placeholder="E-mail for ellegance"
								className="flex-grow bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-full px-8 py-5 text-sm focus:ring-2 focus:ring-deep-rose outline-none transition-all placeholder:italic"
							/>
							<button className="bg-matte-black text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-gold hover:text-matte-black transition-all">
								Subscribe
							</button>
						</form>
						<p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold opacity-50 px-4">
							By subscribing, you agree to our privacy policy and divine terms.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
