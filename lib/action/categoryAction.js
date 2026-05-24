import { handleResponse } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getCategories(slug) {
	try {
		const query = slug ? `?slug=${encodeURIComponent(slug)}` : "";
		const response = await fetch(`${BASE_URL}/api/categories${query}`, {
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			cache: "no-store"
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("getCategories failed:", error);
		return { success: false, message: error.message, result: [] };
	}
}
