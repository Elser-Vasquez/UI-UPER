'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // stub: simulate email send
    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 800)
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
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'color-mix(in srgb, var(--brand) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--brand) 30%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                marginBottom: 8,
              }}>
                ✉️
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--foreground-default)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                  Revisa tu correo
                </p>
                <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
                  Enviamos un enlace de recuperación a{' '}
                  <strong style={{ color: 'var(--foreground-light)' }}>{email}</strong>
                </p>
              </div>
              <Link href="/auth/login" className="auth-btn-primary" style={{ marginTop: 8, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Volver al login →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ marginBottom: 4 }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--foreground-default)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  Recuperar contraseña
                </p>
                <p style={{ fontSize: 13, color: 'var(--foreground-muted)' }}>
                  Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
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

              <button
                className="auth-btn-primary"
                type="submit"
                disabled={loading}
                style={{ marginTop: 4 }}
              >
                {loading ? 'Enviando...' : 'Enviar enlace →'}
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

      {/* ── Right: brand panel ── */}
      <AuthBrandPanel />
    </div>
  )
}
