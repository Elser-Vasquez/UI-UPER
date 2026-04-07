"use client"

import { FolderKanban, Plus, ArrowRight } from "lucide-react"

interface ProjectsEmptyStateProps {
  onCreateProject?: () => void
}

export function ProjectsEmptyState({ onCreateProject }: ProjectsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center select-none">

      {/* Icon cluster */}
      <div className="relative mb-6">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-20"
          style={{ backgroundColor: "#3ECF8E", transform: "scale(1.6)" }}
        />
        {/* Outer ring */}
        <div
          className="relative flex items-center justify-center w-16 h-16 rounded-2xl"
          style={{
            backgroundColor: "hsl(0 0% 12%)",
            border: "1px solid hsl(0 0% 22%)",
          }}
        >
          <FolderKanban
            style={{ width: 28, height: 28, color: "hsl(0 0% 46%)" }}
            strokeWidth={1.3}
          />
        </div>
      </div>

      {/* Copy */}
      <p
        className="text-[16px] font-semibold leading-snug mb-1.5"
        style={{ color: "hsl(0 0% 88%)" }}
      >
        No tienes proyectos aún
      </p>
      <p
        className="text-[13px] max-w-[280px] leading-relaxed mb-7"
        style={{ color: "hsl(0 0% 44%)" }}
      >
        Crea tu primer proyecto y empieza a gestionar tus servicios, contratos y pagos desde un solo lugar.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={onCreateProject}
          className="inline-flex items-center gap-1.5 h-8 px-4 rounded-md text-[13px] font-medium leading-none cursor-pointer transition-colors border-0"
          style={{ backgroundColor: "#3ECF8E", color: "#000" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#34be7e")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3ECF8E")}
        >
          <Plus style={{ width: 13, height: 13 }} strokeWidth={2} />
          Crear proyecto
        </button>

        <button
          className="inline-flex items-center gap-1 h-8 px-3 rounded-md text-[13px] leading-none cursor-pointer transition-colors border-0 bg-transparent"
          style={{ color: "hsl(0 0% 46%)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "hsl(0 0% 72%)")}
          onMouseLeave={e => (e.currentTarget.style.color = "hsl(0 0% 46%)")}
        >
          Ver documentación
          <ArrowRight style={{ width: 12, height: 12 }} strokeWidth={1.8} />
        </button>
      </div>

    </div>
  )
}
