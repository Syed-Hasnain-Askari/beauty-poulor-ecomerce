import Link from "next/link";
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
