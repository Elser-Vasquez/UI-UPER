'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthBackground from './AuthBackground'
import AuthBrandPanel from './AuthBrandPanel'

/* ── Types ─────────────────────────────────────────────────── */

type Mode      = 'login' | 'register'
type AuthState = 'idle' | 'loading' | 'success' | 'error'

/* ── Icons ──────────────────────────────────────────────────── */

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

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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

/* ── Loading / Success overlay ──────────────────────────────── */

function StateOverlay({ state, label }: { state: 'loading' | 'success'; label: string }) {
  return (
    <div className="auth-state-overlay">
      {state === 'loading' ? (
        <div className="auth-spinner" />
      ) : (
        <div className="auth-success-circle">
          <CheckIcon />
        </div>
      )}
      <span className="auth-state-msg">{label}</span>
      {state === 'success' && (
        <span className="auth-state-sub">Redirigiendo al dashboard...</span>
      )}
    </div>
  )
}

/* ── Component ───────────────────────────────────────────────── */

export default function AuthForms({ initialMode }: { initialMode: Mode }) {
  const router = useRouter()
  const [mode, setMode]         = useState<Mode>(initialMode)
  const [visible, setVisible]   = useState(true)
  const [authState, setAuthState] = useState<AuthState>('idle')
  const [formError, setFormError] = useState('')

  // Login fields
  const [loginEmail,    setLoginEmail]    = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginShowPwd,  setLoginShowPwd]  = useState(false)

  // Register fields
  const [regForm, setRegForm] = useState({ full_name: '', email: '', password: '', confirm: '' })
  const [regShowPwd,     setRegShowPwd]     = useState(false)
  const [regShowConfirm, setRegShowConfirm] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')

  function setReg(key: string, value: string) {
    setRegForm(prev => ({ ...prev, [key]: value }))
  }

  function switchMode(to: Mode) {
    if (to === mode || authState !== 'idle') return
    setVisible(false)
    setTimeout(() => {
      setMode(to)
      setFormError('')
      setAuthState('idle')
      setVisible(true)
      router.replace(to === 'login' ? '/auth/login' : '/auth/register', { scroll: false })
    }, 220)
  }

  function triggerSuccess() {
    setAuthState('success')
    setTimeout(() => router.push('/'), 1800)
  }

  function triggerError(msg: string) {
    setFormError(msg)
    setAuthState('error')
    // return to idle so form re-renders with fresh shake on next error
    setTimeout(() => setAuthState('idle'), 50)
  }

  function handleGoogle() {
    setAuthState('loading')
    setFormError('')
    // stub: simulate OAuth redirect delay
    setTimeout(triggerSuccess, 1400)
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthState('loading')
    setFormError('')
    // stub: simulate API call
    setTimeout(() => {
      if (loginEmail && loginPassword) {
        triggerSuccess()
      } else {
        triggerError('Ingresa tu email y contraseña.')
      }
    }, 1200)
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (regForm.password !== regForm.confirm) {
      triggerError('Las contraseñas no coinciden.')
      return
    }
    if (regForm.password.length < 8) {
      triggerError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    setAuthState('loading')
    setFormError('')
    // stub: simulate API call → email confirmation
    setTimeout(() => {
      setRegisteredEmail(regForm.email)
      setAuthState('idle')
    }, 1100)
  }

  const isOverlay = authState === 'loading' || authState === 'success'
  const formVisible = !isOverlay

  return (
    <div className="auth-shell">
      <AuthBackground />

      {/* ── Left: form panel ── */}
      <div className="auth-form-panel">
        <div className="auth-topbar">
          <Link href="/" className="auth-logo">
            UPER<span style={{ color: 'var(--brand)' }}>.</span>
          </Link>
          <Link href="/" className="auth-back-btn">
            ← Dashboard
          </Link>
        </div>

        <div className="auth-form-inner">

          {/* State overlay (loading / success) */}
          {isOverlay && (
            <StateOverlay
              state={authState as 'loading' | 'success'}
              label={authState === 'loading' ? 'Verificando credenciales...' : '¡Acceso concedido!'}
            />
          )}

          {/* Form content — fades when overlay is shown */}
          <div style={{
            opacity: formVisible ? 1 : 0,
            pointerEvents: formVisible ? 'auto' : 'none',
            transition: 'opacity 0.18s ease',
          }}>
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.22s ease, transform 0.22s ease',
            }}>

              {/* ── LOGIN ── */}
              {mode === 'login' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <h1 className="auth-form-title">Bienvenido de vuelta</h1>
                    <p className="auth-form-sub">Inicia sesión en tu cuenta</p>
                  </div>

                  <button type="button" className="auth-google-btn" onClick={handleGoogle}>
                    <GoogleIcon />
                    Continuar con Google
                  </button>

                  <div className="auth-divider"><span>o con tu correo</span></div>

                  <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label className="auth-label">Correo electrónico</label>
                      <input
                        className="auth-input"
                        type="email"
                        placeholder="tu@empresa.com"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <label className="auth-label" style={{ margin: 0 }}>Contraseña</label>
                        <Link href="/auth/forgot-password" className="auth-forgot-link">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <div className="auth-pwd-wrap">
                        <input
                          className="auth-input"
                          type={loginShowPwd ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={e => setLoginPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          style={{ paddingRight: 40 }}
                        />
                        <button type="button" className="auth-pwd-toggle" onClick={() => setLoginShowPwd(v => !v)} tabIndex={-1}>
                          <EyeIcon open={loginShowPwd} />
                        </button>
                      </div>
                    </div>

                    {formError && <p className="auth-error">{formError}</p>}

                    <button className="auth-btn-primary" type="submit">
                      Iniciar sesión
                    </button>
                  </form>

                  <p style={{ fontSize: 12, color: 'var(--foreground-muted)', textAlign: 'center' }}>
                    ¿No tienes una cuenta?{' '}
                    <button type="button" onClick={() => switchMode('register')} className="auth-switch-link">
                      Regístrate
                    </button>
                  </p>
                </div>
              )}

              {/* ── REGISTER: email confirmation ── */}
              {mode === 'register' && registeredEmail && (
                <div className="auth-confirm-box">
                  <div className="auth-confirm-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M2 7l10 7 10-7"/>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--foreground-default)', letterSpacing: '-0.02em', margin: 0 }}>
                    Revisa tu correo
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--foreground-muted)', lineHeight: 1.65, margin: 0, textAlign: 'center' }}>
                    Enviamos un enlace de confirmación a{' '}
                    <strong style={{ color: 'var(--foreground-light)', display: 'block', marginTop: 4 }}>
                      {registeredEmail}
                    </strong>
                  </p>
                  <div className="auth-confirm-steps">
                    {[
                      'Abre el correo que te enviamos',
                      'Haz clic en el enlace de confirmación',
                      'Listo — tu cuenta quedará activa',
                    ].map((s, i) => (
                      <div key={i} className="auth-confirm-step">
                        <span className="auth-confirm-step-num">{i + 1}</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--foreground-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                    ¿No lo ves? Revisa spam o{' '}
                    <button
                      type="button"
                      className="auth-switch-link"
                      onClick={() => { setRegisteredEmail(''); setRegForm({ full_name: '', email: '', password: '', confirm: '' }) }}
                    >
                      intenta con otro correo
                    </button>
                  </p>
                  <button type="button" onClick={() => switchMode('login')} className="auth-btn-primary">
                    Ir al inicio de sesión
                  </button>
                </div>
              )}

              {/* ── REGISTER: form ── */}
              {mode === 'register' && !registeredEmail && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <h1 className="auth-form-title">Crea tu cuenta</h1>
                    <p className="auth-form-sub">Empieza a gestionar tus servicios hoy</p>
                  </div>

                  <button type="button" className="auth-google-btn" onClick={handleGoogle}>
                    <GoogleIcon />
                    Registrarse con Google
                  </button>

                  <div className="auth-divider"><span>o con tu correo</span></div>

                  <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    <div>
                      <label className="auth-label">Nombre completo</label>
                      <input
                        className="auth-input"
                        type="text"
                        placeholder="Juan Pérez"
                        value={regForm.full_name}
                        onChange={e => setReg('full_name', e.target.value)}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className="auth-label">Correo electrónico</label>
                      <input
                        className="auth-input"
                        type="email"
                        placeholder="tu@empresa.com"
                        value={regForm.email}
                        onChange={e => setReg('email', e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label className="auth-label">Contraseña</label>
                      <div className="auth-pwd-wrap">
                        <input
                          className="auth-input"
                          type={regShowPwd ? 'text' : 'password'}
                          placeholder="Mínimo 8 caracteres"
                          value={regForm.password}
                          onChange={e => setReg('password', e.target.value)}
                          required
                          minLength={8}
                          autoComplete="new-password"
                          style={{ paddingRight: 40 }}
                        />
                        <button type="button" className="auth-pwd-toggle" onClick={() => setRegShowPwd(v => !v)} tabIndex={-1}>
                          <EyeIcon open={regShowPwd} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="auth-label">Confirmar contraseña</label>
                      <div className="auth-pwd-wrap">
                        <input
                          className="auth-input"
                          type={regShowConfirm ? 'text' : 'password'}
                          placeholder="Repite la contraseña"
                          value={regForm.confirm}
                          onChange={e => setReg('confirm', e.target.value)}
                          required
                          autoComplete="new-password"
                          style={{ paddingRight: 40 }}
                        />
                        <button type="button" className="auth-pwd-toggle" onClick={() => setRegShowConfirm(v => !v)} tabIndex={-1}>
                          <EyeIcon open={regShowConfirm} />
                        </button>
                      </div>
                    </div>

                    {formError && <p className="auth-error">{formError}</p>}

                    <button className="auth-btn-primary" type="submit" style={{ marginTop: 2 }}>
                      Crear cuenta
                    </button>
                  </form>

                  <p style={{ fontSize: 12, color: 'var(--foreground-muted)', textAlign: 'center' }}>
                    ¿Ya tienes una cuenta?{' '}
                    <button type="button" onClick={() => switchMode('login')} className="auth-switch-link">
                      Inicia sesión
                    </button>
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ── Right: brand panel ── */}
      <AuthBrandPanel />
    </div>
  )
}
