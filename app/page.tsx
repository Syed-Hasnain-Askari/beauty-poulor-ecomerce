import { HomePage } from "@/components/HomePage";
import { getProductsByCategory } from "@/lib/action/productAction";
export default async function Page() {
	const response = await getProductsByCategory(); // Test with "all"
	return <HomePage products={response?.result || []} />;
}
