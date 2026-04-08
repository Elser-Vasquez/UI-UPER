import { Layers } from "lucide-react"

interface EmptySectionProps {
  title: string
  description?: string
}

export function EmptySection({
  title,
  description = "Esta sección está pendiente de desarrollo.",
}: EmptySectionProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh] gap-4 text-center px-6 select-none">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl"
        style={{
          backgroundColor: "var(--surface-200)",
          border: "1px solid var(--border-default)",
        }}
      >
        <Layers
          style={{ width: 20, height: 20, color: "var(--foreground-lighter)" }}
          strokeWidth={1.5}
        />
      </div>

      <div className="space-y-1">
        <p
          className="text-[14px] font-semibold"
          style={{ color: "var(--foreground-default)" }}
        >
          {title}
        </p>
        <p
          className="text-[13px]"
          style={{ color: "var(--foreground-muted)" }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
