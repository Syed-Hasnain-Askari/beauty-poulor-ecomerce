import { getCategories as getProductsByCategory } from "@/lib/action/productAction";
import CategoryClient from "./CategoryClient";
import { Metadata } from "next";

type Props = {
	params: Promise<{ id: string }>;
};

type ApiProduct = {
	_id: string;
	name: string;
	price: number;
	rating?: number;
	reviews?: unknown[];
	images?: string[];
	category?: {
		_id?: string;
		name?: string;
		slug?: string;
	};
};

async function getCategoryData(slug: string) {
	const response =
		slug === "all"
			? await getProductsByCategory("")
			: await getProductsByCategory(slug);
	const apiProducts: ApiProduct[] = response?.result || [];
	const fallbackName = slug
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");

	return {
		categoryName: apiProducts[0]?.category?.name || fallbackName,
		products: apiProducts.map((product) => ({
			id: product._id,
			brand: product.category?.name || "Beauty Edit",
			name: product.name,
			price: product.price,
			rating: product.rating || 0,
			reviews: Array.isArray(product.reviews) ? product.reviews.length : 0,
			image: product.images?.[0] || "/images/banner-image.jpg"
		}))
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const { categoryName } = await getCategoryData(id);

	return {
		title: `${categoryName} | Lumiere Beauty`,
		description: `Explore our collection of ${categoryName} products.`
	};
}

export default async function CategoryPage({ params }: Props) {
	const { id } = await params;
	const { categoryName, products } = await getCategoryData(id);

	return <CategoryClient categoryName={categoryName} products={products} />;
}
