"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
import { Legend as RechartsLegend, Tooltip as RechartsTooltip } from "recharts"

export type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
  }
>

type ChartContainerProps = React.ComponentProps<"div"> & {
  config?: ChartConfig
}

export function ChartContainer({ config, className, ...props }: ChartContainerProps) {
  // Expose CSS vars for series colors like --color-<key>
  const style = React.useMemo(() => {
    const entries = Object.entries(config ?? {})
    const cssVars = entries.reduce<Record<string, string>>((acc, [k, v]) => {
      if (v?.color) acc[`--color-${k}`] = v.color
      return acc
    }, {})
    return cssVars
  }, [config])

  return (
    <div
      className={cn(
        "bg-card text-card-foreground border-muted relative flex w-full flex-col gap-2 rounded-lg border p-4",
        className
      )}
      style={style as React.CSSProperties}
      {...props}
    />
  )
}

export function ChartHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium leading-none">{title}</h3>
      {description ? (
        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
      ) : null}
    </div>
  )
}

// Passthrough wrappers for recharts components, aligning with shadcn patterns
export const ChartTooltip = RechartsTooltip
export const ChartLegend = RechartsLegend

export function ChartTooltipContent({ label, payload, active }: { label?: any; payload?: any[]; active?: boolean }) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="bg-popover text-popover-foreground border-border rounded-md border px-3 py-2 text-xs shadow-sm">
      {label ? <div className="mb-1 font-medium">{String(label)}</div> : null}
      <div className="flex flex-col gap-1">
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm" style={{ background: item.color }} />
              <span className="text-muted-foreground">{item.name ?? item.dataKey}</span>
            </div>
            <span className="font-medium tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartLegendContent({ payload }: { payload?: any[] }) {
  if (!payload || payload.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      {payload.map((entry: any, idx: number) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm" style={{ background: entry.color }} />
          <span className="text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}
