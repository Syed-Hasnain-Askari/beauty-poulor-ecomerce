"use client";

import { usePathname } from "next/navigation";
import Layout from "./Layout";

export default function AppRouterChrome({
	children
}: {
	children: React.ReactNode;
}) {
	return <Layout>{children}</Layout>;
}
