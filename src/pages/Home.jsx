import { useEffect, useState } from 'react'
import FeatureCard from '../components/FeatureCard.jsx'
import Icon from '../components/Icon.jsx'
import '../styles/Home.css'

const features = [
  { number: '01', icon: 'search', iconClass: 'icon-blue', title: 'Research Paper Discovery', description: 'Discover relevant research for your topic and explore paper collections.' },
  { number: '02', icon: 'spark', iconClass: 'icon-rose', title: 'AI Research Assistant', description: 'Ask questions about research papers and understand complex concepts.' },
  { number: '03', icon: 'analysis', iconClass: 'icon-lavender', title: 'Paper Analysis', description: 'Extract research objectives, understand methodologies, explore key findings, and identify limitations in academic papers.' },
  { number: '04', icon: 'compare', iconClass: 'icon-lavender', title: 'Paper Comparison', description: 'Compare research approaches, methods, findings, and limitations.' },
  { number: '05', icon: 'spark', iconClass: 'icon-blue', title: 'Research Gap Assistant', description: 'Explore potential research gaps and possible future research directions.' },
  { number: '06', icon: 'planner', iconClass: 'icon-lavender', title: 'Research Planner', description: 'Organize research objectives, milestones, and your research workflow.' },
  { number: '07', icon: 'book', iconClass: 'icon-rose', title: 'Research Library', description: 'Keep track of saved papers and organize research materials.' },
]

const papers = [
  { type: 'AI RESEARCH', year: '2025', title: 'Retrieval-Augmented Generation for Scientific Literature', variant: 'paper-back' },
  { type: 'INFORMATION RETRIEVAL', year: '2024', title: 'Knowledge Discovery in Large Research Collections', variant: 'paper-front' },
  { type: 'NATURAL LANGUAGE PROCESSING', year: '2025', title: 'Evaluating Language Models for Evidence-Based Question Answering', variant: 'paper-top' },
]
const steps = [
  ['01', 'DISCOVER', 'Research Paper Discovery', 'Search and discover relevant academic papers based on your research topic and interests.', 'search'],
  ['02', 'UNDERSTAND', 'AI Research Assistant', 'Explore complex research concepts, ask questions, and understand key ideas in academic papers.', 'spark'],
  ['03', 'ANALYZE', 'Paper Analysis', 'Examine research objectives, methodologies, key findings, and study limitations.', 'document'],
  ['04', 'COMPARE', 'Paper Comparison', 'Compare multiple research papers to understand similarities, differences, and research approaches.', 'compare'],
  ['05', 'IDENTIFY', 'Research Gap Assistant', 'Investigate potential research gaps, limitations, and opportunities for future research.', 'target'],
  ['06', 'PLAN', 'Research Planner', 'Organize research objectives, methodology, milestones, and planned activities.', 'planner'],
  ['07', 'ORGANIZE', 'Research Library', 'Save relevant papers and organize research materials in one place.', 'book'],
]

const highlights = [
  ['01 — Simplify Research', 'Make complex research papers easier to understand through structured explanations and AI-assisted insights.'],
  ['02 — Connect Research Ideas', 'Explore relationships between existing studies, compare methodologies, and investigate potential research gaps.'],
  ['03 — Organize Your Journey', 'Manage research papers, organize objectives, and plan research activities in one workspace.'],
]

const reasons = [
  ['document', 'RESEARCH IN ONE PLACE', 'Discover, save, and organize research materials without switching between disconnected workflows.'],
  ['spark', 'BETTER UNDERSTANDING', 'Explore research papers through structured explanations and AI-assisted assistance.'],
  ['compare', 'CONNECTED INSIGHTS', 'Compare existing studies and investigate potential research gaps and future directions.'],
  ['planner', 'ORGANIZED PLANNING', 'Turn research ideas into structured objectives and organized research plans.'],
]

function PaperCard({ paper }) {
  return <article className={`paper-card ${paper.variant}`}><div className="paper-card-top"><span className="paper-icon"><Icon name="document" size={15} /></span><span className="paper-year">{paper.year}</span></div><span className="paper-category">{paper.type}</span><h3>{paper.title}</h3><div className="paper-lines" aria-hidden="true"><i /><i /><i /></div><div className="paper-mini-chart" aria-hidden="true"><span /><span /><span /><span /><span /></div></article>
}

