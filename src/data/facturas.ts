export type FacturaStatus = "paid" | "pending" | "overdue" | "draft"

export interface FacturaData {
  id: string
  contractId: string
  client: string
  serviceName: string
  period: string
  amount: number
  currency: string
  status: FacturaStatus
  issuedAt: string
  dueAt: string
}

export const ALL_FACTURAS: FacturaData[] = [
  // CTR-001 — API Gateway Core / OmniTV S.A. — mensual $1,200
  { id: "INV-001", contractId: "CTR-001", client: "OmniTV S.A.",   serviceName: "API Gateway Core", period: "Jun 2025",      amount: 1200,  currency: "USD", status: "pending", issuedAt: "Jun 1, 2025",  dueAt: "Jun 15, 2025"  },
  { id: "INV-002", contractId: "CTR-001", client: "OmniTV S.A.",   serviceName: "API Gateway Core", period: "May 2025",      amount: 1200,  currency: "USD", status: "pending", issuedAt: "May 1, 2025",  dueAt: "May 15, 2025"  },
  { id: "INV-003", contractId: "CTR-001", client: "OmniTV S.A.",   serviceName: "API Gateway Core", period: "Abr 2025",      amount: 1200,  currency: "USD", status: "paid",    issuedAt: "Apr 1, 2025",  dueAt: "Apr 15, 2025"  },
  { id: "INV-004", contractId: "CTR-001", client: "OmniTV S.A.",   serviceName: "API Gateway Core", period: "Mar 2025",      amount: 1200,  currency: "USD", status: "paid",    issuedAt: "Mar 1, 2025",  dueAt: "Mar 15, 2025"  },
  // CTR-002 — OmniTV Streaming / OmniTV S.A. — anual $8,400
  { id: "INV-005", contractId: "CTR-002", client: "OmniTV S.A.",   serviceName: "OmniTV Streaming", period: "2025 — Anual",  amount: 8400,  currency: "USD", status: "paid",    issuedAt: "Jan 12, 2025", dueAt: "Jan 26, 2025"  },
  // CTR-003 — Auth & Sessions / Nexus Corp — mensual $600
  { id: "INV-006", contractId: "CTR-003", client: "Nexus Corp",    serviceName: "Auth & Sessions",  period: "Jun 2025",      amount: 600,   currency: "USD", status: "pending", issuedAt: "Jun 1, 2025",  dueAt: "Jun 15, 2025"  },
  { id: "INV-007", contractId: "CTR-003", client: "Nexus Corp",    serviceName: "Auth & Sessions",  period: "May 2025",      amount: 600,   currency: "USD", status: "paid",    issuedAt: "May 1, 2025",  dueAt: "May 15, 2025"  },
  { id: "INV-008", contractId: "CTR-003", client: "Nexus Corp",    serviceName: "Auth & Sessions",  period: "Abr 2025",      amount: 600,   currency: "USD", status: "paid",    issuedAt: "Apr 1, 2025",  dueAt: "Apr 15, 2025"  },
  // CTR-004 — CDN Global / MediaFlow Ltd — anual $14,400
  { id: "INV-009", contractId: "CTR-004", client: "MediaFlow Ltd", serviceName: "CDN Global",       period: "2025 — Anual",  amount: 14400, currency: "USD", status: "paid",    issuedAt: "Apr 1, 2025",  dueAt: "Apr 15, 2025"  },
  // CTR-005 — Message Queue / DataSync Inc — mensual $900 — error
  { id: "INV-010", contractId: "CTR-005", client: "DataSync Inc",  serviceName: "Message Queue",    period: "Jun 2025",      amount: 900,   currency: "USD", status: "overdue", issuedAt: "Jun 1, 2025",  dueAt: "Jun 10, 2025"  },
  { id: "INV-011", contractId: "CTR-005", client: "DataSync Inc",  serviceName: "Message Queue",    period: "May 2025",      amount: 900,   currency: "USD", status: "overdue", issuedAt: "May 1, 2025",  dueAt: "May 10, 2025"  },
  { id: "INV-012", contractId: "CTR-005", client: "DataSync Inc",  serviceName: "Message Queue",    period: "Abr 2025",      amount: 900,   currency: "USD", status: "paid",    issuedAt: "Apr 1, 2025",  dueAt: "Apr 10, 2025"  },
  // CTR-006 — Analytics DB / OmniTV S.A. — mensual $400 — paused
  { id: "INV-013", contractId: "CTR-006", client: "OmniTV S.A.",   serviceName: "Analytics DB",     period: "Mar 2025",      amount: 400,   currency: "USD", status: "paid",    issuedAt: "Mar 1, 2025",  dueAt: "Mar 15, 2025"  },
  { id: "INV-014", contractId: "CTR-006", client: "OmniTV S.A.",   serviceName: "Analytics DB",     period: "Feb 2025",      amount: 400,   currency: "USD", status: "paid",    issuedAt: "Feb 1, 2025",  dueAt: "Feb 15, 2025"  },
  // CTR-007 — OmniTV Storage / OmniTV S.A. — anual $3,600
  { id: "INV-015", contractId: "CTR-007", client: "OmniTV S.A.",   serviceName: "OmniTV Storage",   period: "2025 — Anual",  amount: 3600,  currency: "USD", status: "paid",    issuedAt: "Jan 15, 2025", dueAt: "Jan 29, 2025"  },
  // CTR-008 — Gateway Auth / Nexus Corp — mensual $800 — expiring
  { id: "INV-016", contractId: "CTR-008", client: "Nexus Corp",    serviceName: "Gateway Auth",     period: "Abr 2025",      amount: 800,   currency: "USD", status: "pending", issuedAt: "Apr 10, 2025", dueAt: "Apr 24, 2025"  },
  { id: "INV-017", contractId: "CTR-008", client: "Nexus Corp",    serviceName: "Gateway Auth",     period: "Mar 2025",      amount: 800,   currency: "USD", status: "paid",    issuedAt: "Mar 10, 2025", dueAt: "Mar 24, 2025"  },
  { id: "INV-018", contractId: "CTR-008", client: "Nexus Corp",    serviceName: "Gateway Auth",     period: "Feb 2025",      amount: 800,   currency: "USD", status: "paid",    issuedAt: "Feb 10, 2025", dueAt: "Feb 24, 2025"  },
]

export const FACTURAS_MAP: Record<string, FacturaData> = Object.fromEntries(
  ALL_FACTURAS.map(f => [f.id, f])
)
