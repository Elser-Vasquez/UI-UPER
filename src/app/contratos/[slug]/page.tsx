"use client"

import { use } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  User, CalendarDays, Clock, CreditCard,
  FileText, Settings, Trash2, Download, CheckCircle2, AlertCircle,
} from "lucide-react"
import { CONTRATOS_MAP } from "@/data/contratos"

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  activo:    { label: "Activo",    color: "#3ECF8E",          bg: "#3ECF8E18",              border: "#3ECF8E44" },
  pendiente: { label: "Pendiente", color: "hsl(39 100% 57%)", bg: "hsl(39 100% 57%/0.12)", border: "hsl(39 100% 57%/0.3)" },
  vencido:   { label: "Vencido",   color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58%/0.12)",  border: "hsl(10 78% 58%/0.3)" },
  cancelado: { label: "Cancelado", color: "hsl(0 0% 46%)",    bg: "hsl(0 0% 14%)",          border: "hsl(0 0% 26%)" },
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

/* ── Timeline item ──────────────────────────────────────────────────────── */

function TimelineItem({ icon: Icon, label, date, active }: { icon: React.ElementType; label: string; date: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0" style={{ borderColor: "var(--border-default)" }}>
      <div
        className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
        style={{
          backgroundColor: active ? "#3ECF8E18" : "var(--surface-300)",
          border: `1px solid ${active ? "#3ECF8E44" : "var(--border-default)"}`,
        }}
      >
        <Icon style={{ width: 12, height: 12, color: active ? "#3ECF8E" : "hsl(0 0% 46%)" }} strokeWidth={1.6} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px]" style={{ color: active ? "hsl(0 0% 84%)" : "hsl(0 0% 56%)" }}>{label}</p>
      </div>
      <span className="text-[11px] shrink-0" style={{ color: "hsl(0 0% 38%)" }}>{date}</span>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ContratoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug }   = use(params)
  const contrato   = CONTRATOS_MAP[slug]

  if (!contrato) {
    return (
      <DashboardLayout orgName="UPER" plan="FREE">
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-[14px]" style={{ color: "hsl(0 0% 52%)" }}>
            Contrato <span style={{ color: "hsl(0 0% 72%)" }}>"{slug}"</span> no encontrado.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  const statusCfg = STATUS_CONFIG[contrato.status] ?? STATUS_CONFIG.pendiente

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="-mx-6 md:-mx-10 flex flex-col lg:flex-row lg:h-full">

        {/* ══ LEFT ═══════════════════════════════════════════════════════ */}
        <div className="flex-1 lg:overflow-y-auto py-6 px-6 md:px-10 flex flex-col gap-6">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-mono" style={{ color: "hsl(0 0% 44%)" }}>{contrato.id}</span>
            </div>
            <h1 className="text-[22px] font-semibold leading-snug" style={{ color: "hsl(0 0% 92%)" }}>
              {contrato.name}
            </h1>
            <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: "hsl(0 0% 48%)" }}>
              {contrato.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Badge label={statusCfg.label} color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
            </div>
          </div>

          {/* Partes */}
          <div>
            <SectionLabel icon={User} label="Partes del contrato" />
            <div
              className="rounded-lg border px-4"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              <InfoRow icon={User}     label="Proveedor" value="UPER Platform S.L." />
              <InfoRow icon={User}     label="Cliente"   value={contrato.client} />
              <InfoRow icon={CreditCard} label="Monto"  value={contrato.amount} />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <SectionLabel icon={CalendarDays} label="Cronograma" />
            <div
              className="rounded-lg border px-4"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              <TimelineItem icon={CheckCircle2} label="Contrato creado"      date={contrato.createdAt} active />
              <TimelineItem icon={CheckCircle2} label="Inicio de vigencia"   date={contrato.startDate} active={contrato.status === "activo"} />
              <TimelineItem icon={AlertCircle}  label="Fin de vigencia"      date={contrato.endDate}   active={false} />
            </div>
          </div>

          {/* Actions */}
          <div>
            <SectionLabel icon={Settings} label="Acciones" />
            <div className="space-y-2">
              <ActionRow
                icon={Download}
                label="Descargar contrato PDF"
                description="Descarga la versión firmada del contrato."
              />
              <ActionRow
                icon={Trash2}
                label="Cancelar contrato"
                description="Esta acción marcará el contrato como cancelado."
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

          {/* Detalles */}
          <div>
            <SectionLabel icon={FileText} label="Detalles" />
            <div
              className="rounded-lg border px-4"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              <InfoRow icon={CreditCard}   label="Monto"        value={contrato.amount} />
              <InfoRow icon={CalendarDays} label="Inicio"       value={contrato.startDate} />
              <InfoRow icon={CalendarDays} label="Vencimiento"  value={contrato.endDate} />
              <InfoRow icon={Clock}        label="Creado"       value={contrato.createdAt} />
              <InfoRow icon={Clock}        label="Actualizado"  value={contrato.updatedAt} />
            </div>
          </div>

          {/* Documentos */}
          <div>
            <SectionLabel icon={FileText} label="Documentos" />
            <div className="space-y-2">
              {[
                { label: "Contrato firmado",       ext: "PDF", size: "248 KB" },
                { label: "Anexo de condiciones",   ext: "PDF", size: "84 KB"  },
                { label: "Propuesta comercial",    ext: "PDF", size: "1.2 MB" },
              ].map(doc => (
                <div
                  key={doc.label}
                  className="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                  style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--surface-200)" }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--surface-100)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-md shrink-0"
                      style={{ backgroundColor: "var(--surface-300)" }}
                    >
                      <FileText style={{ width: 13, height: 13, color: "hsl(0 0% 52%)" }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[13px]" style={{ color: "hsl(0 0% 78%)" }}>{doc.label}</p>
                      <p className="text-[11px]" style={{ color: "hsl(0 0% 40%)" }}>{doc.ext} · {doc.size}</p>
                    </div>
                  </div>
                  <Download style={{ width: 13, height: 13, color: "hsl(0 0% 40%)" }} strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  )
}
