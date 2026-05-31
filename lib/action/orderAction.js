import { handleResponse } from "@/utils";

export async function createOrder(orderData) {
	try {
		const response = await fetch("/api/orders", {
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
