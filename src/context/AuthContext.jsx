import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const SESSION_KEY = 'researchmate-demo-user'

function readDemoUser() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
    if (saved && typeof saved.name === 'string' && typeof saved.email === 'string') {
      return { name: saved.name, email: saved.email }
    }
  } catch {
    // Storage may be unavailable or contain malformed data.
  }
  return null
}

function saveDemoUser(profile) {
  const safeProfile = { name: profile.name.trim(), email: profile.email.trim().toLowerCase() }
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeProfile))
  } catch {
    // The in-memory demo flow still works if session storage is unavailable.
  }
  return safeProfile
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readDemoUser)

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    signup(name, email) {
      const profile = saveDemoUser({ name, email })
      setUser(profile)
      return profile
    },
    signin(email, name) {
      const displayName = name?.trim() || email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || 'Researcher'
      const profile = saveDemoUser({ name: displayName, email })
      setUser(profile)
      return profile
    },
    logout() {
      try {
        sessionStorage.removeItem(SESSION_KEY)
      } catch {
        // The in-memory demo session can still be cleared.
      }
      setUser(null)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
