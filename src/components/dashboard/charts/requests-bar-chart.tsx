"use client"

import { useRef, useEffect, useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts"

const data = [
  { month: "Ene", deploys: 14, incidents: 2 },
  { month: "Feb", deploys: 18, incidents: 1 },
  { month: "Mar", deploys: 22, incidents: 3 },
  { month: "Abr", deploys: 17, incidents: 0 },
  { month: "May", deploys: 30, incidents: 2 },
  { month: "Jun", deploys: 26, incidents: 1 },
  { month: "Jul", deploys: 34, incidents: 4 },
  { month: "Ago", deploys: 29, incidents: 1 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg border px-3 py-2 text-[12px] space-y-1"
      style={{
        backgroundColor: "hsl(0 0% 11%)",
        borderColor: "hsl(0 0% 22%)",
        boxShadow: "0 4px 16px #0006",
      }}
    >
      <p className="font-medium pb-1" style={{ color: "hsl(0 0% 60%)", borderBottom: "1px solid hsl(0 0% 18%)" }}>
        {label}
      </p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.fill }} />
          <span style={{ color: "hsl(0 0% 64%)" }}>{p.dataKey === "deploys" ? "Despliegues" : "Incidentes"}:</span>
          <strong style={{ color: "hsl(0 0% 90%)" }}>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function RequestsBarChart() {
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
          <p className="text-[13px] font-semibold" style={{ color: "hsl(0 0% 88%)" }}>Despliegues e Incidentes</p>
          <p className="text-[12px] mt-0.5" style={{ color: "hsl(0 0% 44%)" }}>Últimos 8 meses</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#3ECF8E" }} />
            <span className="text-[11px]" style={{ color: "hsl(0 0% 46%)" }}>Despliegues</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(10 78% 56%)" }} />
            <span className="text-[11px]" style={{ color: "hsl(0 0% 46%)" }}>Incidentes</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} style={{ height: 220 }}>
        {width > 0 && (
          <BarChart width={width} height={220} data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "hsl(0,0%,38%)" }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(0,0%,38%)" }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(0,0%,14%)" }} />
            <Bar dataKey="deploys"   fill="#3ECF8E"          radius={[3, 3, 0, 0]} maxBarSize={28} />
            <Bar dataKey="incidents" fill="hsl(10,78%,56%)"  radius={[3, 3, 0, 0]} maxBarSize={28} />
          </BarChart>
        )}
      </div>
    </div>
  )
}
