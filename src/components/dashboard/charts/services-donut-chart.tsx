"use client"

import { useRef, useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

const data = [
  { name: "CDN",     value: 34, color: "hsl(210 100% 64%)" },
  { name: "Storage", value: 22, color: "hsl(258 80% 72%)" },
  { name: "Compute", value: 18, color: "hsl(39 100% 57%)" },
  { name: "Email",   value: 16, color: "#3ECF8E" },
  { name: "Queue",   value: 10, color: "hsl(0 0% 46%)" },
]

const SIZE = 160

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const { name, value, payload: { color } } = payload[0]
  return (
    <div
      className="rounded-lg border px-3 py-2 text-[12px]"
      style={{
        backgroundColor: "hsl(0 0% 11%)",
        borderColor: "hsl(0 0% 22%)",
        boxShadow: "0 4px 16px #0006",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span style={{ color: "hsl(0 0% 72%)" }}>{name}</span>
        <strong style={{ color: "hsl(0 0% 92%)" }}>{value}%</strong>
      </div>
    </div>
  )
}

export function ServicesDonutChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setReady(true))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div
      className="rounded-lg border p-5 flex flex-col gap-4"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      <div>
        <p className="text-[13px] font-semibold" style={{ color: "hsl(0 0% 88%)" }}>Distribución de Servicios</p>
        <p className="text-[12px] mt-0.5" style={{ color: "hsl(0 0% 44%)" }}>Por tipo — uso relativo</p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {/* Donut */}
        <div
          ref={containerRef}
          className="relative shrink-0"
          style={{ width: SIZE, height: SIZE }}
        >
          {ready && (
            <PieChart width={SIZE} height={SIZE}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[22px] font-bold leading-none" style={{ color: "hsl(0 0% 92%)" }}>{total}</p>
            <p className="text-[10px] mt-0.5 uppercase tracking-widest" style={{ color: "hsl(0 0% 40%)" }}>total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 flex-1">
          {data.map(item => (
            <div key={item.name} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-[13px] flex-1" style={{ color: "hsl(0 0% 68%)" }}>{item.name}</span>
              <span className="text-[12px] font-medium tabular-nums" style={{ color: "hsl(0 0% 80%)" }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
