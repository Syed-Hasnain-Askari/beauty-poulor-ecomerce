"use client";

import { useState } from "react";
import {
	Star,
	Minus,
	Plus,
	ChevronDown,
	ArrowRight,
	Heart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../../lib/cart-context";
import Image from "next/image";
import { Product } from "@/app/types";

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

export default function ProductClient({ product }: { product: Product }) {
	console.log(product, "ProductClient product");
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState("30ml");
	const [activeTab, setActiveTab] = useState<string | null>("description");
	const [isAdded, setIsAdded] = useState(false);
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const { addToCart } = useCart();
	
	const roundedRating = Math.max(0, Math.min(5, Math.round(product.rating || 4.8)));
	const reviewCount = product.reviews?.length || 124; // Default to design's count if none exist

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const container = e.currentTarget;
		const scrollPosition = container.scrollLeft;
		const itemWidth = container.clientWidth;
		if (itemWidth > 0) {
			const index = Math.round(scrollPosition / itemWidth);
			setActiveImageIndex(index);
		}
	};

	const handleAddToCart = () => {
		if (product.stock === 0) {
			return;
		}

		addToCart({
			id: product._id,
			name: product.name,
			price: product.price,
			image: product.image[0],
			quantity,
			categoryName: product.category?.name || "Beauty Essentials",
			sku: product.sku,
			stock: product.stock
		});
		setIsAdded(true);
		window.setTimeout(() => setIsAdded(false), 1800);
	};

	const accordionSections = [
		{
			id: "description",
			title: "Description",
			content: product.description
		},
		{
			id: "ingredients",
			title: "Ingredients",
			content: "Aqua, Glycerin, Sodium Hyaluronate, Vitamin C (L-Ascorbic Acid), Niacinamide, Rosehip Extract, Squalane, Tocopherol (Vitamin E), Ferulic Acid, Phenoxyethanol.",
			isItalic: true
		},
		{
			id: "how-to-use",
			title: "How to Use",
			content: "Apply 2-3 drops to clean, damp skin morning and night. Gently press into the face and neck until fully absorbed. Follow with your favorite Lumière moisturizer. Always use SPF during the day."
		},
		{
			id: "details",
			title: "Product Details",
			content: `Category: ${product.category?.name || "Beauty Essentials"}. SKU: ${product.sku || "N/A"}. Available stock: ${product.stock ?? 0}.`
		}
	];

	return (
		<div className="pb-32 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
			<div className="flex flex-col lg:flex-row gap-stack-lg">
				{/* Gallery */}
				<section className="w-full lg:w-1/2 relative bg-surface-container-low rounded-2xl overflow-hidden">
					<div 
						onScroll={handleScroll}
						className="overflow-x-auto snap-x snap-mandatory flex no-scrollbar scroll-smooth"
					>
						{product.image && product.image.length > 0 ? (
							product.image.map((imgUrl, idx) => (
								<div key={idx} className="flex-shrink-0 w-full aspect-[4/5] snap-start relative">
									<Image
										alt={`${product.name} - Image ${idx + 1}`}
										src={imgUrl}
										loading={idx === 0 ? "eager" : "lazy"}
										fill
										sizes="(max-width: 1024px) 100vw, 50vw"
										className="object-cover"
									/>
								</div>
							))
						) : (
							<div className="flex-shrink-0 w-full aspect-[4/5] snap-start relative">
								<Image
									alt={product.name}
									src="/image/banner-image.jpg"
									loading="eager"
									fill
									className="object-cover"
								/>
							</div>
						)}
					</div>
					
					{/* Thumbnail dots */}
					{product.image && product.image.length > 1 && (
						<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
							{product.image.map((_, idx) => (
								<span
									key={idx}
									className={`w-2 h-2 rounded-full transition-all duration-300 ${
										idx === activeImageIndex ? "bg-primary w-4" : "bg-outline-variant"
									}`}
								></span>
							))}
						</div>
					)}
				</section>

				{/* Info */}
				<section className="w-full lg:w-1/2 flex flex-col justify-start">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-1.5">
							<div className="flex text-secondary">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={18}
										className={i < roundedRating ? "fill-secondary text-secondary" : "text-outline/30"}
									/>
								))}
							</div>
							<span className="font-sans text-xs text-on-surface-variant font-medium">
								({reviewCount} reviews)
							</span>
						</div>
						<p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">
							{product.category?.name || "Beauty Essentials"}
						</p>
						<h2 className="font-serif text-3xl md:text-4xl text-on-surface font-semibold tracking-tight">
							{product.name}
						</h2>
						<p className="font-sans text-2xl font-semibold text-primary mt-1">
							${product.price.toFixed(2)}
						</p>
					</div>

					{/* Selectors */}
					<div className="mt-8 flex flex-col gap-6">
						{/* Size Selector */}
						<div>
							<label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-3">
								Select Size
							</label>
							<div className="flex gap-3">
								{["30ml", "50ml"].map((size) => (
									<button
										key={size}
										onClick={() => setSelectedSize(size)}
										className={`px-6 py-2 border-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
											selectedSize === size
												? "border-primary bg-primary/5 text-primary"
												: "border-outline/30 text-on-surface-variant hover:border-outline"
										}`}
									>
										{size}
									</button>
								))}
							</div>
						</div>

						{/* Quantity Selector */}
						<div>
							<label className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant block mb-3">
								Quantity
							</label>
							<div className="flex items-center border border-outline/30 rounded-full px-4 py-2 w-32 justify-between">
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="text-on-surface-variant hover:text-primary transition-colors duration-200"
								>
									<Minus size={16} />
								</button>
								<span className="font-sans text-sm font-semibold">{quantity}</span>
								<button
									onClick={() =>
										setQuantity(
											Math.min(product.stock || quantity + 1, quantity + 1)
										)
									}
									className="text-on-surface-variant hover:text-primary transition-colors duration-200"
									disabled={product.stock === 0}
								>
									<Plus size={16} />
								</button>
							</div>
							{product.stock > 0 && (
								<p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
									Selected: {quantity} ({product.stock} in stock)
								</p>
							)}
						</div>
					</div>

					{/* Info Tabs (Accordion Style) */}
					<div className="mt-12 flex flex-col divide-y divide-outline-variant/30 border-t border-b border-outline-variant/30">
						{accordionSections.map((section) => (
							<div key={section.id} className="py-4">
								<button
									onClick={() =>
										setActiveTab(activeTab === section.id ? null : section.id)
									}
									className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-on-surface hover:text-primary transition-colors duration-200"
								>
									<span>{section.title}</span>
									<ChevronDown
										className={`transition-transform duration-300 text-on-surface-variant ${
											activeTab === section.id ? "rotate-180 text-primary" : ""
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
											transition={{ duration: 0.3 }}
											className="overflow-hidden"
										>
											<div className={`pt-4 text-sm text-on-surface-variant leading-relaxed ${section.isItalic ? "italic" : ""}`}>
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

			{/* Reviews Section */}
			<section className="mt-16 border-t border-outline-variant/30 pt-16">
				<h3 className="font-serif text-2xl md:text-3xl text-on-surface font-semibold mb-6">Customer Reviews</h3>
				
				{/* Ratings Summary */}
				<div className="bg-surface-container-low rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
					<div className="flex items-center gap-5">
						<div className="text-4xl md:text-5xl font-serif font-bold text-on-surface">
							{product.rating ? product.rating.toFixed(1) : "4.8"}
						</div>
						<div>
							<div className="flex text-secondary mb-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={20}
										className={i < roundedRating ? "fill-secondary text-secondary" : "text-outline/30"}
									/>
								))}
							</div>
							<p className="font-sans text-xs text-on-surface-variant font-medium">
								Based on {reviewCount} reviews
							</p>
						</div>
					</div>

					{/* Star Breakdown Chart */}
					<div className="flex-1 max-w-md flex flex-col gap-2">
						{[
							{ stars: 5, pct: 85 },
							{ stars: 4, pct: 10 },
							{ stars: 3, pct: 3 },
							{ stars: 2, pct: 1 },
							{ stars: 1, pct: 1 }
						].map((item) => (
							<div key={item.stars} className="flex items-center gap-3">
								<span className="font-sans text-[10px] font-bold text-on-surface-variant w-4">
									{item.stars}
								</span>
								<div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
									<div
										className="h-full bg-primary rounded-full transition-all duration-500"
										style={{ width: `${item.pct}%` }}
									></div>
								</div>
								<span className="font-sans text-[10px] font-bold text-on-surface-variant w-8">
									{item.pct}%
								</span>
							</div>
						))}
					</div>
					
					{/* Write Review Button */}
					<div className="md:w-auto w-full">
						<button className="w-full md:px-8 py-4 border-2 border-primary text-primary rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md">
							Write a Review
						</button>
					</div>
				</div>

				{/* Individual Review Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{REVIEWS.map((review, idx) => (
						<div
							key={idx}
							className="bg-surface border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
						>
							<div className="flex justify-between items-start mb-4">
								<div>
									<p className="font-sans text-sm font-semibold text-on-surface">
										{review.name}
									</p>
									<p className="text-[10px] text-on-surface-variant italic font-medium">
										{review.status}
									</p>
								</div>
								<div className="flex text-secondary">
									{[...Array(review.rating)].map((_, i) => (
										<Star key={i} size={14} className="fill-secondary text-secondary" />
									))}
								</div>
							</div>
							<p className="text-sm text-on-surface-variant leading-relaxed font-sans">
								"{review.text}"
							</p>
						</div>
					))}
				</div>

				<button className="w-full mt-8 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary flex items-center justify-center gap-2 transition-all duration-200 group">
					See All Reviews{" "}
					<ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
				</button>
			</section>

			{/* Sticky Bottom Bar */}
			<div className="fixed bottom-0 left-0 w-full p-4 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/30 z-[60]">
				<div className="flex gap-3 max-w-7xl mx-auto">
					<button className="w-14 h-14 border border-outline/30 rounded-2xl flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all duration-300 bg-surface">
						<Heart size={24} />
					</button>
					<button
						onClick={handleAddToCart}
						className="flex-1 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
						disabled={product.stock === 0}
					>
						{product.stock > 0
							? isAdded
								? `Added ${quantity} to Cart`
								: `Add to Cart — $${(product.price * quantity).toFixed(2)}`
							: "Out of Stock"}
					</button>
				</div>
			</div>
		</div>
	);
}
