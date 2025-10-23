"use client"

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'

export default function ConditionalSidebar() {
  const pathname = usePathname()

  // Show sidebar only on /dashboard and nested dashboard routes
  if (!pathname?.startsWith('/dashboard')) {
    return null
  }



  return (
    <>
      <AppSidebar />
      <SidebarTrigger />
    </>
  )
}
