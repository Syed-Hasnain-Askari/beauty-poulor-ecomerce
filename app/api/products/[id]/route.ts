import { NextRequest, NextResponse } from "next/server";
import { getBackendBaseUrl } from "../../_lib/backend";

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const baseUrl = getBackendBaseUrl();

	if (!baseUrl) {
		return NextResponse.json(
			{
				success: false,
				message:
					"Missing API_BASE_URL or NEXT_PUBLIC_API_BASE_URL environment variable."
			},
			{ status: 500 }
		);
	}

	const { id } = await params;
	const response = await fetch(`${baseUrl}/api/products/${id}`, {
		headers: {
			"Content-Type": "application/json"
		},
		cache: "no-store"
	});

	const contentType = response.headers.get("content-type") || "";
	const payload = contentType.includes("application/json")
		? await response.json()
		: { success: false, message: await response.text() };

	return NextResponse.json(payload, { status: response.status });
}
