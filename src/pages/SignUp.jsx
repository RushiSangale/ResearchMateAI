import { useState } from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import PasswordField from '../components/PasswordField.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/Auth.css'

export default function SignUp() {
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [feedback, setFeedback] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !password || !confirmPassword) return setFeedback({ type: 'error', text: 'Complete all fields to create your account.' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setFeedback({ type: 'error', text: 'Enter a valid email address.' })
    if (password.length < 8) return setFeedback({ type: 'error', text: 'Choose a password with at least 8 characters.' })
    if (password !== confirmPassword) return setFeedback({ type: 'error', text: 'The passwords do not match.' })
    if (!acceptedTerms) return setFeedback({ type: 'error', text: 'Please agree to the terms to continue.' })
    signup(name, email)
    window.location.assign('/dashboard')
  }

  return (
    <AuthLayout>
      <span className="auth-kicker">START YOUR NEXT CHAPTER</span>
      <h1 className="auth-title">Create Your Account</h1>
      <p className="auth-description">Organize your ideas, explore new research, and make space for your next discovery.</p>
      <p className="demo-auth-disclosure">Demo signup only. No secure backend account is created, and your password is never saved.</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field"><label htmlFor="signup-name">Full name</label><input id="signup-name" name="name" type="text" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></div>
        <div className="form-field"><label htmlFor="signup-email">Email</label><input id="signup-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
        <PasswordField id="signup-password" label="Password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
        <PasswordField id="signup-confirm-password" label="Confirm password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        <label className="checkbox-label terms-label"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /> <span>I agree to the terms and conditions</span></label>
        {feedback && <p className={`form-feedback ${feedback.type}`} role="alert" aria-live="polite">{feedback.text}</p>}
        <button className="auth-submit" type="submit">Create Account</button>
      </form>
      <p className="auth-switch">Already have an account? <a href="/signin">Sign In</a></p>
    </AuthLayout>
  )
}
