"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	Menu,
	Search,
	ShoppingBag,
	Camera,
	X,
	Heart,
	User,
	Instagram,
	Youtube,
	Pin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getCategories } from "@/lib/action/categoryAction";
import { useCart } from "../lib/cart-context";

type SidebarCategory = {
	name: string;
	path: string;
};

type CategoryResponseItem = {
	_id?: string | number;
	name?: string;
	description?: string;
	slug?: string;
	image?: string;
};

export function Sidebar({
	isOpen,
	onClose
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const router = useRouter();
	const [dynamicCategories, setDynamicCategories] = useState<SidebarCategory[]>(
		[]
	);

	const navigateToCategory = async (path: string) => {
		onClose();
		await router.push(path);
	};

	const categories = [
		{ name: "All Products", path: "/category/all" },
		{ name: "Best Sellers", path: "/" },
		...dynamicCategories
	].filter(
		(category, index, array) =>
			array.findIndex((item) => item.path === category.path) === index
	);

	useEffect(() => {
		let isMounted = true;

		const loadCategories = async () => {
			const response = await getCategories();

			if (!isMounted || !response?.success) {
				return;
			}

			const mappedCategories = Array.isArray(response.result)
				? response.result
						.map((category: CategoryResponseItem) => {
							const name = category?.name;
							const path = category?.slug;

							if (!name || !path) {
								return null;
							}

							return {
								name,
								path: `/category/${path}`
							};
						})
						.filter((category: any): category is SidebarCategory =>
							Boolean(category)
						)
						.filter(
							(
								category: SidebarCategory,
								index: number,
								array: SidebarCategory[]
							) =>
								array.findIndex((item) => item.path === category.path) === index
						)
				: [];

			setDynamicCategories(mappedCategories);
		};

		loadCategories();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-matte-black/40 backdrop-blur-sm z-[70]"
					/>
					<motion.div
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed left-0 top-0 h-full w-[85%] md:w-80 bg-warm-cream z-[80] shadow-2xl flex flex-col"
					>
						<div className="p-margin-mobile flex justify-between items-center border-b border-outline-variant/30 h-20">
							<h3 className="font-serif text-2xl text-matte-black uppercase tracking-widest font-bold">
								LUMIÈRE
							</h3>
							<button
								onClick={onClose}
								className="p-2 hover:bg-matte-black/5 rounded-full transition-colors"
							>
								<X size={24} />
							</button>
						</div>

						<nav className="flex-1 overflow-y-auto p-margin-mobile">
							<ul className="flex flex-col gap-6">
								{categories?.map((cat) => (
									<li key={cat.name}>
										<button
											type="button"
											onClick={() => navigateToCategory(cat.path)}
											className="w-full text-left text-lg font-serif text-matte-black hover:text-deep-rose transition-colors flex items-center justify-between group"
										>
											{cat.name}
											<motion.span
												initial={{ opacity: 0, x: -5 }}
												whileHover={{ opacity: 1, x: 0 }}
												className="text-deep-rose"
											>
												→
											</motion.span>
										</button>{" "}
									</li>
								))}
							</ul>
							<div className="mt-12 pt-12 border-t border-outline-variant/30 flex flex-col gap-4">
								<Link
									href="/contact"
									onClick={onClose}
									className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant hover:text-deep-rose transition-colors"
								>
									Contact Us
								</Link>
								<Link
									href="/journal"
									onClick={onClose}
									className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant hover:text-deep-rose transition-colors"
								>
									Journal
								</Link>
							</div>
						</nav>

						<div className="p-margin-mobile border-t border-outline-variant/30">
							<p className="text-[10px] text-on-surface-variant uppercase tracking-widest text-center font-bold">
								Luxury Beauty Curated for You
							</p>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

export function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
	const [isScrolled, setIsScrolled] = useState(false);
	const { itemCount } = useCart();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinkClass =
		"text-xs font-semibold uppercase tracking-[0.2em] relative py-2 group overflow-hidden";
	const navLinkHoverClass =
		"absolute bottom-0 left-0 w-full h-[1px] bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-300";

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white shadow-md h-16" : "bg-transparent h-24"}`}
		>
			<div className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
				<div className="flex items-center gap-8">
					<button
						onClick={onToggleSidebar}
						className="text-on-surface p-1 hover:text-deep-rose transition-colors"
					>
						<Menu size={24} />
					</button>

					<div className="hidden lg:flex items-center gap-6">
						<Link href="/" className={navLinkClass}>
							Home
							<span className={navLinkHoverClass}></span>
						</Link>
						<Link href="/category/all" className={navLinkClass}>
							Shop
							<span className={navLinkHoverClass}></span>
						</Link>
						<Link href="/contact" className={navLinkClass}>
							About
							<span className={navLinkHoverClass}></span>
						</Link>
						<Link href="/contact" className={navLinkClass}>
							Blog
							<span className={navLinkHoverClass}></span>
						</Link>
					</div>
				</div>

				<Link
					href="/"
					className="font-serif text-2xl md:text-3xl uppercase tracking-[0.3em] font-bold text-matte-black absolute left-1/2 -translate-x-1/2"
				>
					LUMIÈRE
				</Link>

				<div className="flex items-center gap-4">
					<button className="text-on-surface p-1 hover:text-deep-rose transition-colors hidden sm:block">
						<Search size={22} />
					</button>
					<button className="text-on-surface p-1 hover:text-deep-rose transition-colors hidden sm:block">
						<Heart size={22} />
					</button>
					<button className="text-on-surface p-1 hover:text-deep-rose transition-colors hidden sm:block">
						<User size={22} />
					</button>
					<Link
						href="/cart"
						className="text-on-surface p-1 relative hover:text-deep-rose transition-colors"
					>
						<ShoppingBag size={22} />
						<span className="absolute top-0 right-0 bg-deep-rose text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
							{itemCount}
						</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export function Footer() {
	const footerTitleClass = "font-serif text-lg text-warm-cream mb-6";
	const footerLinkClass =
		"text-sm text-warm-cream/60 hover:text-gold transition-colors duration-300";

	return (
		<footer className="bg-matte-black text-warm-cream py-section-gap px-margin-mobile">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
					<div className="flex flex-col gap-4">
						<h4 className={footerTitleClass}>About Lumière</h4>
						<ul className="flex flex-col gap-3">
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Our Story
								</Link>
							</li>
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Sustainability
								</Link>
							</li>
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Journal
								</Link>
							</li>
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Careers
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-4">
						<h4 className={footerTitleClass}>Shop</h4>
						<ul className="flex flex-col gap-3">
							<li>
								<Link href="/category/all" className={footerLinkClass}>
									Best Sellers
								</Link>
							</li>
							<li>
								<Link href="/category/skincare" className={footerLinkClass}>
									Skincare
								</Link>
							</li>
							<li>
								<Link href="/category/makeup" className={footerLinkClass}>
									Makeup
								</Link>
							</li>
							<li>
								<Link href="/category/fragrance" className={footerLinkClass}>
									Fragrance
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-4">
						<h4 className={footerTitleClass}>Help & Support</h4>
						<ul className="flex flex-col gap-3">
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Shipping & Delivery
								</Link>
							</li>
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Returns & Exchanges
								</Link>
							</li>
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Beauty Help
								</Link>
							</li>
							<li>
								<Link href="/contact" className={footerLinkClass}>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-4">
						<h4 className={footerTitleClass}>Follow Us</h4>
						<div className="flex gap-4 mb-4">
							<a
								href="#"
								className="p-2 border border-warm-cream/20 rounded-full hover:bg-warm-cream hover:text-matte-black transition-all"
							>
								<Instagram size={20} />
							</a>
							<a
								href="#"
								className="p-2 border border-warm-cream/20 rounded-full hover:bg-warm-cream hover:text-matte-black transition-all"
							>
								<Camera size={20} />
							</a>
							<a
								href="#"
								className="p-2 border border-warm-cream/20 rounded-full hover:bg-warm-cream hover:text-matte-black transition-all"
							>
								<Youtube size={20} />
							</a>
						</div>
						<p className="text-xs text-warm-cream/40 leading-relaxed uppercase tracking-widest font-semibold">
							@lumierebeauty
						</p>
					</div>
				</div>

				<div className="pt-8 border-t border-warm-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
					<p className="text-[10px] text-warm-cream/40 uppercase tracking-[0.2em] font-bold">
						© 2024 Lumière Beauty. All Rights Reserved.
					</p>
					<div className="flex gap-4 items-center opacity-40 grayscale contrast-125">
						<div className="w-8 h-5 bg-warm-cream rounded-[2px]" />
						<div className="w-8 h-5 bg-warm-cream rounded-[2px]" />
						<div className="w-8 h-5 bg-warm-cream rounded-[2px]" />
						<div className="w-8 h-5 bg-warm-cream rounded-[2px]" />
					</div>
				</div>
			</div>
		</footer>
	);
}

export default function Layout({
	children,
	pathname: propPathname
}: {
	children: React.ReactNode;
	pathname?: string;
}) {
	const pathnameFromNavigation = usePathname();
	const pathname = propPathname || pathnameFromNavigation || "/";
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen flex flex-col bg-warm-cream">
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
			<Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
			<main className="flex-1 overflow-x-hidden pt-24">
				<AnimatePresence mode="wait">
					<motion.div
						key={pathname}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						{children}
					</motion.div>
				</AnimatePresence>
			</main>
			<Footer />
		</div>
	);
}
