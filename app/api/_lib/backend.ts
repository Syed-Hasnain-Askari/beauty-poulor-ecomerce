export const getBackendBaseUrl = () => {
	return (
		process.env.API_BASE_URL ||
		process.env.NEXT_PUBLIC_API_BASE_URL ||
		""
	);
};

export const getSiteBaseUrl = () => {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	return "http://localhost:3000";
};