function ContactForm() {
  const [feedback, setFeedback] = useState('')
  const [errors, setErrors] = useState({})
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const nextErrors = {}
    for (const name of ['name', 'email', 'subject', 'message']) if (!String(values[name] || '').trim()) nextErrors[name] = 'This field is required.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setFeedback(''); return }
    setFeedback('Thank you. Your message is ready in this frontend demo, but has not been sent to a server.')
    form.reset()
  }
  const error = (name) => errors[name] && <span className="field-error" id={`${name}-error`}>{errors[name]}</span>
  const clearError = (name) => setErrors((current) => ({ ...current, [name]: '' }))
  return <form className="contact-form" noValidate onSubmit={handleSubmit}>
    <div className="contact-fields"><label>Full Name<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} onChange={() => clearError('name')} />{error('name')}</label><label>Email Address<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} onChange={() => clearError('email')} />{error('email')}</label></div>
    <label>Subject<input name="subject" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} onChange={() => clearError('subject')} />{error('subject')}</label><label>Message<textarea name="message" rows="5" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} onChange={() => clearError('message')} />{error('message')}</label>
    {feedback && <p className="contact-feedback" role="status">{feedback}</p>}
    <button className="button button-primary" type="submit">Send message <Icon name="arrow" size={17} /></button>
  </form>
}

