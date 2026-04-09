'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthBackground from '@/components/auth/AuthBackground'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel'

/* ── Icons ── */

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

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

/* ── Page ── */

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password,    setPassword]    = useState('')
  const [confirm,     setConfirm]     = useState('')
  const [showPwd,     setShowPwd]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [success,     setSuccess]     = useState(false)
  const [error,       setError]       = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    setError('')
    setLoading(true)
    // stub: simulate password update
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 2200)
    }, 1100)
  }

  // Password strength (1–4)
  const strength =
    password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? 4 :
    password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) ? 3 :
    password.length >= 8 ? 2 :
    password.length > 0 ? 1 : 0

  const strengthColor = ['', 'hsl(10 78% 62%)', 'hsl(39 100% 57%)', 'hsl(210 100% 64%)', 'var(--brand)'][strength]

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
            ← Login
          </Link>
        </div>

        <div className="auth-form-inner">

          {/* Loading overlay */}
          {loading && (
            <div className="auth-state-overlay">
              <div className="auth-spinner" />
              <span className="auth-state-msg">Actualizando contraseña...</span>
            </div>
          )}

          {/* Success overlay */}
          {success && (
            <div className="auth-state-overlay">
              <div className="auth-success-circle">
                <CheckIcon />
              </div>
              <span className="auth-state-msg">¡Contraseña actualizada!</span>
              <span className="auth-state-sub">Redirigiendo al login...</span>
            </div>
          )}

          {/* Form content */}
          <div style={{
            opacity: loading || success ? 0 : 1,
            pointerEvents: loading || success ? 'none' : 'auto',
            transition: 'opacity 0.18s ease',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ marginBottom: 4 }}>
                <h1 className="auth-form-title">Nueva contraseña</h1>
                <p className="auth-form-sub">Elige una contraseña segura para tu cuenta.</p>
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

                {/* Strength bar */}
                {strength > 0 && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {[1, 2, 3, 4].map(level => (
                      <div key={level} style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 99,
                        background: level <= strength ? strengthColor : 'var(--border-default)',
                        transition: 'background 0.2s',
                      }} />
                    ))}
                  </div>
                )}
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

              <button className="auth-btn-primary" type="submit" style={{ marginTop: 4 }}>
                Restablecer contraseña
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Right: brand panel ── */}
      <AuthBrandPanel />
    </div>
  )
}
