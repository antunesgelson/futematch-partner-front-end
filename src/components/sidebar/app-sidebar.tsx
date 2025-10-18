"use client"

import { ChevronUp, Settings, User2 } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { BsFillPiggyBankFill } from "react-icons/bs";
import { FaClipboardList, FaTrophy } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";

export function AppSidebar() {
    // Menu items.
    const items = [
        {
            title: "Gerenciar Horários",
            url: "/dashboard/horarios",
            icon: MdAccessTimeFilled,
        },
        {
            title: "Financeiro",
            url: "/dashboard/financeiro",
            icon: BsFillPiggyBankFill,
        },
        {
            title: "Relatórios",
            url: "/dashboard/relatorios",
            icon: FaChartSimple,
        },
        {
            title: "Campeonatos",
            url: "/dashboard/campeonatos",
            icon: FaTrophy,
        },
        {
            title: "Central de Reservas",
            url: "/dashboard/central-de-reservas",
            icon: FaClipboardList,
        },

        {
            title: "Suporte",
            url: "/dashboard/suporte",
            icon: Settings,
        },


    ]

    const { toggleSidebar } = useSidebar()
    return (
        <Sidebar
            variant="inset"
            collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl flex flex-col gap-2 items-start">
                        FutMatch
                        <Separator />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-4">
                            {items.map((item) => (
                                <SidebarMenuItem className="text-primary" key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="text-primary" >
                                    <User2 /> Quadra GG
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width] text-primary ">
                                <DropdownMenuItem asChild>
                                    <Link
                                        //onClick={toggleSidebar}
                                        href="/dashboard/perfil">
                                        <span>Meu perfil</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <button >Sair</button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}