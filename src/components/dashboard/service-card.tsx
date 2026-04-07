"use client"

import { useRouter } from "next/navigation"
import { MoreVertical, Cpu, Clock, ExternalLink, Settings, Trash2 } from "lucide-react"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import type { ServicioData } from "@/data/servicios"

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:  { label: "Activo",   color: "#3ECF8E",          bg: "#3ECF8E18",              border: "#3ECF8E44" },
  paused:  { label: "Pausado",  color: "hsl(0 0% 52%)",    bg: "hsl(0 0% 18%)",          border: "hsl(0 0% 26%)" },
  error:   { label: "Error",    color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58% / 0.12)", border: "hsl(10 78% 58% / 0.3)" },
}

const TYPE_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  CDN:     { color: "hsl(210 100% 64%)", bg: "hsl(210 100% 56% / 0.12)", border: "hsl(210 100% 56% / 0.3)" },
  Storage: { color: "hsl(258 80% 72%)",  bg: "hsl(258 80% 60% / 0.12)",  border: "hsl(258 80% 60% / 0.3)" },
  Email:   { color: "#3ECF8E",           bg: "#3ECF8E14",                 border: "#3ECF8E38" },
  Compute: { color: "hsl(39 100% 57%)",  bg: "hsl(39 100% 57% / 0.12)",  border: "hsl(39 100% 57% / 0.3)" },
  Queue:   { color: "hsl(0 0% 52%)",     bg: "hsl(0 0% 14%)",            border: "hsl(0 0% 26%)" },
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

export function ServiceCard({ servicio }: { servicio: ServicioData }) {
  const router = useRouter()
  const href   = `/servicios/${servicio.name}`

  const statusCfg = STATUS_CONFIG[servicio.status] ?? STATUS_CONFIG.paused
  const typeCfg   = TYPE_CONFIG[servicio.type]     ?? TYPE_CONFIG.Queue

  return (
    <div
      className="relative rounded-lg border flex flex-col gap-0 cursor-pointer overflow-hidden min-h-[160px]"
      style={{
        backgroundColor: "var(--surface-100)",
        borderColor: "var(--border-default)",
        transition: "border-color 200ms ease, box-shadow 200ms ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "#3ECF8E55"
        e.currentTarget.style.boxShadow = "0 0 0 1px #3ECF8E22, inset 0 0 20px #3ECF8E08"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-default)"
        e.currentTarget.style.boxShadow = ""
      }}
      onClick={() => router.push(href)}
    >
      {/* ── Top ──────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between px-4 pt-5 pb-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h3 className="text-[13px] font-semibold leading-snug truncate" style={{ color: "hsl(0 0% 90%)" }}>
            {servicio.displayName}
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge label={statusCfg.label}  color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
            <Badge label={servicio.type}    color={typeCfg.color}   bg={typeCfg.bg}   border={typeCfg.border} />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center justify-center w-6 h-6 rounded transition-colors shrink-0 ml-2 mt-0.5 border-0 bg-transparent cursor-pointer outline-none"
            style={{ color: "hsl(0 0% 40%)" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "hsl(0 0% 22%)"; e.currentTarget.style.color = "hsl(0 0% 72%)" }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "hsl(0 0% 40%)" }}
            onClick={e => e.stopPropagation()}
          >
            <MoreVertical style={{ width: 13, height: 13 }} strokeWidth={2} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end" side="bottom" sideOffset={4}
            className="w-44 py-1"
            style={{ backgroundColor: "hsl(0 0% 11%)", borderColor: "hsl(0 0% 20%)" }}
          >
            <DropdownMenuItem
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
              style={{ color: "hsl(0 0% 72%)" }}
              onClick={e => { e.stopPropagation(); router.push(href) }}
            >
              <ExternalLink style={{ width: 13, height: 13 }} strokeWidth={1.5} />
              Ver servicio
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
              style={{ color: "hsl(0 0% 72%)" }}
              onClick={e => { e.stopPropagation(); router.push(`${href}/settings`) }}
            >
              <Settings style={{ width: 13, height: 13 }} strokeWidth={1.5} />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator style={{ backgroundColor: "hsl(0 0% 18%)" }} />
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

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-2 flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Cpu style={{ width: 11, height: 11, flexShrink: 0, color: "hsl(0 0% 36%)" }} strokeWidth={1.6} />
          <span className="text-[12px] truncate" style={{ color: "hsl(0 0% 46%)" }}>{servicio.provider}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock style={{ width: 11, height: 11, flexShrink: 0, color: "hsl(0 0% 36%)" }} strokeWidth={1.6} />
          <span className="text-[12px]" style={{ color: "hsl(0 0% 38%)" }}>
            Actualizado {servicio.updatedAt}
          </span>
        </div>
      </div>
    </div>
  )
}
