"use client";

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode
} from "react";

export type CartItem = {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	categoryName?: string;
	sku?: string;
	stock?: number;
};

type AddToCartInput = Omit<CartItem, "quantity"> & {
	quantity?: number;
};

type CartContextValue = {
	items: CartItem[];
	itemCount: number;
	subtotal: number;
	addToCart: (item: AddToCartInput) => void;
	removeFromCart: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
};

const STORAGE_KEY = "beautypoulor-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		try {
			const storedCart =
				typeof window !== "undefined"
					? window.localStorage.getItem(STORAGE_KEY)
					: null;

			if (storedCart) {
				setItems(JSON.parse(storedCart));
			}
		} catch (error) {
			console.error("Failed to load cart:", error);
		} finally {
			setHasLoaded(true);
		}
	}, []);

	useEffect(() => {
		if (!hasLoaded || typeof window === "undefined") {
			return;
		}

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}, [hasLoaded, items]);

	const value = useMemo<CartContextValue>(() => {
		const addToCart = (item: AddToCartInput) => {
			const nextQuantity = Math.max(1, item.quantity || 1);

			setItems((currentItems) => {
				const existingItem = currentItems.find(
					(currentItem) => currentItem.id === item.id
				);

				if (existingItem) {
					return currentItems.map((currentItem) =>
						currentItem.id === item.id
							? {
									...currentItem,
									quantity: Math.min(
										currentItem.quantity + nextQuantity,
										item.stock || currentItem.quantity + nextQuantity
									)
							  }
							: currentItem
					);
				}

				return [
					...currentItems,
					{
						...item,
						quantity: Math.min(nextQuantity, item.stock || nextQuantity)
					}
				];
			});
		};

		const removeFromCart = (id: string) => {
			setItems((currentItems) =>
				currentItems.filter((currentItem) => currentItem.id !== id)
			);
		};

		const updateQuantity = (id: string, quantity: number) => {
			setItems((currentItems) =>
				currentItems
					.map((currentItem) => {
						if (currentItem.id !== id) {
							return currentItem;
						}

						return {
							...currentItem,
							quantity: Math.min(
								Math.max(1, quantity),
								currentItem.stock || Math.max(1, quantity)
							)
						};
					})
					.filter((currentItem) => currentItem.quantity > 0)
			);
		};

		const clearCart = () => {
			setItems([]);
		};

		return {
			items,
			itemCount: items.reduce((count, item) => count + item.quantity, 0),
			subtotal: items.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			),
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart
		};
	}, [items]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
}
