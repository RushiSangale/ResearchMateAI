import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute.jsx'
import './App.css'

const themes = {
  midnight: 'Midnight Rose',
  mocha: 'Mocha Lavender',
  arctic: 'Arctic Blue',
}

const themeOrder = Object.keys(themes)

function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem('researchmate-theme')
    return themeOrder.includes(savedTheme) ? savedTheme : 'midnight'
  } catch {
    return 'midnight'
  }
}

function AppRoutes({ theme, toggleTheme }) {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const nextThemeName = themes[themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length]]

  return (
    <div className="app-shell" id={path === '/' || path === '/dashboard' ? 'dashboard' : undefined}>
      {path === '/dashboard'
        ? <ProtectedRoute><Dashboard theme={theme} nextThemeName={nextThemeName} onToggleTheme={toggleTheme} /></ProtectedRoute>
        : path === '/signin'
          ? <PublicOnlyRoute><Navbar theme={theme} nextThemeName={nextThemeName} onToggleTheme={toggleTheme} /><SignIn /></PublicOnlyRoute>
          : path === '/signup'
            ? <PublicOnlyRoute><Navbar theme={theme} nextThemeName={nextThemeName} onToggleTheme={toggleTheme} /><SignUp /></PublicOnlyRoute>
            : path === '/profile'
              ? <ProtectedRoute><Navbar theme={theme} nextThemeName={nextThemeName} onToggleTheme={toggleTheme} /><main className="profile-coming-soon"><span className="section-kicker">YOUR ACCOUNT</span><h1>Profile — Coming Soon</h1><p>Your profile tools will be available in a future update.</p><a className="button button-primary" href="/">Back to Home</a></main></ProtectedRoute>
              : <><Navbar theme={theme} nextThemeName={nextThemeName} onToggleTheme={toggleTheme} /><Home themeName={themes[theme]} /></>}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(getSavedTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('researchmate-theme', theme)
    } catch {
      // Storage may be unavailable in private contexts.
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length])

  return <AuthProvider><AppRoutes theme={theme} toggleTheme={toggleTheme} /></AuthProvider>
}

export default App
