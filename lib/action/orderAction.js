import { handleResponse } from "@/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function createOrder(orderData) {
	try {
		const response = await fetch(`${BASE_URL}/api/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			body: JSON.stringify(orderData)
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("createOrder failed:", error);
		return { success: false, message: error.message, data: null };
	}
}
