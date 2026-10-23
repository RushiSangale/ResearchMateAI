import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Icon from '../components/Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/Dashboard.css'

const summaries = [
  ['Saved Papers', '12', 'book'],
  ['Papers Explored', '28', 'search'],
  ['Comparisons Created', '3', 'compare'],
  ['Research Plans', '2', 'planner'],
]

const papers = [
  { title: 'Retrieval-Augmented Generation for Scientific Literature', topic: 'AI Research', year: '2025', description: 'An illustrative overview of ways retrieval can support exploration of scientific literature.' },
  { title: 'Knowledge Discovery in Large Research Collections', topic: 'Information Retrieval', year: '2024', description: 'A sample paper record focused on finding useful connections across large collections.' },
  { title: 'Evaluating Language Models for Evidence-Based Question Answering', topic: 'Natural Language Processing', year: '2025', description: 'An illustrative record about evaluating answers against research evidence.' },
]

const actions = [
  ['Discover Papers', 'search'],
  ['AI Research Chat', 'spark'],
  ['Compare Papers', 'compare'],
  ['Research Gap Assistant', 'planner'],
  ['Research Planner', 'planner'],
  ['My Research Library', 'book'],
]

export default function Dashboard({ theme, nextThemeName, onToggleTheme }) {
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')

  function handleSearch(event) {
    event.preventDefault()
    const topic = query.trim()
    setNotice(topic ? `Paper discovery is not connected yet. “${topic}” was not sent to an external search.` : 'Enter a research topic to try the demo search field.')
  }

  function showComingSoon(label) {
    setNotice(`${label} is coming soon in this demo workspace.`)
  }

  function handleLogout() {
    logout()
    window.location.assign('/signin')
  }

  return (
    <>
      <Navbar theme={theme} nextThemeName={nextThemeName} onToggleTheme={onToggleTheme} />
      <main className="dashboard-main">
        <section className="dashboard-welcome" aria-labelledby="dashboard-title">
          <div>
            <span className="dashboard-kicker">YOUR RESEARCH WORKSPACE</span>
            <h1 id="dashboard-title">Welcome back, {user?.name || 'Researcher'}!</h1>
            <p>Continue exploring research, comparing studies, and developing your next research idea.</p>
          </div>
          <div className="dashboard-account"><span className="demo-badge"><i /> Demo workspace</span><span className="dashboard-email">{user?.email}</span><button className="logout-button" type="button" onClick={handleLogout}>Log out</button></div>
        </section>

        <aside className="demo-notice" aria-label="Demo authentication notice"><strong>Demo authentication</strong><span>This is a frontend demonstration. Your profile is stored only for this browser session; no account is registered in a secure backend.</span></aside>

        <form className="dashboard-search" onSubmit={handleSearch}>
          <Icon name="search" size={19} />
          <label className="visually-hidden" htmlFor="research-search">Search a research topic</label>
          <input id="research-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a research topic…" />
          <button type="submit">Search</button>
        </form>
        {notice && <p className="dashboard-feedback" role="status">{notice}</p>}

        <section className="dashboard-summary" aria-label="Sample workspace summary">
          {summaries.map(([label, value, icon]) => <article className="summary-card" key={label}><span className="summary-icon"><Icon name={icon} size={18} /></span><span className="summary-value">{value}</span><span className="summary-label">{label}</span><span className="sample-label">Sample data</span></article>)}
        </section>

        <section className="dashboard-section" aria-labelledby="recent-papers-title">
          <div className="dashboard-section-heading"><div><span className="dashboard-kicker">PICK UP WHERE YOU LEFT OFF</span><h2 id="recent-papers-title">Recently viewed papers</h2></div><span className="sample-label">Illustrative records</span></div>
          <div className="recent-paper-grid">
            {papers.map((paper) => <article className="recent-paper" key={paper.title}><div className="recent-paper-meta"><span>{paper.topic}</span><time>{paper.year}</time></div><h3>{paper.title}</h3><p>{paper.description}</p><button type="button" className="paper-action" onClick={() => showComingSoon('Paper details')}>View details <Icon name="arrow" size={15} /></button></article>)}
          </div>
        </section>

        <div className="dashboard-lower-grid">
          <section className="dashboard-section quick-actions" aria-labelledby="quick-actions-title"><div className="dashboard-section-heading"><div><span className="dashboard-kicker">TOOLS FOR YOUR NEXT STEP</span><h2 id="quick-actions-title">Quick actions</h2></div></div><div className="action-grid">{actions.map(([label, icon]) => <button className="action-card" type="button" key={label} onClick={() => showComingSoon(label)}><span className="action-icon"><Icon name={icon} size={17} /></span><span>{label}</span><Icon name="arrow" size={14} /></button>)}</div></section>
          <section className="dashboard-section activity-section" aria-labelledby="activity-title"><div className="dashboard-section-heading"><div><span className="dashboard-kicker">A SAMPLE WORKSPACE TIMELINE</span><h2 id="activity-title">Recent activity</h2></div></div><ol className="activity-list"><li><span className="activity-dot" /><div><strong>Explored a sample research topic</strong><span>Artificial intelligence in education · Just now</span></div></li><li><span className="activity-dot" /><div><strong>Compared two illustrative studies</strong><span>Research methods · Earlier today</span></div></li><li><span className="activity-dot" /><div><strong>Started a sample research plan</strong><span>Literature review outline · Yesterday</span></div></li></ol><p className="activity-disclaimer">Activity shown here is sample content, not saved research history.</p></section>
        </div>
      </main>
    </>
  )
}
