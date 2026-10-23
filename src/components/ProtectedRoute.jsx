import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

function Redirecting({ to }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return <main className="route-redirect" role="status">Redirecting…</main>
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Redirecting to="/signin" />
}

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Redirecting to="/dashboard" /> : children
}
