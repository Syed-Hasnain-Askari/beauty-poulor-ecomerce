"use server";

import { handleResponse } from "@/utils";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

export async function getProductsByCategory(slug?: string) {
	try {
		const url = slug 
			? `${BASE_URL}/api/products?slug=${slug}` 
			: `${BASE_URL}/api/products`;
		
		const response = await fetch(url, { cache: "no-store" });
		return await handleResponse(response);
	} catch (error: any) {
		console.error("[getProductsByCategory] Error:", error.message);
		return { success: false, message: error.message, result: [] };
	}
}

export async function getProductById(id: string) {
	try {
		const response = await fetch(`${BASE_URL}/api/products/${id}`, { 
			cache: "no-store" 
		});
		return await handleResponse(response);
	} catch (error: any) {
		console.error("[getProductById] Error:", error.message);
		return { success: false, message: error.message, result: null };
	}
}
