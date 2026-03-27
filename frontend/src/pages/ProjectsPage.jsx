import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/portfolioData'
import AnimatedSection from '../components/animations/AnimatedSection'
import TiltCard from '../components/animations/TiltCard'

function ProjectsPage() {
  const shouldReduceMotion = useReducedMotion()
  const MotionDiv = motion.div

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const cardFadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <AnimatedSection className="panel panel-contrast rounded-3xl p-6 sm:p-10">
      <p className="section-kicker">Case Study Portfolio</p>
      <h2 className="section-title">Every Project Answers One Question: Why Hire Me?</h2>
      <p className="mt-3 max-w-3xl text-slate-700">
        I focus on business problems, execution clarity, and outcomes teams can feel in daily work.
      </p>

      <MotionDiv
        className="mt-6 grid gap-5 lg:grid-cols-2"
        variants={staggerContainer}
        initial={shouldReduceMotion ? undefined : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'show'}
        viewport={{ once: true, amount: 0.18 }}
      >
        {projects.map((project) => (
          <MotionDiv key={project.title} variants={cardFadeUp}>
            <TiltCard className="group h-full rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                    {project.status}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl text-slate-900">{project.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-teal-700">{project.tech}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
                <p><span className="font-bold text-slate-900">Problem:</span> {project.problem}</p>
                <p><span className="font-bold text-slate-900">Solution:</span> {project.solution}</p>
                <p><span className="font-bold text-slate-900">Result:</span> {project.result}</p>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {project.highlights.map((point) => (
                  <li key={point} className="case-pill">{point}</li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
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
                {project.code !== '#' ? (
                  <a href={project.code} target="_blank" rel="noreferrer" className="rounded-lg btn-accent px-3 py-2 text-white">
                    Source Code
                  </a>
                ) : (
                  <span className="rounded-lg bg-slate-100 px-3 py-2 text-slate-500">Code on request</span>
                )}
              </div>
            </TiltCard>
          </MotionDiv>
        ))}
      </MotionDiv>
    </AnimatedSection>
  )
}

export default ProjectsPage
