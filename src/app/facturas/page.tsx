"use client"

import { useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ALL_FACTURAS } from "@/data/facturas"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, Check } from "lucide-react"

/* ── Types ──────────────────────────────────────────────────────────────── */

type StatusFilter = "all" | "paid" | "pending" | "overdue" | "draft"

const STATUS_LABELS: Record<StatusFilter, string> = {
  all: "Estado", paid: "Pagada", pending: "Pendiente", overdue: "Vencida", draft: "Borrador",
}

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  paid:    { label: "Pagada",    color: "var(--brand)",            bg: "color-mix(in srgb, var(--brand) 10%, transparent)", border: "color-mix(in srgb, var(--brand) 27%, transparent)" },
  pending: { label: "Pendiente", color: "hsl(39 100% 57%)",        bg: "hsl(39 100% 57% / 0.12)",          border: "hsl(39 100% 57% / 0.3)" },
  overdue: { label: "Vencida",   color: "hsl(10 78% 62%)",         bg: "hsl(10 78% 58% / 0.12)",           border: "hsl(10 78% 58% / 0.3)" },
  draft:   { label: "Borrador",  color: "var(--foreground-lighter)", bg: "var(--border-default)",           border: "var(--border-stronger)" },
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

export default function FacturasPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const facturas = useMemo(() => {
    let list = [...ALL_FACTURAS]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(f =>
        f.id.toLowerCase().includes(q) ||
        f.contractId.toLowerCase().includes(q) ||
        f.client.toLowerCase().includes(q) ||
        f.serviceName.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") list = list.filter(f => f.status === statusFilter)
    return list
  }, [search, statusFilter])

  const statusDot = (s: StatusFilter) => {
    if (s === "paid")    return "var(--brand)"
    if (s === "overdue") return "hsl(10 78% 62%)"
    if (s === "pending") return "hsl(39 100% 57%)"
    return "var(--foreground-lighter)"
  }

  const totalAmount = facturas.reduce((sum, f) => sum + f.amount, 0)

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="flat-surface max-w-[1300px] py-6 space-y-5">

        {/* Title */}
        <div>
          <h1 className="text-[20px] font-semibold leading-snug" style={{ color: "var(--foreground-default)" }}>
            Facturas
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--foreground-muted)" }}>
            {ALL_FACTURAS.length} facturas generadas · ${ALL_FACTURAS.filter(f => f.status === "paid").reduce((s, f) => s + f.amount, 0).toLocaleString()} cobrado
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px] max-w-[300px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 12, height: 12, color: "var(--foreground-muted)" }} />
            <Input
              placeholder="Buscar factura, cliente..."
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
            <DropdownMenuContent align="start" side="bottom" sideOffset={6} className="w-40 py-1"
              style={{ backgroundColor: "var(--background-dialog)", borderColor: "var(--border-default)" }}>
              {(["all", "paid", "pending", "overdue", "draft"] as StatusFilter[]).map(s => (
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

          {/* Summary chips */}
          {statusFilter === "all" && (
            <div className="flex items-center gap-2 ml-auto">
              {[
                { label: "Vencidas", count: ALL_FACTURAS.filter(f => f.status === "overdue").length, color: "hsl(10 78% 62%)" },
                { label: "Pendientes", count: ALL_FACTURAS.filter(f => f.status === "pending").length, color: "hsl(39 100% 57%)" },
              ].map(chip => chip.count > 0 && (
                <span key={chip.label} className="text-[12px]" style={{ color: chip.color }}>
                  {chip.count} {chip.label.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {facturas.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[14px]" style={{ color: "var(--foreground-lighter)" }}>Sin resultados</p>
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
                  {["Número", "Contrato", "Cliente", "Servicio", "Período", "Monto", "Estado", "Vence"].map(h => (
                    <TableHead key={h}
                      className="text-[11px] font-semibold uppercase tracking-widest py-2.5 first:pl-4"
                      style={{ color: "var(--foreground-muted)" }}>
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {facturas.map((inv, i) => {
                  const statusCfg = STATUS_CONFIG[inv.status] ?? STATUS_CONFIG.draft
                  const isOverdue = inv.status === "overdue"

                  return (
                    <TableRow key={inv.id}
                      className="cursor-default"
                      style={{
                        borderColor: "var(--border-default)",
                        backgroundColor: i % 2 === 0 ? "var(--background-default)" : "transparent",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--background-default)" : "transparent")}
                    >
                      <TableCell className="pl-4 py-3">
                        <span className="text-[12px] font-mono font-medium" style={{ color: "var(--foreground-default)" }}>
                          {inv.id}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[11px] font-mono" style={{ color: "var(--foreground-lighter)" }}>
                          {inv.contractId}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-light)" }}>
                          {inv.client}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-lighter)" }}>
                          {inv.serviceName}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-lighter)" }}>
                          {inv.period}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px] font-medium tabular-nums" style={{ color: "var(--foreground-default)" }}>
                          ${inv.amount.toLocaleString()}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <Badge {...statusCfg} />
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]"
                          style={{ color: isOverdue ? "hsl(10 78% 62%)" : "var(--foreground-muted)" }}>
                          {inv.dueAt}
                        </span>
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
