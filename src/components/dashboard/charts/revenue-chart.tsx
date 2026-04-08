"use client"

import { useRef, useEffect, useState } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts"

const data = [
  { month: "Ene", revenue: 18400, projected: null },
  { month: "Feb", revenue: 21200, projected: null },
  { month: "Mar", revenue: 19800, projected: null },
  { month: "Abr", revenue: 24600, projected: null },
  { month: "May", revenue: 28100, projected: null },
  { month: "Jun", revenue: 26500, projected: null },
  { month: "Jul", revenue: 31200, projected: null },
  { month: "Ago", revenue: 29800, projected: null },
  { month: "Sep", revenue: null,  projected: 33400 },
  { month: "Oct", revenue: null,  projected: 35100 },
  { month: "Nov", revenue: null,  projected: 37600 },
  { month: "Dic", revenue: null,  projected: 40200 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const val = payload[0]?.value ?? payload[1]?.value
  const isProjected = payload[0]?.name === "projected"
  return (
    <div
      className="rounded-lg border px-3 py-2 text-[12px]"
      style={{
        backgroundColor: "var(--background-dialog)",
        borderColor: "var(--border-strong)",
        color: "var(--foreground-default)",
        boxShadow: "0 4px 16px #0006",
      }}
    >
      <p className="font-medium mb-0.5" style={{ color: "var(--foreground-light)" }}>{label}</p>
      <p style={{ color: isProjected ? "var(--foreground-lighter)" : "var(--brand)" }}>
        {isProjected ? "Proyectado: " : "Ingresos: "}
        <strong>${Number(val).toLocaleString()}</strong>
      </p>
    </div>
  )
}

export function RevenueChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      className="rounded-lg border p-5 flex flex-col gap-4"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <p className="text-[13px] font-semibold" style={{ color: "var(--foreground-default)" }}>Ingresos 2025</p>
          <p className="text-[12px] mt-0.5" style={{ color: "var(--foreground-muted)" }}>Mensual — real y proyectado</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "var(--brand)" }} />
            <span className="text-[11px]" style={{ color: "var(--foreground-lighter)" }}>Real</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "var(--foreground-muted)" }} />
            <span className="text-[11px]" style={{ color: "var(--foreground-lighter)" }}>Proyectado</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} style={{ height: 220 }}>
        {width > 0 && (
          <AreaChart width={width} height={220} data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--brand)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--brand)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="var(--foreground-lighter)" stopOpacity={0.12} />
                <stop offset="95%" stopColor="var(--foreground-lighter)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--background-control)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "var(--foreground-muted)" }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: "var(--foreground-muted)" }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-stronger)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="revenue"
              stroke="var(--brand)"
              strokeWidth={2}
              fill="url(#gradRevenue)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--brand)", strokeWidth: 0 }}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="projected"
              name="projected"
              stroke="var(--foreground-muted)"
              strokeWidth={2}
              strokeDasharray="4 3"
              fill="url(#gradProjected)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--foreground-lighter)", strokeWidth: 0 }}
              connectNulls={false}
            />
          </AreaChart>
        )}
      </div>
    </div>
  )
}
