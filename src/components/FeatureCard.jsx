import Icon from './Icon.jsx'

export default function FeatureCard({ id, number, icon, iconClass, title, description }) {
  return (
    <article className="feature-card" id={id}>
      <span className={`feature-icon ${iconClass}`}><Icon name={icon} size={20} /></span>
      <span className="feature-number">{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="card-arrow" aria-hidden="true"><Icon name="arrow" size={16} /></span>
    </article>
  )
}
