"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { EmptySection } from "@/components/layout/empty-section"

export default function ContratoDetailPage() {
  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <EmptySection title="Detalle de contrato" />
    </DashboardLayout>
  )
}
