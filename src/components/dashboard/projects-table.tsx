"use client"

import { useRouter } from "next/navigation"
import { MoreVertical, ExternalLink, Settings, Trash2 } from "lucide-react"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import type { Project } from "./project-card"

/* ── Status badge ──────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: { label: "Activo",  color: "#3ECF8E",          bg: "#3ECF8E18",              border: "#3ECF8E44" },
  paused: { label: "Pausado", color: "hsl(0 0% 52%)",    bg: "hsl(0 0% 18%)",          border: "hsl(0 0% 26%)" },
  error:  { label: "Error",   color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58% / 0.12)", border: "hsl(10 78% 58% / 0.3)" },
}

const PLAN_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  FREE: { color: "hsl(0 0% 52%)",     bg: "hsl(0 0% 14%)",           border: "hsl(0 0% 26%)" },
  NANO: { color: "#3ECF8E",           bg: "#3ECF8E14",                border: "#3ECF8E38" },
  PRO:  { color: "hsl(258 80% 72%)",  bg: "hsl(258 80% 60% / 0.12)", border: "hsl(258 80% 60% / 0.3)" },
  TEAM: { color: "hsl(210 100% 64%)", bg: "hsl(210 100% 56% / 0.12)", border: "hsl(210 100% 56% / 0.3)" },
}

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

/* ── Table ─────────────────────────────────────────────────────────────── */

export function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter()

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: "var(--border-default)" }}
    >
      <Table>
        <TableHeader>
          <TableRow
            className="border-b hover:bg-transparent"
            style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
          >
            {["Nombre", "Región", "Plan", "Estado", "Creado", "Actualizado"].map(h => (
              <TableHead
                key={h}
                className="text-[11px] font-semibold uppercase tracking-widest py-2.5 first:pl-4"
                style={{ color: "hsl(0 0% 42%)" }}
              >
                {h}
              </TableHead>
            ))}
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project, i) => {
            const statusCfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.paused
            const planCfg   = PLAN_CONFIG[project.plan]     ?? PLAN_CONFIG.FREE
            const href      = `/projects/${project.name}`

            return (
              <TableRow
                key={project.name}
                className="cursor-pointer group"
                style={{
                  borderColor: "var(--border-default)",
                  backgroundColor: i % 2 === 0 ? "var(--background-default)" : "transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--background-default)" : "transparent")}
                onClick={() => router.push(href)}
              >
                <TableCell className="pl-4 py-3">
                  <span className="text-[13px] font-medium" style={{ color: "hsl(0 0% 88%)" }}>
                    {project.name}
                  </span>
                </TableCell>

                <TableCell className="py-3">
                  <span className="text-[13px]" style={{ color: "hsl(0 0% 52%)" }}>
                    {project.region}
                  </span>
                </TableCell>

                <TableCell className="py-3">
                  <Badge label={project.plan} color={planCfg.color} bg={planCfg.bg} border={planCfg.border} />
                </TableCell>

                <TableCell className="py-3">
                  <Badge label={statusCfg.label} color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
                </TableCell>

                <TableCell className="py-3">
                  <span className="text-[13px]" style={{ color: "hsl(0 0% 44%)" }}>{project.createdAt}</span>
                </TableCell>

                <TableCell className="py-3">
                  <span className="text-[13px]" style={{ color: "hsl(0 0% 44%)" }}>{project.updatedAt}</span>
                </TableCell>

                {/* 3-dots menu */}
                <TableCell className="py-3 pr-3" onClick={e => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex items-center justify-center w-6 h-6 rounded transition-colors border-0 bg-transparent cursor-pointer outline-none"
                      style={{ color: "hsl(0 0% 40%)" }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = "var(--surface-300)"
                        e.currentTarget.style.color = "hsl(0 0% 72%)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.color = "hsl(0 0% 40%)"
                      }}
                    >
                      <MoreVertical style={{ width: 14, height: 14 }} strokeWidth={2} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end" side="bottom" sideOffset={4}
                      className="w-44 py-1"
                      style={{ backgroundColor: "hsl(0 0% 11%)", borderColor: "hsl(0 0% 20%)" }}
                    >
                      <DropdownMenuItem
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                        style={{ color: "hsl(0 0% 72%)" }}
                        onClick={() => router.push(href)}
                      >
                        <ExternalLink style={{ width: 13, height: 13 }} strokeWidth={1.5} />
                        Ver proyecto
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                        style={{ color: "hsl(0 0% 72%)" }}
                        onClick={() => router.push(`${href}/settings`)}
                      >
                        <Settings style={{ width: 13, height: 13 }} strokeWidth={1.5} />
                        Configuración
                      </DropdownMenuItem>

                      <DropdownMenuSeparator style={{ backgroundColor: "hsl(0 0% 18%)" }} />

                      <DropdownMenuItem
                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                        style={{ color: "hsl(10 78% 62%)" }}
                      >
                        <Trash2 style={{ width: 13, height: 13 }} strokeWidth={1.5} />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
