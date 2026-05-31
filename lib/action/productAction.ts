import { handleResponse } from "@/utils";

const getApiBaseUrl = () => {
	if (typeof window !== "undefined") {
		return "";
	}

	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	return "http://localhost:3000";
};

export async function getCategories(slug?: string) {
	try {
		const baseUrl = getApiBaseUrl();
		const url = slug ? `/api/products?slug=${slug}` : "/api/products";
		const finalUrl = baseUrl ? `${baseUrl}${url}` : url;

		const response = await fetch(finalUrl, {
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

export async function getProductById(id: string) {
	try {
		const baseUrl = getApiBaseUrl();
		const url = `/api/products/${id}`;
		const finalUrl = baseUrl ? `${baseUrl}${url}` : url;

		const response = await fetch(finalUrl, {
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			cache: "no-store"
		});

		return await handleResponse(response);
	} catch (error: any) {
		console.error("getProductById failed:", error);
		return { success: false, message: error.message, result: null };
	}
}
