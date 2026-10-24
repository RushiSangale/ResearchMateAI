import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Icon from '../components/Icon.jsx'
import DashboardFeatureGroup from '../components/DashboardFeatureGroup.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import '../styles/Dashboard.css'

const summaries = [
  ['Saved Papers', '12', 'book'],
  ['Papers Explored', '28', 'search'],
  ['Comparisons Created', '3', 'compare'],
  ['Research Plans', '2', 'planner'],
]

const papers = [
  { id: 'paper-1', title: 'Retrieval-Augmented Generation for Scientific Literature', topic: 'AI Research', year: '2025', description: 'An illustrative overview of ways retrieval can support exploration of scientific literature.', method: 'Retrieval and language model synthesis', finding: 'Grounded context can help organize a literature review.' },
  { id: 'paper-2', title: 'Knowledge Discovery in Large Research Collections', topic: 'Information Retrieval', year: '2024', description: 'A sample paper record focused on finding useful connections across large collections.', method: 'Collection-level graph analysis', finding: 'Related work can be surfaced through shared concepts.' },
  { id: 'paper-3', title: 'Evaluating Language Models for Evidence-Based Question Answering', topic: 'Natural Language Processing', year: '2025', description: 'An illustrative record about evaluating answers against research evidence.', method: 'Evidence-alignment evaluation', finding: 'Answer quality depends on the supporting evidence.' },
]

const featureGroups = [
  { id: 'discover', number: '01', icon: 'search', title: 'Research Discovery', description: 'Explore illustrative records and research topics.', items: [['Discover Papers', 'discovery'], ['Search Research Papers', 'search'], ['Browse Research Topics', 'topics']] },
  { id: 'assistant', number: '02', icon: 'spark', title: 'AI Research Assistant', description: 'Question and summarization tools planned for this workspace.', items: [['AI Research Chat', 'chat'], ['Ask Questions About a Paper', 'paper-questions'], ['Research Paper Summarizer', 'summarizer']] },
  { id: 'analysis', number: '03', icon: 'book', title: 'Paper Analysis', description: 'Structured analysis tools planned for future development.', items: [['Understand Research Papers', 'understand'], ['Extract Key Findings', 'findings'], ['Analyze Research Methodology', 'methodology']] },
  { id: 'compare', number: '04', icon: 'compare', title: 'Paper Comparison', description: 'Compare illustrative records side by side.', items: [['Compare Papers', 'compare'], ['Compare Research Methods', 'compare-methods'], ['Compare Results and Findings', 'compare-findings']] },
  { id: 'gaps', number: '05', icon: 'spark', title: 'Research Gap Assistant', description: 'Review an explicitly mock research direction.', items: [['Explore Potential Research Gaps', 'gaps'], ['Identify Study Limitations', 'limitations'], ['Explore Future Research Directions', 'directions']] },
  { id: 'planner', number: '06', icon: 'planner', title: 'Research Planner', description: 'Create a simple plan that stays in page memory.', items: [['Create a Research Plan', 'plan'], ['Organize Research Objectives', 'objectives'], ['Track Research Progress', 'progress']] },
  { id: 'library', number: '07', icon: 'book', title: 'My Research Library', description: 'Interact with sample saved and recent papers.', items: [['View Saved Papers', 'library'], ['Recently Viewed Papers', 'recent'], ['Organize Research Collections', 'collections']] },
  { id: 'workspace', number: '08', icon: 'planner', title: 'Research Workspace', description: 'Review illustrative activity and feature shortcuts.', items: [['Recent Activity', 'activity'], ['Research History', 'history'], ['Quick Actions', 'quick-actions']] },
]

const activity = [
  ['Explored a sample research topic', 'Artificial intelligence in education · Just now'],
  ['Compared two illustrative studies', 'Research methods · Earlier today'],
  ['Started a sample research plan', 'Literature review outline · Yesterday'],
]

const comingSoonItems = new Set(['paper-questions', 'summarizer', 'understand', 'findings', 'methodology'])

