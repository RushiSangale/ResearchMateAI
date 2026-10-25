import { useState } from 'react'
import Icon from './Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import './Navbar.css'

const navigation = [
  ['Home', 'home'],
  ['Features', 'features'],
  ['About', 'about'],
  ['Contact', 'contact'],
]

export default function Navbar({ theme, nextThemeName, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const onLandingPage = (window.location.pathname.replace(/\/$/, '') || '/') === '/'

  function handleLogout() {
    logout()
    window.location.assign('/')
  }

  return (
    <header className="site-header">
      <div className="navbar">
        <a className="brand" href={onLandingPage ? '#home' : '/#home'} aria-label="ResearchMate AI home">
          <span className="brand-mark"><Icon name="book" size={21} /></span>
          <span className="brand-name">ResearchMate<span> AI</span></span>
        </a>
        <button className="mobile-menu" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name="menu" /></button>
        <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navigation.map(([label, section], index) => <a key={label} className={index === 0 && onLandingPage ? 'nav-link active' : 'nav-link'} href={onLandingPage ? `#${section}` : `/#${section}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${nextThemeName} theme`} title={`Switch to ${nextThemeName} theme`}>
            <Icon name={theme === 'midnight' ? 'moon' : theme === 'mocha' ? 'sun' : 'book'} size={17} />
          </button>
          {isAuthenticated
            ? <><a className="auth-button auth-signin" href="/profile">Profile</a><button className="auth-button auth-signup" type="button" onClick={handleLogout}>Logout</button></>
            : <><a className="auth-button auth-signin" href="/signin">Sign In</a><a className="auth-button auth-signup" href="/signup">Sign Up</a></>}
        </div>
      </div>
    </header>
  )
}
