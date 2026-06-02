import { notFound } from "next/navigation";
import { getProductById } from "@/lib/action/productAction";
import ProductClient from "./ProductClient";
import { Metadata } from "next";

type Props = {
	params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
	const response = await getProductById(id);
	console.log("getProduct response:", response);

	if (!response?.success || !response?.result) {
		return null;
	}

	return response.result; // Returns the product object directly
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	console.log(await params, "generateMetadata params");
	const product = await getProduct(id);

	console.log("generateMetadata product:", product);

	if (!product) {
		return {
			title: "Product Not Found"
		};
	}

	return {
		title: `${product.name} | Lumiere Beauty`,
		description: product.description,
		openGraph: {
			images: product.images || []
		}
	};
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params;
	console.log("ProductPage id:", id);

	const product = await getProduct(id);

	if (!product) {
		notFound();
	}

	return <ProductClient product={product} />;
}
