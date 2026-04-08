"use client"

import {
  CheckCircle2, AlertCircle, Info, Zap, GitBranch, UserPlus, CreditCard, TriangleAlert,
} from "lucide-react"

const events = [
  { type: "success", icon: CheckCircle2, title: "Despliegue exitoso",       desc: "omnitv-v4.0.0 → producción",         time: "hace 12 min" },
  { type: "warning", icon: TriangleAlert, title: "Uso al 82%",               desc: "API Gateway — límite mensual cercano", time: "hace 1 hora"  },
  { type: "info",    icon: UserPlus,      title: "Nuevo miembro",             desc: "carlos@uper.io se unió a la org",      time: "hace 2 horas" },
  { type: "success", icon: GitBranch,     title: "Pipeline completado",       desc: "api-gateway — rama main",              time: "hace 3 horas" },
  { type: "error",   icon: AlertCircle,   title: "Edge function falló",       desc: "send-email — timeout 30s",             time: "hace 5 horas" },
  { type: "info",    icon: CreditCard,    title: "Factura generada",          desc: "CTR-001 — $5,000 emitida",             time: "hace 6 horas" },
  { type: "success", icon: Zap,           title: "Auto-scaling activado",     desc: "compute-worker — 2→4 instancias",      time: "ayer"         },
  { type: "info",    icon: Info,          title: "Mantenimiento programado",  desc: "storage-s3 — dom. 03:00 UTC",          time: "ayer"         },
]

const TYPE_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  success: { color: "var(--brand)",      bg: "color-mix(in srgb, var(--brand) 7%, transparent)",  border: "color-mix(in srgb, var(--brand) 19%, transparent)" },
  warning: { color: "hsl(39 100% 57%)", bg: "hsl(39 100% 57%/0.10)", border: "hsl(39 100% 57%/0.28)" },
  error:   { color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58%/0.10)",  border: "hsl(10 78% 58%/0.28)" },
  info:    { color: "hsl(210 100% 64%)", bg: "hsl(210 100% 56%/0.10)", border: "hsl(210 100% 56%/0.28)" },
}

export function ActivityFeed() {
  return (
    <div
      className="rounded-lg border flex flex-col"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{ borderColor: "var(--border-default)" }}
      >
        <p className="text-[13px] font-semibold" style={{ color: "var(--foreground-default)" }}>Actividad reciente</p>
        <button
          className="text-[12px] border-0 bg-transparent cursor-pointer transition-colors"
          style={{ color: "var(--brand)" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Ver todo →
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto">
        {events.map((ev, i) => {
          const s = TYPE_STYLE[ev.type]
          return (
            <div
              key={i}
              className="flex items-start gap-3 px-5 py-3 transition-colors cursor-default"
              style={{ borderBottom: i < events.length - 1 ? "1px solid var(--border-default)" : "none" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-0.5 border"
                style={{ backgroundColor: s.bg, borderColor: s.border }}
              >
                <ev.icon style={{ width: 12, height: 12, color: s.color }} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium leading-snug" style={{ color: "var(--foreground-light)" }}>
                  {ev.title}
                </p>
                <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>
                  {ev.desc}
                </p>
              </div>
              <span className="text-[11px] shrink-0 mt-0.5 whitespace-nowrap" style={{ color: "var(--foreground-muted)" }}>
                {ev.time}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
