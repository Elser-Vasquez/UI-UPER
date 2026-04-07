"use client"

import {
  Dialog, DialogContent, DialogClose,
} from "@/components/ui/dialog"
import {
  ExternalLink, Settings, Pause, Trash2, Play,
  Globe, CreditCard, Clock, CalendarDays,
} from "lucide-react"

export interface Project {
  name: string
  region: string
  plan: string
  status: string
  createdAt: string
  updatedAt: string
}

/* ── Status badge ──────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: {
    label:  "Activo",
    color:  "#3ECF8E",
    bg:     "#3ECF8E18",
    border: "#3ECF8E44",
  },
  paused: {
    label:  "Pausado",
    color:  "hsl(0 0% 52%)",
    bg:     "hsl(0 0% 18%)",
    border: "hsl(0 0% 26%)",
  },
  error: {
    label:  "Error",
    color:  "hsl(10 78% 62%)",
    bg:     "hsl(10 78% 58% / 0.12)",
    border: "hsl(10 78% 58% / 0.3)",
  },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.paused
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold tracking-wider leading-none border uppercase"
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}
    >
      {cfg.label}
    </span>
  )
}

/* ── Info row ──────────────────────────────────────────────────────────── */

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "hsl(0 0% 18%)" }}>
      <div className="flex items-center gap-2">
        <Icon style={{ width: 13, height: 13, color: "hsl(0 0% 40%)", flexShrink: 0 }} strokeWidth={1.6} />
        <span className="text-[12px]" style={{ color: "hsl(0 0% 46%)" }}>{label}</span>
      </div>
      <span className="text-[13px]" style={{ color: "hsl(0 0% 78%)" }}>{value}</span>
    </div>
  )
}

/* ── Action button ─────────────────────────────────────────────────────── */

function ActionBtn({
  icon: Icon,
  label,
  variant = "ghost",
  onClick,
}: {
  icon: React.ElementType
  label: string
  variant?: "ghost" | "primary" | "destructive"
  onClick?: () => void
}) {
  const styles = {
    ghost: {
      color: "hsl(0 0% 64%)",
      bg: "transparent",
      border: "hsl(0 0% 24%)",
      hoverBg: "hsl(0 0% 16%)",
      hoverColor: "hsl(0 0% 88%)",
    },
    primary: {
      color: "#000",
      bg: "#3ECF8E",
      border: "transparent",
      hoverBg: "#34be7e",
      hoverColor: "#000",
    },
    destructive: {
      color: "hsl(10 78% 62%)",
      bg: "transparent",
      border: "hsl(10 78% 40%)",
      hoverBg: "hsl(10 78% 58% / 0.1)",
      hoverColor: "hsl(10 78% 70%)",
    },
  }[variant]

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-md text-[13px] transition-colors border text-left"
      style={{ color: styles.color, backgroundColor: styles.bg, borderColor: styles.border }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = styles.hoverBg
        e.currentTarget.style.color = styles.hoverColor
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = styles.bg
        e.currentTarget.style.color = styles.color
      }}
    >
      <Icon style={{ width: 13, height: 13, flexShrink: 0 }} strokeWidth={1.6} />
      {label}
    </button>
  )
}

/* ── Modal ─────────────────────────────────────────────────────────────── */

interface ProjectDetailModalProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  const isPaused = project.status === "paused"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden sm:max-w-[420px] gap-0"
        style={{
          backgroundColor: "hsl(0 0% 11%)",
          border: "1px solid hsl(0 0% 20%)",
          borderRadius: 12,
        }}
      >
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div
          className="flex items-start justify-between px-5 pt-5 pb-4 border-b"
          style={{ borderColor: "hsl(0 0% 18%)" }}
        >
          <div className="space-y-1.5">
            <p className="text-[15px] font-semibold" style={{ color: "hsl(0 0% 92%)" }}>
              {project.name}
            </p>
            <StatusBadge status={project.status} />
          </div>

          <DialogClose
            className="flex items-center justify-center w-7 h-7 rounded-md transition-colors border-0 bg-transparent cursor-pointer shrink-0 mt-0.5"
            style={{ color: "hsl(0 0% 46%)" }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "hsl(0 0% 18%)"
              e.currentTarget.style.color = "hsl(0 0% 72%)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "hsl(0 0% 46%)"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </DialogClose>
        </div>

        {/* ── Info ──────────────────────────────────────────────────────── */}
        <div className="px-5 py-1">
          <InfoRow icon={Globe}        label="Región"     value={project.region} />
          <InfoRow icon={CreditCard}   label="Plan"       value={project.plan} />
          <InfoRow icon={CalendarDays} label="Creado"     value={project.createdAt} />
          <InfoRow icon={Clock}        label="Actualizado" value={project.updatedAt} />
        </div>

        {/* ── Actions ───────────────────────────────────────────────────── */}
        <div
          className="px-5 py-4 border-t space-y-1.5"
          style={{ borderColor: "hsl(0 0% 18%)" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: "hsl(0 0% 36%)" }}>
            Acciones
          </p>

          <ActionBtn icon={ExternalLink} label="Abrir proyecto"         variant="primary" />
          <ActionBtn icon={Settings}     label="Configuración"          variant="ghost" />
          {isPaused
            ? <ActionBtn icon={Play}  label="Reanudar proyecto" variant="ghost" />
            : <ActionBtn icon={Pause} label="Pausar proyecto"   variant="ghost" />
          }
          <ActionBtn icon={Trash2} label="Eliminar proyecto" variant="destructive" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
