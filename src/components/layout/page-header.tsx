"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown, Home, FolderKanban, Search, MoreHorizontal, ChevronsRight } from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/* ── Types ──────────────────────────────────────────────────────────────── */

export interface BreadcrumbSibling {
  label: string
  href: string
  icon?: React.ElementType
}

export interface BreadcrumbItem {
  label: string
  href?: string
  /** Render an icon instead of the label text */
  icon?: React.ElementType
  /** Sibling pages at the same level — triggers dropdown on this segment */
  siblings?: BreadcrumbSibling[]
  /** Optional footer link at the bottom of the siblings dropdown */
  siblingFooter?: { label: string; href: string }
  /** Use a searchable popover panel instead of a plain dropdown */
  searchable?: boolean
}

export interface PageAction {
  label: string
  icon?: React.ElementType
  onClick?: () => void
  variant?: "ghost" | "primary" | "destructive"
  /** Show only the icon on mobile (≤sm) */
  iconOnly?: boolean
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[]
  actions?: PageAction[]
}

/* ── Style constants ────────────────────────────────────────────────────── */

const PANEL_BG     = "hsl(0 0% 11%)"
const PANEL_BORDER = "hsl(0 0% 20%)"

/** Inactive breadcrumb segment — badge style, subtle */
const CRUMB_INACTIVE =
  "inline-flex items-center gap-1 rounded-md px-2 h-[28px] text-[12px] leading-none " +
  "border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_10%)] text-[hsl(0_0%_44%)] " +
  "transition-colors duration-100 hover:text-[hsl(0_0%_70%)] hover:border-[hsl(0_0%_28%)]"

/** Active (current) breadcrumb segment — badge style, prominent */
const CRUMB_ACTIVE =
  "inline-flex items-center gap-1 rounded-md px-2.5 h-[28px] text-[12px] leading-none font-medium " +
  "bg-[hsl(0_0%_14%)] border border-[hsl(0_0%_22%)] text-[hsl(0_0%_83%)] " +
  "transition-colors duration-100"

/** Active segment that is also a dropdown trigger */
const CRUMB_ACTIVE_TRIGGER =
  CRUMB_ACTIVE +
  " cursor-pointer hover:bg-[hsl(0_0%_17%)] hover:border-[hsl(0_0%_28%)] outline-none"

/** Sibling list item inside dropdown */
const SIBLING_ITEM =
  "flex items-center gap-2.5 px-3 py-2 cursor-pointer rounded-md mx-0.5 text-[13px]"

/* ── Action button variants ─────────────────────────────────────────────── */

const ACTION_BASE =
  "inline-flex items-center gap-1.5 h-[28px] px-3 rounded-md text-[12px] font-medium " +
  "leading-none transition-colors duration-150 cursor-pointer border select-none"

const ACTION_VARIANT: Record<NonNullable<PageAction["variant"]>, string> = {
  ghost:
    "border-[hsl(0_0%_22%)] bg-transparent text-[hsl(0_0%_52%)] " +
    "hover:bg-[hsl(0_0%_14%)] hover:text-[hsl(0_0%_80%)] hover:border-[hsl(0_0%_28%)]",
  primary:
    "border-transparent bg-[#3ECF8E] text-black " +
    "hover:bg-[#34be7e]",
  destructive:
    "border-[hsl(10_78%_38%)] bg-transparent text-[hsl(10_78%_58%)] " +
    "hover:bg-[hsl(10_78%_58%_/_0.08)]",
}

/* ── Searchable crumb popover ───────────────────────────────────────────── */

