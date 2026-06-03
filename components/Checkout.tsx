"use client";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown, Info, PackageCheck, Truck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/action/orderAction";
import Image from "next/image";
import { CheckoutForm } from "@/app/types";

const INITIAL_FORM: CheckoutForm = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	street: "",
	city: "",
	state: "",
	zipCode: "",
	country: "Pakistan",
	createAccount: false,
	password: ""
};

export default function CheckoutPage() {
	const { items, subtotal, clearCart, itemCount } = useCart();
	console.log(items, "items");
	const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [orderSuccess, setOrderSuccess] = useState<{
		orderNumber?: string;
		message?: string;
	} | null>(null);
	const [placedOrderSnapshot, setPlacedOrderSnapshot] = useState<{
		items: typeof items;
		subtotal: number;
		itemCount: number;
		total: number;
	} | null>(null);
	const [showDetails, setShowDetails] = useState(false);

	const shippingCost = 0;
	const total = subtotal + shippingCost;

	const summaryItems = placedOrderSnapshot?.items || items;
	const summarySubtotal = placedOrderSnapshot?.subtotal ?? subtotal;
	const summaryItemCount = placedOrderSnapshot?.itemCount ?? itemCount;
	const summaryTotal = placedOrderSnapshot?.total ?? total;

	const step = useMemo(() => {
		if (orderSuccess) {
			return 3;
		}

		const shippingFilled =
			form.street && form.city && form.state && form.zipCode && form.country;
		const contactFilled =
			form.firstName && form.lastName && form.email && form.phone;

		if (shippingFilled && contactFilled) {
			return 3;
		}

		if (contactFilled) {
			return 2;
		}

		return 1;
	}, [form, orderSuccess]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = event.target;
		const val =
			type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

		setForm((current) => ({
			...current,
			[name]: val
		}));
	};

	const validateForm = () => {
		if (items.length === 0) {
			return "Your cart is empty.";
		}

		if (
			!form.firstName ||
			!form.lastName ||
			!form.email ||
			!form.phone ||
			!form.street ||
			!form.city ||
			!form.state ||
			!form.zipCode ||
			!form.country
		) {
			return "Please complete all checkout fields.";
		}

		if (form.createAccount && !form.password) {
			return "Please provide a password to create an account.";
		}

		return "";
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage("");

		const validationError = validateForm();
		if (validationError) {
			setErrorMessage(validationError);
			return;
		}

		setIsSubmitting(true);

		const payload = {
			user: null,
			items: items.map((item) => ({
				product: item.id,
				quantity: item.quantity,
				price: item.price,
				image: item.image
			})),
			total,
			status: "pending",
			paymentStatus: "pending",
			paymentMethod: "cash_on_delivery",
			shippingAddress: {
				street: form.street,
				city: form.city,
				state: form.state,
				zipCode: form.zipCode,
				country: form.country
			},
			customer: {
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				phone: form.phone
			},
			createAccount: form.createAccount,
			password: form.password
		};

		console.log(
			"Submitting order with payload:",
			JSON.stringify(payload, null, 2)
		);

		const response = await createOrder(payload);
		console.log(payload);
		setIsSubmitting(false);

		if (!response?.success) {
			setErrorMessage(response?.message || "Unable to place your order.");
			return;
		}

		setOrderSuccess({
			orderNumber: response?.data?.orderNumber || response?.result?.orderNumber,
			message:
				response?.message ||
				response?.data?.message ||
				"Order placed successfully."
		});
		setPlacedOrderSnapshot({
			items,
			subtotal,
			itemCount,
			total
		});
		clearCart();
		setShowDetails(false);
	};

	return (
		<div className="pt-8 pb-section-gap px-margin-mobile max-w-lg mx-auto">
			<section className="mb-stack-lg">
				<div className="rounded-3xl border border-primary/15 bg-primary/5 p-6 shadow-sm">
					<div className="flex items-start gap-4">
						<div className="rounded-2xl bg-white p-3 text-primary shadow-sm">
							<Truck size={22} />
						</div>
						<div>
							<h2 className="font-serif text-2xl text-on-surface">
								Guest Checkout
							</h2>
							<p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
								Quick and easy. No login required. Optionally create an account
								to track your orders and save your details for next time.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* Order placed Section */}
			<AnimatePresence>
				{orderSuccess && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						className="mb-stack-lg rounded-3xl border border-primary/20 bg-white p-6 shadow-sm"
					>
						<div className="flex items-start gap-4">
							<div className="rounded-2xl bg-primary/10 p-3 text-primary">
								<PackageCheck size={24} />
							</div>
							<div>
								<h3 className="font-serif text-xl text-on-surface">
									Order placed
								</h3>
								<p className="mt-2 text-sm text-on-surface-variant">
									{orderSuccess.message}
								</p>
								{orderSuccess.orderNumber && (
									<p className="mt-2 text-xs font-bold uppercase tracking-widest text-primary">
										Order No: {orderSuccess.orderNumber}
									</p>
								)}
								<Link
									href="/category/all"
									className="inline-flex mt-4 text-sm font-semibold text-primary"
								>
									Continue shopping
								</Link>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<form className="space-y-stack-lg" onSubmit={handleSubmit}>
				<div className="space-y-stack-md">
					<h3 className="font-serif text-xl text-on-surface">
						Contact Information
					</h3>
					<div className="grid grid-cols-2 gap-4">
						<input
							name="firstName"
							value={form.firstName}
							onChange={handleChange}
							className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
							placeholder="First Name"
						/>
						<input
							name="lastName"
							value={form.lastName}
							onChange={handleChange}
							className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
							placeholder="Last Name"
						/>
					</div>
					<input
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
						placeholder="Email Address"
					/>
					<input
						name="phone"
						value={form.phone}
						onChange={handleChange}
						className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
						placeholder="Phone Number"
					/>

					<div className="pt-4 space-y-4">
						<label className="flex items-center gap-3 cursor-pointer group">
							<div className="relative flex items-center justify-center w-5 h-5">
								<input
									type="checkbox"
									name="createAccount"
									checked={form.createAccount}
									onChange={handleChange}
									className="appearance-none w-5 h-5 border border-outline-variant rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer"
								/>
								{form.createAccount && (
									<svg
										className="absolute w-3 h-3 text-white pointer-events-none"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								)}
							</div>
							<span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">
								Create an account for later?
							</span>
						</label>

						<AnimatePresence>
							{form.createAccount && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									className="overflow-hidden"
								>
									<input
										name="password"
										type="password"
										value={form.password}
										onChange={handleChange}
										className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
										placeholder="Create Password"
									/>
									<p className="mt-2 px-4 text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">
										Use at least 8 characters
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				<div className="space-y-stack-md">
					<h3 className="font-serif text-xl text-on-surface">
						Shipping Address
					</h3>
					<input
						name="street"
						value={form.street}
						onChange={handleChange}
						className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
						placeholder="Street Address"
					/>
					<div className="grid grid-cols-2 gap-4">
						<input
							name="city"
							value={form.city}
							onChange={handleChange}
							className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
							placeholder="City"
						/>
						<input
							name="state"
							value={form.state}
							onChange={handleChange}
							className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
							placeholder="State / Province"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<input
							name="zipCode"
							value={form.zipCode}
							onChange={handleChange}
							className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
							placeholder="Postal Code"
						/>
						<div className="relative">
							<select
								name="country"
								value={form.country}
								onChange={handleChange}
								className="w-full h-14 px-6 rounded-full border border-outline-variant bg-white text-sm appearance-none focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer"
							>
								<option value="Pakistan">Pakistan</option>
								<option value="United Arab Emirates">
									United Arab Emirates
								</option>
								<option value="Saudi Arabia">Saudi Arabia</option>
								<option value="United Kingdom">United Kingdom</option>
							</select>
							<ChevronDown
								className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
								size={20}
							/>
						</div>
					</div>
				</div>

				<div className="space-y-stack-md pt-stack-lg border-t border-outline-variant/30">
					<h3 className="font-serif text-xl text-on-surface">Payment Method</h3>
					<div className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-sm font-bold uppercase tracking-widest text-primary">
									Cash on Delivery (COD)
								</p>
								<p className="mt-2 text-sm text-on-surface-variant">
									Pay when you receive your parcel.
								</p>
							</div>
							<div className="rounded-full bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary">
								COD
							</div>
						</div>
					</div>
				</div>

				{errorMessage && (
					<div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
						{errorMessage}
					</div>
				)}

				<button
					type="submit"
					disabled={isSubmitting || items.length === 0}
					className="w-full bg-primary text-white h-16 rounded-full font-serif text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-stack-lg disabled:opacity-60 disabled:hover:scale-100"
				>
					{isSubmitting ? "Placing Order..." : "Confirm Order"}
				</button>
			</form>

			<aside className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-outline-variant/30 p-margin-mobile z-40 shadow-2xl">
				<div className="max-w-lg mx-auto">
					<div className="flex items-center justify-between mb-4">
						<div className="flex -space-x-4">
							{summaryItems.slice(0, 3).map((item) => (
								<div
									key={item.id}
									className="w-12 h-12 rounded-lg border-2 border-white overflow-hidden relative shadow-md"
								>
									<Image
										src={item.image}
										className="w-full h-full object-cover"
										alt={item.name}
										loading="eager"
										width={48}
										height={48}
									/>
									<span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
										{item.quantity}
									</span>
								</div>
							))}
							{summaryItems.length === 0 && (
								<div className="text-xs font-semibold text-on-surface-variant">
									No items selected
								</div>
							)}
						</div>
						<div className="text-right">
							<p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
								Total
							</p>
							<p className="font-serif text-2xl text-primary">
								${summaryTotal.toFixed(2)}
							</p>
						</div>
					</div>

					<AnimatePresence>
						{showDetails && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="overflow-hidden"
							>
								<div className="space-y-3 border-t border-outline-variant/20 pt-4 mb-4">
									{summaryItems.map((item) => (
										<div
											key={item.id}
											className="flex items-center justify-between gap-4 text-sm"
										>
											<div>
												<p className="font-semibold text-on-surface">
													{item.name}
												</p>
												<p className="text-xs text-on-surface-variant">
													Qty {item.quantity}
												</p>
											</div>
											<p className="font-semibold text-primary">
												${(item.price * item.quantity).toFixed(2)}
											</p>
										</div>
									))}
									<div className="flex items-center justify-between text-sm text-on-surface-variant pt-2">
										<div className="flex items-center gap-1">
											<span>Shipping</span>
											<Info size={14} className="opacity-50" />
										</div>
										<span>Free</span>
									</div>
									<div className="flex items-center justify-between text-sm font-semibold">
										<span>{summaryItemCount} item(s)</span>
										<span>${summarySubtotal.toFixed(2)}</span>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					<button
						onClick={() => setShowDetails((current) => !current)}
						className="w-full text-primary text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 hover:opacity-70 transition-opacity"
					>
						{showDetails ? "Hide details" : "Show details"}
						<ChevronDown
							size={14}
							className={
								showDetails
									? "rotate-180 transition-transform"
									: "transition-transform"
							}
						/>
					</button>
				</div>
			</aside>
		</div>
	);
}
