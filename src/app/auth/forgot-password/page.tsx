'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel'

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1100)
  }

  return (
    <div className="auth-shell">
      <AuthBackground />

      {/* ── Left: form ── */}
      <div className="auth-form-panel">
        <div className="auth-topbar">
          <Link href="/" className="auth-logo">
            UPER<span style={{ color: 'var(--brand)' }}>.</span>
          </Link>
          <Link href="/auth/login" className="auth-back-btn">
            ← Volver
          </Link>
        </div>

        <div className="auth-form-inner">

          {/* Loading overlay */}
          {loading && (
            <div className="auth-state-overlay">
              <div className="auth-spinner" />
              <span className="auth-state-msg">Enviando enlace...</span>
            </div>
          )}

          {/* Form content */}
          <div style={{
            opacity: loading ? 0 : 1,
            pointerEvents: loading ? 'none' : 'auto',
            transition: 'opacity 0.18s ease',
          }}>
            {sent ? (
              /* ── Success screen ── */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
                <div className="auth-success-circle">
                  <CheckIcon />
                </div>
                <div>
                  <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--foreground-default)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    Correo enviado
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.65, maxWidth: 280 }}>
                    Enviamos un enlace de recuperación a{' '}
                    <strong style={{ color: 'var(--foreground-light)' }}>{email}</strong>.
                    Revisa también la carpeta de spam.
                  </p>
                </div>
                <div className="auth-confirm-steps" style={{ width: '100%' }}>
                  {[
                    'Abre el correo que te enviamos',
                    'Haz clic en "Restablecer contraseña"',
                    'Crea una nueva contraseña segura',
                  ].map((s, i) => (
                    <div key={i} className="auth-confirm-step">
                      <span className="auth-confirm-step-num">{i + 1}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/auth/login"
                  className="auth-btn-primary"
                  style={{ textDecoration: 'none', width: '100%' }}
                >
                  Volver al login →
                </Link>
                <p style={{ fontSize: 11, color: 'var(--foreground-muted)' }}>
                  ¿No lo recibiste?{' '}
                  <button
                    type="button"
                    className="auth-switch-link"
                    style={{ fontSize: 11 }}
                    onClick={() => setSent(false)}
                  >
                    Reintentar
                  </button>
                </p>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ marginBottom: 4 }}>
                  <h1 className="auth-form-title">Recuperar contraseña</h1>
                  <p className="auth-form-sub">
                    Ingresa tu email y te enviaremos un enlace para restablecerla.
                  </p>
                </div>

                <div>
                  <label className="auth-label">Correo electrónico</label>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="tu@empresa.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <button className="auth-btn-primary" type="submit" style={{ marginTop: 4 }}>
                  Enviar enlace →
                </button>

                <p style={{ fontSize: 12, color: 'var(--foreground-muted)', textAlign: 'center' }}>
                  ¿Recordaste tu contraseña?{' '}
                  <Link href="/auth/login" className="auth-switch-link" style={{ textDecoration: 'none' }}>
                    Inicia sesión
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Right: brand panel ── */}
      <AuthBrandPanel />
    </div>
  )
}
