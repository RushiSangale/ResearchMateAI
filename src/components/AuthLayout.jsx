import Icon from './Icon.jsx'

export default function AuthLayout({ children }) {
  return (
    <main className="auth-main">
      <a className="auth-brand" href="/" aria-label="ResearchMate AI home">
        <span className="brand-mark"><Icon name="book" size={21} /></span>
        <span className="brand-name">ResearchMate<span> AI</span></span>
      </a>
      <section className="auth-card">{children}</section>
      <a className="auth-home-link" href="/">← Back to home</a>
    </main>
  )
}
