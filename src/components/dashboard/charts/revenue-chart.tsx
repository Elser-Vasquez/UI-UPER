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
        backgroundColor: "hsl(0 0% 11%)",
        borderColor: "hsl(0 0% 22%)",
        color: "hsl(0 0% 80%)",
        boxShadow: "0 4px 16px #0006",
      }}
    >
      <p className="font-medium mb-0.5" style={{ color: "hsl(0 0% 60%)" }}>{label}</p>
      <p style={{ color: isProjected ? "hsl(0 0% 56%)" : "#3ECF8E" }}>
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
          <p className="text-[13px] font-semibold" style={{ color: "hsl(0 0% 88%)" }}>Ingresos 2025</p>
          <p className="text-[12px] mt-0.5" style={{ color: "hsl(0 0% 44%)" }}>Mensual — real y proyectado</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "#3ECF8E" }} />
            <span className="text-[11px]" style={{ color: "hsl(0 0% 46%)" }}>Real</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: "hsl(0 0% 38%)" }} />
            <span className="text-[11px]" style={{ color: "hsl(0 0% 46%)" }}>Proyectado</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} style={{ height: 220 }}>
        {width > 0 && (
          <AreaChart width={width} height={220} data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3ECF8E" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3ECF8E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="hsl(0,0%,50%)" stopOpacity={0.12} />
                <stop offset="95%" stopColor="hsl(0,0%,50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "hsl(0,0%,38%)" }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: "hsl(0,0%,38%)" }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(0,0%,28%)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="revenue"
              stroke="#3ECF8E"
              strokeWidth={2}
              fill="url(#gradRevenue)"
              dot={false}
              activeDot={{ r: 4, fill: "#3ECF8E", strokeWidth: 0 }}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="projected"
              name="projected"
              stroke="hsl(0,0%,40%)"
              strokeWidth={2}
              strokeDasharray="4 3"
              fill="url(#gradProjected)"
              dot={false}
              activeDot={{ r: 4, fill: "hsl(0,0%,56%)", strokeWidth: 0 }}
              connectNulls={false}
            />
          </AreaChart>
        )}
      </div>
    </div>
  )
}