export default function Home({ themeName }) {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }, [])

  return <>
    <main className="home-main">
      <section className="welcome" id="home" aria-labelledby="welcome-title">
        <div className="hero-grid" aria-hidden="true" /><div className="welcome-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> YOUR RESEARCH, REIMAGINED</span>
          <h1 id="welcome-title">Turn Research Papers Into Your <span>Next Big Idea.</span></h1>
          <p className="intro">ResearchMate AI brings research discovery, paper understanding, comparison, and planning into one clear workspace for students and researchers.</p>
          <div className="welcome-actions"><a className="button button-primary" href="/signup">Get Started <Icon name="arrow" size={17} /></a><a className="button button-secondary" href="#features">Explore Features</a></div>
          <div className="trust-note"><span className="trust-icon"><Icon name="book" size={14} /></span> Built to support your research journey.</div>
        </div>
        <div className="hero-visual" aria-label="Illustrative research papers in a digital workspace"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="science-note note-equation">P(A|B) = P(B|A)P(A) / P(B)</div><div className="science-note note-axis">METHOD · EVIDENCE · INSIGHT</div><div className="network-node node-one" /><div className="network-node node-two" /><div className="network-node node-three" />{papers.map((paper) => <PaperCard key={paper.title} paper={paper} />)}<div className="visual-caption"><span className="caption-dot" /> A workspace for ideas in progress</div></div>
      </section>

      <section className="features" id="features" aria-labelledby="features-title"><div className="section-heading"><div><span className="section-kicker">ONE WORKSPACE. EVERY POSSIBILITY.</span><h2 id="features-title">From scattered papers to structured insights.</h2><p>Explore the tools designed to make every stage of your research feel more manageable.</p></div></div><div className="feature-grid">{features.map((feature) => <FeatureCard key={feature.number} {...feature} />)}</div></section>

      <section className="workflow" id="how-it-works" aria-labelledby="workflow-title"><div className="workflow-heading"><span className="section-kicker">A CLEARER WAY FORWARD</span><h2 id="workflow-title">Your Research Journey, Simplified.</h2><p>From discovering academic literature to organizing your research plan, ResearchMate AI helps you move through every stage of your research journey.</p></div><ol className="workflow-steps">{steps.map(([number, title, feature, description, icon]) => <li className="workflow-step" key={number}><span className="step-number">{number}</span><span className="workflow-icon"><Icon name={icon} size={23} /></span><span className="step-label">STEP {number}</span><h3>{title}</h3><h4>{feature}</h4><p>{description}</p><a className="step-action" href="/signup" aria-label={`Sign up to use ${feature}`}>Explore this feature <Icon name="arrow" size={14} /></a></li>)}</ol></section>

      <section className="about-section" id="about" aria-labelledby="about-title"><div className="about-copy"><span className="section-kicker">RESEARCH, MADE MORE APPROACHABLE</span><h2 id="about-title">Making Research Smarter, Simpler and More Connected.</h2><p className="about-intro">ResearchMate AI is an intelligent research assistance platform designed to help students and researchers explore academic literature, analyze and understand complex research papers, compare existing studies, investigate potential research gaps, and organize their research journey.</p><div className="about-highlights">{highlights.map(([title, description]) => <article className="about-highlight" key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></div><div className="research-illustration" aria-label="ResearchMate workspace showing a paper, AI analysis, comparison, research gaps, and planning cards"><div className="illustration-window"><div className="window-top"><span className="window-brand"><Icon name="book" size={14} /> ResearchMate AI</span><span className="window-dots"><i /><i /><i /></span></div><div className="workspace-paper"><div className="ui-label">RESEARCH PAPER</div><div className="ui-paper-title">Mapping emerging ideas in research</div><div className="ui-lines"><i /><i /><i /></div><div className="paper-tag">Literature review · 2025</div></div><div className="analysis-panel"><span className="ui-label"><Icon name="spark" size={12} /> AI ANALYSIS</span><p>Key findings and methods, organized for a clearer read.</p><div className="analysis-bars"><i /><i /><i /></div></div><div className="comparison-panel"><span className="ui-label">PAPER COMPARISON</span><div className="compare-row"><span>Study A</span><i /><b>Method</b></div><div className="compare-row"><span>Study B</span><i /><b>Findings</b></div></div><div className="gap-panel"><span className="gap-dot" /><span><b>Potential gap</b><small>Opportunity for further study</small></span></div><div className="planning-panel"><span className="ui-label">RESEARCH PLAN</span><div><i />Define objectives</div><div><i />Organize milestones</div></div></div></div></section>

      <section className="why-section" aria-labelledby="why-title"><div className="why-heading"><span className="section-kicker">BUILT AROUND YOUR RESEARCH</span><h2 id="why-title">Why Choose ResearchMate AI?</h2><p>Bring important research activities together in a single, organized workspace.</p></div><div className="why-grid">{reasons.map(([icon, title, description], index) => <a className="why-card" href="/signup" key={title} aria-label={`${title}: sign up to get started`}><span className="why-icon"><Icon name={icon} size={30} /></span><span className="why-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p><span className="why-arrow"><Icon name="arrow" size={17} /></span></a>)}</div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-intro"><span className="section-kicker">WE’D LIKE TO HEAR FROM YOU</span><h2 id="contact-title">Let’s Connect.</h2><p>Questions, feedback, or suggestions? We’d be glad to hear what’s on your mind.</p><ul className="contact-highlights"><li><span><Icon name="spark" size={17} /></span>Questions about ResearchMate AI</li><li><span><Icon name="compare" size={17} /></span>Feedback and suggestions</li><li><span><Icon name="document" size={17} /></span>Project-related inquiries</li></ul><p className="contact-disclosure">This form is a frontend prototype. Messages are not sent to a server.</p></div><ContactForm /></section>

      <section className="final-cta" aria-labelledby="cta-title"><div className="cta-decoration" aria-hidden="true"><span /><span /><span /></div><div className="cta-copy"><span className="section-kicker">MAKE ROOM FOR THE NEXT QUESTION</span><h2 id="cta-title">Your next research idea starts here.</h2><p>Build a clearer path from curiosity to a structured research plan.</p></div><a className="button button-primary" href="/signup">Get Started <Icon name="arrow" size={17} /></a></section>
    </main>
    <footer className="site-footer"><div className="footer-main"><a className="footer-brand" href="#home"><span className="footer-brand-mark"><Icon name="book" size={18} /></span>ResearchMate<span> AI</span></a><p>An intelligent research workspace to explore literature, connect ideas, and organize your journey.</p></div><nav className="footer-links" aria-label="Footer navigation"><a href="#home">Home</a><a href="#features">Features</a><a href="#how-it-works">How It Works</a><a href="#about">About</a><a href="#contact">Contact</a></nav><div className="footer-bottom"><span>© {new Date().getFullYear()} ResearchMate AI</span><span className="theme-indicator"><i /> {themeName}</span></div></footer>
  </>
}
