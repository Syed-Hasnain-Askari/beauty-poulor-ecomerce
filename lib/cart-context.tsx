"use client";

import {
	createContext,
	useContext,
	useMemo,
	useSyncExternalStore,
	type ReactNode
} from "react";

/**
 * Types
 */
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

/**
 * Constants & Global State (for useSyncExternalStore)
 */
const STORAGE_KEY = "beautypoulor-cart";
const CART_UPDATED_EVENT = "beautypoulor-cart-updated";
const EMPTY_CART: CartItem[] = [];

let cachedCartStorageValue: string | null = null;
let cachedCartSnapshot: CartItem[] = EMPTY_CART;

const CartContext = createContext<CartContextValue | undefined>(undefined);

/**
 * External Store Logic
 */
function readCartFromStorage(): CartItem[] {
	if (typeof window === "undefined") {
		return EMPTY_CART;
	}

	try {
		const storedCart = window.localStorage.getItem(STORAGE_KEY);
		const nextStorageValue = storedCart ?? "";

		// Optimization: return cached snapshot if storage hasn't changed
		if (cachedCartStorageValue === nextStorageValue) {
			return cachedCartSnapshot;
		}

		cachedCartStorageValue = nextStorageValue;
		cachedCartSnapshot = storedCart
			? (JSON.parse(storedCart) as CartItem[])
			: EMPTY_CART;

		return cachedCartSnapshot;
	} catch (error) {
		console.error("Failed to load cart from localStorage:", error);
		cachedCartStorageValue = null;
		cachedCartSnapshot = EMPTY_CART;
		return EMPTY_CART;
	}
}

function writeCartToStorage(items: CartItem[]) {
	if (typeof window === "undefined") return;

	try {
		const serializedItems = JSON.stringify(items);
		cachedCartStorageValue = serializedItems;
		cachedCartSnapshot = items;
		window.localStorage.setItem(STORAGE_KEY, serializedItems);
		window.dispatchEvent(new Event(CART_UPDATED_EVENT));
	} catch (error) {
		console.error("Failed to save cart to localStorage:", error);
	}
}

function subscribeToCartUpdates(onStoreChange: () => void) {
	if (typeof window === "undefined") return () => {};

	const handleStorage = (event: StorageEvent) => {
		if (event.key === STORAGE_KEY) onStoreChange();
	};

	const handleCustomEvent = () => onStoreChange();

	window.addEventListener("storage", handleStorage);
	window.addEventListener(CART_UPDATED_EVENT, handleCustomEvent);

	return () => {
		window.removeEventListener("storage", handleStorage);
		window.removeEventListener(CART_UPDATED_EVENT, handleCustomEvent);
	};
}

/**
 * Server Snapshot for SSR consistency
 */
const getServerSnapshot = () => EMPTY_CART;

/**
 * Provider Component
 */
export function CartProvider({ children }: { children: ReactNode }) {
	const items = useSyncExternalStore(
		subscribeToCartUpdates,
		readCartFromStorage,
		getServerSnapshot
	);

	const value = useMemo<CartContextValue>(() => {
		const calculateNextQuantity = (
			requestedQuantity: number,
			stock?: number
		) => {
			const validQuantity = Math.max(1, requestedQuantity);
			return stock !== undefined ? Math.min(validQuantity, stock) : validQuantity;
		};

		const addToCart = (input: AddToCartInput) => {
			const quantityToAdd = Math.max(1, input.quantity || 1);
			const existingItem = items.find((item) => item.id === input.id);

			let nextItems: CartItem[];

			if (existingItem) {
				nextItems = items.map((item) =>
					item.id === input.id
						? {
								...item,
								quantity: calculateNextQuantity(
									item.quantity + quantityToAdd,
									input.stock
								)
						  }
						: item
				);
			} else {
				nextItems = [
					...items,
					{
						...input,
						quantity: calculateNextQuantity(quantityToAdd, input.stock)
					} as CartItem
				];
			}

			writeCartToStorage(nextItems);
		};

		const removeFromCart = (id: string) => {
			writeCartToStorage(items.filter((item) => item.id !== id));
		};

		const updateQuantity = (id: string, quantity: number) => {
			const nextItems = items
				.map((item) => {
					if (item.id !== id) return item;
					return {
						...item,
						quantity: calculateNextQuantity(quantity, item.stock)
					};
				})
				.filter((item) => item.quantity > 0);

			writeCartToStorage(nextItems);
		};

		const clearCart = () => {
			writeCartToStorage(EMPTY_CART);
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

/**
 * Hook
 */
export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
