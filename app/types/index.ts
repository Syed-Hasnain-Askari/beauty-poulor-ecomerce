// types/product.ts
export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: Category; // Define proper category type
	images: string[];
	stock: number;
	sku: string;
	rating: number;
	reviews: any[];
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface Category {
	_id: string;
	name: string;
	description: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
}
