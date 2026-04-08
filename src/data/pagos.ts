export type PagoStatus = "completed" | "failed" | "processing" | "refunded"
export type PagoMethod = "Transferencia" | "Tarjeta" | "Débito directo"

export interface PagoData {
  id: string
  invoiceId: string
  client: string
  serviceName: string
  amount: number
  currency: string
  method: PagoMethod
  status: PagoStatus
  date: string
}

export const ALL_PAGOS: PagoData[] = [
  { id: "PAY-001", invoiceId: "INV-003", client: "OmniTV S.A.",   serviceName: "API Gateway Core", amount: 1200,  currency: "USD", method: "Transferencia", status: "completed",  date: "Apr 10, 2025" },
  { id: "PAY-002", invoiceId: "INV-004", client: "OmniTV S.A.",   serviceName: "API Gateway Core", amount: 1200,  currency: "USD", method: "Transferencia", status: "completed",  date: "Mar 10, 2025" },
  { id: "PAY-003", invoiceId: "INV-005", client: "OmniTV S.A.",   serviceName: "OmniTV Streaming", amount: 8400,  currency: "USD", method: "Transferencia", status: "completed",  date: "Jan 20, 2025" },
  { id: "PAY-004", invoiceId: "INV-007", client: "Nexus Corp",    serviceName: "Auth & Sessions",  amount: 600,   currency: "USD", method: "Tarjeta",       status: "completed",  date: "May 8, 2025"  },
  { id: "PAY-005", invoiceId: "INV-008", client: "Nexus Corp",    serviceName: "Auth & Sessions",  amount: 600,   currency: "USD", method: "Tarjeta",       status: "completed",  date: "Apr 8, 2025"  },
  { id: "PAY-006", invoiceId: "INV-009", client: "MediaFlow Ltd", serviceName: "CDN Global",       amount: 14400, currency: "USD", method: "Transferencia", status: "completed",  date: "Apr 12, 2025" },
  { id: "PAY-007", invoiceId: "INV-010", client: "DataSync Inc",  serviceName: "Message Queue",    amount: 900,   currency: "USD", method: "Tarjeta",       status: "failed",     date: "Jun 5, 2025"  },
  { id: "PAY-008", invoiceId: "INV-011", client: "DataSync Inc",  serviceName: "Message Queue",    amount: 900,   currency: "USD", method: "Tarjeta",       status: "failed",     date: "May 5, 2025"  },
  { id: "PAY-009", invoiceId: "INV-012", client: "DataSync Inc",  serviceName: "Message Queue",    amount: 900,   currency: "USD", method: "Tarjeta",       status: "completed",  date: "Apr 8, 2025"  },
  { id: "PAY-010", invoiceId: "INV-013", client: "OmniTV S.A.",   serviceName: "Analytics DB",     amount: 400,   currency: "USD", method: "Transferencia", status: "completed",  date: "Mar 8, 2025"  },
  { id: "PAY-011", invoiceId: "INV-014", client: "OmniTV S.A.",   serviceName: "Analytics DB",     amount: 400,   currency: "USD", method: "Transferencia", status: "completed",  date: "Feb 8, 2025"  },
  { id: "PAY-012", invoiceId: "INV-015", client: "OmniTV S.A.",   serviceName: "OmniTV Storage",   amount: 3600,  currency: "USD", method: "Transferencia", status: "completed",  date: "Jan 22, 2025" },
  { id: "PAY-013", invoiceId: "INV-016", client: "Nexus Corp",    serviceName: "Gateway Auth",     amount: 800,   currency: "USD", method: "Tarjeta",       status: "processing", date: "Apr 14, 2025" },
  { id: "PAY-014", invoiceId: "INV-017", client: "Nexus Corp",    serviceName: "Gateway Auth",     amount: 800,   currency: "USD", method: "Tarjeta",       status: "completed",  date: "Mar 15, 2025" },
  { id: "PAY-015", invoiceId: "INV-018", client: "Nexus Corp",    serviceName: "Gateway Auth",     amount: 800,   currency: "USD", method: "Tarjeta",       status: "completed",  date: "Feb 15, 2025" },
]

export const PAGOS_MAP: Record<string, PagoData> = Object.fromEntries(
  ALL_PAGOS.map(p => [p.id, p])
)
