const features = [
  {
    icon: '⚡',
    title: 'Proyectos & Servicios',
    desc: 'Gestiona toda tu infraestructura tecnológica en un solo lugar',
  },
  {
    icon: '📑',
    title: 'Contratos & Facturación',
    desc: 'Control total sobre contratos activos, vencimientos y pagos',
  },
  {
    icon: '📊',
    title: 'Analytics en tiempo real',
    desc: 'Métricas de uptime, uso de recursos y despliegues al instante',
  },
]

export default function AuthBrandPanel() {
  return (
    <div className="auth-brand-panel">
      <div className="auth-brand-content">
        <h2 className="auth-brand-headline">
          Tu empresa digital,{' '}
          <span className="auth-brand-gradient">bajo control</span>
        </h2>

        <p className="auth-brand-sub">
          Gestiona todos tus servicios tecnológicos desde un solo panel
          intuitivo, seguro y disponible las 24 horas.
        </p>

        <div className="auth-brand-features">
          {features.map(f => (
            <div key={f.title} className="auth-brand-feature">
              <div className="auth-feature-icon">{f.icon}</div>
              <div>
                <div className="auth-feature-title">{f.title}</div>
                <div className="auth-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="auth-brand-stats">
          {[
            { num: '50+', label: 'Clientes' },
            { num: '99.9%', label: 'Uptime' },
            { num: '24/7', label: 'Soporte' },
          ].map(s => (
            <div key={s.label} className="auth-stat">
              <span className="auth-stat-num">{s.num}</span>
              <span className="auth-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating deco cards */}
      <div className="auth-float-card auth-float-card-1">
        <span style={{ color: 'var(--brand)', fontSize: 10 }}>●</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--foreground-default)' }}>
          Servidor activo
        </span>
      </div>
      <div className="auth-float-card auth-float-card-2">
        <span style={{ fontSize: 18 }}>🔒</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--foreground-default)' }}>SSL Activo</div>
          <div style={{ fontSize: 10, color: 'var(--foreground-muted)' }}>Certificado válido</div>
        </div>
      </div>
    </div>
  )
}
