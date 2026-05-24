import { handleResponse } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getCategories(slug?: string) {
	try {
		const url = slug
			? `${BASE_URL}/api/products?slug=${slug}`
			: `${BASE_URL}/api/products`;

		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			cache: "no-store"
		});

		return await handleResponse(response);
	} catch (error: any) {
		console.error("getCategories failed:", error);

		return {
			success: false,
			message: error.message,
			result: []
		};
	}
}

export async function getProductById(id) {
	try {
		const response = await fetch(`${BASE_URL}/api/products/${id}`, {
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			cache: "no-store"
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("getProductById failed:", error);
		return { success: false, message: error.message, result: null };
	}
}
