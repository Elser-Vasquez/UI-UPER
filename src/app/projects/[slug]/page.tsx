"use client"

import { use } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Globe, CreditCard, CalendarDays, Clock,
  Activity, Settings, Trash2, Zap, GitBranch,
} from "lucide-react"
import { PROJECTS_MAP } from "@/data/projects"

/* ── Token maps ─────────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: { label: "Activo",  color: "#3ECF8E",         bg: "#3ECF8E18",              border: "#3ECF8E44" },
  paused: { label: "Pausado", color: "hsl(0 0% 52%)",   bg: "hsl(0 0% 18%)",          border: "hsl(0 0% 26%)" },
  error:  { label: "Error",   color: "hsl(10 78% 62%)", bg: "hsl(10 78% 58% / 0.12)", border: "hsl(10 78% 58% / 0.3)" },
}

const PLAN_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  FREE: { color: "hsl(0 0% 52%)",    bg: "hsl(0 0% 14%)",           border: "hsl(0 0% 26%)" },
  NANO: { color: "#3ECF8E",          bg: "#3ECF8E14",                border: "#3ECF8E38" },
  PRO:  { color: "hsl(258 80% 72%)", bg: "hsl(258 80% 60% / 0.12)", border: "hsl(258 80% 60% / 0.3)" },
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
    <div
      className="flex items-center justify-between py-3 border-b last:border-0"
      style={{ borderColor: "var(--border-default)" }}
    >
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

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project  = PROJECTS_MAP[slug]

  if (!project) {
    return (
      <DashboardLayout orgName="UPER" plan="FREE">
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-[14px]" style={{ color: "hsl(0 0% 52%)" }}>
            Proyecto <span style={{ color: "hsl(0 0% 72%)" }}>"{slug}"</span> no encontrado.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.paused
  const planCfg   = PLAN_CONFIG[project.plan]     ?? PLAN_CONFIG.FREE

  return (
    <DashboardLayout orgName="UPER" plan="FREE">

      {/*
        h-full → hereda la altura de <main flex-1>, así el divisor
        siempre llega hasta el fondo independientemente del contenido.
        En móvil las columnas se apilan (flex-col).
      */}
      {/*
        h-full → divisor llega hasta el fondo del viewport.
        Márgenes: el px-6 de <main> cubre los bordes exteriores.
        pr-6 / pl-6 dan el mismo espaciado interior hacia el divisor.
        Resultado: 24px en los 4 lados de cada columna = igual que otras páginas.
      */}
      <div className="-mx-6 md:-mx-10 flex flex-col lg:flex-row lg:h-full">

        {/* ══ LEFT — 50% ═══════════════════════════════════════════════ */}
        <div className="flex-1 lg:overflow-y-auto py-6 px-6 md:px-10 flex flex-col gap-6">

          {/* Project header */}
          <div>
            <h1 className="text-[22px] font-semibold leading-snug" style={{ color: "hsl(0 0% 92%)" }}>
              {project.name}
            </h1>
            <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: "hsl(0 0% 48%)" }}>
              {project.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Badge label={statusCfg.label} color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
              <Badge label={project.plan}    color={planCfg.color}   bg={planCfg.bg}   border={planCfg.border} />
            </div>
          </div>

          {/* Activity */}
          <div>
            <SectionLabel icon={Activity} label="Actividad reciente" />
            <div
              className="rounded-lg border"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              {[
                { icon: GitBranch, text: "Deployment a producción completado", time: "2 hours ago" },
                { icon: Zap,       text: "Edge function actualizada",           time: "Yesterday" },
                { icon: Settings,  text: "Configuración de región modificada",  time: "3 days ago" },
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
                  <span className="text-[11px] shrink-0 mt-0.5" style={{ color: "hsl(0 0% 38%)" }}>
                    {item.time}
                  </span>
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
                label="Configuración del proyecto"
                description="Edita el nombre, región y preferencias."
              />
              <ActionRow
                icon={Trash2}
                label="Eliminar proyecto"
                description="Acción irreversible. Todos los datos serán eliminados."
                variant="destructive"
              />
            </div>
          </div>

        </div>

        {/* ── Divisor vertical (desktop) / horizontal (móvil) ────────── */}
        <div
          className="hidden lg:block w-px shrink-0"
          style={{ backgroundColor: "var(--border-default)" }}
        />
        <div
          className="block lg:hidden h-px"
          style={{ backgroundColor: "var(--border-default)" }}
        />

        {/* ══ RIGHT — 50% ══════════════════════════════════════════════ */}
        <div className="flex-1 lg:overflow-y-auto py-6 px-6 md:px-10 flex flex-col gap-6">

          {/* Info */}
          <div>
            <SectionLabel icon={Globe} label="Información" />
            <div
              className="rounded-lg border px-4"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              <InfoRow icon={Globe}        label="Región"      value={project.region} />
              <InfoRow icon={CreditCard}   label="Plan"        value={project.plan} />
              <InfoRow icon={CalendarDays} label="Creado"      value={project.createdAt} />
              <InfoRow icon={Clock}        label="Actualizado" value={project.updatedAt} />
            </div>
          </div>

          {/* Resources */}
          <div>
            <SectionLabel icon={Zap} label="Recursos" />
            <div
              className="rounded-lg border px-4"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              <InfoRow icon={Zap}   label="Funciones activas" value="0" />
              <InfoRow icon={Globe} label="Endpoints"         value="0" />
              <InfoRow icon={Clock} label="Uptime"            value="—" />
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  )
}
