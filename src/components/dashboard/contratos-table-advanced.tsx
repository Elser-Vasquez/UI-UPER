"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpDown, ArrowUp, ArrowDown,
  MoreVertical, ExternalLink, Download, Trash2,
  ChevronLeft, ChevronRight, X,
} from "lucide-react"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { ContratoData } from "@/data/contratos"

/* ── Types ───────────────────────────────────────────────────────────────── */

type SortDir  = "asc" | "desc" | null
type ColKey   = keyof Pick<ContratoData, "id" | "name" | "client" | "status" | "amount" | "endDate" | "updatedAt">

interface SortState { col: ColKey; dir: "asc" | "desc" }
interface Filters   { id: string; name: string; client: string; status: string; amount: string; endDate: string; updatedAt: string }

/* ── Config ──────────────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  activo:    { label: "Activo",    color: "#3ECF8E",          bg: "#3ECF8E18",             border: "#3ECF8E44" },
  pendiente: { label: "Pendiente", color: "hsl(39 100% 57%)", bg: "hsl(39 100% 57%/0.12)", border: "hsl(39 100% 57%/0.3)" },
  vencido:   { label: "Vencido",   color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58%/0.12)",  border: "hsl(10 78% 58%/0.3)" },
  cancelado: { label: "Cancelado", color: "hsl(0 0% 46%)",    bg: "hsl(0 0% 14%)",          border: "hsl(0 0% 26%)" },
}

const PAGE_SIZE_OPTIONS = [10, 15, 20]

const COLUMNS: { key: ColKey; label: string; sortable: boolean; filterable: boolean }[] = [
  { key: "id",         label: "ID",           sortable: true,  filterable: true  },
  { key: "name",       label: "Nombre",       sortable: true,  filterable: true  },
  { key: "client",     label: "Cliente",      sortable: true,  filterable: true  },
  { key: "status",     label: "Estado",       sortable: true,  filterable: true  },
  { key: "amount",     label: "Monto",        sortable: false, filterable: true  },
  { key: "endDate",    label: "Vencimiento",  sortable: true,  filterable: true  },
  { key: "updatedAt",  label: "Actualizado",  sortable: false, filterable: false },
]

/* ── Small components ────────────────────────────────────────────────────── */

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

function SortIcon({ dir }: { dir: SortDir }) {
  if (dir === "asc")  return <ArrowUp   style={{ width: 11, height: 11, flexShrink: 0 }} strokeWidth={2} />
  if (dir === "desc") return <ArrowDown style={{ width: 11, height: 11, flexShrink: 0 }} strokeWidth={2} />
  return <ArrowUpDown style={{ width: 11, height: 11, flexShrink: 0, opacity: 0.35 }} strokeWidth={1.8} />
}

function PageBtn({
  children, onClick, disabled, active,
}: {
  children: React.ReactNode; onClick?: () => void; disabled?: boolean; active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center min-w-[28px] h-[28px] px-1.5 rounded-md text-[12px] border transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed select-none"
      style={{
        borderColor:     active ? "#3ECF8E55"   : "hsl(0 0% 22%)",
        backgroundColor: active ? "#3ECF8E14"   : "transparent",
        color:           active ? "#3ECF8E"      : "hsl(0 0% 56%)",
      }}
      onMouseEnter={e => { if (!disabled && !active) { e.currentTarget.style.borderColor = "hsl(0 0% 30%)"; e.currentTarget.style.color = "hsl(0 0% 82%)" } }}
      onMouseLeave={e => { if (!disabled && !active) { e.currentTarget.style.borderColor = "hsl(0 0% 22%)"; e.currentTarget.style.color = "hsl(0 0% 56%)" } }}
    >
      {children}
    </button>
  )
}

/* ── Main component ──────────────────────────────────────────────────────── */

