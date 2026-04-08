"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useTheme } from "@/context/ThemeContext"
import {
  ACCENT_PRESETS, RADIUS_PRESETS, FONT_SCALE_LABELS,
  type ThemeScheme, type ThemeAccent, type ThemeRadius, type ThemeFontScale,
} from "@/lib/theme"
import { Check, Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

/* ── Section wrapper ──────────────────────────────────────────────────────── */

function Section({ title, description, children }: {
  title: string; description: string; children: React.ReactNode
}) {
  return (
    <div
      className="rounded-lg border p-6 flex flex-col gap-5"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      <div>
        <p className="text-[13px] font-semibold" style={{ color: "var(--foreground-default)" }}>{title}</p>
        <p className="text-[12px] mt-0.5" style={{ color: "var(--foreground-muted)" }}>{description}</p>
      </div>
      {children}
    </div>
  )
}

/* ── Scheme picker ────────────────────────────────────────────────────────── */

const SCHEME_OPTIONS: { value: ThemeScheme; label: string; Icon: React.ElementType }[] = [
  { value: "dark",   label: "Oscuro",  Icon: Moon    },
  { value: "light",  label: "Claro",   Icon: Sun     },
  { value: "system", label: "Sistema", Icon: Monitor },
]

function SchemePicker() {
  const { config, setScheme } = useTheme()
  return (
    <div className="flex gap-2 flex-wrap">
      {SCHEME_OPTIONS.map(({ value, label, Icon }) => {
        const active = config.scheme === value
        return (
          <button
            key={value}
            onClick={() => setScheme(value)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-md border text-[13px] transition-colors cursor-pointer"
            style={{
              borderColor: active ? "var(--brand)" : "var(--border-default)",
              color: active ? "var(--brand)" : "var(--foreground-lighter)",
              backgroundColor: active
                ? "color-mix(in srgb, var(--brand) 10%, transparent)"
                : "transparent",
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-strong)"
                e.currentTarget.style.color = "var(--foreground-light)"
                e.currentTarget.style.backgroundColor = "var(--surface-200)"
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-default)"
                e.currentTarget.style.color = "var(--foreground-lighter)"
                e.currentTarget.style.backgroundColor = "transparent"
              }
            }}
          >
            <Icon style={{ width: 14, height: 14, flexShrink: 0 }} strokeWidth={1.6} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Accent picker ────────────────────────────────────────────────────────── */

function AccentPicker() {
  const { config, setAccent } = useTheme()
  return (
    <div className="flex gap-2.5 flex-wrap">
      {(Object.entries(ACCENT_PRESETS) as [ThemeAccent, typeof ACCENT_PRESETS[ThemeAccent]][]).map(([key, preset]) => {
        const active = config.accent === key
        return (
          <button
            key={key}
            onClick={() => setAccent(key)}
            title={preset.label}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md border text-[12px] transition-colors cursor-pointer"
            style={{
              borderColor: active ? "var(--brand)" : "var(--border-default)",
              color: active ? "var(--foreground-default)" : "var(--foreground-lighter)",
              backgroundColor: active
                ? "color-mix(in srgb, var(--brand) 10%, transparent)"
                : "transparent",
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-strong)"
                e.currentTarget.style.color = "var(--foreground-light)"
                e.currentTarget.style.backgroundColor = "var(--surface-200)"
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-default)"
                e.currentTarget.style.color = "var(--foreground-lighter)"
                e.currentTarget.style.backgroundColor = "transparent"
              }
            }}
          >
            {/* Color swatch with checkmark when active */}
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center"
              style={{ backgroundColor: preset.swatch }}
            >
              {active && (
                <Check style={{ width: 8, height: 8, color: preset.brandForeground }} strokeWidth={3} />
              )}
            </span>
            {preset.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Radius picker ────────────────────────────────────────────────────────── */

const RADIUS_KEYS: ThemeRadius[] = ["none", "sm", "md", "lg"]

// Static px values just for the visual preview box (not the actual CSS vars)
const RADIUS_PREVIEW_PX: Record<ThemeRadius, string> = {
  none: "0px", sm: "4px", md: "8px", lg: "14px",
}

function RadiusPicker() {
  const { config, setRadius } = useTheme()
  return (
    <div className="flex gap-3 flex-wrap">
      {RADIUS_KEYS.map(key => {
        const active = config.radius === key
        return (
          <button
            key={key}
            onClick={() => setRadius(key)}
            className="flex flex-col items-center gap-2.5 px-4 py-3 rounded-md border text-[12px] transition-colors cursor-pointer"
            style={{
              borderColor: active ? "var(--brand)" : "var(--border-default)",
              color: active ? "var(--foreground-default)" : "var(--foreground-lighter)",
              backgroundColor: active
                ? "color-mix(in srgb, var(--brand) 10%, transparent)"
                : "transparent",
              minWidth: 76,
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-strong)"
                e.currentTarget.style.color = "var(--foreground-light)"
                e.currentTarget.style.backgroundColor = "var(--surface-200)"
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-default)"
                e.currentTarget.style.color = "var(--foreground-lighter)"
                e.currentTarget.style.backgroundColor = "transparent"
              }
            }}
          >
            <div
              className="w-9 h-9 border-2"
              style={{
                borderRadius: RADIUS_PREVIEW_PX[key],
                borderColor: active ? "var(--brand)" : "var(--border-strong)",
              }}
            />
            {RADIUS_PRESETS[key].label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Font scale picker ────────────────────────────────────────────────────── */

const FONT_SCALE_KEYS: ThemeFontScale[] = ["sm", "md", "lg"]
const FONT_PREVIEW_SIZE: Record<ThemeFontScale, number> = { sm: 12, md: 15, lg: 19 }

function FontScalePicker() {
  const { config, setFontScale } = useTheme()
  return (
    <div className="flex gap-2.5 flex-wrap">
      {FONT_SCALE_KEYS.map(key => {
        const active = config.fontScale === key
        return (
          <button
            key={key}
            onClick={() => setFontScale(key)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-md border text-[13px] transition-colors cursor-pointer"
            style={{
              borderColor: active ? "var(--brand)" : "var(--border-default)",
              color: active ? "var(--brand)" : "var(--foreground-lighter)",
              backgroundColor: active
                ? "color-mix(in srgb, var(--brand) 10%, transparent)"
                : "transparent",
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-strong)"
                e.currentTarget.style.color = "var(--foreground-light)"
                e.currentTarget.style.backgroundColor = "var(--surface-200)"
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.borderColor = "var(--border-default)"
                e.currentTarget.style.color = "var(--foreground-lighter)"
                e.currentTarget.style.backgroundColor = "transparent"
              }
            }}
          >
            <span
              className="font-semibold leading-none"
              style={{ fontSize: FONT_PREVIEW_SIZE[key] }}
            >
              Aa
            </span>
            {FONT_SCALE_LABELS[key]}
          </button>
        )
      })}
    </div>
  )
}

/* ── Live preview ─────────────────────────────────────────────────────────── */

function LivePreview() {
  return (
    <div
      className="rounded-lg border p-6 flex flex-col gap-4"
      style={{ borderColor: "var(--border-default)", backgroundColor: "var(--surface-100)" }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: "var(--foreground-muted)" }}
      >
        Vista previa en vivo
      </p>

      <div className="flex flex-wrap items-start gap-8">

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>Botones</p>
          <div className="flex gap-2 flex-wrap items-center">
            <button
              className="inline-flex items-center px-3 py-1.5 text-[12px] font-medium transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--brand)",
                color: "var(--brand-foreground)",
                borderRadius: "var(--radius-md)",
                border: "none",
              }}
            >
              Primario
            </button>
            <button
              className="inline-flex items-center px-3 py-1.5 text-[12px] font-medium"
              style={{
                backgroundColor: "transparent",
                color: "var(--foreground-light)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
              }}
            >
              Secundario
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>Badges</p>
          <div className="flex gap-2 flex-wrap items-center">
            <span
              className="inline-flex items-center px-2 py-[2px] text-[10px] font-semibold tracking-widest uppercase"
              style={{
                color: "var(--brand)",
                backgroundColor: "color-mix(in srgb, var(--brand) 12%, transparent)",
                border: "1px solid color-mix(in srgb, var(--brand) 30%, transparent)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              ACTIVO
            </span>
            <span
              className="inline-flex items-center px-2 py-[2px] text-[10px] font-semibold tracking-widest uppercase"
              style={{
                color: "var(--foreground-lighter)",
                backgroundColor: "var(--surface-300)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              PAUSADO
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>Tarjeta</p>
          <div
            className="p-4 flex flex-col gap-2"
            style={{
              backgroundColor: "var(--surface-200)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              minWidth: 180,
            }}
          >
            <div
              className="w-7 h-7 flex items-center justify-center text-[14px]"
              style={{
                backgroundColor: "color-mix(in srgb, var(--brand) 14%, transparent)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <span style={{ color: "var(--brand)" }}>✦</span>
            </div>
            <p className="text-[13px] font-medium" style={{ color: "var(--foreground-default)" }}>Componente</p>
            <p className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>Vista previa del tema actual</p>
          </div>
        </div>

        {/* Input with focus ring */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px]" style={{ color: "var(--foreground-muted)" }}>Input (foco)</p>
          <input
            readOnly
            defaultValue="texto de ejemplo"
            className="px-3 py-1.5 text-[12px] outline-none"
            style={{
              backgroundColor: "var(--background-control)",
              border: "1px solid var(--brand)",
              borderRadius: "var(--radius-md)",
              color: "var(--foreground-default)",
              width: 172,
              boxShadow: "0 0 0 3px color-mix(in srgb, var(--brand) 18%, transparent)",
            }}
          />
        </div>

      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function TemaPage() {
  return (
    <DashboardLayout orgName="UPER" plan="FREE">
      <div className="max-w-[860px] py-6 space-y-4">

        <LivePreview />

        <Section
          title="Esquema de color"
          description="Elige entre modo oscuro, claro, o el del sistema operativo."
        >
          <SchemePicker />
        </Section>

        <Section
          title="Color de acento"
          description="Color principal de la plataforma: botones, anillos de foco y badges de estado."
        >
          <AccentPicker />
        </Section>

        <Section
          title="Radio de bordes"
          description="Redondeo de esquinas en cards, inputs y botones de toda la plataforma."
        >
          <RadiusPicker />
        </Section>

        <Section
          title="Escala de fuente"
          description="Tamaño base del texto en toda la plataforma."
        >
          <FontScalePicker />
        </Section>

      </div>
    </DashboardLayout>
  )
}
