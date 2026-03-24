const SESSION_KEY = "acme_auth_session"
const SAVED_EMAIL_KEY = "acme_saved_email"

export type AuthSession = {
  email: string
  loginAt: string
}

export function getAuthSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as AuthSession
    if (!data?.email || !data?.loginAt) return null
    return data
  } catch {
    return null
  }
}

export function saveAuthSession(session: AuthSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function saveRememberedEmail(email: string): void {
  localStorage.setItem(SAVED_EMAIL_KEY, email)
}

export function getRememberedEmail(): string | null {
  return localStorage.getItem(SAVED_EMAIL_KEY)
}

export function clearRememberedEmail(): void {
  localStorage.removeItem(SAVED_EMAIL_KEY)
}
