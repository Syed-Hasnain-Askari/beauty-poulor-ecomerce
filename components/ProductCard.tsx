"use client";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/app/types";

export default function ProductCard({ products }: { products: Product }) {
	console.log("ProductCard products:", products);
	const { addToCart } = useCart();
	const handleAddToCart = () => {
		console.log("Adding to cart:", products);
		if (products.stock === 0) {
			return;
		}

		addToCart({
			id: products._id,
			name: products.name,
			price: products.price,
			image: products.image?.[0] || "/image/banner-image.jpg",
			quantity: 1,
			sku: products.sku,
			stock: products.stock
		});
	};
	console.log(products);
	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			whileHover={{ y: -5 }}
			className="flex h-full flex-col group w-full"
		>
			<div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4 shadow-sm bg-surface-variant/20">
				<Link
					href={`/product/${products?._id}`}
					className="block w-full h-full relative"
					prefetch={false}
				>
					<Image
						alt={products?.name}
						src={products?.image?.[0] || "/image/banner-image.jpg"}
						width={300}
						height={400}
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
				</Link>
				<button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-primary shadow-sm hover:scale-110 active:scale-90 transition-transform z-10">
					<Heart size={18} />
				</button>
			</div>

			<div className="px-1 flex flex-col justify-between grow">
				<div>
					<p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-1">
						{products?.category?.name || "Beauty Edit"}
					</p>
					<h3 className="font-serif text-lg text-on-surface leading-tight mb-1">
						{products?.name}
					</h3>
					<div className="flex items-center gap-1 mb-2">
						<Star size={12} className="fill-gold text-gold" />
						<span className="text-[10px] font-semibold text-on-surface-variant">
							{products?.rating} (
							{products?.rating ? products.reviews?.length : 0} reviews)
						</span>
					</div>
				</div>
				<div className="flex items-center justify-between mt-auto pt-2">
					<span className="font-serif text-xl text-on-surface font-medium">
						${products?.price.toFixed(2)}
					</span>
					<button
						onClick={handleAddToCart}
						className="w-10 h-10 flex items-center justify-center rounded-full bg-deep-rose text-white shadow-lg shadow-deep-rose/20 hover:scale-110 active:scale-90 transition-all"
					>
						<ShoppingCart size={18} />
					</button>
				</div>
			</div>
		</motion.div>
	);
}
