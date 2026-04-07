export interface ProjectData {
  name: string
  region: string
  plan: string
  status: string
  createdAt: string
  updatedAt: string
  description: string
}

export const ALL_PROJECTS: ProjectData[] = [
  {
    name: "omnitv-v4.0.0",
    region: "AWS | us-east-1",
    plan: "NANO",
    status: "active",
    createdAt: "Jan 12, 2025",
    updatedAt: "2 hours ago",
    description: "Plataforma de streaming OmniTV en producción, versión 4.0.0.",
  },
  {
    name: "api-gateway",
    region: "AWS | us-west-2",
    plan: "PRO",
    status: "active",
    createdAt: "Mar 3, 2025",
    updatedAt: "1 day ago",
    description: "Gateway centralizado para los microservicios del ecosistema.",
  },
  {
    name: "analytics-db",
    region: "AWS | eu-west-1",
    plan: "FREE",
    status: "paused",
    createdAt: "Nov 8, 2024",
    updatedAt: "3 days ago",
    description: "Base de datos de analíticas pausada pendiente de migración.",
  },
]

export const PROJECTS_MAP: Record<string, ProjectData> = Object.fromEntries(
  ALL_PROJECTS.map(p => [p.name, p])
)

/** Returns the N most recent projects as breadcrumb siblings */
export function getRecentProjectSiblings(count = 5) {
  return ALL_PROJECTS.slice(-count).map(p => ({
    label: p.name,
    href: `/projects/${p.name}`,
  }))
}
