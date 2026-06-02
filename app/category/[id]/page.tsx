import { getProductsByCategory } from "@/lib/action/productAction";
import CategoryClient from "./CategoryClient";
import { Metadata } from "next";
import { Product } from "@/app/types";

type Props = {
	params: Promise<{ id: string }>;
};

async function getCategoryData(slug: string) {
	const response =
		slug === "all"
			? await getProductsByCategory("")
			: await getProductsByCategory(slug);
	return response?.result || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const response = await getCategoryData(id);
	console.log("generateMetadata response:", response);

	return {
		title: `${response[0]?.category?.name || "All Products"} | Lumiere Beauty`,
		description: `Explore our collection of ${response[0]?.category?.description || "All Products"} products.`
	};
}

export default async function CategoryPage({ params }: Props) {
	const { id } = await params;
	const products = await getCategoryData(id);
	console.log("CategoryPage products:", products);
	return <CategoryClient products={products} />;
}