function SearchableCrumbPopover({ crumb }: { crumb: BreadcrumbItem }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const filtered = (crumb.siblings ?? []).filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={CRUMB_ACTIVE_TRIGGER}>
        <span className="truncate max-w-[160px] sm:max-w-[260px]">{crumb.label}</span>
        <ChevronDown style={{ width: 11, height: 11, flexShrink: 0 }} strokeWidth={2} />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="p-0 w-[260px] overflow-hidden outline-none"
        style={{
          backgroundColor: "hsl(0 0% 11%)",
          borderColor: "hsl(0 0% 20%)",
          borderRadius: 10,
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-2 px-3 py-2.5"
          style={{ borderBottom: "1px solid hsl(0 0% 18%)" }}
        >
          <Search style={{ width: 12, height: 12, color: "hsl(0 0% 40%)", flexShrink: 0 }} />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar proyecto..."
            className="flex-1 bg-transparent border-0 outline-none text-[12px] placeholder:text-[hsl(0_0%_36%)]"
            style={{ color: "hsl(0 0% 80%)" }}
          />
        </div>

        {/* Project list */}
        <div className="py-1 max-h-[220px] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-3 py-3 text-[12px] text-center" style={{ color: "hsl(0 0% 40%)" }}>
              Sin resultados
            </p>
          ) : (
            filtered.map(sib => {
              const SibIcon = sib.icon
              const isCurrent = sib.label === crumb.label
              return (
                <Link
                  key={sib.href}
                  href={sib.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 mx-0.5 rounded-md text-[13px] transition-colors",
                    isCurrent
                      ? "text-[hsl(0_0%_88%)]"
                      : "text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_82%)] hover:bg-[hsl(0_0%_15%)]"
                  )}
                >
                  {SibIcon && (
                    <SibIcon style={{ width: 13, height: 13, flexShrink: 0, color: isCurrent ? "#3ECF8E" : "hsl(0 0% 40%)" }} strokeWidth={1.5} />
                  )}
                  <span className="flex-1 truncate">{sib.label}</span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#3ECF8E" }} />
                  )}
                </Link>
              )
            })
          )}
        </div>

        {/* Footer */}
        {crumb.siblingFooter && (
          <div className="px-2.5 py-2.5" style={{ borderTop: "1px solid hsl(0 0% 18%)" }}>
            <Link
              href={crumb.siblingFooter.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between w-full px-3 py-1.5 rounded-md text-[12px] border transition-colors"
              style={{
                color: "hsl(0 0% 56%)",
                borderColor: "hsl(0 0% 22%)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = "hsl(0 0% 30%)"
                el.style.color = "hsl(0 0% 76%)"
                el.style.backgroundColor = "hsl(0 0% 14%)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = "hsl(0 0% 22%)"
                el.style.color = "hsl(0 0% 56%)"
                el.style.backgroundColor = "transparent"
              }}
            >
              <span>{crumb.siblingFooter.label}</span>
              <ChevronRight style={{ width: 11, height: 11 }} strokeWidth={1.8} />
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

/* ── Actions panel ───────────────────────────────────────────────────────── */

function ActionsPanel({ actions }: { actions: PageAction[] }) {
  const [expanded, setExpanded] = useState(true)

  const TOGGLE_BTN =
    cn(ACTION_BASE, ACTION_VARIANT.ghost, "w-[28px] px-0 justify-center shrink-0")

  return (
    <div className="flex items-center gap-1.5 shrink-0">

      {/* ── Mobile: trigger → dropdown ─────────────────────────────────── */}
      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className={TOGGLE_BTN} title="Acciones">
            <MoreHorizontal style={{ width: 13, height: 13 }} strokeWidth={1.7} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            side="bottom"
            sideOffset={8}
            className="w-44 py-1"
            style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
          >
            {actions.map((action, idx) => {
              const Icon = action.icon
              const isDestructive = action.variant === "destructive"
              return (
                <DropdownMenuItem
                  key={idx}
                  onClick={action.onClick}
                  className="flex items-center gap-2.5 px-3 py-2 mx-0.5 rounded-md text-[13px] cursor-pointer"
                  style={{ color: isDestructive ? "hsl(10 78% 62%)" : "hsl(0 0% 64%)" }}
                >
                  {Icon && <Icon style={{ width: 13, height: 13, flexShrink: 0 }} strokeWidth={1.7} />}
                  <span>{action.label}</span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Desktop: expanded buttons + collapse toggle ─────────────────── */}
      <div className="hidden md:flex items-center gap-1.5">
        {expanded && actions.map((action, idx) => {
          const Icon = action.icon
          const variant = action.variant ?? "ghost"
          return (
            <button
              key={idx}
              onClick={action.onClick}
              className={cn(ACTION_BASE, ACTION_VARIANT[variant])}
            >
              {Icon && <Icon style={{ width: 13, height: 13, flexShrink: 0 }} strokeWidth={1.7} />}
              <span>{action.label}</span>
            </button>
          )
        })}

        <button
          onClick={() => setExpanded(v => !v)}
          className={TOGGLE_BTN}
          title={expanded ? "Colapsar acciones" : "Expandir acciones"}
        >
          {expanded
            ? <ChevronsRight  style={{ width: 13, height: 13 }} strokeWidth={1.7} />
            : <MoreHorizontal style={{ width: 13, height: 13 }} strokeWidth={1.7} />
          }
        </button>
      </div>

    </div>
  )
}

/* ── Component ──────────────────────────────────────────────────────────── */

export function PageHeader({ breadcrumbs, actions = [] }: PageHeaderProps) {
  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between gap-3 px-3 shrink-0"
      style={{
        height: 44,
        backgroundColor: "var(--background-default)",
        borderBottom: "1px solid var(--border-default)",
      }}
    >
      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 min-w-0 overflow-x-auto scrollbar-none">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1
          const hasSiblings = isLast && !!crumb.siblings?.length

          /* ── Current segment (last) with siblings → searchable popover ── */
          if (hasSiblings && crumb.searchable) {
            return (
              <React.Fragment key={idx}>
                <SearchableCrumbPopover crumb={crumb} />
              </React.Fragment>
            )
          }

          /* ── Current segment (last) with siblings → dropdown ──────── */
          if (hasSiblings) {
            return (
              <React.Fragment key={idx}>
                <DropdownMenu>
                  <DropdownMenuTrigger className={CRUMB_ACTIVE_TRIGGER}>
                    <span className="truncate max-w-[160px] sm:max-w-[260px]">{crumb.label}</span>
                    <ChevronDown style={{ width: 11, height: 11, flexShrink: 0 }} strokeWidth={2} />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start" side="bottom" sideOffset={8}
                    className="w-52 py-1"
                    style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
                  >
                    {crumb.siblings!.map((sib) => {
                      const SibIcon = sib.icon
                      const isCurrent = sib.label === crumb.label
                      return (
                        <DropdownMenuItem
                          key={sib.href}
                          className="p-0 mx-0.5"
                          style={{ background: "transparent" }}
                        >
                          <Link
                            href={sib.href}
                            className={cn(
                              SIBLING_ITEM,
                              "w-full transition-colors",
                              isCurrent
                                ? "text-[hsl(0_0%_88%)]"
                                : "text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_82%)]"
                            )}
                          >
                            {SibIcon && (
                              <SibIcon style={{ width: 13, height: 13, flexShrink: 0 }} strokeWidth={1.5} />
                            )}
                            <span className="flex-1 truncate">{sib.label}</span>
                            {isCurrent && (
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: "#3ECF8E" }}
                              />
                            )}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}

                    {/* Footer link */}
                    {crumb.siblingFooter && (
                      <>
                        <div className="mx-2 my-1 h-px" style={{ backgroundColor: "hsl(0 0% 18%)" }} />
                        <DropdownMenuItem className="p-0 mx-0.5" style={{ background: "transparent" }}>
                          <Link
                            href={crumb.siblingFooter.href}
                            className={cn(SIBLING_ITEM, "w-full transition-colors text-[hsl(0_0%_46%)] hover:text-[hsl(0_0%_70%)]")}
                          >
                            <span className="flex-1 text-[12px]">{crumb.siblingFooter.label}</span>
                            <ChevronRight style={{ width: 11, height: 11, flexShrink: 0 }} strokeWidth={1.8} />
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </React.Fragment>
            )
          }

          /* ── Current segment (last) without siblings ──────────────── */
          if (isLast) {
            return (
              <span key={idx} className={CRUMB_ACTIVE}>
                <span className="truncate max-w-[160px] sm:max-w-[260px]">{crumb.label}</span>
              </span>
            )
          }

          /* ── Intermediate segment (link) ──────────────────────────── */
          const CrumbIcon = crumb.icon
          const inner = (
            <span className={CRUMB_INACTIVE}>
              {CrumbIcon
                ? <CrumbIcon style={{ width: 13, height: 13, flexShrink: 0 }} strokeWidth={1.8} />
                : <span className="truncate max-w-[120px]">{crumb.label}</span>
              }
            </span>
          )

          return crumb.href
            ? <Link key={idx} href={crumb.href}>{inner}</Link>
            : <React.Fragment key={idx}>{inner}</React.Fragment>
        })}
      </nav>

      {/* ── Actions ─────────────────────────────────────────────────────── */}
      {actions.length > 0 && <ActionsPanel actions={actions} />}
    </div>
  )
}
