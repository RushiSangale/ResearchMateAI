import Icon from './Icon.jsx'

export default function DashboardFeatureGroup({ id, number, icon, title, description, items, onOpen }) {
  return (
    <section className="dashboard-feature-group" id={id} aria-labelledby={`${id}-title`}>
      <div className="feature-group-head">
        <span className="group-icon"><Icon name={icon} size={19} /></span>
        <span className="group-number">{number}</span>
        <h3 id={`${id}-title`}>{title}</h3>
        <p>{description}</p>
      </div>
      <ul className="feature-item-list">
        {items.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <button type="button" aria-label={`Explore ${item.label}`} onClick={() => onOpen(item.action)}>Explore <Icon name="arrow" size={13} /></button>
          </li>
        ))}
      </ul>
    </section>
  )
}
