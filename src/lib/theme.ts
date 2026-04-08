export type ThemeScheme   = "dark" | "light" | "system"
export type ThemeAccent   = "emerald" | "blue" | "violet" | "amber" | "rose" | "cyan"
export type ThemeRadius   = "none" | "sm" | "md" | "lg"
export type ThemeFontScale = "sm" | "md" | "lg"

export interface ThemeConfig {
  scheme:    ThemeScheme
  accent:    ThemeAccent
  radius:    ThemeRadius
  fontScale: ThemeFontScale
}

export const THEME_DEFAULTS: ThemeConfig = {
  scheme:    "dark",
  accent:    "emerald",
  radius:    "md",
  fontScale: "md",
}

export const LS_SCHEME = "theme-scheme"
export const LS_VARS   = "theme-vars"

// ── Accent presets ─────────────────────────────────────────────────────────
// "emerald" values are byte-for-byte identical to globals.css — no visual
// change on first load with default settings.

export interface AccentPreset {
  label:           string
  swatch:          string
  brand:           string
  brandForeground: string
  brand200:        string
  brand300:        string
  brand400:        string
  brand500:        string
  brand600:        string
  chart1:          string
}

export const ACCENT_PRESETS: Record<ThemeAccent, AccentPreset> = {
  emerald: {
    label:           "Esmeralda",
    swatch:          "hsl(152.9 60% 52.9%)",
    brand:           "hsl(152.9 60% 52.9%)",
    brandForeground: "hsl(0 0% 100%)",
    brand200:        "hsl(147.6 72.5% 90%)",
    brand300:        "hsl(147.5 72% 80.4%)",
    brand400:        "hsl(151.3 66.9% 66.9%)",
    brand500:        "hsl(153.5 61.8% 21.6%)",
    brand600:        "hsl(153 59.5% 70%)",
    chart1:          "hsl(152.9 60% 52.9%)",
  },
  blue: {
    label:           "Azul",
    swatch:          "hsl(217 91% 60%)",
    brand:           "hsl(217 91% 60%)",
    brandForeground: "hsl(0 0% 100%)",
    brand200:        "hsl(214 95% 93%)",
    brand300:        "hsl(213 97% 87%)",
    brand400:        "hsl(216 94% 74%)",
    brand500:        "hsl(217 75% 20%)",
    brand600:        "hsl(215 90% 72%)",
    chart1:          "hsl(217 91% 60%)",
  },
  violet: {
    label:           "Violeta",
    swatch:          "hsl(263 70% 62%)",
    brand:           "hsl(263 70% 62%)",
    brandForeground: "hsl(0 0% 100%)",
    brand200:        "hsl(261 80% 93%)",
    brand300:        "hsl(260 75% 86%)",
    brand400:        "hsl(262 68% 72%)",
    brand500:        "hsl(264 60% 22%)",
    brand600:        "hsl(262 68% 75%)",
    chart1:          "hsl(263 70% 62%)",
  },
  amber: {
    label:           "Ámbar",
    swatch:          "hsl(38 95% 55%)",
    brand:           "hsl(38 95% 55%)",
    brandForeground: "hsl(0 0% 8%)",
    brand200:        "hsl(45 100% 92%)",
    brand300:        "hsl(43 100% 84%)",
    brand400:        "hsl(40 96% 68%)",
    brand500:        "hsl(38 78% 20%)",
    brand600:        "hsl(38 94% 68%)",
    chart1:          "hsl(38 95% 55%)",
  },
  rose: {
    label:           "Rosa",
    swatch:          "hsl(345 82% 62%)",
    brand:           "hsl(345 82% 62%)",
    brandForeground: "hsl(0 0% 100%)",
    brand200:        "hsl(350 90% 93%)",
    brand300:        "hsl(348 88% 86%)",
    brand400:        "hsl(346 82% 72%)",
    brand500:        "hsl(345 65% 22%)",
    brand600:        "hsl(344 82% 73%)",
    chart1:          "hsl(345 82% 62%)",
  },
  cyan: {
    label:           "Cian",
    swatch:          "hsl(189 94% 48%)",
    brand:           "hsl(189 94% 48%)",
    brandForeground: "hsl(0 0% 8%)",
    brand200:        "hsl(186 96% 90%)",
    brand300:        "hsl(187 96% 82%)",
    brand400:        "hsl(188 90% 63%)",
    brand500:        "hsl(189 72% 18%)",
    brand600:        "hsl(188 88% 62%)",
    chart1:          "hsl(189 94% 48%)",
  },
}

// ── Radius presets ────────────────────────────────────────────────────────
// "md" exactly reproduces current globals.css --radius-* values.

export interface RadiusPreset {
  label:    string
  xs:       string
  sm:       string
  md:       string
  lg:       string
  xl:       string
  shadcn:   string
}

export const RADIUS_PRESETS: Record<ThemeRadius, RadiusPreset> = {
  none: { label: "Sin radio",  xs: "0px",  sm: "0px",  md: "0px",  lg: "0px",  xl: "0px",  shadcn: "0rem"     },
  sm:   { label: "Pequeño",    xs: "1px",  sm: "2px",  md: "4px",  lg: "6px",  xl: "10px", shadcn: "0.25rem"  },
  md:   { label: "Mediano",    xs: "2px",  sm: "4px",  md: "6px",  lg: "8px",  xl: "16px", shadcn: "0.375rem" },
  lg:   { label: "Grande",     xs: "4px",  sm: "6px",  md: "10px", lg: "14px", xl: "24px", shadcn: "0.625rem" },
}

// ── Font scale ────────────────────────────────────────────────────────────
// 14px is the current value from globals.css.

export const FONT_SCALE_VALUES: Record<ThemeFontScale, string> = {
  sm: "12px",
  md: "14px",
  lg: "16px",
}

export const FONT_SCALE_LABELS: Record<ThemeFontScale, string> = {
  sm: "Pequeña",
  md: "Normal",
  lg: "Grande",
}

// ── applyTheme ────────────────────────────────────────────────────────────
// Pure DOM-mutating function. Sets CSS custom properties on documentElement
// and manages the dark/light class. Called from ThemeContext on every change.

export function applyTheme(config: ThemeConfig, resolvedScheme: "dark" | "light") {
  const root = document.documentElement
  const accent = ACCENT_PRESETS[config.accent]
  const radius = RADIUS_PRESETS[config.radius]

  // Color scheme class
  if (resolvedScheme === "dark") {
    root.classList.add("dark")
    root.classList.remove("light")
  } else {
    root.classList.add("light")
    root.classList.remove("dark")
  }

  // Accent
  root.style.setProperty("--brand",            accent.brand)
  root.style.setProperty("--brand-foreground", accent.brandForeground)
  root.style.setProperty("--brand-200",        accent.brand200)
  root.style.setProperty("--brand-300",        accent.brand300)
  root.style.setProperty("--brand-400",        accent.brand400)
  root.style.setProperty("--brand-500",        accent.brand500)
  root.style.setProperty("--brand-600",        accent.brand600)
  root.style.setProperty("--chart-1",          accent.chart1)

  // Radius
  root.style.setProperty("--radius-xs", radius.xs)
  root.style.setProperty("--radius-sm", radius.sm)
  root.style.setProperty("--radius-md", radius.md)
  root.style.setProperty("--radius-lg", radius.lg)
  root.style.setProperty("--radius-xl", radius.xl)
  root.style.setProperty("--radius",    radius.shadcn)

  // Font scale
  root.style.fontSize = FONT_SCALE_VALUES[config.fontScale]
}
