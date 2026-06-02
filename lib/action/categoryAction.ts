"use server";

import { handleResponse } from "@/utils";

const BASE_URL = process.env.BASE_URL;

export async function getCategories() {
	try {
		const response = await fetch(`${BASE_URL}/api/categories`, {
			cache: "no-store"
		});
		return await handleResponse(response);
	} catch (error: any) {
		console.error("[getCategories] Error:", error.message);
		return { success: false, message: error.message, result: [] };
	}
}
