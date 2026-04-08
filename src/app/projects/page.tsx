"use client"

import { useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProjectsEmptyState } from "@/components/dashboard/projects-empty-state"
import { ProjectCard } from "@/components/dashboard/project-card"
import { ProjectsTable } from "@/components/dashboard/projects-table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  ChevronDown, LayoutGrid, List, Search, Check,
} from "lucide-react"
import { ALL_PROJECTS } from "@/data/projects"

/* ── Types ──────────────────────────────────────────────────────────────── */

type StatusFilter = "all" | "active" | "paused" | "error"

/* ── Status display map ─────────────────────────────────────────────────── */

const STATUS_LABELS: Record<StatusFilter, string> = {
  all:    "Estado",
  active: "Activo",
  paused: "Pausado",
  error:  "Error",
}

/* ── Shared button style ────────────────────────────────────────────────── */

const TOOLBAR_BTN =
  "flex items-center gap-1.5 h-8 px-3 rounded-md border text-[13px] transition-colors cursor-pointer"

const TOOLBAR_STYLE = {
  borderColor: "var(--border-control)",
  backgroundColor: "var(--surface-100)",
  color: "var(--foreground-lighter)",
}

const TOOLBAR_HOVER = {
  borderColor: "var(--border-strong)",
  color: "var(--foreground-light)",
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function ProyectosPage() {
  const [view,         setView]        = useState<"grid" | "list">("grid")
  const [search,       setSearch]      = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const projects = useMemo(() => {
    let list = [...ALL_PROJECTS]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q))
    }

    if (statusFilter !== "all") {
      list = list.filter(p => p.status === statusFilter)
    }

    return list
  }, [search, statusFilter])

  const isEmpty = ALL_PROJECTS.length === 0

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="flat-surface max-w-[1200px] py-6 space-y-5">

        {/* ── Título ─────────────────────────────────────────────────────── */}
        <div>
          <h1 className="text-[20px] font-semibold leading-snug" style={{ color: "var(--foreground-default)" }}>
            Proyectos
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--foreground-muted)" }}>
            {isEmpty
              ? "Aún no tienes proyectos"
              : `${ALL_PROJECTS.length} proyecto${ALL_PROJECTS.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* ── Toolbar ────────────────────────────────────────────────────── */}
        {!isEmpty && (
          <div className="flex items-center gap-2 flex-wrap">

            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-[320px]">
              <Search
                className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 12, height: 12, color: "var(--foreground-muted)" }}
              />
              <Input
                placeholder="Buscar proyecto..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 h-8 text-[13px] rounded-md bg-surface-100 border-border-control text-foreground-light placeholder:text-foreground-muted"
              />
            </div>

            {/* Status filter */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={TOOLBAR_BTN}
                style={TOOLBAR_STYLE}
                onMouseEnter={e => Object.assign(e.currentTarget.style, TOOLBAR_HOVER)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, TOOLBAR_STYLE)}
              >
                {statusFilter !== "all" && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: statusFilter === "active" ? "var(--brand)"
                        : statusFilter === "error" ? "hsl(10 78% 62%)"
                        : "var(--foreground-lighter)",
                    }}
                  />
                )}
                {STATUS_LABELS[statusFilter]}
                <ChevronDown style={{ width: 11, height: 11 }} />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start" side="bottom" sideOffset={6}
                className="w-36 py-1"
                style={{ backgroundColor: "var(--background-dialog)", borderColor: "var(--border-default)" }}
              >
                {(["all", "active", "paused", "error"] as StatusFilter[]).map(s => (
                  <DropdownMenuItem
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                    style={{ color: statusFilter === s ? "var(--foreground-default)" : "var(--foreground-light)" }}
                    onClick={() => setStatusFilter(s)}
                  >
                    <span className="flex-1">{STATUS_LABELS[s]}</span>
                    {statusFilter === s && <Check style={{ width: 11, height: 11, color: "var(--brand)" }} />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View toggle */}
            <div
              className="flex items-center rounded-md border overflow-hidden"
              style={{ borderColor: "var(--border-control)" }}
            >
              <button
                onClick={() => setView("grid")}
                className="flex items-center justify-center w-8 h-8 border-r transition-colors"
                title="Vista tarjetas"
                style={{
                  borderColor: "var(--border-control)",
                  backgroundColor: view === "grid" ? "var(--surface-200)" : "var(--surface-100)",
                  color: view === "grid" ? "var(--foreground-default)" : "var(--foreground-muted)",
                }}
              >
                <LayoutGrid style={{ width: 13, height: 13 }} />
              </button>
              <button
                onClick={() => setView("list")}
                className="flex items-center justify-center w-8 h-8 transition-colors"
                title="Vista tabla"
                style={{
                  backgroundColor: view === "list" ? "var(--surface-200)" : "var(--surface-100)",
                  color: view === "list" ? "var(--foreground-default)" : "var(--foreground-muted)",
                }}
              >
                <List style={{ width: 13, height: 13 }} />
              </button>
            </div>
          </div>
        )}

        {/* ── Contenido ──────────────────────────────────────────────────── */}
        {isEmpty ? (
          <ProjectsEmptyState />
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[14px]" style={{ color: "var(--foreground-lighter)" }}>
              Sin resultados para <span style={{ color: "var(--foreground-light)" }}>"{search}"</span>
            </p>
            <button
              className="mt-3 text-[12px] border-0 bg-transparent cursor-pointer transition-colors"
              style={{ color: "var(--brand)" }}
              onClick={() => { setSearch(""); setStatusFilter("all") }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map(p => <ProjectCard key={p.name} project={p} />)}
          </div>
        ) : (
          <ProjectsTable projects={projects} />
        )}

      </div>
    </DashboardLayout>
  )
}
