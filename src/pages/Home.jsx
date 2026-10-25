import { useEffect, useState } from 'react'
import FeatureCard from '../components/FeatureCard.jsx'
import Icon from '../components/Icon.jsx'
import '../styles/Home.css'

const features = [
  { number: '01', icon: 'search', iconClass: 'icon-blue', title: 'Research Paper Discovery', description: 'Discover relevant research for your topic and explore paper collections.' },
  { number: '02', icon: 'spark', iconClass: 'icon-rose', title: 'AI Research Assistant', description: 'Ask questions about research papers and understand complex concepts.' },
  { number: '03', icon: 'compare', iconClass: 'icon-lavender', title: 'Paper Comparison', description: 'Compare research approaches, methods, findings, and limitations.' },
  { number: '04', icon: 'spark', iconClass: 'icon-blue', title: 'Research Gap Assistant', description: 'Explore potential research gaps and possible future research directions.' },
  { number: '05', icon: 'planner', iconClass: 'icon-lavender', title: 'Research Planner', description: 'Organize research objectives, milestones, and your research workflow.' },
  { number: '06', icon: 'book', iconClass: 'icon-rose', title: 'Research Library', description: 'Keep track of saved papers and organize research materials.' },
]

const papers = [
  { type: 'AI RESEARCH', year: '2025', title: 'Retrieval-Augmented Generation for Scientific Literature', variant: 'paper-back' },
  { type: 'INFORMATION RETRIEVAL', year: '2024', title: 'Knowledge Discovery in Large Research Collections', variant: 'paper-front' },
  { type: 'NATURAL LANGUAGE PROCESSING', year: '2025', title: 'Evaluating Language Models for Evidence-Based Question Answering', variant: 'paper-top' },
]
const steps = [
  ['01', 'Discover', 'Find relevant research papers for the questions you want to explore.'],
  ['02', 'Understand', 'Explore the key ideas and findings in each paper.'],
  ['03', 'Compare', 'Examine methods and results across related papers.'],
  ['04', 'Plan', 'Organize your next research steps and objectives.'],
]

function PaperCard({ paper }) {
  return <article className={`paper-card ${paper.variant}`}><div className="paper-card-top"><span className="paper-icon"><Icon name="document" size={15} /></span><span className="paper-year">{paper.year}</span></div><span className="paper-category">{paper.type}</span><h3>{paper.title}</h3><div className="paper-lines" aria-hidden="true"><i /><i /><i /></div><div className="paper-mini-chart" aria-hidden="true"><span /><span /><span /><span /><span /></div></article>
}

function ContactForm() {
  const [feedback, setFeedback] = useState('')
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setFeedback('Thank you! This is a frontend demo. Your message has not been sent to a server.')
    form.reset()
  }
  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-fields"><label>Full Name<input name="name" autoComplete="name" required /></label><label>Email Address<input name="email" type="email" autoComplete="email" required /></label></div>
    <label>Subject<input name="subject" required /></label><label>Message<textarea name="message" rows="5" required /></label>
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

      <section className="about-section" id="about" aria-labelledby="about-title"><div className="about-copy"><span className="section-kicker">RESEARCH, MADE MORE APPROACHABLE</span><h2 id="about-title">A clearer way to move from curiosity to understanding.</h2><p>ResearchMate AI is a research companion designed to help students and researchers navigate the growing landscape of academic work.</p><p>Finding relevant papers, making sense of complex ideas, and keeping research materials organized can take time and attention. ResearchMate AI aims to bring those parts of the process together in one workspace, making discovery, understanding, and organization easier.</p></div><div className="about-aside"><span className="about-mark"><Icon name="book" size={30} /></span><h3>Make space for better questions.</h3><p>Spend less time juggling the research process and more time exploring the ideas that matter to you.</p><a href="#features" className="text-link">Explore what’s possible <Icon name="arrow" size={15} /></a></div></section>

      <section className="workflow" id="how-it-works" aria-labelledby="workflow-title"><div className="workflow-heading"><span className="section-kicker">A CLEARER WAY FORWARD</span><h2 id="workflow-title">Four steps from a question to a plan.</h2><p>Move through a research workflow that helps turn reading into thoughtful next steps.</p></div><ol className="workflow-steps">{steps.map(([number, title, description]) => <li className="workflow-step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-intro"><span className="section-kicker">WE’D LIKE TO HEAR FROM YOU</span><h2 id="contact-title">Get in touch.</h2><p>Have a question or feedback about ResearchMate AI? Leave a message below.</p><div className="contact-note"><Icon name="spark" size={18} /> This demo form does not send messages to a server.</div></div><ContactForm /></section>

      <section className="final-cta" aria-labelledby="cta-title"><div className="cta-decoration" aria-hidden="true"><span /><span /><span /></div><div className="cta-copy"><span className="section-kicker">MAKE ROOM FOR THE NEXT QUESTION</span><h2 id="cta-title">Your next research idea starts here.</h2><p>Build a clearer path from curiosity to a structured research plan.</p></div><a className="button button-primary" href="/signup">Get Started <Icon name="arrow" size={17} /></a></section>
    </main>
    <footer className="site-footer"><div className="footer-main"><a className="footer-brand" href="#home">ResearchMate<span> AI</span></a><p>A workspace to support your research journey.</p></div><nav className="footer-links" aria-label="Footer navigation"><a href="#home">Home</a><a href="#features">Features</a><a href="#about">About</a><a href="#contact">Contact</a></nav><div className="footer-bottom"><span>© {new Date().getFullYear()} ResearchMate AI</span><span className="theme-indicator"><i /> {themeName}</span></div></footer>
  </>
}
