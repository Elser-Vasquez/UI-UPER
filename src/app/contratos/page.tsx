"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ALL_CONTRATOS } from "@/data/contratos"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronDown, Check, RefreshCw, CalendarClock } from "lucide-react"

/* ── Types ──────────────────────────────────────────────────────────────── */

type StatusFilter  = "all" | "active" | "paused" | "error" | "expiring"
type BillingFilter = "all" | "mensual" | "anual"

const STATUS_LABELS: Record<StatusFilter, string> = {
  all: "Estado", active: "Activo", paused: "Pausado", error: "Error", expiring: "Por vencer",
}
const BILLING_LABELS: Record<BillingFilter, string> = {
  all: "Facturación", mensual: "Mensual", anual: "Anual",
}

/* ── Badge configs ───────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:   { label: "Activo",     color: "var(--brand)",            bg: "color-mix(in srgb, var(--brand) 10%, transparent)", border: "color-mix(in srgb, var(--brand) 27%, transparent)" },
  paused:   { label: "Pausado",    color: "var(--foreground-lighter)", bg: "var(--border-default)",           border: "var(--border-stronger)" },
  error:    { label: "Error",      color: "hsl(10 78% 62%)",         bg: "hsl(10 78% 58% / 0.12)",           border: "hsl(10 78% 58% / 0.3)" },
  expiring: { label: "Por vencer", color: "hsl(39 100% 57%)",        bg: "hsl(39 100% 57% / 0.12)",          border: "hsl(39 100% 57% / 0.3)" },
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

export default function ContratosPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter]   = useState<StatusFilter>("all")
  const [billingFilter, setBillingFilter] = useState<BillingFilter>("all")

  const contratos = useMemo(() => {
    let list = [...ALL_CONTRATOS]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.id.toLowerCase().includes(q) ||
        c.serviceName.toLowerCase().includes(q) ||
        c.client.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== "all")  list = list.filter(c => c.status === statusFilter)
    if (billingFilter !== "all") list = list.filter(c => c.billing === billingFilter)
    return list
  }, [search, statusFilter, billingFilter])

  const statusDot = (s: StatusFilter) => {
    if (s === "active")   return "var(--brand)"
    if (s === "error")    return "hsl(10 78% 62%)"
    if (s === "expiring") return "hsl(39 100% 57%)"
    return "var(--foreground-lighter)"
  }

  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="flat-surface max-w-[1200px] py-6 space-y-5">

        {/* Title */}
        <div>
          <h1 className="text-[20px] font-semibold leading-snug" style={{ color: "var(--foreground-default)" }}>
            Contratos
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--foreground-muted)" }}>
            {ALL_CONTRATOS.length} contratos — uno por servicio
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px] max-w-[300px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 12, height: 12, color: "var(--foreground-muted)" }} />
            <Input
              placeholder="Buscar contrato o cliente..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-8 text-[13px] rounded-md bg-surface-100 border-border-control text-foreground-light placeholder:text-foreground-muted"
            />
          </div>

          {/* Status filter */}
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
              {(["all", "active", "paused", "error", "expiring"] as StatusFilter[]).map(s => (
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

          {/* Billing filter */}
          <DropdownMenu>
            <DropdownMenuTrigger className={TB} style={TS}
              onMouseEnter={e => Object.assign(e.currentTarget.style, TH)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, TS)}
            >
              {BILLING_LABELS[billingFilter]}
              <ChevronDown style={{ width: 11, height: 11 }} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" sideOffset={6} className="w-36 py-1"
              style={{ backgroundColor: "var(--background-dialog)", borderColor: "var(--border-default)" }}>
              {(["all", "mensual", "anual"] as BillingFilter[]).map(b => (
                <DropdownMenuItem key={b}
                  className="flex items-center gap-2 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                  style={{ color: billingFilter === b ? "var(--foreground-default)" : "var(--foreground-light)" }}
                  onClick={() => setBillingFilter(b)}
                >
                  <span className="flex-1">{BILLING_LABELS[b]}</span>
                  {billingFilter === b && <Check style={{ width: 11, height: 11, color: "var(--brand)" }} />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        {contratos.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-[14px]" style={{ color: "var(--foreground-lighter)" }}>Sin resultados</p>
            <button className="mt-3 text-[12px] border-0 bg-transparent cursor-pointer"
              style={{ color: "var(--brand)" }}
              onClick={() => { setSearch(""); setStatusFilter("all"); setBillingFilter("all") }}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent"
                  style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-200)" }}>
                  {["Código", "Servicio", "Cliente", "Facturación", "Monto", "Estado", "Vigencia", "Próx. cobro"].map(h => (
                    <TableHead key={h}
                      className="text-[11px] font-semibold uppercase tracking-widest py-2.5 first:pl-4"
                      style={{ color: "var(--foreground-muted)" }}>
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {contratos.map((ctr, i) => {
                  const statusCfg = STATUS_CONFIG[ctr.status] ?? STATUS_CONFIG.paused
                  const isExpiring = ctr.status === "expiring"

                  return (
                    <TableRow key={ctr.id}
                      className="cursor-pointer"
                      style={{
                        borderColor: "var(--border-default)",
                        backgroundColor: i % 2 === 0 ? "var(--background-default)" : "transparent",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--background-default)" : "transparent")}
                      onClick={() => router.push(`/contratos/${ctr.id.toLowerCase()}`)}
                    >
                      <TableCell className="pl-4 py-3">
                        <span className="text-[11px] font-mono font-medium" style={{ color: "var(--foreground-lighter)" }}>
                          {ctr.id}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px] font-medium" style={{ color: "var(--foreground-default)" }}>
                          {ctr.serviceName}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]" style={{ color: "var(--foreground-lighter)" }}>
                          {ctr.client}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="inline-flex items-center gap-1.5 text-[12px]"
                          style={{ color: "var(--foreground-lighter)" }}>
                          {ctr.billing === "mensual"
                            ? <RefreshCw style={{ width: 11, height: 11 }} strokeWidth={1.8} />
                            : <CalendarClock style={{ width: 11, height: 11 }} strokeWidth={1.8} />
                          }
                          {ctr.billing === "mensual" ? "Mensual" : "Anual"}
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px] font-medium tabular-nums" style={{ color: "var(--foreground-default)" }}>
                          ${ctr.amount.toLocaleString()}
                          <span className="text-[11px] font-normal ml-1" style={{ color: "var(--foreground-muted)" }}>
                            {ctr.currency}
                          </span>
                        </span>
                      </TableCell>

                      <TableCell className="py-3">
                        <Badge label={statusCfg.label} {...statusCfg} />
                      </TableCell>

                      <TableCell className="py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>
                            {ctr.startDate}
                          </span>
                          <span className="text-[11px]" style={{ color: isExpiring ? "hsl(39 100% 57%)" : "var(--foreground-muted)" }}>
                            → {ctr.endDate}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="py-3">
                        <span className="text-[13px]"
                          style={{ color: isExpiring ? "hsl(39 100% 57%)" : "var(--foreground-muted)" }}>
                          {ctr.nextBilling}
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
