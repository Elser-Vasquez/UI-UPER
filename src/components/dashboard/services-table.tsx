"use client"

import { useRouter } from "next/navigation"
import { MoreVertical, ExternalLink, Settings, Trash2 } from "lucide-react"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import type { ServicioData } from "@/data/servicios"

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:  { label: "Activo",  color: "#3ECF8E",          bg: "#3ECF8E18",              border: "#3ECF8E44" },
  paused:  { label: "Pausado", color: "hsl(0 0% 52%)",    bg: "hsl(0 0% 18%)",          border: "hsl(0 0% 26%)" },
  error:   { label: "Error",   color: "hsl(10 78% 62%)",  bg: "hsl(10 78% 58% / 0.12)", border: "hsl(10 78% 58% / 0.3)" },
}

const TYPE_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  CDN:     { color: "hsl(210 100% 64%)", bg: "hsl(210 100% 56% / 0.12)", border: "hsl(210 100% 56% / 0.3)" },
  Storage: { color: "hsl(258 80% 72%)",  bg: "hsl(258 80% 60% / 0.12)",  border: "hsl(258 80% 60% / 0.3)" },
  Email:   { color: "#3ECF8E",           bg: "#3ECF8E14",                 border: "#3ECF8E38" },
  Compute: { color: "hsl(39 100% 57%)",  bg: "hsl(39 100% 57% / 0.12)",  border: "hsl(39 100% 57% / 0.3)" },
  Queue:   { color: "hsl(0 0% 52%)",     bg: "hsl(0 0% 14%)",            border: "hsl(0 0% 26%)" },
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

export function ServicesTable({ servicios }: { servicios: ServicioData[] }) {
  const router = useRouter()

  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border-default)" }}>
      <Table>
        <TableHeader>
          <TableRow
            className="border-b hover:bg-transparent"
            style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
          >
            {["Nombre", "Tipo", "Proveedor", "Estado", "Costo", "Actualizado"].map(h => (
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
          {servicios.map((s, i) => {
            const statusCfg = STATUS_CONFIG[s.status] ?? STATUS_CONFIG.paused
            const typeCfg   = TYPE_CONFIG[s.type]     ?? TYPE_CONFIG.Queue
            const href      = `/servicios/${s.name}`

            return (
              <TableRow
                key={s.name}
                className="cursor-pointer"
                style={{
                  borderColor: "var(--border-default)",
                  backgroundColor: i % 2 === 0 ? "var(--background-default)" : "transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--surface-200)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--background-default)" : "transparent")}
                onClick={() => router.push(href)}
              >
                <TableCell className="pl-4 py-3">
                  <span className="text-[13px] font-medium" style={{ color: "hsl(0 0% 88%)" }}>{s.displayName}</span>
                </TableCell>
                <TableCell className="py-3">
                  <Badge label={s.type} color={typeCfg.color} bg={typeCfg.bg} border={typeCfg.border} />
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-[13px]" style={{ color: "hsl(0 0% 52%)" }}>{s.provider}</span>
                </TableCell>
                <TableCell className="py-3">
                  <Badge label={statusCfg.label} color={statusCfg.color} bg={statusCfg.bg} border={statusCfg.border} />
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-[13px] font-medium" style={{ color: "hsl(0 0% 72%)" }}>{s.cost}</span>
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-[13px]" style={{ color: "hsl(0 0% 44%)" }}>{s.updatedAt}</span>
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
                        Ver servicio
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
