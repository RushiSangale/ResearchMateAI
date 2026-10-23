import FeatureCard from '../components/FeatureCard.jsx'
import Icon from '../components/Icon.jsx'
import '../styles/Home.css'

const features = [
  { id: 'discover', number: '01', icon: 'search', iconClass: 'icon-blue', title: 'Discover Research', description: 'Explore relevant research topics and organize the papers that matter to your work.' },
  { id: 'understand', number: '02', icon: 'book', iconClass: 'icon-rose', title: 'Understand Papers', description: 'Explore abstracts, methodologies, findings, and limitations through a structured interface.' },
  { id: 'compare', number: '03', icon: 'compare', iconClass: 'icon-lavender', title: 'Compare Studies', description: 'Compare research problems, approaches, findings, and limitations side by side.' },
  { id: 'gaps', number: '04', icon: 'spark', iconClass: 'icon-blue', title: 'Explore Research Gaps', description: 'Investigate potential unanswered questions and use evidence to shape your next research direction.' },
]

const papers = [
  { type: 'AI RESEARCH', year: '2025', title: 'Retrieval-Augmented Generation for Scientific Literature', variant: 'paper-back' },
  { type: 'INFORMATION RETRIEVAL', year: '2024', title: 'Knowledge Discovery in Large Research Collections', variant: 'paper-front' },
  { type: 'NATURAL LANGUAGE PROCESSING', year: '2025', title: 'Evaluating Language Models for Evidence-Based Question Answering', variant: 'paper-top' },
]

const steps = [
  ['01', 'Discover', 'Explore papers relevant to your research topic.'],
  ['02', 'Understand', 'Examine key ideas, methodology, findings, and limitations.'],
  ['03', 'Compare', 'Identify similarities and differences between selected studies.'],
  ['04', 'Plan', 'Develop a preliminary research direction from available evidence.'],
]

function PaperCard({ paper }) {
  return (
    <article className={`paper-card ${paper.variant}`}>
      <div className="paper-card-top"><span className="paper-icon"><Icon name="document" size={15} /></span><span className="paper-year">{paper.year}</span></div>
      <span className="paper-category">{paper.type}</span>
      <h3>{paper.title}</h3>
      <div className="paper-lines" aria-hidden="true"><i /><i /><i /></div>
      <div className="paper-mini-chart" aria-hidden="true"><span /><span /><span /><span /><span /></div>
    </article>
  )
}

export default function Home({ themeName }) {
  return (
    <>
      <main className="home-main">
        <section className="welcome" aria-labelledby="welcome-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="welcome-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> YOUR RESEARCH, REIMAGINED</span>
            <h1 id="welcome-title">Turn Research Papers Into Your <span>Next Big Idea.</span></h1>
            <p className="intro">Discover research, understand complex ideas, compare scientific studies, and explore potential research gaps — all in one intelligent workspace.</p>
            <div className="welcome-actions">
              <a className="button button-primary" href="/signup">Get Started <Icon name="arrow" size={17} /></a>
              <a className="button button-secondary" href="#features">Explore Features</a>
            </div>
            <div className="trust-note"><span className="trust-icon"><Icon name="book" size={14} /></span> Built to support your research journey.</div>
          </div>
          <div className="hero-visual" aria-label="Illustrative research papers in a digital workspace">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="science-note note-equation">P(A|B) = P(B|A)P(A) / P(B)</div>
            <div className="science-note note-axis">METHOD · EVIDENCE · INSIGHT</div>
            <div className="network-node node-one" /><div className="network-node node-two" /><div className="network-node node-three" />
            {papers.map((paper) => <PaperCard key={paper.title} paper={paper} />)}
            <div className="visual-caption"><span className="caption-dot" /> A workspace for ideas in progress</div>
          </div>
        </section>

        <section className="features" id="features" aria-labelledby="features-title">
          <div className="section-heading">
            <div><span className="section-kicker">ONE WORKSPACE. EVERY POSSIBILITY.</span><h2 id="features-title">From scattered papers to structured insights.</h2><p>Bring discovery, understanding, comparison, and planning into one research workflow.</p></div>
          </div>
          <div className="feature-grid">
            {features.map((feature) => <FeatureCard key={feature.id} {...feature} />)}
          </div>
        </section>

        <section className="workflow" id="assistant" aria-labelledby="workflow-title">
          <div className="workflow-heading"><span className="section-kicker">A CLEARER WAY FORWARD</span><h2 id="workflow-title">A research workflow that moves with you.</h2><p>Go from a first question to a direction you can explore.</p></div>
          <ol className="workflow-steps">
            {steps.map(([number, title, description]) => <li className="workflow-step" key={number} id={number === '03' ? 'compare-step' : number === '04' ? 'planner' : undefined}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></li>)}
          </ol>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="cta-decoration" aria-hidden="true"><span /><span /><span /></div>
          <div className="cta-copy"><span className="section-kicker">MAKE ROOM FOR THE NEXT QUESTION</span><h2 id="cta-title">Your next research idea starts here.</h2><p>Build a clearer path from curiosity to a structured research plan.</p></div>
          <a className="button button-primary" href="/signup">Get Started <Icon name="arrow" size={17} /></a>
        </section>
      </main>
      <footer className="site-footer"><a className="footer-brand" href="#dashboard">ResearchMate<span> AI</span></a><span>Built to support your research journey.</span><span className="theme-indicator"><i /> {themeName}</span></footer>
    </>
  )
}
