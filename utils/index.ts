export const slugify = (text: string) =>
	text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");

export const handleResponse = async (response: Response) => {
	if (!response.ok) {
		const errorText = await response.text();
		const message = errorText
			? `${response.statusText}: ${errorText}`
			: response.statusText;
		throw new Error(`API Error ${response.status}: ${message}`);
	}

	const contentType = response.headers.get("content-type");
	if (!contentType && response.status === 204) {
		return { success: true };
	}

	if (!contentType || !contentType.includes("application/json")) {
		const text = await response.text();
		console.error("Non-JSON response received:", text);
		throw new Error(
			"Expected JSON response but received HTML/Text. This usually means a 404 or server error."
		);
	}

	return await response.json();
};
