"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Bell } from "lucide-react"
import * as React from "react"

export function DashboardHeader() {
  const [hasUnread, setHasUnread] = React.useState(true)

  return (
    <header className=" border-b border-border sticky top-0 z-40 flex items-center justify-between  bg-background/80 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" bg-card">
        <div className=" p-2  ">
          <h1 className="text-3xl font-bold text-foreground">
            <span className="text-primary">FutMach</span> Partner
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie suas quadras de maneira rápida e eficiente
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 ">
        <Sheet>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger className="fkle" asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir notificações" className="relative">
                  <Bell className="size-5" />
                  {hasUnread && (
                    <span className="bg-destructive absolute -right-0.5 -top-0.5 inline-flex size-2 items-center justify-center rounded-full" />
                  )}
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>Notificações</TooltipContent>
          </Tooltip>

          <SheetContent side="right" className="sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Notificações</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-2 p-4">
              {/* Placeholder de notificações */}
              <NotificationItem
                title="Horário agendado"
                description="TIME A vs TIME B em 25/11/2025 às 17:00"
                onView={() => setHasUnread(false)}
              />
              <NotificationItem
                title="Nova mensagem"
                description="Cliente enviou uma mensagem sobre a reserva."
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function NotificationItem({
  title,
  description,
  onView,
}: {
  title: string
  description: string
  onView?: () => void
}) {
  return (
    <div className="border-muted bg-card hover:bg-accent/30 flex flex-col gap-1 rounded-md border p-3 transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-foreground text-sm font-medium">{title}</p>
        {onView ? (
          <button onClick={onView} className="text-primary text-xs underline underline-offset-2">
            marcar como lida
          </button>
        ) : null}
      </div>
      <p className="text-muted-foreground text-xs">{description}</p>
      <div className="mt-2 flex gap-2">
        <Button size="sm">Aceitar</Button>
        <Button size="sm" variant="outline">
          Recusar
        </Button>
      </div>
    </div>
  )
}

export default DashboardHeader
