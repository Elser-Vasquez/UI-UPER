"use client"

import { useRouter } from "next/navigation"
import { MoreVertical, Globe, Clock, ExternalLink, Settings, Trash2 } from "lucide-react"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export interface Project {
  name: string
  region: string
  plan: string
  status: string
  createdAt: string
  updatedAt: string
}

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: { label: "Activo",  color: "var(--brand)",     bg: "color-mix(in srgb, var(--brand) 10%, transparent)", border: "color-mix(in srgb, var(--brand) 27%, transparent)" },
  paused: { label: "Pausado", color: "var(--foreground-lighter)",    bg: "var(--border-default)",          border: "var(--border-stronger)" },
  error:  { label: "Error",   color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58% / 0.12)", border: "hsl(10 78% 58% / 0.3)" },
}

const PLAN_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  FREE: { color: "var(--foreground-lighter)",    bg: "var(--surface-100)",           border: "var(--border-stronger)" },
  NANO: { color: "var(--brand)",     bg: "color-mix(in srgb, var(--brand) 8%, transparent)",  border: "color-mix(in srgb, var(--brand) 20%, transparent)" },
  PRO:  { color: "hsl(258 80% 72%)", bg: "hsl(258 80% 60% / 0.12)", border: "hsl(258 80% 60% / 0.3)" },
  TEAM: { color: "hsl(210 100% 64%)", bg: "hsl(210 100% 56% / 0.12)", border: "hsl(210 100% 56% / 0.3)" },
}

function Badge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider leading-none border uppercase"
      style={{ color, backgroundColor: bg, borderColor: border }}
    >
      {label}
    </span>
  )
}

/* ── Card ───────────────────────────────────────────────────────────────── */

export function ProjectCard({ project }: { project: Project }) {
  const router  = useRouter()
  const slug    = project.name
  const href    = `/projects/${slug}`

  const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.paused
  const planCfg   = PLAN_CONFIG[project.plan]     ?? PLAN_CONFIG.FREE

  return (
    <div
      className="project-card relative rounded-lg border flex flex-col gap-0 cursor-pointer group overflow-hidden min-h-[160px]"
      style={{
        backgroundColor: "var(--surface-100)",
      }}
      onClick={() => router.push(href)}
    >
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-4 pt-5 pb-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h3 className="text-[13px] font-semibold leading-snug truncate" style={{ color: "var(--foreground-default)" }}>
            {project.name}
          </h3>
          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge label={statusCfg.label} color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
            <Badge label={project.plan}    color={planCfg.color}   bg={planCfg.bg}   border={planCfg.border} />
          </div>
        </div>

        {/* 3-dots menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center justify-center w-6 h-6 rounded transition-colors shrink-0 ml-2 mt-0.5 border-0 bg-transparent cursor-pointer outline-none"
            style={{ color: "var(--foreground-muted)" }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "var(--background-overlay-hover)"
              e.currentTarget.style.color = "var(--foreground-light)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "var(--foreground-muted)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <MoreVertical style={{ width: 13, height: 13 }} strokeWidth={2} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end" side="bottom" sideOffset={4}
            className="w-44 py-1"
            style={{ backgroundColor: "var(--background-dialog)", borderColor: "var(--border-default)" }}
          >
            <DropdownMenuItem
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
              style={{ color: "var(--foreground-light)" }}
              onClick={e => { e.stopPropagation(); router.push(href) }}
            >
              <ExternalLink style={{ width: 13, height: 13 }} strokeWidth={1.5} />
              Ver proyecto
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
              style={{ color: "var(--foreground-light)" }}
              onClick={e => { e.stopPropagation(); router.push(`${href}/settings`) }}
            >
              <Settings style={{ width: 13, height: 13 }} strokeWidth={1.5} />
              Configuración
            </DropdownMenuItem>

            <DropdownMenuSeparator style={{ backgroundColor: "var(--border-default)" }} />

            <DropdownMenuItem
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
              style={{ color: "hsl(10 78% 62%)" }}
              onClick={e => e.stopPropagation()}
            >
              <Trash2 style={{ width: 13, height: 13 }} strokeWidth={1.5} />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Footer info ──────────────────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-2 flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Globe style={{ width: 11, height: 11, flexShrink: 0, color: "var(--foreground-muted)" }} strokeWidth={1.6} />
          <span className="text-[12px] truncate" style={{ color: "var(--foreground-lighter)" }}>{project.region}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock style={{ width: 11, height: 11, flexShrink: 0, color: "var(--foreground-muted)" }} strokeWidth={1.6} />
          <span className="text-[12px]" style={{ color: "var(--foreground-muted)" }}>
            Actualizado {project.updatedAt}
          </span>
        </div>
      </div>
    </div>
  )
}
