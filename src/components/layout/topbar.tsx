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

/** Same dark surface for every panel */
const PANEL_BG     = "hsl(0 0% 11%)"
const PANEL_BORDER = "hsl(0 0% 20%)"
const DIVIDER      = "hsl(0 0% 18%)"

/** Circular icon button (Help, Bell, Avatar trigger) */
const ICON_BTN =
  "flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer " +
  "border border-[hsl(0_0%_22%)] bg-transparent transition-all duration-150 " +
  "text-[hsl(0_0%_50%)] hover:border-[hsl(0_0%_32%)] hover:bg-[hsl(0_0%_14%)] hover:text-[hsl(0_0%_80%)]"

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
  success: <CheckCircle2 style={{ width: 13, height: 13, color: "#3ECF8E",               flexShrink: 0, marginTop: 2 }} />,
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
          style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 22%)" }}>
          <BrandLogo size={17} />
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[17px] font-bold leading-none tracking-tight"
            style={{ color: "hsl(0 0% 92%)", fontFamily: "var(--font-nunito)" }}>
            {orgName.toUpperCase()}<span style={{ color: "#3ECF8E" }}>.</span>
          </span>
          <span className="inline-flex items-center rounded px-1 py-[2px] text-[9px] font-medium tracking-widest leading-none border shrink-0"
            style={{ color: "#3ECF8E", borderColor: "#29a86944", backgroundColor: "#3ECF8E12" }}>
            {plan}
          </span>
        </div>
      </div>

      {/* ── Desktop left ────────────────────────────────────────────────── */}
      <div className="hidden md:block" />

      {/* ── Right actions ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5">

        {/* Feedback */}
        <button className="hidden sm:block px-2.5 py-1 rounded text-[13px] transition-colors cursor-pointer border-0 bg-transparent text-[hsl(0_0%_48%)] hover:text-[hsl(0_0%_78%)] hover:bg-[hsl(0_0%_14%)]">
          Feedback
        </button>

        {/* Search */}
        <button className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-[13px] transition-colors cursor-pointer border-0 bg-transparent text-[hsl(0_0%_48%)] hover:text-[hsl(0_0%_78%)] hover:bg-[hsl(0_0%_14%)]">
          <Search style={{ width: 13, height: 13 }} strokeWidth={1.8} />
          <span>Search...</span>
          <kbd className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] font-medium leading-none border"
            style={{ color: "hsl(0 0% 38%)", borderColor: "hsl(0 0% 26%)", backgroundColor: "hsl(0 0% 12%)" }}>
            <Command style={{ width: 10, height: 10 }} />K
          </kbd>
        </button>

        <div className="hidden sm:block w-px h-4 bg-[hsl(0_0%_22%)]" />

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
              style={{ color: "hsl(0 0% 36%)" }}>
              Help & Resources
            </p>
            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            {[
              { icon: BookOpen,     label: "Documentation",  sub: null },
              { icon: Code2,        label: "API Reference",  sub: null },
              { icon: Zap,          label: "Changelog",      sub: "What's new" },
              { icon: ExternalLink, label: "Status page",    sub: null },
            ].map(({ icon: Icon, label, sub }) => (
              <DropdownMenuItem key={label} className={cn(MENU_ITEM)} style={{ color: "hsl(0 0% 72%)" }}>
                <Icon style={{ width: 14, height: 14, flexShrink: 0 }} strokeWidth={1.5} />
                <span className="flex-1 text-[13px]">{label}</span>
                {sub && <span className="text-[11px]" style={{ color: "hsl(0 0% 36%)" }}>{sub}</span>}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            <DropdownMenuItem className={cn(MENU_ITEM)} style={{ color: "hsl(0 0% 60%)" }}>
              <AlertCircle style={{ width: 14, height: 14, flexShrink: 0 }} strokeWidth={1.5} />
              <span className="text-[13px]">Report a bug</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            {/* Version */}
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[12px]" style={{ color: "hsl(0 0% 36%)" }}>Version</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded"
                style={{ color: "#3ECF8E", backgroundColor: "#3ECF8E10", border: "1px solid #3ECF8E28" }}>
                {APP_VERSION}
              </span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ── Notifications ─────────────────────────────────────────────── */}
        <Popover>
          <PopoverTrigger className={cn(ICON_BTN, "relative outline-none")} aria-label="Notifications">
            <Bell style={{ width: 14, height: 14 }} strokeWidth={1.6} />
            <span className="absolute top-[7px] right-[7px] w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
          </PopoverTrigger>

          <PopoverContent
            align="end" side="bottom" sideOffset={MENU_OFFSET}
            className="p-0 w-[300px] overflow-hidden gap-0"
            style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER, borderRadius: 10 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: DIVIDER }}>
              <span className="text-[13px] font-semibold" style={{ color: "hsl(0 0% 88%)" }}>
                Notifications
              </span>
              <button className="text-[12px] transition-colors border-0 bg-transparent cursor-pointer"
                style={{ color: "#3ECF8E" }}>
                Mark all read
              </button>
            </div>

            {/* Items */}
            {notifications.map((n, i) => (
              <div key={n.id}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[hsl(0_0%_14%)]"
                style={{ borderBottom: i < notifications.length - 1 ? `1px solid ${DIVIDER}` : "none" }}>
                {NOTIF_ICON[n.type]}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-snug" style={{ color: "hsl(0 0% 86%)" }}>{n.title}</p>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: "hsl(0 0% 46%)" }}>{n.desc}</p>
                </div>
                <span className="text-[10px] shrink-0 mt-0.5" style={{ color: "hsl(0 0% 36%)" }}>
                  {n.time}
                </span>
              </div>
            ))}

            {/* Footer */}
            <div className="border-t" style={{ borderColor: DIVIDER }}>
              <button className="w-full py-2.5 text-[12px] text-center transition-colors cursor-pointer border-0 bg-transparent hover:bg-[hsl(0_0%_14%)]"
                style={{ color: "hsl(0 0% 50%)" }}>
                View all notifications →
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* ── Avatar / Profile ──────────────────────────────────────────── */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer outline-none",
              "border border-[hsl(0_0%_22%)] bg-[hsl(0_0%_12%)] transition-all duration-150",
              "hover:border-[hsl(0_0%_32%)] hover:ring-2 hover:ring-[#3ECF8E33]"
            )}
          >
            <User style={{ width: 14, height: 14, color: "hsl(0 0% 60%)" }} strokeWidth={1.6} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end" side="bottom" sideOffset={MENU_OFFSET}
            className="w-56 py-1"
            style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
          >
            {/* User info */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                style={{ backgroundColor: "hsl(0 0% 16%)", border: "1px solid hsl(0 0% 24%)" }}>
                <User style={{ width: 14, height: 14, color: "hsl(0 0% 55%)" }} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: "hsl(0 0% 90%)" }}>User Name</p>
                <p className="text-[11px] truncate" style={{ color: "hsl(0 0% 44%)" }}>user@example.com</p>
              </div>
            </div>

            <DropdownMenuSeparator style={{ backgroundColor: DIVIDER }} />

            {[
              { icon: UserCircle, label: "Profile" },
              { icon: Settings,   label: "Account settings" },
              { icon: Palette,    label: "Preferences" },
              { icon: Keyboard,   label: "Keyboard shortcuts" },
            ].map(({ icon: Icon, label }) => (
              <DropdownMenuItem key={label} className={cn(MENU_ITEM)} style={{ color: "hsl(0 0% 70%)" }}>
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
