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
  ChevronDown, LayoutGrid, List, Search, SlidersHorizontal, Check,
} from "lucide-react"
import { ALL_PROJECTS } from "@/data/projects"

/* ── Types ──────────────────────────────────────────────────────────────── */

type StatusFilter = "all" | "active" | "paused" | "error"
type SortOrder    = "asc" | "desc"

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
  color: "hsl(0 0% 56%)",
}

const TOOLBAR_HOVER = {
  borderColor: "var(--border-strong)",
  color: "hsl(0 0% 82%)",
}

/* ── Component ──────────────────────────────────────────────────────────── */

export default function ProyectosPage() {
  const [view,         setView]        = useState<"grid" | "list">("grid")
  const [search,       setSearch]      = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortOrder,    setSortOrder]   = useState<SortOrder>("asc")

  const projects = useMemo(() => {
    let list = [...ALL_PROJECTS]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q))
    }

    // Status filter
    if (statusFilter !== "all") {
      list = list.filter(p => p.status === statusFilter)
    }

    // Sort by name
    list.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )

    return list
  }, [search, statusFilter, sortOrder])

  const isEmpty = ALL_PROJECTS.length === 0

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="max-w-[1200px] py-6 space-y-5">

        {/* ── Título ─────────────────────────────────────────────────────── */}
        <div>
          <h1 className="text-[20px] font-semibold leading-snug" style={{ color: "hsl(0 0% 92%)" }}>
            Proyectos
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "hsl(0 0% 44%)" }}>
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
                style={{ width: 12, height: 12, color: "hsl(0 0% 40%)" }}
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
                      backgroundColor: statusFilter === "active" ? "#3ECF8E"
                        : statusFilter === "error" ? "hsl(10 78% 62%)"
                        : "hsl(0 0% 52%)",
                    }}
                  />
                )}
                {STATUS_LABELS[statusFilter]}
                <ChevronDown style={{ width: 11, height: 11 }} />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start" side="bottom" sideOffset={6}
                className="w-36 py-1"
                style={{ backgroundColor: "hsl(0 0% 11%)", borderColor: "hsl(0 0% 20%)" }}
              >
                {(["all", "active", "paused", "error"] as StatusFilter[]).map(s => (
                  <DropdownMenuItem
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                    style={{ color: statusFilter === s ? "hsl(0 0% 90%)" : "hsl(0 0% 60%)" }}
                    onClick={() => setStatusFilter(s)}
                  >
                    <span className="flex-1">{STATUS_LABELS[s]}</span>
                    {statusFilter === s && <Check style={{ width: 11, height: 11, color: "#3ECF8E" }} />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={TOOLBAR_BTN}
                style={TOOLBAR_STYLE}
                onMouseEnter={e => Object.assign(e.currentTarget.style, TOOLBAR_HOVER)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, TOOLBAR_STYLE)}
              >
                <SlidersHorizontal style={{ width: 11, height: 11 }} />
                {sortOrder === "asc" ? "Nombre A–Z" : "Nombre Z–A"}
                <ChevronDown style={{ width: 11, height: 11 }} />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start" side="bottom" sideOffset={6}
                className="w-40 py-1"
                style={{ backgroundColor: "hsl(0 0% 11%)", borderColor: "hsl(0 0% 20%)" }}
              >
                {([
                  { value: "asc",  label: "Ascendente  A–Z" },
                  { value: "desc", label: "Descendente Z–A" },
                ] as { value: SortOrder; label: string }[]).map(opt => (
                  <DropdownMenuItem
                    key={opt.value}
                    className="flex items-center gap-2 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                    style={{ color: sortOrder === opt.value ? "hsl(0 0% 90%)" : "hsl(0 0% 60%)" }}
                    onClick={() => setSortOrder(opt.value)}
                  >
                    <span className="flex-1">{opt.label}</span>
                    {sortOrder === opt.value && <Check style={{ width: 11, height: 11, color: "#3ECF8E" }} />}
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
                  color: view === "grid" ? "hsl(0 0% 90%)" : "hsl(0 0% 42%)",
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
                  color: view === "list" ? "hsl(0 0% 90%)" : "hsl(0 0% 42%)",
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
            <p className="text-[14px]" style={{ color: "hsl(0 0% 52%)" }}>
              Sin resultados para <span style={{ color: "hsl(0 0% 72%)" }}>"{search}"</span>
            </p>
            <button
              className="mt-3 text-[12px] border-0 bg-transparent cursor-pointer transition-colors"
              style={{ color: "#3ECF8E" }}
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
