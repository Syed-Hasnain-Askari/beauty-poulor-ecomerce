"use client";

import { useEffect, useState } from "react";
import { useCart } from "../lib/cart-context";
import Link from "next/link";
import { Menu, Search, ShoppingBag, Heart, User } from "lucide-react";

export const Navbar = ({
	onToggleSidebar
}: {
	onToggleSidebar: () => void;
}) => {
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
						<Link href="" className={navLinkClass}>
							About
							<span className={navLinkHoverClass}></span>
						</Link>
						<Link href="/contact" className={navLinkClass}>
							Contact
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
};
