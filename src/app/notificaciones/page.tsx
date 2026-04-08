"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { EmptySection } from "@/components/layout/empty-section"

export default function NotificacionesPage() {
  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <EmptySection title="Notificaciones" />
    </DashboardLayout>
  )
}
