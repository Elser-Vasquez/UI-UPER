"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  FileText,
  Receipt,
  Banknote,
  Bell,
  ShieldCheck,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { BrandLogo } from "@/components/icons/brand-logo"

/* ── Nav structure ──────────────────────────────────────────────────────── */

const NAV_MAIN = [
  { label: "Dashboard",  href: "/",          icon: LayoutDashboard },
  { label: "Proyectos",  href: "/projects",  icon: FolderKanban },
  { label: "Servicios",  href: "/servicios", icon: Package },
  { label: "Contratos",  href: "/contratos", icon: FileText },
  { label: "Facturas",   href: "/facturas",  icon: Receipt },
  { label: "Pagos",      href: "/pagos",     icon: Banknote },
]

const NAV_SISTEMA = [
  { label: "Notificaciones", href: "/notificaciones", icon: Bell },
  { label: "Auditoría",      href: "/auditoria",       icon: ShieldCheck },
  { label: "Configuración",  href: "/configuracion",   icon: Settings },
  { label: "Tema",           href: "/tema",             icon: Palette },
]

/* ── Style constants ────────────────────────────────────────────────────── */

const ITEM_BASE =
  "flex items-center gap-2.5 mx-2 rounded-md px-2.5 py-[9px] text-[13.5px] leading-none transition-colors duration-100 select-none whitespace-nowrap"

const ITEM_ACTIVE   = "nav-item-active"
const ITEM_INACTIVE = "nav-item-inactive"
const ITEM_MUTED    = "nav-item-muted"

const ICON_PROPS = { width: 16, height: 16, minWidth: 16, flexShrink: 0 } as const

/* ── Helpers ────────────────────────────────────────────────────────────── */

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

/* ── Props ──────────────────────────────────────────────────────────────── */

interface AppSidebarProps {
  collapsed: boolean
  onToggle: () => void
  orgName?: string
  plan?: string
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function AppSidebar({
  collapsed,
  onToggle,
  orgName = "UPER",
  plan = "FREE",
}: AppSidebarProps) {
  const pathname = usePathname()

  function NavItem({ label, href, icon: Icon }: { label: string; href: string; icon: React.ElementType }) {
    const active = isActive(href, pathname)

    const linkEl = (
      <Link href={href} className={cn(ITEM_BASE, active ? ITEM_ACTIVE : ITEM_INACTIVE)}>
        <Icon style={ICON_PROPS} strokeWidth={1.8} />
        {!collapsed && <span className="truncate">{label}</span>}
      </Link>
    )

    if (!collapsed) return <div>{linkEl}</div>

    return (
      <Tooltip>
        <TooltipTrigger className="flex" style={{ outline: "none" }} render={<div />}>
          {linkEl}
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>{label}</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <aside
      className="flex flex-col h-full border-r shrink-0 overflow-hidden"
      style={{
        backgroundColor: "var(--background-default)",
        width: collapsed ? "var(--sidebar-width-icon)" : "var(--sidebar-width)",
        borderColor: "var(--border-default)",
        transition: "width 200ms ease-in-out",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="flex items-center shrink-0 border-b"
        style={{
          height: "var(--topbar-height)",
          borderColor: "var(--border-default)",
        }}
      >
        {/* Icon zone — always sidebar-width-icon wide so logo never moves */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: "var(--sidebar-width-icon)" }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              backgroundColor: "var(--surface-100)",
              border: "1px solid var(--border-control)",
            }}
          >
            <BrandLogo size={19} />
          </div>
        </div>

        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-[17px] font-bold leading-none tracking-tight truncate"
              style={{ color: "var(--foreground-default)", fontFamily: "var(--font-nunito)" }}
            >
              {orgName.toUpperCase()}
              <span style={{ color: "var(--brand)" }}>.</span>
            </span>
            <span
              className="inline-flex items-center rounded px-1 py-[2px] text-[9px] font-medium tracking-widest leading-none border shrink-0"
              style={{
                color: "var(--brand)",
                borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--brand) 8%, transparent)",
              }}
            >
              {plan}
            </span>
          </div>
        )}
      </div>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="flex-1 flex flex-col pt-2.5 pb-1 gap-0.5 overflow-y-auto overflow-x-hidden">

        {NAV_MAIN.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

        {/* ── Sistema separator ─────────────────────────────────────────── */}
        <div
          className="mx-2 mt-3 mb-1 flex items-center gap-2"
          style={{ color: "var(--foreground-muted)" }}
        >
          {!collapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-widest leading-none px-0.5">
              Sistema
            </span>
          )}
          {collapsed && (
            <div className="w-full h-px" style={{ backgroundColor: "var(--border-default)" }} />
          )}
        </div>

        {NAV_SISTEMA.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

      </nav>

      {/* ── Collapse toggle ─────────────────────────────────────────────── */}
      <div className="pb-2 pt-1 border-t shrink-0" style={{ borderColor: "var(--border-default)" }}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger className="flex" style={{ outline: "none" }} render={<div />}>
              <button
                onClick={onToggle}
                className={cn(ITEM_BASE, ITEM_MUTED)}
                style={{ width: "calc(100% - 16px)" }}
              >
                <PanelLeftOpen style={ICON_PROPS} strokeWidth={1.8} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>Expand sidebar</TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={onToggle}
            className={cn(ITEM_BASE, ITEM_MUTED)}
            style={{ width: "calc(100% - 16px)" }}
          >
            <PanelLeftClose style={ICON_PROPS} strokeWidth={1.8} />
            <span className="truncate">Collapse</span>
          </button>
        )}
      </div>
    </aside>
  )
}
