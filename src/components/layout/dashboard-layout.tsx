"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import { MobileSidebar } from "./mobile-sidebar"
import { Topbar } from "./topbar"
import { PageHeader } from "./page-header"
import { getPageConfig } from "@/lib/page-config"

interface DashboardLayoutProps {
  children: React.ReactNode
  orgName?: string
  plan?: string
}

export function DashboardLayout({ children, orgName, plan }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("sidebar-collapsed") === "true"
      : false
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleToggle() {
    setCollapsed(v => {
      const next = !v
      localStorage.setItem("sidebar-collapsed", String(next))
      return next
    })
  }
  const pathname = usePathname()
  const { breadcrumbs, actions } = getPageConfig(pathname)

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* ── Desktop sidebar — full height left column ── */}
      <div className="hidden md:flex shrink-0 h-full">
        <AppSidebar
          collapsed={collapsed}
          onToggle={handleToggle}
          orgName={orgName}
          plan={plan}
        />
      </div>

      {/* ── Mobile sidebar — Sheet drawer ── */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        orgName={orgName}
        plan={plan}
      />

      {/* ── Right column: topbar + page header + content ── */}
      <div className="flex flex-col flex-1 min-h-0 min-w-0 overflow-x-hidden">
        <Topbar onMobileMenuClick={() => setMobileOpen(true)} orgName={orgName} plan={plan} />
        <PageHeader breadcrumbs={breadcrumbs} actions={actions} />
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden px-6 md:px-10"
          style={{ backgroundColor: "var(--background-default)" }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
