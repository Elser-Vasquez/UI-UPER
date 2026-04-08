"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function ProjectSettingsPage() {
  return (
    <DashboardLayout orgName="UPER" plan="FREE">

      <div className="flat-surface max-w-[800px] py-8 space-y-6">
        <div>
          <h2 className="text-[18px] font-semibold text-foreground-default">General settings</h2>
          <p className="text-[13px] mt-1 text-foreground-muted">
            Manage your project configuration and preferences.
          </p>
        </div>

        <div className="rounded-lg border border-border-default bg-surface-100 p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-foreground-light">Project name</label>
            <input
              defaultValue="omnitv-v4.0.0"
              className="w-full h-8 px-3 rounded-md text-[13px] bg-surface-200 border border-border-control text-foreground-default placeholder:text-foreground-muted outline-none focus:border-brand/60 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-foreground-light">Region</label>
            <input
              defaultValue="AWS | us-east-1"
              disabled
              className="w-full h-8 px-3 rounded-md text-[13px] bg-surface-200 border border-border-control text-foreground-muted opacity-60 cursor-not-allowed outline-none"
            />
            <p className="text-[11px] text-foreground-muted">Region cannot be changed after project creation.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
