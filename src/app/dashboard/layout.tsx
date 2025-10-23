"use client"

import { DashboardHeader } from "@/components/header/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<SidebarProvider>
			<SidebarInset>
				<DashboardHeader />
				<div className="lg:p-4 p-2 bg-white">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

