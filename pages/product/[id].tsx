import { useState } from "react";
import type { GetServerSideProps } from "next";
import { Star, Minus, Plus, ChevronDown, ArrowRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getProductById } from "@/lib/action/productAction";
import { useCart } from "@/lib/cart-context";

const REVIEWS = [
	{
		name: "Sophia R.",
		status: "Verified Buyer",
		text: "This is absolute magic in a bottle. My skin has never looked so glowy and healthy. I've noticed a significant reduction in my redness after just two weeks of use.",
		rating: 5
	},
	{
		name: "Isabella M.",
		status: "Verified Buyer",
		text: "The texture is so lightweight and it absorbs instantly without any stickiness. It works perfectly under makeup!",
		rating: 5
	}
];

type ApiProduct = {
	_id: string;
	name: string;
	description?: string;
	price: number;
	category?: {
		_id?: string;
		name?: string;
	};
	images?: string[];
	stock?: number;
	sku?: string;
	rating?: number;
	reviews?: unknown[];
};

type ProductDetailProps = {
	product: {
		id: string;
		name: string;
		description: string;
		price: number;
		categoryName: string;
		images: string[];
		stock: number;
		sku: string;
		rating: number;
		reviewCount: number;
	};
};

export default function ProductDetail({ product }: ProductDetailProps) {
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState<string | null>("description");
	const [isAdded, setIsAdded] = useState(false);
	const { addToCart } = useCart();
	const roundedRating = Math.max(0, Math.min(5, Math.round(product.rating)));
	const reviewCount = product.reviewCount || REVIEWS.length;
	const ratingDistribution = reviewCount
		? [5, 4, 3, 2, 1].map((star) => {
				const exactMatches =
					star === roundedRating ? Math.max(reviewCount - (5 - star), 1) : 0;
				return Math.round((exactMatches / reviewCount) * 100);
		  })
		: [0, 0, 0, 0, 0];

	const handleAddToCart = () => {
		if (product.stock === 0) {
			return;
		}

		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.images[0],
			quantity,
			categoryName: product.categoryName,
			sku: product.sku,
			stock: product.stock
		});
		setIsAdded(true);
		window.setTimeout(() => setIsAdded(false), 1800);
	};

	return (
		<div className="pb-32 w-full max-w-7xl mx-auto">
			<div className="flex flex-col lg:flex-row gap-stack-lg">
				<section className="lg:w-1/2 relative bg-surface-variant/20">
					<div className="overflow-x-auto snap-x snap-mandatory flex no-scrollbar">
						{product.images.map((img, idx) => (
							<div
								key={idx}
								className="flex-shrink-0 w-full aspect-[4/5] snap-start"
							>
								<img
									alt={`${product.name} ${idx + 1}`}
									className="w-full h-full object-cover"
									src={img}
								/>
							</div>
						))}
					</div>
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
						{product.images.map((_, idx) => (
							<span
								key={idx}
								className={`w-2 h-2 rounded-full ${
									idx === 0 ? "bg-primary" : "bg-outline-variant"
								}`}
							/>
						))}
					</div>
				</section>

				<section className="lg:w-1/2 px-margin-mobile lg:py-stack-lg flex flex-col">
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1">
							<div className="flex text-secondary">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={18}
										className={i < roundedRating ? "fill-secondary" : ""}
									/>
								))}
							</div>
							<span className="text-xs font-semibold text-on-surface-variant">
								({reviewCount} reviews)
							</span>
						</div>
						<p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">
							{product.categoryName}
						</p>
						<h2 className="font-serif text-3xl md:text-4xl text-on-surface">
							{product.name}
						</h2>
						<p className="font-serif text-2xl font-semibold text-primary mt-2">
							${product.price.toFixed(2)}
						</p>
						<div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-semibold text-on-surface-variant">
							<span>SKU: {product.sku}</span>
							<span>
								{product.stock > 0
									? `${product.stock} in stock`
									: "Currently out of stock"}
							</span>
						</div>
					</div>

					<div className="mt-8 flex flex-col gap-6">
						<div>
							<label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-3">
								Quantity
							</label>
							<div className="flex items-center border border-outline rounded-full px-4 py-2 w-32 justify-between">
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="text-on-surface-variant"
								>
									<Minus size={16} />
								</button>
								<span className="text-sm font-semibold">{quantity}</span>
								<button
									onClick={() =>
										setQuantity(Math.min(product.stock || quantity + 1, quantity + 1))
									}
									className="text-on-surface-variant"
									disabled={product.stock === 0}
								>
									<Plus size={16} />
								</button>
							</div>
							{product.stock > 0 && (
								<p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
									Selected: {quantity}
								</p>
							)}
						</div>
					</div>

					<div className="mt-12 flex flex-col divide-y divide-outline-variant/30">
						{[
							{
								id: "description",
								title: "Description",
								content: product.description
							},
							{
								id: "product-details",
								title: "Product Details",
								content: `Category: ${product.categoryName}. SKU: ${product.sku}. Available stock: ${product.stock}.`
							},
							{
								id: "shipping",
								title: "Shipping",
								content:
									"Orders are processed quickly and packed with care so your beauty essentials arrive ready to use."
							}
						].map((section) => (
							<div key={section.id} className="py-4">
								<button
									onClick={() =>
										setActiveTab(activeTab === section.id ? null : section.id)
									}
									className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest"
								>
									{section.title}
									<ChevronDown
										className={`transition-transform duration-300 ${
											activeTab === section.id ? "rotate-180" : ""
										}`}
										size={20}
									/>
								</button>
								<AnimatePresence>
									{activeTab === section.id && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											className="overflow-hidden"
										>
											<div className="pt-4 text-sm text-on-surface-variant leading-relaxed">
												{section.content}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
				</section>
			</div>

			<section className="mt-16 px-margin-mobile">
				<h3 className="font-serif text-2xl mb-6">Customer Reviews</h3>
				<div className="bg-surface-variant/10 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-8">
					<div className="flex items-center gap-4">
						<div className="text-5xl font-serif font-bold">
							{product.rating.toFixed(1)}
						</div>
						<div>
							<div className="flex text-secondary">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={20}
										className={i < roundedRating ? "fill-secondary" : ""}
									/>
								))}
							</div>
							<p className="text-xs font-semibold text-on-surface-variant mt-1">
								Based on {reviewCount} reviews
							</p>
						</div>
					</div>

					<div className="flex-1 flex flex-col gap-2">
						{ratingDistribution.map((percent, i) => (
							<div key={i} className="flex items-center gap-3">
								<span className="text-[10px] font-bold text-on-surface-variant w-4">
									{5 - i}
								</span>
								<div className="flex-1 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
									<div
										className="h-full bg-primary"
										style={{ width: `${percent}%` }}
									/>
								</div>
								<span className="text-[10px] font-bold text-on-surface-variant w-8">
									{percent}%
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-4 max-w-2xl">
					{REVIEWS.map((review, idx) => (
						<div
							key={idx}
							className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm"
						>
							<div className="flex justify-between items-start mb-3">
								<div>
									<p className="text-xs font-bold text-on-surface">
										{review.name}
									</p>
									<p className="text-[10px] font-semibold text-on-surface-variant italic">
										{review.status}
									</p>
								</div>
								<div className="flex text-secondary">
									{[...Array(review.rating)].map((_, i) => (
										<Star key={i} size={14} className="fill-secondary" />
									))}
								</div>
							</div>
							<p className="text-sm text-on-surface leading-snug">
								"{review.text}"
							</p>
						</div>
					))}
				</div>

				<button className="w-full mt-8 py-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:text-primary transition-colors">
					See All Reviews <ArrowRight size={16} />
				</button>
			</section>

			<div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-lg border-t border-outline-variant/30 z-[60]">
				<div className="flex gap-3 max-w-7xl mx-auto">
					<button className="w-14 h-14 border border-outline rounded-2xl flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
						<Heart size={24} />
					</button>
					<button
						onClick={handleAddToCart}
						className="flex-1 bg-primary text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
						disabled={product.stock === 0}
					>
						{product.stock > 0
							? isAdded
								? `Added ${quantity} to Cart`
								: `Add to Cart - $${product.price.toFixed(2)}`
							: "Out of Stock"}
					</button>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async (
	context
) => {
	const rawId = context.params?.id;
	const id = Array.isArray(rawId) ? rawId[0] : rawId;

	if (!id) {
		return {
			notFound: true
		};
	}

	const response = await getProductById(id);
	const apiProduct: ApiProduct | null = response?.result || null;

	if (!response?.success || !apiProduct) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			product: {
				id: apiProduct._id,
				name: apiProduct.name,
				description: apiProduct.description || "No description available.",
				price: apiProduct.price,
				categoryName: apiProduct.category?.name || "Beauty Essentials",
				images:
					apiProduct.images?.length
						? apiProduct.images
						: ["/images/banner-image.jpg"],
				stock: apiProduct.stock || 0,
				sku: apiProduct.sku || "N/A",
				rating: apiProduct.rating || 0,
				reviewCount: Array.isArray(apiProduct.reviews)
					? apiProduct.reviews.length
					: 0
			}
		}
	};
};
