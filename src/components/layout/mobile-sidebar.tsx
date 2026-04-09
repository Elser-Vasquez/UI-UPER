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
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/icons/brand-logo"
import { Sheet, SheetContent } from "@/components/ui/sheet"

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

const ITEM_BASE =
  "flex items-center gap-2.5 mx-2 rounded-md px-2.5 py-[9px] text-[13.5px] leading-none transition-colors duration-100 select-none"

const ITEM_ACTIVE   = "nav-item-active"
const ITEM_INACTIVE = "nav-item-inactive"

const ICON_PROPS = { width: 16, height: 16, minWidth: 16, flexShrink: 0 } as const

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
  orgName?: string
  plan?: string
}

export function MobileSidebar({
  open,
  onClose,
  orgName = "UPER",
  plan = "FREE",
}: MobileSidebarProps) {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="p-0 w-[240px]"
        style={{
          backgroundColor: "var(--background-default)",
          borderColor: "var(--border-default)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center shrink-0 border-b"
          style={{
            height: "var(--topbar-height)",
            borderColor: "var(--border-default)",
            paddingLeft: 14,
            paddingRight: 14,
          }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 42, height: 42, borderRadius: "50%",
              backgroundColor: "var(--surface-100)",
              border: "1px solid var(--border-control)",
            }}
          >
            <BrandLogo size={19} />
          </div>

          <div className="flex items-center gap-2.5 ml-3 min-w-0">
            <span
              className="text-[22px] font-extrabold leading-none truncate"
              style={{ color: "var(--foreground-default)", fontFamily: "var(--font-nunito)", letterSpacing: "-0.02em" }}
            >
              {orgName.toUpperCase()}
              <span style={{ color: "var(--brand)" }}>.</span>
            </span>
            <span
              className="inline-flex items-center rounded px-1.5 py-[3px] text-[10px] font-semibold tracking-widest leading-none border shrink-0"
              style={{
                color: "var(--brand)",
                borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--brand) 10%, transparent)",
              }}
            >
              {plan}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col pt-2.5 pb-1 gap-0.5 overflow-y-auto">
          {NAV_MAIN.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(ITEM_BASE, isActive(item.href, pathname) ? ITEM_ACTIVE : ITEM_INACTIVE)}
            >
              <item.icon style={ICON_PROPS} strokeWidth={1.8} />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}

          {/* Sistema separator */}
          <div className="mx-4 mt-3 mb-1">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest leading-none"
              style={{ color: "var(--foreground-muted)" }}
            >
              Sistema
            </span>
          </div>

          {NAV_SISTEMA.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(ITEM_BASE, isActive(item.href, pathname) ? ITEM_ACTIVE : ITEM_INACTIVE)}
            >
              <item.icon style={ICON_PROPS} strokeWidth={1.8} />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
