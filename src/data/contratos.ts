export type BillingType = "mensual" | "anual"
export type ContratoStatus = "active" | "paused" | "error" | "expiring"

export interface ContratoData {
  id: string
  serviceId: string
  serviceName: string
  client: string
  billing: BillingType
  amount: number
  currency: string
  status: ContratoStatus
  startDate: string
  endDate: string
  nextBilling: string
}

export const ALL_CONTRATOS: ContratoData[] = [
  { id: "CTR-001", serviceId: "SVC-001", serviceName: "API Gateway Core", client: "OmniTV S.A.",   billing: "mensual", amount: 1200,  currency: "USD", status: "active",   startDate: "Mar 3, 2025",  endDate: "Mar 3, 2026",  nextBilling: "Jun 3, 2025"  },
  { id: "CTR-002", serviceId: "SVC-002", serviceName: "OmniTV Streaming",  client: "OmniTV S.A.",   billing: "anual",   amount: 8400,  currency: "USD", status: "active",   startDate: "Jan 12, 2025", endDate: "Jan 12, 2026", nextBilling: "Jan 12, 2026" },
  { id: "CTR-003", serviceId: "SVC-003", serviceName: "Auth & Sessions",   client: "Nexus Corp",    billing: "mensual", amount: 600,   currency: "USD", status: "active",   startDate: "Feb 19, 2025", endDate: "Feb 19, 2026", nextBilling: "Jun 19, 2025" },
  { id: "CTR-004", serviceId: "SVC-004", serviceName: "CDN Global",        client: "MediaFlow Ltd", billing: "anual",   amount: 14400, currency: "USD", status: "active",   startDate: "Apr 1, 2025",  endDate: "Apr 1, 2026",  nextBilling: "Apr 1, 2026"  },
  { id: "CTR-005", serviceId: "SVC-005", serviceName: "Message Queue",     client: "DataSync Inc",  billing: "mensual", amount: 900,   currency: "USD", status: "error",    startDate: "Dec 5, 2024",  endDate: "Dec 5, 2025",  nextBilling: "Jun 5, 2025"  },
  { id: "CTR-006", serviceId: "SVC-006", serviceName: "Analytics DB",      client: "OmniTV S.A.",   billing: "mensual", amount: 400,   currency: "USD", status: "paused",   startDate: "Nov 8, 2024",  endDate: "Nov 8, 2025",  nextBilling: "—"            },
  { id: "CTR-007", serviceId: "SVC-007", serviceName: "OmniTV Storage",    client: "OmniTV S.A.",   billing: "anual",   amount: 3600,  currency: "USD", status: "active",   startDate: "Jan 15, 2025", endDate: "Jan 15, 2026", nextBilling: "Jan 15, 2026" },
  { id: "CTR-008", serviceId: "SVC-008", serviceName: "Gateway Auth",      client: "Nexus Corp",    billing: "mensual", amount: 800,   currency: "USD", status: "expiring", startDate: "Apr 10, 2024", endDate: "Apr 17, 2025", nextBilling: "Apr 17, 2025" },
]

export const CONTRATOS_MAP: Record<string, ContratoData> = Object.fromEntries(
  ALL_CONTRATOS.map(c => [c.id, c])
)
