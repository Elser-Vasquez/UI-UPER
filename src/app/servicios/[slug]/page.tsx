"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { EmptySection } from "@/components/layout/empty-section"

export default function ServicioDetailPage() {
  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <EmptySection title="Detalle de servicio" />
    </DashboardLayout>
  )
}
