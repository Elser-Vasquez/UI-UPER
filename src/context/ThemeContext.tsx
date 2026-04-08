"use client"

import {
  createContext, useContext, useEffect, useState, useCallback,
  type ReactNode,
} from "react"
import {
  THEME_DEFAULTS, LS_SCHEME, LS_VARS, applyTheme,
  type ThemeConfig, type ThemeScheme, type ThemeAccent,
  type ThemeRadius, type ThemeFontScale,
} from "@/lib/theme"

// ── Context shape ──────────────────────────────────────────────────────────

interface ThemeContextValue {
  config:         ThemeConfig
  resolvedScheme: "dark" | "light"
  setScheme:      (s: ThemeScheme)    => void
  setAccent:      (a: ThemeAccent)    => void
  setRadius:      (r: ThemeRadius)    => void
  setFontScale:   (f: ThemeFontScale) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ── Helpers ────────────────────────────────────────────────────────────────

function resolveScheme(scheme: ThemeScheme): "dark" | "light" {
  if (scheme !== "system") return scheme
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function loadConfig(): ThemeConfig {
  if (typeof window === "undefined") return THEME_DEFAULTS
  try {
    const scheme = (localStorage.getItem(LS_SCHEME) as ThemeScheme) ?? THEME_DEFAULTS.scheme
    const raw = localStorage.getItem(LS_VARS)
    const rest = raw ? JSON.parse(raw) : {}
    return {
      scheme,
      accent:    rest.accent    ?? THEME_DEFAULTS.accent,
      radius:    rest.radius    ?? THEME_DEFAULTS.radius,
      fontScale: rest.fontScale ?? THEME_DEFAULTS.fontScale,
    }
  } catch {
    return THEME_DEFAULTS
  }
}

function saveConfig(config: ThemeConfig) {
  try {
    localStorage.setItem(LS_SCHEME, config.scheme)
    localStorage.setItem(LS_VARS, JSON.stringify({
      accent:    config.accent,
      radius:    config.radius,
      fontScale: config.fontScale,
    }))
  } catch { /* private browsing */ }
}

// ── Provider ───────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Server renders with THEME_DEFAULTS (dark/emerald/md/md) — the anti-flash
  // script has already applied the correct state to the DOM before hydration,
  // so there is no visual mismatch even if the stored config differs.
  const [config, setConfig] = useState<ThemeConfig>(THEME_DEFAULTS)
  const [mounted, setMounted] = useState(false)

  const resolvedScheme = resolveScheme(config.scheme)

  useEffect(() => {
    const loaded = loadConfig()
    setConfig(loaded)
    setMounted(true)

    // Listen for system preference changes when scheme === "system"
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      setConfig(prev => {
        if (prev.scheme === "system") {
          applyTheme(prev, resolveScheme("system"))
        }
        return prev
      })
    }
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyTheme(config, resolveScheme(config.scheme))
    saveConfig(config)
  }, [config, mounted])

  const setScheme    = useCallback((scheme: ThemeScheme)       => setConfig(p => ({ ...p, scheme })),    [])
  const setAccent    = useCallback((accent: ThemeAccent)       => setConfig(p => ({ ...p, accent })),    [])
  const setRadius    = useCallback((radius: ThemeRadius)       => setConfig(p => ({ ...p, radius })),    [])
  const setFontScale = useCallback((fontScale: ThemeFontScale) => setConfig(p => ({ ...p, fontScale })), [])

  return (
    <ThemeContext.Provider value={{ config, resolvedScheme, setScheme, setAccent, setRadius, setFontScale }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
  return ctx
}
