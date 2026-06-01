"use server";

import { handleResponse } from "@/utils";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function createOrder(orderData: any) {
	try {
		const response = await fetch(`${BASE_URL}/api/orders`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(orderData),
			cache: "no-store"
		});
		return await handleResponse(response);
	} catch (error: any) {
		return { success: false, message: error.message, data: null };
	}
}
