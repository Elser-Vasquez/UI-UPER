import type { ElementType } from "react"
import {
  Download, Plus, Trash2, Settings, Users, Key,
  Bell, ShieldCheck, SlidersHorizontal, Home, FolderKanban,
  Package, FileText,
} from "lucide-react"
import type { BreadcrumbItem, PageAction } from "@/components/layout/page-header"
import { getRecentProjectSiblings } from "@/data/projects"
import { getRecentServicioSiblings } from "@/data/servicios"

export interface PageConfig {
  breadcrumbs: BreadcrumbItem[]
  actions?: PageAction[]
}

/* ── Siblings for project sub-pages ──────────────────────────────────────── */

const PROJECT_OMNITV_SIBLINGS = [
  { label: "Settings", href: "/projects/omnitv/settings", icon: Settings as ElementType },
  { label: "Team",     href: "/projects/omnitv/team",     icon: Users as ElementType },
  { label: "API Keys", href: "/projects/omnitv/api",      icon: Key as ElementType },
]

/* ── Route config map ─────────────────────────────────────────────────────
   Keys are exact paths. The lookup falls back to longest-prefix match.
   ──────────────────────────────────────────────────────────────────────── */

const CONFIG: Record<string, PageConfig> = {
  "/": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Dashboard" }],
    actions: [
      { label: "Export", icon: Download as ElementType, variant: "ghost", iconOnly: true },
    ],
  },

  "/projects": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Proyectos" }],
    actions: [
      { label: "Export",         icon: Download as ElementType, variant: "ghost", iconOnly: true },
      { label: "Nuevo proyecto", icon: Plus as ElementType,     variant: "primary" },
    ],
  },

  "/projects/omnitv/settings": {
    breadcrumbs: [
      { label: "Proyectos",     href: "/projects" },
      { label: "omnitv-v4.0.0", href: "/projects/omnitv/settings" },
      { label: "Settings",      siblings: PROJECT_OMNITV_SIBLINGS },
    ],
    actions: [
      { label: "Delete project", icon: Trash2 as ElementType, variant: "destructive", iconOnly: true },
      { label: "Save changes",   variant: "primary" },
    ],
  },

  "/servicios": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Servicios" }],
    actions: [
      { label: "Nuevo servicio", icon: Plus as ElementType, variant: "primary" },
    ],
  },

  "/contratos": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Contratos" }],
    actions: [
      { label: "Nuevo contrato", icon: Plus as ElementType, variant: "primary" },
    ],
  },

  "/facturas": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Facturas" }],
    actions: [
      { label: "Nueva factura", icon: Plus as ElementType, variant: "primary" },
    ],
  },

  "/pagos": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Pagos" }],
    actions: [
      { label: "Registrar pago", icon: Plus as ElementType, variant: "primary" },
    ],
  },

  "/notificaciones": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Notificaciones" }],
    actions: [
      { label: "Marcar todo leído", icon: Bell as ElementType, variant: "ghost" },
    ],
  },

  "/auditoria": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Auditoría" }],
    actions: [
      { label: "Exportar log", icon: Download as ElementType, variant: "ghost" },
    ],
  },

  "/configuracion": {
    breadcrumbs: [{ label: "Home", icon: Home as ElementType, href: "/" }, { label: "Configuración" }],
    actions: [
      { label: "Guardar cambios", icon: SlidersHorizontal as ElementType, variant: "primary" },
    ],
  },
}

/* ── Lookup ───────────────────────────────────────────────────────────────── */

export function getPageConfig(pathname: string): PageConfig {
  // 1. Exact match
  if (CONFIG[pathname]) return CONFIG[pathname]

  // 2. Dynamic: /projects/[slug]  (single level, not /projects/xxx/yyy)
  const projectSlug = pathname.match(/^\/projects\/([^/]+)$/)
  if (projectSlug) {
    const slug = decodeURIComponent(projectSlug[1])
    return {
      breadcrumbs: [
        { label: "Home",      icon: Home as ElementType, href: "/" },
        { label: "Proyectos", href: "/projects" },
        {
          label: slug,
          searchable: true,
          siblings: getRecentProjectSiblings(5).map(s => ({
            ...s,
            icon: FolderKanban as ElementType,
          })),
          siblingFooter: { label: "Ver todos los proyectos", href: "/projects" },
        },
      ],
      actions: [
        { label: "Configuración", icon: Settings as ElementType, variant: "ghost" },
        { label: "Eliminar",      icon: Trash2 as ElementType,   variant: "destructive", iconOnly: true },
      ],
    }
  }

  // 2b. Dynamic: /servicios/[slug]
  const servicioSlug = pathname.match(/^\/servicios\/([^/]+)$/)
  if (servicioSlug) {
    const slug = decodeURIComponent(servicioSlug[1])
    return {
      breadcrumbs: [
        { label: "Home",      icon: Home as ElementType,    href: "/" },
        { label: "Servicios", href: "/servicios" },
        {
          label: slug,
          searchable: true,
          siblings: getRecentServicioSiblings(5).map(s => ({
            ...s,
            icon: Package as ElementType,
          })),
          siblingFooter: { label: "Ver todos los servicios", href: "/servicios" },
        },
      ],
      actions: [
        { label: "Configuración", icon: Settings as ElementType,  variant: "ghost" as const },
        { label: "Eliminar",      icon: Trash2 as ElementType,    variant: "destructive" as const, iconOnly: true },
      ],
    }
  }

  // 2c. Dynamic: /contratos/[slug]
  const contratoSlug = pathname.match(/^\/contratos\/([^/]+)$/)
  if (contratoSlug) {
    const slug = decodeURIComponent(contratoSlug[1]).toUpperCase()
    return {
      breadcrumbs: [
        { label: "Home",      icon: Home as ElementType, href: "/" },
        { label: "Contratos", href: "/contratos" },
        { label: slug },
      ],
      actions: [
        { label: "Descargar PDF", icon: Download as ElementType,  variant: "ghost" as const },
        { label: "Eliminar",      icon: Trash2 as ElementType,    variant: "destructive" as const, iconOnly: true },
      ],
    }
  }

  // 3. Longest prefix match (excludes "/")
  const match = Object.keys(CONFIG)
    .filter(k => k !== "/" && pathname.startsWith(k + "/"))
    .sort((a, b) => b.length - a.length)[0]

  return match ? CONFIG[match] : { breadcrumbs: [] }
}
