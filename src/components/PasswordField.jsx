import { useState } from 'react'

export default function PasswordField({ id, label, autoComplete, minLength, value, onChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <div className="password-input-wrap">
        <input id={id} name={id} type={visible ? 'text' : 'password'} autoComplete={autoComplete} minLength={minLength} required value={value} onChange={onChange} />
        <button className="password-visibility" type="button" onClick={() => setVisible(!visible)} aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} aria-pressed={visible}>
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  )
}
