import { useState } from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import PasswordField from '../components/PasswordField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/Auth.css'

export default function SignIn() {
  const { signin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [feedback, setFeedback] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const normalizedEmail = email.trim()
    if (!normalizedEmail || !password) return setFeedback({ type: 'error', text: 'Enter your email and password to continue.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return setFeedback({ type: 'error', text: 'Enter a valid email address.' })
    signin(normalizedEmail)
    window.location.assign('/dashboard')
  }

  return (
    <AuthLayout>
      <span className="auth-kicker">YOUR RESEARCH WORKSPACE</span>
      <h1 className="auth-title">Welcome Back</h1>
      <p className="auth-description">Continue your research journey with ResearchMate AI.</p>
      <p className="demo-auth-disclosure">Demo sign in accepts any valid email and non-empty password. Credentials are not checked by a server or saved.</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field"><label htmlFor="signin-email">Email</label><input id="signin-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
        <PasswordField id="signin-password" label="Password" autoComplete="current-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
        <div className="form-options">
          <label className="checkbox-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> <span>Remember me</span></label>
          <button className="text-button" type="button" onClick={() => setFeedback({ type: 'info', text: 'Password recovery will be available when authentication is connected.' })}>Forgot password?</button>
        </div>
        {feedback && <p className={`form-feedback ${feedback.type}`} role="alert" aria-live="polite">{feedback.text}</p>}
        <button className="auth-submit" type="submit">Sign In</button>
      </form>
      <p className="auth-switch">New to ResearchMate? <a href="/signup">Create an account</a></p>
    </AuthLayout>
  )
}
