"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { ElementType } from "react"

export interface KpiCardProps {
  label: string
  value: string
  trend?: number        // percentage, positive = up, negative = down, 0 = flat
  trendLabel?: string
  icon: ElementType
  iconColor?: string
  iconBg?: string
  sub?: string
}

export function KpiCard({
  label, value, trend, trendLabel, icon: Icon, iconColor, iconBg, sub,
}: KpiCardProps) {
  const isUp   = trend !== undefined && trend > 0
  const isDown = trend !== undefined && trend < 0
  const isFlat = trend === 0

  const trendColor = isUp ? "#3ECF8E" : isDown ? "hsl(10 78% 62%)" : "hsl(0 0% 46%)"
  const TrendIcon  = isUp ? TrendingUp : isDown ? TrendingDown : Minus

  return (
    <div
      className="rounded-lg border p-5 flex flex-col gap-4"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      <div className="flex items-start justify-between">
        <p className="text-[12px] font-medium uppercase tracking-widest" style={{ color: "hsl(0 0% 44%)" }}>
          {label}
        </p>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{ backgroundColor: iconBg ?? "var(--surface-300)", color: iconColor ?? "hsl(0 0% 52%)" }}
        >
          <Icon style={{ width: 15, height: 15 }} strokeWidth={1.6} />
        </div>
      </div>

      <div>
        <p className="text-[28px] font-bold leading-none tracking-tight" style={{ color: "hsl(0 0% 94%)" }}>
          {value}
        </p>
        {sub && (
          <p className="text-[12px] mt-1" style={{ color: "hsl(0 0% 44%)" }}>{sub}</p>
        )}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          <TrendIcon style={{ width: 13, height: 13, color: trendColor, flexShrink: 0 }} strokeWidth={2} />
          <span className="text-[12px] font-medium" style={{ color: trendColor }}>
            {isUp ? "+" : ""}{trend}%
          </span>
          {trendLabel && (
            <span className="text-[12px]" style={{ color: "hsl(0 0% 38%)" }}>
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
