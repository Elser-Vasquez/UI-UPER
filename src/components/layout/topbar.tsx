"use client"

import {
  Bell, HelpCircle, Search, Command, Menu, User,
  Settings, LogOut, UserCircle, Palette, Keyboard,
  BookOpen, Code2, Zap, AlertCircle, ExternalLink,
  CheckCircle2, Info, TriangleAlert, Clock,
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BrandLogo } from "@/components/icons/brand-logo"
import { cn } from "@/lib/utils"

const APP_VERSION = "v1.0.0"

/* ── Shared constants ─────────────────────────────────────────────────── */

/** All three menus open at the same distance from their trigger */
const MENU_OFFSET = 10

/** Theme-aware panel surfaces using CSS variables */
const PANEL_BG     = "var(--background-dialog)"
const PANEL_BORDER = "var(--border-overlay)"
const DIVIDER      = "var(--border-default)"

/** Circular icon button (Help, Bell, Avatar trigger) */
const ICON_BTN =
  "flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer " +
  "border border-[var(--border-control)] bg-transparent transition-all duration-150 " +
  "text-[var(--foreground-lighter)] hover:border-[var(--border-stronger)] hover:bg-[var(--background-overlay-hover)] hover:text-[var(--foreground-light)] " +
  "hover:ring-2 hover:ring-[color-mix(in_srgb,var(--brand)_18%,transparent)]"

/** Row item shared by Help and Avatar menus */
const MENU_ITEM =
  "flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md mx-1"

/* ── Notifications data ───────────────────────────────────────────────── */
const notifications = [
  { id: 1, type: "success", title: "Deployment successful",  desc: "api-gateway deployed to production",      time: "2 min ago"  },
  { id: 2, type: "info",    title: "New team member",        desc: "carlos@example.com joined your org",      time: "1 hr ago"   },
  { id: 3, type: "warning", title: "Usage limit at 80%",     desc: "Approaching your monthly API limit",      time: "3 hr ago"   },
  { id: 4, type: "error",   title: "Edge function failed",   desc: "send-email timed out after 30s",          time: "1 day ago"  },
]

const NOTIF_ICON: Record<string, React.ReactNode> = {
  success: <CheckCircle2 style={{ width: 13, height: 13, color: "var(--brand)",           flexShrink: 0, marginTop: 2 }} />,
  info:    <Info         style={{ width: 13, height: 13, color: "hsl(210 100% 60%)",     flexShrink: 0, marginTop: 2 }} />,
  warning: <TriangleAlert style={{ width: 13, height: 13, color: "hsl(39 100% 57%)",    flexShrink: 0, marginTop: 2 }} />,
  error:   <AlertCircle  style={{ width: 13, height: 13, color: "hsl(10 78% 58%)",      flexShrink: 0, marginTop: 2 }} />,
}

/* ── Component ────────────────────────────────────────────────────────── */
interface TopbarProps {
  onMobileMenuClick?: () => void
  orgName?: string
  plan?: string
}

