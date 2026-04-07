"use client"

import { use } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Globe, CreditCard, CalendarDays, Clock,
  Activity, Settings, Trash2, Zap, BarChart2, AlertTriangle,
} from "lucide-react"
import { SERVICIOS_MAP } from "@/data/servicios"

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:  { label: "Activo",  color: "#3ECF8E",          bg: "#3ECF8E18",              border: "#3ECF8E44" },
  paused:  { label: "Pausado", color: "hsl(0 0% 52%)",    bg: "hsl(0 0% 18%)",          border: "hsl(0 0% 26%)" },
  error:   { label: "Error",   color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58% / 0.12)", border: "hsl(10 78% 58% / 0.3)" },
}

const TYPE_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  CDN:     { color: "hsl(210 100% 64%)", bg: "hsl(210 100% 56% / 0.12)", border: "hsl(210 100% 56% / 0.3)" },
  Storage: { color: "hsl(258 80% 72%)",  bg: "hsl(258 80% 60% / 0.12)",  border: "hsl(258 80% 60% / 0.3)" },
  Email:   { color: "#3ECF8E",           bg: "#3ECF8E14",                 border: "#3ECF8E38" },
  Compute: { color: "hsl(39 100% 57%)",  bg: "hsl(39 100% 57% / 0.12)",  border: "hsl(39 100% 57% / 0.3)" },
  Queue:   { color: "hsl(0 0% 52%)",     bg: "hsl(0 0% 14%)",            border: "hsl(0 0% 26%)" },
}

/* ── Small components ───────────────────────────────────────────────────── */

function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider leading-none border uppercase"
      style={{ color, backgroundColor: bg, borderColor: border }}
    >
      {label}
    </span>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "var(--border-default)" }}>
      <div className="flex items-center gap-2">
        <Icon style={{ width: 13, height: 13, color: "hsl(0 0% 38%)", flexShrink: 0 }} strokeWidth={1.6} />
        <span className="text-[12px]" style={{ color: "hsl(0 0% 46%)" }}>{label}</span>
      </div>
      <span className="text-[13px] font-medium" style={{ color: "hsl(0 0% 76%)" }}>{value}</span>
    </div>
  )
}

function ActionRow({
  icon: Icon, label, description, variant = "default",
}: {
  icon: React.ElementType; label: string; description: string; variant?: "default" | "destructive"
}) {
  const isDestructive = variant === "destructive"
  return (
    <div
      className="flex items-center justify-between p-4 rounded-lg border"
      style={{
        borderColor: isDestructive ? "hsl(10 78% 36%)" : "var(--border-default)",
        backgroundColor: isDestructive ? "hsl(10 78% 58% / 0.06)" : "var(--surface-100)",
      }}
    >
      <div className="flex items-start gap-3 min-w-0">
        <Icon
          style={{ width: 14, height: 14, color: isDestructive ? "hsl(10 78% 62%)" : "hsl(0 0% 50%)", marginTop: 2, flexShrink: 0 }}
          strokeWidth={1.6}
        />
        <div className="min-w-0">
          <p className="text-[13px] font-medium" style={{ color: isDestructive ? "hsl(10 78% 66%)" : "hsl(0 0% 82%)" }}>
            {label}
          </p>
          <p className="text-[12px] mt-0.5 leading-snug" style={{ color: "hsl(0 0% 44%)" }}>{description}</p>
        </div>
      </div>
      <button
        className="shrink-0 h-7 px-3 ml-4 rounded-md text-[12px] font-medium border transition-colors cursor-pointer"
        style={{
          color: isDestructive ? "hsl(10 78% 62%)" : "hsl(0 0% 64%)",
          borderColor: isDestructive ? "hsl(10 78% 40%)" : "var(--border-strong)",
          backgroundColor: "transparent",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = isDestructive ? "hsl(10 78% 58% / 0.12)" : "var(--surface-200)" }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent" }}
      >
        {isDestructive ? "Eliminar" : "Gestionar"}
      </button>
    </div>
  )
}

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon style={{ width: 13, height: 13, color: "hsl(0 0% 42%)" }} strokeWidth={1.6} />
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "hsl(0 0% 42%)" }}>
        {label}
      </p>
    </div>
  )
}

