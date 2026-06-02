"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { getCategories } from "@/lib/action/categoryAction";
import { Category } from "@/app/types";
import { motion, AnimatePresence } from "motion/react";
type SidebarCategory = {
	name: string;
	path: string;
};
export const Sidebar = ({
	isOpen,
	onClose
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const [dynamicCategories, setDynamicCategories] = useState<SidebarCategory[]>(
		[]
	);

	const categories = useMemo(() => {
		const baseCategories = [
			{ name: "All Products", path: "/category/all" },
			{ name: "Best Sellers", path: "/" }
		];

		const combined = [...baseCategories, ...dynamicCategories];

		// Remove duplicates based on path
		return combined.filter(
			(category, index, array) =>
				array.findIndex((item) => item.path === category.path) === index
		);
	}, [dynamicCategories]);

	useEffect(() => {
		let isMounted = true;

		const loadCategories = async () => {
			try {
				const response = await getCategories();

				if (!isMounted || !response?.success) {
					return;
				}

				const mappedCategories = Array.isArray(response.result)
					? response.result
							.map((category: Category) => {
								const name = category?.name;
								const slug = category?.slug;

								if (!name || !slug) {
									return null;
								}

								return {
									name,
									path: `/category/${slug}`
								};
							})
							.filter((category: any): category is SidebarCategory =>
								Boolean(category)
							)
					: [];

				setDynamicCategories(mappedCategories);
			} catch (error) {
				console.error("Failed to load categories in Sidebar:", error);
			}
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
										<Link
											href={cat.path}
											onClick={onClose}
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
										</Link>
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
};