export function Topbar({ onMobileMenuClick, orgName = "UPER", plan = "FREE" }: TopbarProps) {
  return (
    <header
      className="flex items-center justify-between px-3 shrink-0"
      style={{
        height: "var(--topbar-height)",
        backgroundColor: "var(--background-default)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      {/* ── Mobile left ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 md:hidden">
        <button onClick={onMobileMenuClick} className={ICON_BTN} aria-label="Open menu">
          <Menu style={{ width: 16, height: 16 }} strokeWidth={1.8} />
        </button>
        <div className="flex items-center justify-center shrink-0"
          style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "var(--surface-100)", border: "1px solid var(--border-control)" }}>
          <BrandLogo size={17} />
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[17px] font-bold leading-none tracking-tight"
            style={{ color: "var(--foreground-default)", fontFamily: "var(--font-nunito)" }}>
            {orgName.toUpperCase()}<span style={{ color: "var(--brand)" }}>.</span>
          </span>
          <span className="inline-flex items-center rounded px-1 py-[2px] text-[9px] font-medium tracking-widest leading-none border shrink-0"
            style={{ color: "var(--brand)", borderColor: "color-mix(in srgb, var(--brand) 25%, transparent)", backgroundColor: "color-mix(in srgb, var(--brand) 8%, transparent)" }}>
            {plan}
          </span>
        </div>
      </div>

      {/* ── Desktop left ────────────────────────────────────────────────── */}
      <div className="hidden md:block" />

      {/* ── Right actions ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5">

        {/* Feedback */}
        <button className="hidden sm:block px-2.5 py-1 rounded text-[13px] transition-colors cursor-pointer border-0 bg-transparent text-[var(--foreground-lighter)] hover:text-[var(--foreground-light)] hover:bg-[var(--background-overlay-hover)]">
          Feedback
        </button>

        {/* Search */}
        <button className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-[13px] transition-colors cursor-pointer border-0 bg-transparent text-[var(--foreground-lighter)] hover:text-[var(--foreground-light)] hover:bg-[var(--background-overlay-hover)]">
          <Search style={{ width: 13, height: 13 }} strokeWidth={1.8} />
          <span>Search...</span>
          <kbd className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] font-medium leading-none border"
            style={{ color: "var(--foreground-muted)", borderColor: "var(--border-strong)", backgroundColor: "var(--surface-100)" }}>
            <Command style={{ width: 10, height: 10 }} />K
          </kbd>
        </button>

        <div className="hidden sm:block w-px h-4 bg-[var(--border-control)]" />

        {/* ── Help ──────────────────────────────────────────────────────── */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(ICON_BTN, "outline-none")} aria-label="Help">
            <HelpCircle style={{ width: 14, height: 14 }} strokeWidth={1.6} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end" side="bottom" sideOffset={MENU_OFFSET}
            className="w-60 py-1"
            style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
          >
            {/* Section label */}
            <p className="px-4 pt-2 pb-1 text-[11px] font-medium uppercase tracking-widest"
              style={{ color: "var(--foreground-muted)" }}>
              Help & Resources
            </p>
            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            {[
              { icon: BookOpen,     label: "Documentation",  sub: null },
              { icon: Code2,        label: "API Reference",  sub: null },
              { icon: Zap,          label: "Changelog",      sub: "What's new" },
              { icon: ExternalLink, label: "Status page",    sub: null },
            ].map(({ icon: Icon, label, sub }) => (
              <DropdownMenuItem key={label} className={cn(MENU_ITEM)} style={{ color: "var(--foreground-light)" }}>
                <Icon style={{ width: 14, height: 14, flexShrink: 0 }} strokeWidth={1.5} />
                <span className="flex-1 text-[13px]">{label}</span>
                {sub && <span className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>{sub}</span>}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            <DropdownMenuItem className={cn(MENU_ITEM)} style={{ color: "var(--foreground-lighter)" }}>
              <AlertCircle style={{ width: 14, height: 14, flexShrink: 0 }} strokeWidth={1.5} />
              <span className="text-[13px]">Report a bug</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            {/* Version */}
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[12px]" style={{ color: "var(--foreground-muted)" }}>Version</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded"
                style={{ color: "var(--brand)", backgroundColor: "color-mix(in srgb, var(--brand) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--brand) 22%, transparent)" }}>
                {APP_VERSION}
              </span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ── Notifications ─────────────────────────────────────────────── */}
        <Popover>
          <PopoverTrigger className={cn(ICON_BTN, "relative outline-none")} aria-label="Notifications">
            <Bell style={{ width: 14, height: 14 }} strokeWidth={1.6} />
            <span className="absolute top-[7px] right-[7px] w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
          </PopoverTrigger>

          <PopoverContent
            align="end" side="bottom" sideOffset={MENU_OFFSET}
            className="p-0 w-[300px] overflow-hidden gap-0"
            style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER, borderRadius: 10 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: DIVIDER }}>
              <span className="text-[13px] font-semibold" style={{ color: "var(--foreground-default)" }}>
                Notifications
              </span>
              <button className="text-[12px] transition-colors border-0 bg-transparent cursor-pointer"
                style={{ color: "var(--brand)" }}>
                Mark all read
              </button>
            </div>

            {/* Items */}
            {notifications.map((n, i) => (
              <div key={n.id}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--background-overlay-hover)]"
                style={{ borderBottom: i < notifications.length - 1 ? `1px solid ${DIVIDER}` : "none" }}>
                {NOTIF_ICON[n.type]}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-snug" style={{ color: "var(--foreground-default)" }}>{n.title}</p>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{n.desc}</p>
                </div>
                <span className="text-[10px] shrink-0 mt-0.5" style={{ color: "var(--foreground-muted)" }}>
                  {n.time}
                </span>
              </div>
            ))}

            {/* Footer */}
            <div className="border-t" style={{ borderColor: DIVIDER }}>
              <button className="w-full py-2.5 text-[12px] text-center transition-colors cursor-pointer border-0 bg-transparent hover:bg-[var(--background-overlay-hover)]"
                style={{ color: "var(--foreground-lighter)" }}>
                View all notifications →
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* ── Avatar / Profile ──────────────────────────────────────────── */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(ICON_BTN, "outline-none")}>
            <User style={{ width: 14, height: 14, color: "var(--foreground-lighter)" }} strokeWidth={1.6} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end" side="bottom" sideOffset={MENU_OFFSET}
            className="w-56 py-1"
            style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
          >
            {/* User info */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                style={{ backgroundColor: "var(--surface-200)", border: "1px solid var(--border-strong)" }}>
                <User style={{ width: 14, height: 14, color: "var(--foreground-lighter)" }} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: "var(--foreground-default)" }}>User Name</p>
                <p className="text-[11px] truncate" style={{ color: "var(--foreground-muted)" }}>user@example.com</p>
              </div>
            </div>

            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            {[
              { icon: UserCircle, label: "Profile" },
              { icon: Settings,   label: "Account settings" },
              { icon: Palette,    label: "Preferences" },
              { icon: Keyboard,   label: "Keyboard shortcuts" },
            ].map(({ icon: Icon, label }) => (
              <DropdownMenuItem key={label} className={cn(MENU_ITEM)} style={{ color: "var(--foreground-light)" }}>
                <Icon style={{ width: 14, height: 14, flexShrink: 0 }} strokeWidth={1.5} />
                <span className="text-[13px]">{label}</span>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            <DropdownMenuItem className={cn(MENU_ITEM, "mb-1")} style={{ color: "hsl(10 78% 58%)" }}>
              <LogOut style={{ width: 14, height: 14, flexShrink: 0 }} strokeWidth={1.5} />
              <span className="text-[13px]">Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}
