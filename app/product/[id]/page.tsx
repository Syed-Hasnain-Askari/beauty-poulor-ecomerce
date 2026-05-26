import { notFound } from "next/navigation";
import { getProductById } from "@/lib/action/productAction";
import ProductClient from "./ProductClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
	params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
	const response = await getProductById(id);
	if (!response?.success || !response?.result) {
		return null;
	}

	const apiProduct = response.result;
	return {
		id: apiProduct._id,
		name: apiProduct.name,
		description: apiProduct.description || "No description available.",
		price: apiProduct.price,
		categoryName: apiProduct.category?.name || "Beauty Essentials",
		images: apiProduct.images?.length
			? apiProduct.images
			: ["/images/banner-image.jpg"],
		stock: apiProduct.stock || 0,
		sku: apiProduct.sku || "N/A",
		rating: apiProduct.rating || 0,
		reviewCount: Array.isArray(apiProduct.reviews) ? apiProduct.reviews.length : 0
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const product = await getProduct(id);

	if (!product) {
		return {
			title: "Product Not Found"
		};
	}

	return {
		title: `${product.name} | Lumiere Beauty`,
		description: product.description
	};
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params;
	const product = await getProduct(id);

	if (!product) {
		notFound();
	}

	return <ProductClient product={product} />;
}
