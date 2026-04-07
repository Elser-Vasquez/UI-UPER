"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { KpiCard } from "@/components/dashboard/charts/kpi-cards"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { RequestsBarChart } from "@/components/dashboard/charts/requests-bar-chart"
import { ServicesDonutChart } from "@/components/dashboard/charts/services-donut-chart"
import { ActivityFeed } from "@/components/dashboard/charts/activity-feed"
import { StatsProgressRow } from "@/components/dashboard/charts/stats-row"
import {
  DollarSign, FolderKanban, Package, FileText,
  AlertTriangle, Clock,
} from "lucide-react"

/* ── KPI data ────────────────────────────────────────────────────────────── */

const KPI_DATA = [
  {
    label: "Ingresos del mes",
    value: "$31,200",
    trend: 12.5,
    trendLabel: "vs mes anterior",
    icon: DollarSign,
    iconColor: "#3ECF8E",
    iconBg: "#3ECF8E14",
    sub: "Facturado en Jul 2025",
  },
  {
    label: "Proyectos activos",
    value: "8",
    trend: 33,
    trendLabel: "2 nuevos este mes",
    icon: FolderKanban,
    iconColor: "hsl(210 100% 64%)",
    iconBg: "hsl(210 100% 56%/0.12)",
    sub: "De 11 proyectos totales",
  },
  {
    label: "Servicios en línea",
    value: "5",
    trend: 0,
    trendLabel: "sin cambios",
    icon: Package,
    iconColor: "hsl(258 80% 72%)",
    iconBg: "hsl(258 80% 60%/0.12)",
    sub: "1 en estado de error",
  },
  {
    label: "Contratos activos",
    value: "12",
    trend: -8.3,
    trendLabel: "1 vence esta semana",
    icon: FileText,
    iconColor: "hsl(39 100% 57%)",
    iconBg: "hsl(39 100% 57%/0.12)",
    sub: "De 20 contratos totales",
  },
]

/* ── Usage stats ─────────────────────────────────────────────────────────── */

const USAGE_STATS = [
  { label: "API Requests — uso mensual",   value: 72, display: "72%",         color: "#3ECF8E" },
  { label: "Almacenamiento S3",            value: 48, display: "48% de 2 TB", color: "hsl(210 100% 64%)" },
  { label: "Ancho de banda CDN",           value: 85, display: "85%",         color: "hsl(39 100% 57%)" },
  { label: "Compute — CPU promedio",       value: 34, display: "34%",         color: "hsl(258 80% 72%)" },
]

/* ── Quick alerts ─────────────────────────────────────────────────────────── */

const ALERTS = [
  { icon: AlertTriangle, text: "CTR-001 vence en 7 días — OmniTV S.A.",     color: "hsl(39 100% 57%)", bg: "hsl(39 100% 57%/0.08)", border: "hsl(39 100% 57%/0.25)" },
  { icon: AlertTriangle, text: "Message Queue en estado de error",           color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58%/0.08)",  border: "hsl(10 78% 58%/0.25)" },
  { icon: Clock,         text: "Mantenimiento programado: Dom 03:00 UTC",    color: "hsl(210 100% 64%)", bg: "hsl(210 100% 56%/0.08)", border: "hsl(210 100% 56%/0.25)" },
]

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="max-w-[1400px] py-6 space-y-6">

        {/* ── Alerts ────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          {ALERTS.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg border text-[13px]"
              style={{ backgroundColor: a.bg, borderColor: a.border, color: a.color }}
            >
              <a.icon style={{ width: 13, height: 13, flexShrink: 0 }} strokeWidth={1.8} />
              {a.text}
            </div>
          ))}
        </div>

        {/* ── KPI cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {KPI_DATA.map(kpi => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* ── Revenue chart + Donut ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
          <RevenueChart />
          <ServicesDonutChart />
        </div>

        {/* ── Bar chart + Activity feed ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RequestsBarChart />
          <ActivityFeed />
        </div>

        {/* ── Usage progress stats ───────────────────────────────────────── */}
        <div>
          <div className="mb-3">
            <p className="text-[13px] font-semibold" style={{ color: "hsl(0 0% 88%)" }}>Uso de recursos</p>
            <p className="text-[12px] mt-0.5" style={{ color: "hsl(0 0% 44%)" }}>Consumo actual vs límite del plan</p>
          </div>
          <StatsProgressRow items={USAGE_STATS} />
        </div>

      </div>
    </DashboardLayout>
  )
}
