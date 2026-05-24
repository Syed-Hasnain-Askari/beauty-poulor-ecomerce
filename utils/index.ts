export const handleResponse = async (response) => {
	if (!response.ok) {
		const errorText = await response.text();
		console.error(`API Error (${response.status}):`, errorText);
		throw new Error(`API Error ${response.status}: ${response.statusText}`);
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
