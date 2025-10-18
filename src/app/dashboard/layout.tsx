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
				<div className="p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