function FeatureDemoPanel({ activeFeature, papers, close, setActiveFeature, paperOne, paperTwo, setPaperOne, setPaperTwo, comparisonA, comparisonB, planTitle, planObjective, setPlanTitle, setPlanObjective, plans, handlePlanSubmit, savedIds, setSavedIds, chatQuestion, setChatQuestion, chatNotice, setChatNotice }) {
  const compareView = activeFeature.startsWith('compare')
  const discoveryView = ['discovery', 'search', 'topics'].includes(activeFeature)
  const plannerView = ['plan', 'objectives', 'progress'].includes(activeFeature)
  const libraryView = ['library', 'collections'].includes(activeFeature)
  const workspaceView = ['workspace', 'activity', 'history', 'quick-actions'].includes(activeFeature)
  const gapView = ['gaps', 'limitations', 'directions'].includes(activeFeature)
  const title = activeFeature === 'coming-soon' ? 'Coming soon' : compareView ? 'Compare illustrative papers' : discoveryView ? 'Research discovery preview' : plannerView ? 'Research planner' : libraryView ? 'My research library' : workspaceView ? 'Research workspace' : gapView ? 'Research gap example' : activeFeature === 'chat' ? 'AI research chat prototype' : activeFeature === 'recent' ? 'Recently viewed papers' : 'Feature preview'

  return (
    <section className="feature-demo-panel" id="feature-demo" aria-labelledby="feature-demo-title">
      <div className="dashboard-section-heading"><div><span className="dashboard-kicker">INTERACTIVE DEMO</span><h2 id="feature-demo-title">{title}</h2></div><button className="text-action" type="button" onClick={close}>Close</button></div>
      {discoveryView && <><p className="feature-demo-disclaimer" role="status">Illustrative demo records only. No live papers are searched or verified.</p><div className="demo-paper-list">{papers.map((paper) => <article key={paper.id}><span>{paper.topic} · {paper.year}</span><strong>{paper.title}</strong><p>{paper.description}</p><button className="text-action" type="button" onClick={() => setActiveFeature('library')}>Open in demo library</button></article>)}</div></>}
      {activeFeature === 'recent' && <><p className="feature-demo-disclaimer">These are illustrative recent records, not your real viewing history.</p><div className="demo-paper-list">{papers.map((paper) => <article key={paper.id}><span>{paper.topic} · {paper.year}</span><strong>{paper.title}</strong><p>{paper.description}</p></article>)}</div></>}
      {compareView && <><p className="feature-demo-disclaimer">Mock comparison of illustrative records. These are not verified publications.</p><div className="compare-controls"><label>Paper one<select value={paperOne} onChange={(event) => setPaperOne(event.target.value)}>{papers.map((paper) => <option key={paper.id} value={paper.id}>{paper.title}</option>)}</select></label><label>Paper two<select value={paperTwo} onChange={(event) => setPaperTwo(event.target.value)}>{papers.map((paper) => <option key={paper.id} value={paper.id}>{paper.title}</option>)}</select></label></div>{comparisonA?.id === comparisonB?.id ? <p className="dashboard-feedback">Choose two different illustrative records to compare.</p> : <div className="comparison-grid">{[comparisonA, comparisonB].map((paper) => <article key={paper.id}><span>{paper.topic} · {paper.year}</span><h3>{paper.title}</h3><dl><dt>Illustrative approach</dt><dd>{paper.method}</dd><dt>Illustrative finding</dt><dd>{paper.finding}</dd></dl></article>)}</div>}</>}
      {gapView && <div className="mock-gap-card"><span className="demo-badge"><i /> Mock example · not AI-generated</span><h3>Illustrative direction to investigate</h3><p>These sample records describe ways to surface and evaluate research evidence. A possible question for a real literature review could be how evaluation methods differ across research settings.</p><p className="sample-label">This is a fictional demonstration prompt, not a conclusion from a systematic review.</p></div>}
      {plannerView && <><p className="feature-demo-disclaimer">Plans stay in page memory only and clear when you leave or refresh.</p><form className="plan-form" onSubmit={handlePlanSubmit}><label>Plan title<input value={planTitle} onChange={(event) => setPlanTitle(event.target.value)} placeholder="e.g. Literature review outline" /></label><label>First objective<textarea value={planObjective} onChange={(event) => setPlanObjective(event.target.value)} placeholder="What question will this plan explore?" rows="2" /></label><button className="dashboard-primary-button" type="submit">Add research plan</button></form>{plans.length > 0 && <ul className="plan-list">{plans.map((plan) => <li key={plan.id}><strong>{plan.title}</strong><span>{plan.objective}</span><em>Draft · demo session</em></li>)}</ul>}</>}
      {libraryView && <><p className="feature-demo-disclaimer">Saved state is temporary in this page session. Sample records are illustrative only.</p><div className="demo-paper-list">{papers.map((paper) => <article key={paper.id}><span>{paper.topic} · {paper.year}</span><strong>{paper.title}</strong><p>{paper.description}</p><button className="text-action" type="button" onClick={() => setSavedIds((current) => current.includes(paper.id) ? current.filter((id) => id !== paper.id) : [...current, paper.id])}>{savedIds.includes(paper.id) ? 'Remove from demo saves' : 'Save in demo library'}</button></article>)}</div></>}
      {activeFeature === 'chat' && <><p className="feature-demo-disclaimer">Prototype only. No AI model receives your question or generates an answer.</p><form className="plan-form" onSubmit={(event) => { event.preventDefault(); setChatNotice(chatQuestion.trim() ? 'Chat is not connected to a model. Your question has not been answered or sent anywhere.' : 'Enter a question to preview the prototype.') }}><label>Your question<textarea value={chatQuestion} onChange={(event) => setChatQuestion(event.target.value)} placeholder="Ask a question about a sample paper…" rows="3" /></label><button className="dashboard-primary-button" type="submit">Preview chat</button></form>{chatNotice && <p className="dashboard-feedback" role="status">{chatNotice}</p>}</>}
      {workspaceView && <><p className="feature-demo-disclaimer">Illustrative workspace history; these are not real user activities.</p><ol className="activity-list">{activity.map(([item, detail]) => <li key={item}><span className="activity-dot" /><div><strong>{item}</strong><span>{detail}</span></div></li>)}</ol></>}
      {activeFeature === 'coming-soon' && <p className="feature-demo-disclaimer">This analysis tool is planned but not implemented. It does not perform AI analysis or access a research database.</p>}
    </section>
  )
}

