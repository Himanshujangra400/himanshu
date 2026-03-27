import { motion, useReducedMotion } from 'framer-motion'
import { achievements, experience, processSteps, roadmap, services, skills, strengths } from '../data/portfolioData'
import AnimatedSection from '../components/animations/AnimatedSection'

function AboutPage() {
  const shouldReduceMotion = useReducedMotion()
  const MotionDiv = motion.div
  const MotionArticle = motion.article

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
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

  return (
    <>
      <AnimatedSection className="panel panel-contrast rounded-3xl p-6 sm:p-10">
        <p className="section-kicker">The Story Behind The Work</p>
        <h2 className="section-title">I Build for Teams Who Need Clarity, Not Complexity</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
          My journey started with code curiosity, but the mission became clear when I saw how confusing tools slow real teams down.
          I now build products that make daily operations cleaner, faster, and easier to trust.
        </p>

        <MotionDiv
          className="mt-6 grid gap-4 md:grid-cols-2"
          variants={staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.25 }}
        >
          <MotionArticle className="rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
            <h3 className="font-heading text-xl text-slate-900">What I am Known For</h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              {strengths.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </MotionArticle>

          <MotionArticle className="rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
            <h3 className="font-heading text-xl text-slate-900">Recent Wins</h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              {achievements.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </MotionArticle>
        </MotionDiv>
      </AnimatedSection>

      <AnimatedSection className="panel rounded-3xl p-6 sm:p-10" delay={0.03}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Services</p>
            <h2 className="section-title">How I Create Value</h2>
            <MotionDiv
              className="mt-6 grid gap-4"
              variants={staggerContainer}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'show'}
              viewport={{ once: true, amount: 0.25 }}
            >
              {services.map((service) => (
                <MotionArticle key={service.title} className="rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
                  <h3 className="font-heading text-xl text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-slate-700">{service.detail}</p>
                </MotionArticle>
              ))}
            </MotionDiv>
          </div>

          <div>
            <p className="section-kicker">Experience</p>
            <h2 className="section-title">Execution Track Record</h2>
            <MotionDiv
              className="mt-6 grid gap-4"
              variants={staggerContainer}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'show'}
              viewport={{ once: true, amount: 0.25 }}
            >
              {experience.map((item) => (
                <MotionArticle key={item.role} className="rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.period}</p>
                  <h3 className="mt-1 font-heading text-xl text-slate-900">{item.role}</h3>
                  <p className="mt-1 text-sm font-semibold text-teal-700">{item.type}</p>
                  <p className="mt-3 text-slate-700">{item.impact}</p>
                </MotionArticle>
              ))}
            </MotionDiv>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="panel rounded-3xl p-6 sm:p-10" delay={0.03}>
        <p className="section-kicker">Process</p>
        <h2 className="section-title">Simple Process, Strong Outcomes</h2>

        <MotionDiv
          className="mt-6 grid gap-4 md:grid-cols-2"
          variants={staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.25 }}
        >
          {processSteps.map((step, index) => (
            <MotionArticle key={step} className="rounded-2xl border border-slate-200 bg-white p-5" variants={cardFadeUp}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Step {index + 1}</p>
              <p className="mt-2 text-slate-700">{step}</p>
            </MotionArticle>
          ))}
        </MotionDiv>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="font-heading text-xl text-slate-900">Tech Stack I Use to Ship</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="panel rounded-3xl p-6 sm:p-10" delay={0.03}>
        <p className="section-kicker">Journey Timeline</p>
        <h2 className="section-title">How My Focus Evolved</h2>
        <MotionDiv
          className="mt-6 space-y-4"
          variants={staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.25 }}
        >
          {roadmap.map((item) => (
            <MotionDiv key={item.period} className="rounded-2xl border border-slate-200 bg-white p-4" variants={cardFadeUp}>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{item.period}</p>
              <p className="mt-1 font-heading text-lg text-slate-900">{item.title}</p>
              <p className="mt-2 text-slate-700">{item.summary}</p>
            </MotionDiv>
          ))}
        </MotionDiv>
      </AnimatedSection>
    </>
  )
}

export default AboutPage
