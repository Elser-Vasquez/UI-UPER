"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ALL_SERVICIOS } from "@/data/servicios"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, Check, ExternalLink } from "lucide-react"

/* ── Types ──────────────────────────────────────────────────────────────── */

type StatusFilter = "all" | "active" | "paused" | "error"

const STATUS_LABELS: Record<StatusFilter, string> = {
  all: "Estado", active: "Activo", paused: "Pausado", error: "Error",
}

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: { label: "Activo",  color: "var(--brand)",            bg: "color-mix(in srgb, var(--brand) 10%, transparent)", border: "color-mix(in srgb, var(--brand) 27%, transparent)" },
  paused: { label: "Pausado", color: "var(--foreground-lighter)", bg: "var(--border-default)",           border: "var(--border-stronger)" },
  error:  { label: "Error",   color: "hsl(10 78% 62%)",         bg: "hsl(10 78% 58% / 0.12)",           border: "hsl(10 78% 58% / 0.3)" },
}

const PLAN_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  FREE: { color: "var(--foreground-lighter)",  bg: "var(--surface-100)",                                border: "var(--border-stronger)" },
  NANO: { color: "var(--brand)",               bg: "color-mix(in srgb, var(--brand) 8%, transparent)",  border: "color-mix(in srgb, var(--brand) 20%, transparent)" },
  PRO:  { color: "hsl(258 80% 72%)",           bg: "hsl(258 80% 60% / 0.12)",                           border: "hsl(258 80% 60% / 0.3)" },
  TEAM: { color: "hsl(210 100% 64%)",          bg: "hsl(210 100% 56% / 0.12)",                          border: "hsl(210 100% 56% / 0.3)" },
}

/* ── Shared toolbar style ────────────────────────────────────────────────── */

const TB = "flex items-center gap-1.5 h-8 px-3 rounded-md border text-[13px] transition-colors cursor-pointer outline-none"
const TS = { borderColor: "var(--border-control)", backgroundColor: "var(--surface-100)", color: "var(--foreground-lighter)" }
const TH = { borderColor: "var(--border-strong)", color: "var(--foreground-light)" }

/* ── Badge ───────────────────────────────────────────────────────────────── */

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

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ServiciosPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const servicios = useMemo(() => {
    let list = [...ALL_SERVICIOS]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.project.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") list = list.filter(s => s.status === statusFilter)
    return list
  }, [search, statusFilter])

  const statusDot = (s: StatusFilter) => {
    if (s === "active") return "var(--brand)"
    if (s === "error")  return "hsl(10 78% 62%)"
    return "var(--foreground-lighter)"
  }

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="flat-surface max-w-[1200px] py-6 space-y-5">

        {/* Title */}
        <div>
          <h1 className="text-[20px] font-semibold leading-snug" style={{ color: "var(--foreground-default)" }}>
            Servicios
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--foreground-muted)" }}>
            {ALL_SERVICIOS.length} servicios vinculados a proyectos
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px] max-w-[300px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 12, height: 12, color: "var(--foreground-muted)" }} />
            <Input
              placeholder="Buscar servicio o proyecto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-[13px] rounded-md bg-surface-100 border-border-control text-foreground-light placeholder:text-foreground-muted"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className={TB} style={TS}
              onMouseEnter={e => Object.assign(e.currentTarget.style, TH)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, TS)}
            >
              {statusFilter !== "all" && (
                <span className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: statusDot(statusFilter) }} />
              )}
              {STATUS_LABELS[statusFilter]}
              <ChevronDown style={{ width: 11, height: 11 }} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" sideOffset={6} className="w-36 py-1"
              style={{ backgroundColor: "var(--background-dialog)", borderColor: "var(--border-default)" }}>
              {(["all", "active", "paused", "error"] as StatusFilter[]).map(s => (
                <DropdownMenuItem key={s}
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
        </div>

        {/* Content */}
        {servicios.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[14px]" style={{ color: "var(--foreground-lighter)" }}>
              Sin resultados para <span style={{ color: "var(--foreground-light)" }}>"{search}"</span>
            </p>
            <button className="mt-3 text-[12px] border-0 bg-transparent cursor-pointer"
              style={{ color: "var(--brand)" }}
              onClick={() => { setSearch(""); setStatusFilter("all") }}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent"
                  style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-200)" }}>
                  {["ID", "Nombre", "Proyecto", "Tipo", "Plan", "Estado", "Creado", "Contrato"].map(h => (
                    <TableHead key={h}
                      className="text-[11px] font-semibold uppercase tracking-widest py-2.5 first:pl-4"
                      style={{ color: "var(--foreground-muted)" }}>
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {servicios.map((svc, i) => {
                  const statusCfg = STATUS_CONFIG[svc.status] ?? STATUS_CONFIG.paused
                  const planCfg   = PLAN_CONFIG[svc.plan]     ?? PLAN_CONFIG.FREE

                  return (
                    <TableRow key={svc.id}
                      className="cursor-pointer"
                      style={{
                        borderColor: "var(--border-default)",
                        backgroundColor: i % 2 === 0 ? "var(--background-default)" : "transparent",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--background-default)" : "transparent")}
                      onClick={() => router.push(`/servicios/${svc.id.toLowerCase()}`)}
                    >
                      <TableCell className="pl-4 py-3">
                        <span className="text-[11px] font-mono" style={{ color: "var(--foreground-muted)" }}>
                          {svc.id}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px] font-medium" style={{ color: "var(--foreground-default)" }}>
                          {svc.name}
                        </span>
                      </TableCell>

                      <TableCell className="py-3" onClick={e => e.stopPropagation()}>
                        <button
                          className="inline-flex items-center gap-1 text-[12px] bg-transparent border-0 cursor-pointer p-0 transition-colors"
                          style={{ color: "var(--foreground-lighter)" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground-light)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--foreground-lighter)")}
                          onClick={() => router.push(`/projects/${svc.project}`)}
                        >
                          {svc.project}
                          <ExternalLink style={{ width: 10, height: 10, flexShrink: 0 }} strokeWidth={1.5} />
                        </button>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-lighter)" }}>
                          {svc.type}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <Badge label={svc.plan} {...planCfg} />
                      </TableCell>

                      <TableCell className="py-3">
                        <Badge label={statusCfg.label} {...statusCfg} />
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-muted)" }}>
                          {svc.createdAt}
                        </span>
                      </TableCell>

                      <TableCell className="py-3" onClick={e => e.stopPropagation()}>
                        <button
                          className="text-[11px] font-mono bg-transparent border-0 cursor-pointer p-0 transition-colors"
                          style={{ color: "var(--foreground-lighter)" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground-light)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--foreground-lighter)")}
                          onClick={() => router.push(`/contratos/${svc.contractId.toLowerCase()}`)}
                        >
                          {svc.contractId} ↗
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}
