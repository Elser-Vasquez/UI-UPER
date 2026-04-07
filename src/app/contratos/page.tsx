"use client"

import { useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ContratosTable } from "@/components/dashboard/contratos-table"
import { ContratosTableAdvanced } from "@/components/dashboard/contratos-table-advanced"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, SlidersHorizontal, Check } from "lucide-react"
import { ALL_CONTRATOS } from "@/data/contratos"

type StatusFilter = "all" | "activo" | "pendiente" | "vencido" | "cancelado"
type SortOrder    = "asc" | "desc"

const STATUS_LABELS: Record<StatusFilter, string> = {
  all:       "Estado",
  activo:    "Activo",
  pendiente: "Pendiente",
  vencido:   "Vencido",
  cancelado: "Cancelado",
}

const STATUS_DOT: Record<string, string> = {
  activo:    "#3ECF8E",
  pendiente: "hsl(39 100% 57%)",
  vencido:   "hsl(10 78% 62%)",
  cancelado: "hsl(0 0% 46%)",
}

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

export default function ContratosPage() {
  const [search,       setSearch]       = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [sortOrder,    setSortOrder]    = useState<SortOrder>("asc")

  const contratos = useMemo(() => {
    let list = [...ALL_CONTRATOS]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.client.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") list = list.filter(c => c.status === statusFilter)
    list.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    return list
  }, [search, statusFilter, sortOrder])

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="max-w-[1200px] py-6 space-y-5">

        {/* Título */}
        <div>
          <h1 className="text-[20px] font-semibold leading-snug" style={{ color: "hsl(0 0% 92%)" }}>
            Contratos
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "hsl(0 0% 44%)" }}>
            {ALL_CONTRATOS.length} contrato{ALL_CONTRATOS.length !== 1 ? "s" : ""} en tu organización
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">

          <div className="relative flex-1 min-w-[180px] max-w-[320px]">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 12, height: 12, color: "hsl(0 0% 40%)" }}
            />
            <Input
              placeholder="Buscar por nombre, cliente o ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-[13px] rounded-md bg-surface-100 border-border-control text-foreground-light placeholder:text-foreground-muted"
            />
          </div>

          {/* Status */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={TOOLBAR_BTN}
              style={TOOLBAR_STYLE}
              onMouseEnter={e => Object.assign(e.currentTarget.style, TOOLBAR_HOVER)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, TOOLBAR_STYLE)}
            >
              {statusFilter !== "all" && (
                <span className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: STATUS_DOT[statusFilter] }} />
              )}
              {STATUS_LABELS[statusFilter]}
              <ChevronDown style={{ width: 11, height: 11 }} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start" side="bottom" sideOffset={6}
              className="w-40 py-1"
              style={{ backgroundColor: "hsl(0 0% 11%)", borderColor: "hsl(0 0% 20%)" }}
            >
              {(["all", "activo", "pendiente", "vencido", "cancelado"] as StatusFilter[]).map(s => (
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
              {([{ value: "asc", label: "Ascendente A–Z" }, { value: "desc", label: "Descendente Z–A" }] as { value: SortOrder; label: string }[]).map(opt => (
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

        </div>

        {/* Contenido */}
        {contratos.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[14px]" style={{ color: "hsl(0 0% 52%)" }}>
              Sin resultados para <span style={{ color: "hsl(0 0% 72%)" }}>"{search}"</span>
            </p>
            <button
              className="mt-3 text-[12px] border-0 bg-transparent cursor-pointer"
              style={{ color: "#3ECF8E" }}
              onClick={() => { setSearch(""); setStatusFilter("all") }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <ContratosTable contratos={contratos} />
        )}

        {/* ── Tabla avanzada: filtro + orden por columna ─────────────────── */}
        <div>
          <div className="mb-3">
            <h2 className="text-[15px] font-semibold" style={{ color: "hsl(0 0% 88%)" }}>
              Vista avanzada
            </h2>
            <p className="text-[12px] mt-0.5" style={{ color: "hsl(0 0% 44%)" }}>
              Filtra y ordena por cada columna de forma independiente
            </p>
          </div>
          <ContratosTableAdvanced contratos={ALL_CONTRATOS} />
        </div>

      </div>
    </DashboardLayout>
  )
}
