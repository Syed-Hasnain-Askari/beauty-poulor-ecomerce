"use client";

import {
	createContext,
	useContext,
	useMemo,
	useSyncExternalStore,
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
const CART_UPDATED_EVENT = "beautypoulor-cart-updated";
let cachedCartStorageValue: string | null = null;
let cachedCartSnapshot: CartItem[] = [];

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCartFromStorage() {
	if (typeof window === "undefined") {
		return cachedCartSnapshot;
	}

	try {
		const storedCart = window.localStorage.getItem(STORAGE_KEY);
		const nextStorageValue = storedCart ?? "";

		if (cachedCartStorageValue === nextStorageValue) {
			return cachedCartSnapshot;
		}

		cachedCartStorageValue = nextStorageValue;
		cachedCartSnapshot = storedCart
			? (JSON.parse(storedCart) as CartItem[])
			: [];

		return cachedCartSnapshot;
	} catch (error) {
		console.error("Failed to load cart:", error);
		cachedCartStorageValue = null;
		cachedCartSnapshot = [];
		return cachedCartSnapshot;
	}
}

function writeCartToStorage(items: CartItem[]) {
	if (typeof window === "undefined") {
		return;
	}

	const serializedItems = JSON.stringify(items);
	cachedCartStorageValue = serializedItems;
	cachedCartSnapshot = items;
	window.localStorage.setItem(STORAGE_KEY, serializedItems);
	window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

function subscribeToCartUpdates(onStoreChange: () => void) {
	if (typeof window === "undefined") {
		return () => {};
	}

	const handleStorage = (event: StorageEvent) => {
		if (event.key === STORAGE_KEY) {
			onStoreChange();
		}
	};

	const handleCustomEvent = () => {
		onStoreChange();
	};

	window.addEventListener("storage", handleStorage);
	window.addEventListener(CART_UPDATED_EVENT, handleCustomEvent);

	return () => {
		window.removeEventListener("storage", handleStorage);
		window.removeEventListener(CART_UPDATED_EVENT, handleCustomEvent);
	};
}

export function CartProvider({ children }: { children: ReactNode }) {
	const items = useSyncExternalStore(
		subscribeToCartUpdates,
		readCartFromStorage,
		() => []
	);

	const value = useMemo<CartContextValue>(() => {
		const addToCart = (item: AddToCartInput) => {
			const nextQuantity = Math.max(1, item.quantity || 1);
			const currentItems = items;
			const existingItem = currentItems.find(
				(currentItem) => currentItem.id === item.id
			);
			const nextItems = existingItem
				? currentItems.map((currentItem) =>
						currentItem.id === item.id
							? {
									...currentItem,
									quantity: Math.min(
										currentItem.quantity + nextQuantity,
										item.stock || currentItem.quantity + nextQuantity
									)
							  }
							: currentItem
				  )
				: [
						...currentItems,
						{
							...item,
							quantity: Math.min(nextQuantity, item.stock || nextQuantity)
						}
				  ];

			writeCartToStorage(nextItems);
		};

		const removeFromCart = (id: string) => {
			writeCartToStorage(
				items.filter((currentItem) => currentItem.id !== id)
			);
		};

		const updateQuantity = (id: string, quantity: number) => {
			writeCartToStorage(
				items
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
			writeCartToStorage([]);
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
