"use client"

import { useMemo, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ALL_PAGOS } from "@/data/pagos"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, Check, CreditCard, Building2, Landmark } from "lucide-react"

/* ── Types ──────────────────────────────────────────────────────────────── */

type StatusFilter = "all" | "completed" | "failed" | "processing" | "refunded"

const STATUS_LABELS: Record<StatusFilter, string> = {
  all: "Estado", completed: "Completado", failed: "Fallido", processing: "Procesando", refunded: "Reembolsado",
}

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  completed:  { label: "Completado",  color: "var(--brand)",            bg: "color-mix(in srgb, var(--brand) 10%, transparent)", border: "color-mix(in srgb, var(--brand) 27%, transparent)" },
  failed:     { label: "Fallido",     color: "hsl(10 78% 62%)",         bg: "hsl(10 78% 58% / 0.12)",           border: "hsl(10 78% 58% / 0.3)" },
  processing: { label: "Procesando",  color: "hsl(210 100% 64%)",       bg: "hsl(210 100% 56% / 0.12)",         border: "hsl(210 100% 56% / 0.3)" },
  refunded:   { label: "Reembolsado", color: "hsl(258 80% 72%)",        bg: "hsl(258 80% 60% / 0.12)",          border: "hsl(258 80% 60% / 0.3)" },
}

const METHOD_ICON: Record<string, React.ElementType> = {
  "Transferencia":  Building2,
  "Tarjeta":        CreditCard,
  "Débito directo": Landmark,
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

export default function PagosPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const pagos = useMemo(() => {
    let list = [...ALL_PAGOS]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.id.toLowerCase().includes(q) ||
        p.invoiceId.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.serviceName.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all") list = list.filter(p => p.status === statusFilter)
    return list
  }, [search, statusFilter])

  const statusDot = (s: StatusFilter) => {
    if (s === "completed")  return "var(--brand)"
    if (s === "failed")     return "hsl(10 78% 62%)"
    if (s === "processing") return "hsl(210 100% 64%)"
    if (s === "refunded")   return "hsl(258 80% 72%)"
    return "var(--foreground-lighter)"
  }

  const totalCobrado = ALL_PAGOS
    .filter(p => p.status === "completed")
    .reduce((s, p) => s + p.amount, 0)

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="flat-surface max-w-[1200px] py-6 space-y-5">

        {/* Title */}
        <div>
          <h1 className="text-[20px] font-semibold leading-snug" style={{ color: "var(--foreground-default)" }}>
            Pagos
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--foreground-muted)" }}>
            {ALL_PAGOS.length} registros · ${totalCobrado.toLocaleString()} cobrado en total
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px] max-w-[300px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 12, height: 12, color: "var(--foreground-muted)" }} />
            <Input
              placeholder="Buscar pago, factura o cliente..."
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
            <DropdownMenuContent align="start" side="bottom" sideOffset={6} className="w-44 py-1"
              style={{ backgroundColor: "var(--background-dialog)", borderColor: "var(--border-default)" }}>
              {(["all", "completed", "failed", "processing", "refunded"] as StatusFilter[]).map(s => (
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

          {/* Failed alert */}
          {statusFilter === "all" && ALL_PAGOS.filter(p => p.status === "failed").length > 0 && (
            <span className="text-[12px] ml-auto" style={{ color: "hsl(10 78% 62%)" }}>
              {ALL_PAGOS.filter(p => p.status === "failed").length} pagos fallidos
            </span>
          )}
        </div>

        {/* Content */}
        {pagos.length === 0 ? (
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
                  {["ID", "Factura", "Cliente", "Servicio", "Monto", "Método", "Estado", "Fecha"].map(h => (
                    <TableHead key={h}
                      className="text-[11px] font-semibold uppercase tracking-widest py-2.5 first:pl-4"
                      style={{ color: "var(--foreground-muted)" }}>
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {pagos.map((pay, i) => {
                  const statusCfg = STATUS_CONFIG[pay.status] ?? STATUS_CONFIG.completed
                  const MethodIcon = METHOD_ICON[pay.method] ?? CreditCard

                  return (
                    <TableRow key={pay.id}
                      className="cursor-default"
                      style={{
                        borderColor: "var(--border-default)",
                        backgroundColor: i % 2 === 0 ? "var(--background-default)" : "transparent",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--background-default)" : "transparent")}
                    >
                      <TableCell className="pl-4 py-3">
                        <span className="text-[11px] font-mono font-medium" style={{ color: "var(--foreground-default)" }}>
                          {pay.id}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[11px] font-mono" style={{ color: "var(--foreground-lighter)" }}>
                          {pay.invoiceId}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-light)" }}>
                          {pay.client}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-lighter)" }}>
                          {pay.serviceName}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px] font-medium tabular-nums" style={{ color: "var(--foreground-default)" }}>
                          ${pay.amount.toLocaleString()}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="inline-flex items-center gap-1.5 text-[13px]"
                          style={{ color: "var(--foreground-lighter)" }}>
                          <MethodIcon style={{ width: 12, height: 12, flexShrink: 0 }} strokeWidth={1.6} />
                          {pay.method}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <Badge label={statusCfg.label} {...statusCfg} />
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-muted)" }}>
                          {pay.date}
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