/* ── Stat card ──────────────────────────────────────────────────────────── */

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      <p className="text-[11px] uppercase tracking-widest font-semibold mb-1" style={{ color: "hsl(0 0% 40%)" }}>
        {label}
      </p>
      <p className="text-[22px] font-semibold leading-none" style={{ color: "hsl(0 0% 90%)" }}>{value}</p>
      {sub && <p className="text-[11px] mt-1" style={{ color: "hsl(0 0% 40%)" }}>{sub}</p>}
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const servicio = SERVICIOS_MAP[slug]

  if (!servicio) {
    return (
      <DashboardLayout orgName="UPER" plan="FREE">
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-[14px]" style={{ color: "hsl(0 0% 52%)" }}>
            Servicio <span style={{ color: "hsl(0 0% 72%)" }}>"{slug}"</span> no encontrado.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  const statusCfg = STATUS_CONFIG[servicio.status] ?? STATUS_CONFIG.paused
  const typeCfg   = TYPE_CONFIG[servicio.type]     ?? TYPE_CONFIG.Queue

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="-mx-6 md:-mx-10 flex flex-col lg:flex-row lg:h-full">

        {/* ══ LEFT ═══════════════════════════════════════════════════════ */}
        <div className="flex-1 lg:overflow-y-auto py-6 px-6 md:px-10 flex flex-col gap-6">

          {/* Header */}
          <div>
            <h1 className="text-[22px] font-semibold leading-snug" style={{ color: "hsl(0 0% 92%)" }}>
              {servicio.displayName}
            </h1>
            <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: "hsl(0 0% 48%)" }}>
              {servicio.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Badge label={statusCfg.label} color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
              <Badge label={servicio.type}   color={typeCfg.color}   bg={typeCfg.bg}   border={typeCfg.border} />
              <Badge label={servicio.plan}
                color="hsl(0 0% 52%)" bg="hsl(0 0% 14%)" border="hsl(0 0% 26%)" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Costo mensual" value={servicio.cost} sub="Facturación actual" />
            <StatCard label="Uptime" value="99.9%" sub="Últimos 30 días" />
          </div>

          {/* Activity */}
          <div>
            <SectionLabel icon={Activity} label="Actividad reciente" />
            <div
              className="rounded-lg border"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              {[
                { icon: Zap,           text: "Configuración actualizada correctamente",   time: "1 hour ago" },
                { icon: BarChart2,     text: "Pico de tráfico detectado — 2.4k req/min", time: "Yesterday" },
                { icon: AlertTriangle, text: "Latencia elevada — resuelta automáticamente", time: "3 days ago" },
              ].map((item, i, arr) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border-default)" : "none" }}
                >
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-md shrink-0 mt-0.5"
                    style={{ backgroundColor: "var(--surface-300)", color: "hsl(0 0% 52%)" }}
                  >
                    <item.icon style={{ width: 11, height: 11 }} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px]" style={{ color: "hsl(0 0% 74%)" }}>{item.text}</p>
                  </div>
                  <span className="text-[11px] shrink-0 mt-0.5" style={{ color: "hsl(0 0% 38%)" }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <SectionLabel icon={Settings} label="Acciones" />
            <div className="space-y-2">
              <ActionRow
                icon={Settings}
                label="Configuración del servicio"
                description="Edita parámetros, región y preferencias."
              />
              <ActionRow
                icon={Trash2}
                label="Eliminar servicio"
                description="Acción irreversible. Todos los datos serán eliminados."
                variant="destructive"
              />
            </div>
          </div>

        </div>

        {/* ── Divisor ─────────────────────────────────────────────────── */}
        <div className="hidden lg:block w-px shrink-0" style={{ backgroundColor: "var(--border-default)" }} />
        <div className="block lg:hidden h-px"          style={{ backgroundColor: "var(--border-default)" }} />

        {/* ══ RIGHT ══════════════════════════════════════════════════════ */}
        <div className="flex-1 lg:overflow-y-auto py-6 px-6 md:px-10 flex flex-col gap-6">

          {/* Info */}
          <div>
            <SectionLabel icon={Globe} label="Información" />
            <div
              className="rounded-lg border px-4"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              <InfoRow icon={Globe}        label="Proveedor"    value={servicio.provider} />
              <InfoRow icon={CreditCard}   label="Plan"         value={servicio.plan} />
              <InfoRow icon={CreditCard}   label="Costo"        value={servicio.cost} />
              <InfoRow icon={CalendarDays} label="Creado"       value={servicio.createdAt} />
              <InfoRow icon={Clock}        label="Actualizado"  value={servicio.updatedAt} />
            </div>
          </div>

          {/* Usage */}
          <div>
            <SectionLabel icon={BarChart2} label="Uso" />
            <div
              className="rounded-lg border px-4"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              <InfoRow icon={Zap}      label="Solicitudes hoy"    value="48,320" />
              <InfoRow icon={BarChart2} label="Ancho de banda"    value="1.2 TB" />
              <InfoRow icon={Clock}    label="Latencia promedio"   value="24ms" />
              <InfoRow icon={Globe}    label="Regiones activas"    value="3" />
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  )
}
