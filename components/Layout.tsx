"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen flex flex-col bg-warm-cream">
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
			<Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
			<main className="flex-1 overflow-x-hidden pt-24">
				<div key={pathname}>{children}</div>
			</main>
			<Footer />
		</div>
	);
}