export default function Dashboard({ theme, nextThemeName, onToggleTheme }) {
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [activeFeature, setActiveFeature] = useState('')
  const [paperOne, setPaperOne] = useState(papers[0].id)
  const [paperTwo, setPaperTwo] = useState(papers[1].id)
  const [planTitle, setPlanTitle] = useState('')
  const [planObjective, setPlanObjective] = useState('')
  const [plans, setPlans] = useState([])
  const [savedIds, setSavedIds] = useState(['paper-1', 'paper-2'])
  const [chatQuestion, setChatQuestion] = useState('')
  const [chatNotice, setChatNotice] = useState('')

  const comparisonA = papers.find((paper) => paper.id === paperOne)
  const comparisonB = papers.find((paper) => paper.id === paperTwo)
  const savedPapers = papers.filter((paper) => savedIds.includes(paper.id))

  useEffect(() => {
    if (activeFeature) document.getElementById('feature-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [activeFeature])

  function handleSearch(event) {
    event.preventDefault()
    const topic = query.trim()
    if (!topic) {
      setNotice('Enter a topic to search the illustrative demo records.')
      setSearchResults(null)
      return
    }
    const matches = papers.filter((paper) => `${paper.title} ${paper.topic} ${paper.description}`.toLowerCase().includes(topic.toLowerCase()))
    setSearchResults(matches)
    setNotice('Demo search checks only the illustrative records shown here. It does not query a live research database.')
  }

  function openFeature(action) {
    setNotice('')
    setActiveFeature(comingSoonItems.has(action) ? 'coming-soon' : action)
  }

  function handlePlanSubmit(event) {
    event.preventDefault()
    if (!planTitle.trim() || !planObjective.trim()) {
      setNotice('Add a plan title and at least one objective.')
      return
    }
    setPlans((current) => [...current, { id: Date.now(), title: planTitle.trim(), objective: planObjective.trim() }])
    setPlanTitle('')
    setPlanObjective('')
    setNotice('Plan added for this page session only; it is not saved to an account.')
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
          <div className="dashboard-account"><span className="demo-badge"><i /> Demo workspace</span><span className="dashboard-email">{user?.email}</span><button className="logout-button" type="button" onClick={handleLogout}>Sign Out</button></div>
        </section>

        <aside className="demo-notice" aria-label="Demo authentication notice"><strong>Demo authentication</strong><span>This is a frontend demonstration. Your profile is stored only for this browser session; no account is registered in a secure backend.</span></aside>

        <form className="dashboard-search" onSubmit={handleSearch}>
          <Icon name="search" size={19} />
          <label className="visually-hidden" htmlFor="research-search">Search a research topic</label>
          <input id="research-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a research topic…" />
          <button type="submit">Search</button>
        </form>
        {notice && <p className="dashboard-feedback" role="status">{notice}</p>}
        {searchResults && <section className="search-preview" aria-live="polite"><div className="dashboard-section-heading"><div><span className="dashboard-kicker">DEMO SEARCH · ILLUSTRATIVE DATA</span><h2>Sample matches</h2></div><button className="text-action" type="button" onClick={() => setSearchResults(null)}>Clear</button></div>{searchResults.length ? <ul>{searchResults.map((paper) => <li key={paper.id}><strong>{paper.title}</strong><span>{paper.topic} · Illustrative record</span></li>)}</ul> : <p>No sample records matched “{query.trim()}”. No live search was performed.</p>}</section>}

        <section className="dashboard-summary" aria-label="Sample workspace summary">
          {summaries.map(([label, value, icon]) => <article className="summary-card" key={label}><span className="summary-icon"><Icon name={icon} size={18} /></span><span className="summary-value">{value}</span><span className="summary-label">{label}</span><span className="sample-label">Sample data</span></article>)}
        </section>

        <section className="dashboard-section all-features" aria-labelledby="all-features-title">
          <div className="dashboard-section-heading"><div><span className="dashboard-kicker">YOUR RESEARCH TOOLKIT</span><h2 id="all-features-title">All features</h2></div><span className="sample-label">8 areas · 24 tools</span></div>
          <div className="dashboard-feature-grid">{featureGroups.map((group) => <DashboardFeatureGroup key={group.id} {...group} onOpen={openFeature} />)}</div>
        </section>

        {activeFeature && <FeatureDemoPanel activeFeature={activeFeature} papers={papers} close={() => setActiveFeature('')} setActiveFeature={setActiveFeature} paperOne={paperOne} paperTwo={paperTwo} setPaperOne={setPaperOne} setPaperTwo={setPaperTwo} comparisonA={comparisonA} comparisonB={comparisonB} planTitle={planTitle} planObjective={planObjective} setPlanTitle={setPlanTitle} setPlanObjective={setPlanObjective} plans={plans} handlePlanSubmit={handlePlanSubmit} savedIds={savedIds} setSavedIds={setSavedIds} chatQuestion={chatQuestion} setChatQuestion={setChatQuestion} chatNotice={chatNotice} setChatNotice={setChatNotice} />}

        <section className="dashboard-section" aria-labelledby="recent-papers-title">
          <div className="dashboard-section-heading"><div><span className="dashboard-kicker">PICK UP WHERE YOU LEFT OFF</span><h2 id="recent-papers-title">Recently viewed papers</h2></div><span className="sample-label">Illustrative records</span></div>
          <div className="recent-paper-grid">
            {papers.map((paper) => <article className="recent-paper" key={paper.id}><div className="recent-paper-meta"><span>{paper.topic}</span><time>{paper.year}</time></div><h3>{paper.title}</h3><p>{paper.description}</p><button type="button" className="paper-action" onClick={() => openFeature('discovery')}>View demo details <Icon name="arrow" size={15} /></button></article>)}
          </div>
        </section>

        <section className="dashboard-section saved-papers-section" aria-labelledby="saved-papers-title"><div className="dashboard-section-heading"><div><span className="dashboard-kicker">SESSION ONLY · SAMPLE RECORDS</span><h2 id="saved-papers-title">Saved papers</h2></div><button className="text-action" type="button" onClick={() => openFeature('library')}>Manage library</button></div>{savedPapers.length ? <ul className="saved-paper-list">{savedPapers.map((paper) => <li key={paper.id}><span className="saved-paper-icon"><Icon name="book" size={15} /></span><span><strong>{paper.title}</strong><small>{paper.topic} · Illustrative demo</small></span><button type="button" aria-label={`Remove ${paper.title} from demo saves`} onClick={() => setSavedIds((current) => current.filter((id) => id !== paper.id))}>×</button></li>)}</ul> : <p className="empty-library">No demo saves yet. Open My Research Library to save a sample paper.</p>}</section>

        <div className="dashboard-lower-grid">
          <section className="dashboard-section quick-actions" id="quick-actions" aria-labelledby="quick-actions-title"><div className="dashboard-section-heading"><div><span className="dashboard-kicker">JUMP TO A FEATURE</span><h2 id="quick-actions-title">Quick actions</h2></div></div><div className="action-grid">{[['Discover Papers', 'discover'], ['AI Research Chat', 'assistant'], ['Compare Papers', 'compare'], ['Research Gap Assistant', 'gaps'], ['Research Planner', 'planner'], ['My Research Library', 'library']].map(([label, id]) => <a className="action-card" href={`#${id}`} key={id}><span className="action-icon"><Icon name={id === 'discover' ? 'search' : id === 'compare' ? 'compare' : id === 'planner' ? 'planner' : id === 'library' ? 'book' : 'spark'} size={17} /></span><span>{label}</span><Icon name="arrow" size={14} /></a>)}</div></section>
          <section className="dashboard-section activity-section" id="activity" aria-labelledby="activity-title"><div className="dashboard-section-heading"><div><span className="dashboard-kicker">ILLUSTRATIVE DEMO RECORDS</span><h2 id="activity-title">Recent activity</h2></div><button className="text-action" type="button" onClick={() => openFeature('history')}>Research history</button></div><ol className="activity-list">{activity.map(([title, detail]) => <li key={title}><span className="activity-dot" /><div><strong>{title}</strong><span>{detail}</span></div></li>)}</ol><p className="activity-disclaimer">Activity shown is sample content, not saved research history.</p></section>
        </div>
      </main>
    </>
  )
}
