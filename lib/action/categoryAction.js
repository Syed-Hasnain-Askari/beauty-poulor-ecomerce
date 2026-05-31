import { handleResponse } from "@/utils";

const slugify = (text) =>
	text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");

export async function getCategories() {
	try {
		const response = await fetch("/api/categories", {
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			cache: "no-store"
		});

		const data = await handleResponse(response);

		if (!data?.success || !Array.isArray(data.result)) {
			return {
				success: false,
				message: data?.message || "Failed to load categories",
				result: []
			};
		}

		const categories = data.result
			.map((item) => {
				const name = item?.name;
				const slug = item?.slug;
				if (!name) {
					return null;
				}

				return {
					name,
					slug: slug || slugify(name)
				};
			})
			.filter(Boolean)
			.reduce((unique, category) => {
				if (!unique.some((item) => item.slug === category.slug)) {
					unique.push(category);
				}
				return unique;
			}, []);

		return {
			success: true,
			message: "Categories loaded",
			result: categories
		};
	} catch (error) {
		console.error("getCategories failed:", error);
		return { success: false, message: error.message, result: [] };
	}
}
