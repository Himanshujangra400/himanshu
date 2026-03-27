import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile, projects, services, stats } from '../data/portfolioData'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/animations/AnimatedSection'
import TypewriterText from '../components/animations/TypewriterText'

function HomePage() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  const MotionDiv = motion.div
  const MotionArticle = motion.article
  const featuredProjects = projects.slice(0, 2)
  const FloatingProfileCard = motion.div
  const shouldAnimate = !shouldReduceMotion && !isMobileViewport

  const subtleOrbY = useTransform(scrollY, [0, 600], [0, 48])
  const subtleOrbInverseY = useTransform(scrollY, [0, 600], [0, -32])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = (event) => {
      setIsMobileViewport(event.matches)
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange)
    } else {
      media.addListener(onChange)
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', onChange)
      } else {
        media.removeListener(onChange)
      }
    }
  }, [])

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.11,
      },
    },
  }

  const cardFadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const journeySteps = [
    {
      title: 'Started With Curiosity',
      text: 'I began with frontend basics and quickly realized that beautiful screens are useless without reliable systems behind them.',
    },
    {
      title: 'Moved Into Full-Stack Delivery',
      text: 'I started building complete products where UI, API, and data work together under real workflow pressure.',
    },
    {
      title: 'Now Focused on Outcome',
      text: 'Today my goal is simple: ship work that removes chaos, saves time, and creates business confidence.',
    },
  ]

  return (
    <>
      <section className="panel panel-hero relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <MotionDiv
          className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-cyan-200/40 blur-3xl"
          style={shouldAnimate ? { y: subtleOrbY } : undefined}
        />
        <MotionDiv
          className="pointer-events-none absolute -right-8 bottom-4 h-40 w-40 rounded-full bg-emerald-200/35 blur-3xl"
          style={shouldAnimate ? { y: subtleOrbInverseY } : undefined}
        />

        <MotionDiv
          className="mx-auto max-w-5xl"
          initial={shouldAnimate ? { opacity: 0, y: 18 } : undefined}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="section-kicker">Not just another portfolio. This is execution proof.</p>
              <h1 className="headline-gradient mt-4 font-heading text-4xl leading-tight sm:text-6xl">
                <TypewriterText text="I Build Web Products That Remove Operational Chaos." />
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">{profile.shortIntro}</p>
              <p className="mt-3 text-base font-semibold text-slate-800">
                {profile.name} | {profile.tagline}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold text-white">
                  Hire Me for Your Next Build
                </Link>
                <Link to="/projects" className="btn-secondary rounded-xl px-6 py-3 text-sm font-semibold text-slate-800">
                  See Case Studies
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                <span className="case-pill">Fast Iteration</span>
                <span className="case-pill">Business First Thinking</span>
                <span className="case-pill">Production Discipline</span>
              </div>
            </div>

            <FloatingProfileCard
              animate={shouldAnimate ? { y: [0, -8, 0] } : undefined}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto w-fit rounded-3xl border border-slate-200 bg-white p-4"
            >
              <img
                src={profile.photo}
                alt={`${profile.name} profile`}
                width="224"
                height="224"
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 640px) 176px, 224px"
                className="h-44 w-44 rounded-2xl border-4 border-white object-cover sm:h-56 sm:w-56"
              />
            </FloatingProfileCard>
          </div>
        </MotionDiv>
      </section>

      <AnimatedSection className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={0.05}>
        <MotionDiv
          className="contents"
          variants={staggerContainer}
          initial={shouldAnimate ? 'hidden' : undefined}
          whileInView={shouldAnimate ? 'show' : undefined}
          viewport={{ once: true, amount: 0.35 }}
        >
          {stats.map((item) => (
            <MotionArticle key={item.label} className="panel rounded-2xl p-5" variants={cardFadeUp}>
              <p className="font-heading text-3xl text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-600">{item.label}</p>
            </MotionArticle>
          ))}
        </MotionDiv>
      </AnimatedSection>

      <AnimatedSection className="panel panel-contrast rounded-3xl p-6 sm:p-10" delay={0.04}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-kicker">Case Studies</p>
            <h2 className="section-title">From Problem to Measurable Result</h2>
          </div>
          <Link to="/projects" className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-white">
            View Full Case Studies
          </Link>
        </div>

        <MotionDiv
          className="case-grid mt-6"
          variants={staggerContainer}
          initial={shouldAnimate ? 'hidden' : undefined}
          whileInView={shouldAnimate ? 'show' : undefined}
          viewport={{ once: true, amount: 0.25 }}
        >
          {featuredProjects.map((project) => (
            <MotionArticle key={project.title} className="case-card" variants={cardFadeUp}>
              <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                {project.status}
              </p>
              <h3 className="mt-3 font-heading text-2xl text-slate-900">{project.title}</h3>
              <p className="mt-1 text-sm font-semibold text-teal-700">{project.tech}</p>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p><span className="font-bold text-slate-900">Problem:</span> {project.problem}</p>
                <p><span className="font-bold text-slate-900">Solution:</span> {project.solution}</p>
                <p><span className="font-bold text-slate-900">Result:</span> {project.result}</p>
              </div>

              <div className="mt-5 flex gap-3 text-sm font-semibold">
                {project.live !== '#' ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="animated-link rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100"
                  >
                    Live Product
                  </a>
                ) : (
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">Live on request</span>
                )}
                <a href={project.code} target="_blank" rel="noreferrer" className="rounded-lg btn-accent px-3 py-2 text-white">
                  Read Code
                </a>
              </div>
            </MotionArticle>
          ))}
        </MotionDiv>
      </AnimatedSection>

      <AnimatedSection className="panel rounded-3xl p-6 sm:p-10" delay={0.04}>
        <p className="section-kicker">Why I Build</p>
        <h2 className="section-title">My Journey Is About Solving Real Operational Pain</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          I am obsessed with the moment when a team says, "this workflow finally feels easy." That is the standard I build for.
        </p>

        <MotionDiv
          className="mt-6 grid gap-4 md:grid-cols-3"
          variants={staggerContainer}
          initial={shouldAnimate ? 'hidden' : undefined}
          whileInView={shouldAnimate ? 'show' : undefined}
          viewport={{ once: true, amount: 0.22 }}
        >
          {journeySteps.map((step) => (
            <MotionArticle key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
              <h3 className="font-heading text-xl text-slate-900">{step.title}</h3>
              <p className="mt-2 text-slate-700">{step.text}</p>
            </MotionArticle>
          ))}
        </MotionDiv>
      </AnimatedSection>

      <AnimatedSection className="panel rounded-3xl p-6 sm:p-10" delay={0.04}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-kicker">How I Work</p>
            <h2 className="section-title">Clarity, Speed, and Reliable Shipping</h2>
          </div>
          <Link to="/about" className="btn-secondary rounded-lg px-4 py-2 text-sm font-semibold text-slate-700">
            See Full Approach
          </Link>
        </div>

        <MotionDiv
          className="mt-6 grid gap-4 md:grid-cols-3"
          variants={staggerContainer}
          initial={shouldAnimate ? 'hidden' : undefined}
          whileInView={shouldAnimate ? 'show' : undefined}
          viewport={{ once: true, amount: 0.25 }}
        >
          {services.map((service) => (
            <MotionArticle key={service.title} className="rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
              <h3 className="font-heading text-xl text-slate-900">{service.title}</h3>
              <p className="mt-2 text-slate-700">{service.detail}</p>
            </MotionArticle>
          ))}
        </MotionDiv>
      </AnimatedSection>

      <AnimatedSection className="cta-band rounded-3xl p-6 text-center sm:p-10" delay={0.02}>
        <p className="section-kicker section-kicker-contrast">Ready to Build</p>
        <h2 className="font-heading text-3xl text-white sm:text-5xl">If You Need a Builder Who Delivers, Let Us Talk.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-200">
          I can help you ship faster, simplify workflows, and launch with confidence.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
            Start a Conversation
          </Link>
          <a href={profile.resumeUrl} download className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
            Download Resume
          </a>
        </div>
        <p className="mt-5 text-sm font-semibold text-cyan-100">I build calm systems for chaotic problems.</p>
      </AnimatedSection>
    </>
  )
}

export default HomePage
