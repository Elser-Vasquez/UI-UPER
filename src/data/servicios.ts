export interface ServicioData {
  id: string
  name: string
  project: string
  type: string
  region: string
  plan: string
  status: string
  contractId: string
  createdAt: string
  updatedAt: string
  description: string
}

export const ALL_SERVICIOS: ServicioData[] = [
  { id: "SVC-001", name: "API Gateway Core",  project: "api-gateway",    type: "API Gateway",       region: "AWS | us-west-2",    plan: "PRO",  status: "active", contractId: "CTR-001", createdAt: "Mar 3, 2025",  updatedAt: "1 hour ago",   description: "Gateway centralizado para los microservicios del ecosistema." },
  { id: "SVC-002", name: "OmniTV Streaming",  project: "omnitv-v4.0.0",  type: "Streaming",         region: "AWS | us-east-1",    plan: "NANO", status: "active", contractId: "CTR-002", createdAt: "Jan 12, 2025", updatedAt: "2 hours ago",  description: "Servicio de streaming principal de la plataforma OmniTV." },
  { id: "SVC-003", name: "Auth & Sessions",   project: "auth-service",   type: "Autenticación",     region: "AWS | sa-east-1",    plan: "NANO", status: "active", contractId: "CTR-003", createdAt: "Feb 19, 2025", updatedAt: "5 hours ago",  description: "Gestión de autenticación y sesiones de usuarios." },
  { id: "SVC-004", name: "CDN Global",        project: "cdn-assets",     type: "CDN",               region: "AWS | us-east-1",    plan: "PRO",  status: "active", contractId: "CTR-004", createdAt: "Apr 1, 2025",  updatedAt: "30 min ago",   description: "Distribución global de activos estáticos y media." },
  { id: "SVC-005", name: "Message Queue",     project: "message-queue",  type: "Cola de mensajes",  region: "AWS | eu-central-1", plan: "TEAM", status: "error",  contractId: "CTR-005", createdAt: "Dec 5, 2024",  updatedAt: "1 hour ago",   description: "Cola de mensajes para procesamiento asíncrono de eventos." },
  { id: "SVC-006", name: "Analytics DB",      project: "analytics-db",   type: "Base de datos",     region: "AWS | eu-west-1",    plan: "FREE", status: "paused", contractId: "CTR-006", createdAt: "Nov 8, 2024",  updatedAt: "3 days ago",   description: "Base de datos de analíticas pendiente de migración." },
  { id: "SVC-007", name: "OmniTV Storage",    project: "omnitv-v4.0.0",  type: "Almacenamiento",    region: "AWS | us-east-1",    plan: "NANO", status: "active", contractId: "CTR-007", createdAt: "Jan 15, 2025", updatedAt: "4 hours ago",  description: "Almacenamiento de assets y media para OmniTV." },
  { id: "SVC-008", name: "Gateway Auth",      project: "api-gateway",    type: "Autenticación",     region: "AWS | us-west-2",    plan: "PRO",  status: "active", contractId: "CTR-008", createdAt: "Mar 10, 2025", updatedAt: "2 days ago",   description: "Capa de autenticación y autorización del API Gateway." },
]

export const SERVICIOS_MAP: Record<string, ServicioData> = Object.fromEntries(
  ALL_SERVICIOS.map(s => [s.id, s])
)

export function getRecentServicioSiblings(count = 5) {
  return ALL_SERVICIOS.slice(-count).map(s => ({
    label: s.name,
    href: `/servicios/${s.id.toLowerCase()}`,
  }))
}
