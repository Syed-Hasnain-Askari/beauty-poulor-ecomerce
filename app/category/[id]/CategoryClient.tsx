"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "@/app/types";
import { useParams } from "next/navigation";
export default function CategoryClient({ products }: { products: Product[] }) {
	console.log(products);
	const params = useParams();
	const id: string = (params as { id?: string } | null)?.id ?? "";
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [minRating, setMinRating] = useState(0);
	const [maxPrice, setMaxPrice] = useState<number | null>(null);

	const brands = useMemo(
		() =>
			Array.from(new Set(products?.map((product) => product.category?.name))),
		[products]
	);

	const highestPrice = useMemo(() => {
		if (!products?.length) {
			return 200;
		}

		return Math.max(...products.map((product) => product.price), 200);
	}, [products]);

	const filteredProducts = useMemo(() => {
		return products?.filter((product) => {
			const brandMatch =
				selectedBrands.length === 0 ||
				selectedBrands.includes(product.category.name);
			const priceMatch = maxPrice === null || product.price <= maxPrice;
			const ratingMatch = product.rating >= minRating;
			return brandMatch && priceMatch && ratingMatch;
		});
	}, [maxPrice, minRating, products, selectedBrands]);

	const toggleBrand = (brand: string) => {
		setSelectedBrands((prev) =>
			prev.includes(brand)
				? prev.filter((item) => item !== brand)
				: [...prev, brand]
		);
	};

	const clearFilters = () => {
		setSelectedBrands([]);
		setMaxPrice(null);
		setMinRating(0);
	};

	return (
		<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative min-h-screen">
			<section className="mb-stack-lg">
				<h2 className="font-serif text-4xl md:text-5xl text-on-surface tracking-tight">
					{id === "all" ? "All Products" : products[0]?.category?.name}
				</h2>
				<p className="text-sm text-on-surface-variant mt-2 max-w-md">
					{id === "all"
						? "Discover our complete range of beauty products."
						: products[0]?.category?.description}
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
					<div className="hidden md:flex gap-2 items-center text-xs font-semibold border-on-background text-on-background">
						{filteredProducts.length} Products
					</div>
				</div>

				<div className="flex gap-2 mt-stack-md overflow-x-auto no-scrollbar py-1">
					{selectedBrands.map((brand) => (
						<div
							key={brand}
							className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap shadow-sm"
						>
							{brand}
							<X
								size={14}
								className="cursor-pointer"
								onClick={() => toggleBrand(brand)}
							/>
						</div>
					))}
					{maxPrice !== null && (
						<div className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap shadow-sm">
							Under ${maxPrice}
							<X
								size={14}
								className="cursor-pointer"
								onClick={() => setMaxPrice(null)}
							/>
						</div>
					)}
					{minRating > 0 && (
						<div className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap shadow-sm">
							{minRating}+ Stars
							<X
								size={14}
								className="cursor-pointer"
								onClick={() => setMinRating(0)}
							/>
						</div>
					)}
				</div>
			</section>

			<section className="py-section-gap mt-stack-md">
				<div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
					<div className="flex items-center justify-between mb-8 gap-4">
						<div className="text-sm text-on-surface-variant">
							{filteredProducts.length} Products
						</div>
					</div>

					<div className="flex overflow-x-auto no-scrollbar gap-8 pb-8 snap-x">
						{filteredProducts.length > 0 ? (
							filteredProducts.map((product) => (
								<div
									key={product._id}
									className="snap-start flex-shrink-0 w-72"
								>
									<ProductCard products={product} />
								</div>
							))
						) : (
							<div className="py-20 text-center">
								<p className="text-on-surface-variant">
									No products match your filters.
								</p>
								<button
									onClick={clearFilters}
									className="mt-4 text-primary font-bold uppercase tracking-widest text-xs underline"
								>
									Clear All
								</button>
							</div>
						)}
					</div>
				</div>
			</section>

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
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 200 }}
							className="fixed right-0 top-0 h-full w-[85%] md:w-96 bg-background z-[80] shadow-2xl flex flex-col"
						>
							<div className="p-margin-mobile flex justify-between items-center border-b border-outline-variant/30">
								<h3 className="font-serif text-2xl text-on-surface">Filters</h3>
								<button
									onClick={() => setIsFilterOpen(false)}
									className="p-2 hover:bg-surface-variant/20 rounded-full"
								>
									<X size={24} />
								</button>
							</div>

							<div className="flex-1 overflow-y-auto p-margin-mobile space-y-stack-lg">
								<div>
									<h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest mb-stack-sm">
										Brands
									</h4>
									<div className="flex flex-wrap gap-2">
										{brands.map((brand) => (
											<button
												key={brand}
												onClick={() => toggleBrand(brand)}
												className={`px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
													selectedBrands.includes(brand)
														? "bg-primary text-white border-primary"
														: "border-outline-variant hover:border-primary"
												}`}
											>
												{brand}
											</button>
										))}
									</div>
								</div>

								<div>
									<h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest mb-stack-sm">
										Max Price
									</h4>
									<input
										type="range"
										min="40"
										max={highestPrice}
										step="10"
										value={maxPrice ?? highestPrice}
										onChange={(event) =>
											setMaxPrice(Number(event.target.value))
										}
										className="w-full accent-primary h-1 bg-surface-variant rounded-full appearance-none cursor-pointer"
									/>
									<div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
										<span>$40</span>
										<span className="text-primary">
											${maxPrice ?? highestPrice}
										</span>
										<span>${highestPrice}</span>
									</div>
								</div>

								<div>
									<h4 className="text-[10px] font-bold text-on-surface uppercase tracking-widest mb-stack-sm">
										Minimum Rating
									</h4>
									<div className="space-y-3">
										{[4.5, 4.0, 3.5].map((rating) => (
											<label
												key={rating}
												className="flex items-center gap-3 cursor-pointer group"
											>
												<div className="relative flex items-center justify-center w-5 h-5">
													<input
														type="radio"
														name="rating"
														checked={minRating === rating}
														onChange={() => setMinRating(rating)}
														className="appearance-none w-5 h-5 border border-outline-variant rounded-full checked:border-primary transition-all cursor-pointer"
													/>
													{minRating === rating && (
														<div className="absolute w-2.5 h-2.5 bg-primary rounded-full" />
													)}
												</div>
												<div className="flex gap-1 text-secondary">
													{[...Array(5)].map((_, index) => (
														<Star
															key={index}
															size={14}
															className={
																index < Math.floor(rating)
																	? "fill-secondary"
																	: ""
															}
														/>
													))}
												</div>
												<span className="text-xs font-semibold text-on-surface-variant group-hover:text-primary transition-colors">
													{rating} & Up
												</span>
											</label>
										))}
									</div>
								</div>
							</div>

							<div className="p-margin-mobile border-t border-outline-variant/30 grid grid-cols-2 gap-4">
								<button
									onClick={clearFilters}
									className="py-4 text-xs font-semibold uppercase tracking-widest hover:text-primary transition-colors"
								>
									Clear All
								</button>
								<button
									onClick={() => setIsFilterOpen(false)}
									className="py-4 bg-primary text-white rounded-full text-xs font-semibold uppercase tracking-widest shadow-md hover:bg-primary-container transition-colors"
								>
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
