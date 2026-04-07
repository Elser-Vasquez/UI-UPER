export interface ServicioData {
  name: string
  displayName: string
  type: string
  provider: string
  plan: string
  status: string
  cost: string
  createdAt: string
  updatedAt: string
  description: string
}

export const ALL_SERVICIOS: ServicioData[] = [
  {
    name: "streaming-cdn",
    displayName: "Streaming CDN",
    type: "CDN",
    provider: "AWS | us-east-1",
    plan: "PRO",
    status: "active",
    cost: "$120/mo",
    createdAt: "Jan 5, 2025",
    updatedAt: "1 hour ago",
    description: "Red de distribución de contenido para la plataforma OmniTV.",
  },
  {
    name: "storage-s3",
    displayName: "Object Storage",
    type: "Storage",
    provider: "AWS | us-west-2",
    plan: "NANO",
    status: "active",
    cost: "$35/mo",
    createdAt: "Feb 14, 2025",
    updatedAt: "3 hours ago",
    description: "Almacenamiento de objetos para assets estáticos y backups.",
  },
  {
    name: "email-transaccional",
    displayName: "Email Transaccional",
    type: "Email",
    provider: "SES | us-east-1",
    plan: "FREE",
    status: "active",
    cost: "$0/mo",
    createdAt: "Mar 1, 2025",
    updatedAt: "1 day ago",
    description: "Envío de correos transaccionales para notificaciones y alertas.",
  },
  {
    name: "compute-worker",
    displayName: "Compute Worker",
    type: "Compute",
    provider: "AWS | eu-west-1",
    plan: "NANO",
    status: "paused",
    cost: "$45/mo",
    createdAt: "Nov 20, 2024",
    updatedAt: "5 days ago",
    description: "Workers de procesamiento en background para tareas asíncronas.",
  },
  {
    name: "message-queue",
    displayName: "Message Queue",
    type: "Queue",
    provider: "AWS | us-east-1",
    plan: "PRO",
    status: "error",
    cost: "$80/mo",
    createdAt: "Dec 10, 2024",
    updatedAt: "2 days ago",
    description: "Cola de mensajes para comunicación entre microservicios.",
  },
]

export const SERVICIOS_MAP: Record<string, ServicioData> = Object.fromEntries(
  ALL_SERVICIOS.map(s => [s.name, s])
)

export function getRecentServicioSiblings(count = 5) {
  return ALL_SERVICIOS.slice(-count).map(s => ({
    label: s.displayName,
    href: `/servicios/${s.name}`,
  }))
}
