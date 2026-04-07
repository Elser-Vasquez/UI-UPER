"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, ExternalLink, Download, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { ContratoData } from "@/data/contratos"

/* ── Configs ─────────────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  activo:    { label: "Activo",    color: "#3ECF8E",          bg: "#3ECF8E18",             border: "#3ECF8E44" },
  pendiente: { label: "Pendiente", color: "hsl(39 100% 57%)", bg: "hsl(39 100% 57%/0.12)", border: "hsl(39 100% 57%/0.3)" },
  vencido:   { label: "Vencido",   color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58%/0.12)",  border: "hsl(10 78% 58%/0.3)" },
  cancelado: { label: "Cancelado", color: "hsl(0 0% 46%)",    bg: "hsl(0 0% 14%)",          border: "hsl(0 0% 26%)" },
}

const PAGE_SIZE_OPTIONS = [10, 15, 20]

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

/* ── Pagination button ───────────────────────────────────────────────────── */

function PageBtn({
  children, onClick, disabled, active,
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center min-w-[28px] h-[28px] px-1.5 rounded-md text-[12px] border transition-colors",
        "disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer select-none"
      )}
      style={{
        borderColor:     active ? "#3ECF8E55"          : "hsl(0 0% 22%)",
        backgroundColor: active ? "#3ECF8E14"          : "transparent",
        color:           active ? "#3ECF8E"             : "hsl(0 0% 56%)",
      }}
      onMouseEnter={e => {
        if (!disabled && !active) {
          e.currentTarget.style.borderColor = "hsl(0 0% 30%)"
          e.currentTarget.style.color = "hsl(0 0% 82%)"
        }
      }}
      onMouseLeave={e => {
        if (!disabled && !active) {
          e.currentTarget.style.borderColor = "hsl(0 0% 22%)"
          e.currentTarget.style.color = "hsl(0 0% 56%)"
        }
      }}
    >
      {children}
    </button>
  )
}

/* ── Table ───────────────────────────────────────────────────────────────── */

export function ContratosTable({ contratos }: { contratos: ContratoData[] }) {
  const router = useRouter()
  const [page,     setPage]     = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const total      = contratos.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * pageSize
  const end        = Math.min(start + pageSize, total)
  const slice      = contratos.slice(start, end)

  /* Reset to page 1 when list changes length */
  if (page > totalPages && totalPages > 0) setPage(1)

  /* Page window — show at most 5 page buttons */
  const windowSize = 5
  const halfW      = Math.floor(windowSize / 2)
  let winStart     = Math.max(1, safePage - halfW)
  let winEnd       = winStart + windowSize - 1
  if (winEnd > totalPages) { winEnd = totalPages; winStart = Math.max(1, winEnd - windowSize + 1) }
  const pageNums   = Array.from({ length: winEnd - winStart + 1 }, (_, i) => winStart + i)

  return (
    <div className="flex flex-col gap-0 rounded-lg border overflow-hidden" style={{ borderColor: "var(--border-default)" }}>

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <Table>
        <TableHeader>
          <TableRow
            className="border-b hover:bg-transparent"
            style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
          >
            {["ID", "Nombre", "Cliente", "Estado", "Monto", "Vencimiento", "Actualizado"].map(h => (
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
          {slice.map((c, i) => {
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

      {/* ── Pagination footer ─────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-t gap-4 flex-wrap"
        style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
      >
        {/* Left — total + page size */}
        <div className="flex items-center gap-3">
          <span className="text-[12px]" style={{ color: "hsl(0 0% 44%)" }}>
            <span style={{ color: "hsl(0 0% 72%)" }}>{total}</span> contrato{total !== 1 ? "s" : ""}
            {" · "}
            <span style={{ color: "hsl(0 0% 60%)" }}>{start + 1}–{end}</span> mostrados
          </span>

          {/* Page size selector */}
          <div className="flex items-center gap-1">
            {PAGE_SIZE_OPTIONS.map(size => (
              <button
                key={size}
                onClick={() => { setPageSize(size); setPage(1) }}
                className="h-[22px] px-2 rounded text-[11px] border transition-colors cursor-pointer"
                style={{
                  borderColor:     pageSize === size ? "#3ECF8E55"  : "hsl(0 0% 22%)",
                  backgroundColor: pageSize === size ? "#3ECF8E14"  : "transparent",
                  color:           pageSize === size ? "#3ECF8E"    : "hsl(0 0% 46%)",
                }}
                onMouseEnter={e => { if (pageSize !== size) { e.currentTarget.style.borderColor = "hsl(0 0% 30%)"; e.currentTarget.style.color = "hsl(0 0% 76%)" } }}
                onMouseLeave={e => { if (pageSize !== size) { e.currentTarget.style.borderColor = "hsl(0 0% 22%)"; e.currentTarget.style.color = "hsl(0 0% 46%)" } }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Right — page navigation */}
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
