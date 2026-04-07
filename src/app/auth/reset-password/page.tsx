'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel'

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setLoading(true)
    setError('')
    // stub: simulate password update
    setTimeout(() => router.push('/'), 900)
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ marginBottom: 4 }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--foreground-default)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                Nueva contraseña
              </p>
              <p style={{ fontSize: 13, color: 'var(--foreground-muted)' }}>
                Elige una contraseña segura para tu cuenta.
              </p>
            </div>

            <div>
              <label className="auth-label">Nueva contraseña</label>
              <div className="auth-pwd-wrap">
                <input
                  className="auth-input"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  style={{ paddingRight: 40 }}
                />
                <button type="button" className="auth-pwd-toggle" onClick={() => setShowPwd(v => !v)} tabIndex={-1}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
            </div>

            <div>
              <label className="auth-label">Confirmar contraseña</label>
              <div className="auth-pwd-wrap">
                <input
                  className="auth-input"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repite la contraseña"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={{ paddingRight: 40 }}
                />
                <button type="button" className="auth-pwd-toggle" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button
              className="auth-btn-primary"
              type="submit"
              disabled={loading}
              style={{ marginTop: 4 }}
            >
              {loading ? 'Guardando...' : 'Guardar contraseña →'}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: brand panel ── */}
      <AuthBrandPanel />
    </div>
  )
}
