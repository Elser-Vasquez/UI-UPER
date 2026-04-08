"use client"

export interface StatProgressItem {
  label: string
  value: number   // 0–100
  display: string
  color?: string
}

export function StatsProgressRow({ items }: { items: StatProgressItem[] }) {
  return (
    <div
      className="rounded-lg border p-5 grid grid-cols-1 sm:grid-cols-2 gap-5"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      {items.map(item => {
        const color = item.color ?? "var(--brand)"
        return (
          <div key={item.label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px]" style={{ color: "var(--foreground-lighter)" }}>{item.label}</span>
              <span className="text-[13px] font-semibold tabular-nums" style={{ color: "var(--foreground-default)" }}>
                {item.display}
              </span>
            </div>
            <div
              className="h-[6px] rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--border-default)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, Math.max(0, item.value))}%`, backgroundColor: color }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
