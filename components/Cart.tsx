"use client";
import Link from "next/link";
import { X, Minus, Plus, Info, ArrowRight, Gift } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
	const { items, subtotal, removeFromCart, updateQuantity, itemCount } =
		useCart();
	const freeShippingUnlocked = subtotal >= 75;
	const shippingProgress = Math.min((subtotal / 75) * 100, 100);

	return (
		<div className="px-margin-mobile py-stack-lg max-w-2xl mx-auto pb-48">
			{/* Header */}
			<div className="mb-stack-md flex justify-between items-baseline">
				<h2 className="font-serif text-3xl">Your Bag</h2>
				<span className="text-sm text-on-surface-variant">
					({itemCount} Items)
				</span>
			</div>

			{/* Gift Callout */}
			{freeShippingUnlocked && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className="mb-stack-md p-4 bg-primary/10 text-primary rounded-2xl flex items-center gap-4 border border-primary/20 shadow-sm"
				>
					<div className="bg-primary/10 p-2 rounded-full">
						<Gift size={20} className="fill-primary" />
					</div>
					<p className="text-sm font-semibold tracking-tight">
						You&apos;ve unlocked free shipping on this order.
					</p>
				</motion.div>
			)}

			{/* Items List */}
			<div className="space-y-stack-md">
				{items.map((item) => (
					<div
						key={item.id}
						className="bg-white p-4 rounded-2xl flex gap-4 shadow-sm border border-outline-variant/20"
					>
						<div className="w-24 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-surface-variant/30 relative">
							<Image
								className="w-full h-full object-cover"
								src={item.image}
								alt={item.name}
								loading="eager"
								width={96}
								height={128}
							/>
						</div>
						<div className="flex-grow flex flex-col justify-between py-1">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-serif text-lg text-on-surface">
										{item.name}
									</h3>
									<p className="text-xs text-on-surface-variant">
										Category:{" "}
										<span className="font-semibold text-primary">
											{item.categoryName || "Beauty Essentials"}
										</span>
									</p>
								</div>
								<button
									onClick={() => removeFromCart(item.id)}
									className="text-on-surface-variant hover:text-error transition-colors"
								>
									<X size={20} />
								</button>
							</div>
							<div className="flex justify-between items-center mt-4">
								<div className="flex items-center border border-outline-variant rounded-full px-2 py-1">
									<button
										onClick={() => updateQuantity(item.id, item.quantity - 1)}
										className="p-1 hover:text-primary"
									>
										<Minus size={14} />
									</button>
									<span className="px-3 text-sm font-semibold">
										{item.quantity}
									</span>
									<button
										onClick={() => updateQuantity(item.id, item.quantity + 1)}
										className="p-1 hover:text-primary"
									>
										<Plus size={14} />
									</button>
								</div>
								<span className="font-serif text-lg text-primary">
									${(item.price * item.quantity).toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				))}
				{items.length === 0 && (
					<div className="bg-white p-8 rounded-2xl border border-outline-variant/20 text-center">
						<p className="text-on-surface-variant">Your cart is empty.</p>
						<Link
							href="/category/all"
							className="inline-flex mt-4 text-primary font-semibold"
						>
							Continue shopping
						</Link>
					</div>
				)}
			</div>

			{/* Summary */}
			<section className="mt-section-gap space-y-stack-md">
				<div className="flex gap-3">
					<input
						className="flex-grow bg-white border border-outline-variant focus:ring-1 focus:ring-primary focus:border-primary rounded-full px-6 py-3 text-sm transition-all outline-none"
						placeholder="Discount Code"
						type="text"
					/>
					<button className="bg-on-background text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:opacity-90">
						Apply
					</button>
				</div>

				<div className="bg-surface-variant/10 p-6 rounded-2xl border border-outline-variant/30">
					<h3 className="font-serif text-xl mb-4">Summary</h3>
					<div className="space-y-4">
						<div className="flex justify-between text-on-surface-variant">
							<span className="text-sm uppercase tracking-widest font-semibold opacity-70">
								Subtotal
							</span>
							<span className="text-sm font-bold">${subtotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-on-surface-variant">
							<div className="flex items-center gap-1">
								<span className="text-sm uppercase tracking-widest font-semibold opacity-70">
									Shipping
								</span>
								<Info size={14} className="opacity-50" />
							</div>
							<span className="text-sm font-bold text-secondary">Free</span>
						</div>
						<div className="pt-4 border-t border-outline-variant/40 flex justify-between items-baseline">
							<span className="font-serif text-xl">Total</span>
							<span className="font-serif text-2xl text-primary">
								${subtotal.toFixed(2)}
							</span>
						</div>
					</div>
				</div>

				{/* Shipping Progress */}
				<div className="p-4 bg-surface-variant/5 rounded-2xl border border-outline-variant/20">
					<div className="flex justify-between mb-2">
						<span className="text-[10px] font-bold uppercase tracking-widest">
							{freeShippingUnlocked
								? "Free Shipping Unlocked!"
								: "Free Shipping Progress"}
						</span>
						<span className="text-[10px] font-bold text-primary uppercase tracking-widest">
							Over $75.00
						</span>
					</div>
					<div className="h-1.5 w-full bg-outline-variant/20 rounded-full overflow-hidden">
						<div
							className="h-full bg-primary"
							style={{ width: `${shippingProgress}%` }}
						></div>
					</div>
				</div>
			</section>

			{/* Checkout CTA */}
			<div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl p-margin-mobile border-t border-outline-variant/30 shadow-xl z-50">
				<div className="max-w-7xl mx-auto">
					<Link
						href="/checkout"
						className={`w-full font-serif py-5 rounded-full text-lg font-semibold tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${items.length === 0 ? "bg-outline-variant/40 text-white/80 pointer-events-none" : "bg-primary text-white hover:opacity-90 active:scale-95"}`}
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