export function ContratosTableAdvanced({ contratos }: { contratos: ContratoData[] }) {
  const router = useRouter()

  const [sort,     setSort]     = useState<SortState>({ col: "id", dir: "asc" })
  const [filters,  setFilters]  = useState<Filters>({ id: "", name: "", client: "", status: "", amount: "", endDate: "", updatedAt: "" })
  const [page,     setPage]     = useState(1)
  const [pageSize, setPageSize] = useState(10)

  /* ── Filter + sort ──────────────────────────────────────────────────── */
  const processed = useMemo(() => {
    let list = [...contratos]

    // Per-column filters
    Object.entries(filters).forEach(([key, val]) => {
      if (!val.trim()) return
      const q = val.toLowerCase()
      list = list.filter(c => String(c[key as ColKey]).toLowerCase().includes(q))
    })

    // Sort
    list.sort((a, b) => {
      const av = String(a[sort.col]).toLowerCase()
      const bv = String(b[sort.col]).toLowerCase()
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
    })

    return list
  }, [contratos, filters, sort])

  /* ── Pagination ─────────────────────────────────────────────────────── */
  const total      = processed.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * pageSize
  const end        = Math.min(start + pageSize, total)
  const slice      = processed.slice(start, end)

  if (page > totalPages && totalPages > 0) setPage(1)

  const halfW    = 2
  let winStart   = Math.max(1, safePage - halfW)
  let winEnd     = winStart + 4
  if (winEnd > totalPages) { winEnd = totalPages; winStart = Math.max(1, winEnd - 4) }
  const pageNums = Array.from({ length: winEnd - winStart + 1 }, (_, i) => winStart + i)

  /* ── Handlers ───────────────────────────────────────────────────────── */
  function toggleSort(col: ColKey) {
    setPage(1)
    setSort(prev =>
      prev.col === col
        ? { col, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { col, dir: "asc" }
    )
  }

  function setFilter(key: keyof Filters, val: string) {
    setPage(1)
    setFilters(prev => ({ ...prev, [key]: val }))
  }

  function clearFilters() {
    setFilters({ id: "", name: "", client: "", status: "", amount: "", endDate: "", updatedAt: "" })
    setPage(1)
  }

  const hasFilters = Object.values(filters).some(v => v.trim() !== "")

  return (
    <div className="flex flex-col gap-0 rounded-lg border overflow-hidden" style={{ borderColor: "var(--border-default)" }}>

      {/* ── Sub-header: label + clear filters ────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-200)" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "hsl(0 0% 42%)" }}>
          Filtro por columna
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-[11px] border-0 bg-transparent cursor-pointer transition-colors"
            style={{ color: "#3ECF8E" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#34be7e")}
            onMouseLeave={e => (e.currentTarget.style.color = "#3ECF8E")}
          >
            <X style={{ width: 11, height: 11 }} strokeWidth={2} />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>

            {/* Row 1: Column labels + sort */}
            <TableRow
              className="border-b hover:bg-transparent"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              {COLUMNS.map(col => (
                <TableHead
                  key={col.key}
                  className="py-2 first:pl-4"
                  style={{ color: "hsl(0 0% 42%)" }}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest cursor-pointer border-0 bg-transparent transition-colors select-none"
                      style={{ color: sort.col === col.key ? "hsl(0 0% 82%)" : "hsl(0 0% 42%)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "hsl(0 0% 76%)")}
                      onMouseLeave={e => (e.currentTarget.style.color = sort.col === col.key ? "hsl(0 0% 82%)" : "hsl(0 0% 42%)")}
                    >
                      {col.label}
                      <SortIcon dir={sort.col === col.key ? sort.dir : null} />
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold uppercase tracking-widest">{col.label}</span>
                  )}
                </TableHead>
              ))}
              <TableHead className="w-10" />
            </TableRow>

            {/* Row 2: Per-column filter inputs */}
            <TableRow
              className="border-b hover:bg-transparent"
              style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
            >
              {COLUMNS.map(col => (
                <TableHead key={col.key} className="py-1.5 first:pl-4 pr-2">
                  {col.filterable ? (
                    <div className="relative">
                      <input
                        value={filters[col.key as keyof Filters]}
                        onChange={e => setFilter(col.key as keyof Filters, e.target.value)}
                        placeholder={col.key === "status" ? "activo…" : "Filtrar…"}
                        className="w-full h-[26px] rounded-md px-2 text-[12px] border outline-none transition-colors"
                        style={{
                          backgroundColor: "var(--surface-200)",
                          borderColor: filters[col.key as keyof Filters]
                            ? "#3ECF8E55"
                            : "hsl(0 0% 22%)",
                          color: "hsl(0 0% 78%)",
                          minWidth: col.key === "id" ? 72 : col.key === "status" ? 90 : 100,
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#3ECF8E88")}
                        onBlur={e => (e.currentTarget.style.borderColor = filters[col.key as keyof Filters] ? "#3ECF8E55" : "hsl(0 0% 22%)")}
                      />
                      {filters[col.key as keyof Filters] && (
                        <button
                          onClick={() => setFilter(col.key as keyof Filters, "")}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 border-0 bg-transparent cursor-pointer p-0"
                          style={{ color: "hsl(0 0% 46%)" }}
                        >
                          <X style={{ width: 10, height: 10 }} strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="h-[26px]" />
                  )}
                </TableHead>
              ))}
              <TableHead className="w-10" />
            </TableRow>

          </TableHeader>

          <TableBody>
            {slice.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length + 1}
                  className="py-16 text-center text-[13px]"
                  style={{ color: "hsl(0 0% 44%)" }}
                >
                  Sin resultados para los filtros aplicados
                </TableCell>
              </TableRow>
            ) : slice.map((c, i) => {
              const statusCfg = STATUS_CONFIG[c.status] ?? STATUS_CONFIG.pendiente
              const href      = `/contratos/${c.id.toLowerCase()}`
              const globalIdx = start + i

              return (
                <TableRow
                  key={c.id}
                  className="cursor-pointer"
                  style={{
                    borderColor: "var(--border-default)",
                    backgroundColor: globalIdx % 2 === 0 ? "var(--background-default)" : "transparent",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = globalIdx % 2 === 0 ? "var(--background-default)" : "transparent")}
                  onClick={() => router.push(href)}
                >
                  <TableCell className="pl-4 py-3">
                    <span className="text-[12px] font-mono" style={{ color: "hsl(0 0% 50%)" }}>{c.id}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[13px] font-medium" style={{ color: "hsl(0 0% 88%)" }}>{c.name}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[13px]" style={{ color: "hsl(0 0% 56%)" }}>{c.client}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge label={statusCfg.label} color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[13px] font-medium" style={{ color: "hsl(0 0% 72%)" }}>{c.amount}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[13px]" style={{ color: "hsl(0 0% 44%)" }}>{c.endDate}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[13px]" style={{ color: "hsl(0 0% 44%)" }}>{c.updatedAt}</span>
                  </TableCell>

                  <TableCell className="py-3 pr-3" onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex items-center justify-center w-6 h-6 rounded transition-colors border-0 bg-transparent cursor-pointer outline-none"
                        style={{ color: "hsl(0 0% 40%)" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--surface-300)"; e.currentTarget.style.color = "hsl(0 0% 72%)" }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "hsl(0 0% 40%)" }}
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
                          Ver contrato
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2.5 px-3 py-2 text-[13px] cursor-pointer mx-0.5 rounded-md"
                          style={{ color: "hsl(0 0% 72%)" }}
                        >
                          <Download style={{ width: 13, height: 13 }} strokeWidth={1.5} />
                          Descargar PDF
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

      {/* ── Pagination footer ─────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-t gap-4 flex-wrap"
        style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="text-[12px]" style={{ color: "hsl(0 0% 44%)" }}>
            <span style={{ color: "hsl(0 0% 72%)" }}>{total}</span> resultado{total !== 1 ? "s" : ""}
            {" · "}
            <span style={{ color: "hsl(0 0% 60%)" }}>{total === 0 ? 0 : start + 1}–{end}</span> mostrados
          </span>

          <div className="flex items-center gap-1">
            {PAGE_SIZE_OPTIONS.map(size => (
              <button
                key={size}
                onClick={() => { setPageSize(size); setPage(1) }}
                className="h-[22px] px-2 rounded text-[11px] border transition-colors cursor-pointer"
                style={{
                  borderColor:     pageSize === size ? "#3ECF8E55" : "hsl(0 0% 22%)",
                  backgroundColor: pageSize === size ? "#3ECF8E14" : "transparent",
                  color:           pageSize === size ? "#3ECF8E"   : "hsl(0 0% 46%)",
                }}
                onMouseEnter={e => { if (pageSize !== size) { e.currentTarget.style.borderColor = "hsl(0 0% 30%)"; e.currentTarget.style.color = "hsl(0 0% 76%)" } }}
                onMouseLeave={e => { if (pageSize !== size) { e.currentTarget.style.borderColor = "hsl(0 0% 22%)"; e.currentTarget.style.color = "hsl(0 0% 46%)" } }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1">
          <PageBtn onClick={() => setPage(1)}          disabled={safePage === 1}>«</PageBtn>
          <PageBtn onClick={() => setPage(p => p - 1)} disabled={safePage === 1}>
            <ChevronLeft style={{ width: 13, height: 13 }} strokeWidth={2} />
          </PageBtn>

          {winStart > 1 && (
            <>
              <PageBtn onClick={() => setPage(1)}>1</PageBtn>
              {winStart > 2 && <span className="px-1 text-[12px]" style={{ color: "hsl(0 0% 36%)" }}>…</span>}
            </>
          )}
          {pageNums.map(n => (
            <PageBtn key={n} onClick={() => setPage(n)} active={n === safePage}>{n}</PageBtn>
          ))}
          {winEnd < totalPages && (
            <>
              {winEnd < totalPages - 1 && <span className="px-1 text-[12px]" style={{ color: "hsl(0 0% 36%)" }}>…</span>}
              <PageBtn onClick={() => setPage(totalPages)}>{totalPages}</PageBtn>
            </>
          )}

          <PageBtn onClick={() => setPage(p => p + 1)} disabled={safePage === totalPages}>
            <ChevronRight style={{ width: 13, height: 13 }} strokeWidth={2} />
          </PageBtn>
          <PageBtn onClick={() => setPage(totalPages)} disabled={safePage === totalPages}>»</PageBtn>
        </div>
      </div>

    </div>
  )
}
