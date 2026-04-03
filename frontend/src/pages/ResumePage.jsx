import { profile, resumeCertifications, resumeEducation, resumeExperience, resumeHighlights, resumeProjects, resumeSkillGroups, resumeSummary } from '../data/portfolioData'

function ResumePage() {
  const onPrintResume = () => {
    window.print()
  }

  return (
    <section className="resume-shell panel rounded-3xl p-4 sm:p-8 lg:p-10">
      <div className="resume-action-bar mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">ATS-friendly resume</p>
        <button type="button" onClick={onPrintResume} className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-white">
          Download PDF
        </button>
      </div>

      <article className="resume-canvas mx-auto max-w-5xl">
        <header className="resume-header grid gap-5 border-b border-slate-300 pb-6 md:grid-cols-[1.35fr_1fr]">
          <div>
            <h1 className="font-heading text-3xl text-slate-900 sm:text-4xl">{profile.name}</h1>
            <p className="mt-2 text-lg font-semibold text-teal-800">{profile.title}</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">{resumeSummary}</p>
          </div>

          <div className="resume-contact-panel rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Contact</p>
            <p className="mt-3">Email: {profile.email}</p>
            <p className="mt-1">Phone: {profile.phone}</p>
            <p className="mt-1">Location: Karnal, Haryana, India</p>
            <p className="mt-1 break-all">GitHub: github.com/gauravkataria00</p>
            <p className="mt-1 break-all">Portfolio: frontend-theta-nine-65.vercel.app</p>
          </div>
        </header>

        <div className="resume-grid mt-7 grid gap-7 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="space-y-7">
            <section className="resume-section">
              <h2 className="resume-heading">Professional Experience</h2>
              <div className="mt-4 space-y-5">
                {resumeExperience.map((item) => (
                  <article key={`${item.role}-${item.period}`} className="resume-card rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading text-xl text-slate-900">{item.role}</h3>
                      <p className="text-sm font-semibold text-slate-500">{item.period}</p>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-teal-800">{item.company}</p>
                    <ul className="mt-3 space-y-2 text-slate-700">
                      {item.bullets.map((point) => (
                        <li key={point} className="resume-bullet-item">
                          <span className="resume-bullet-dot" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-section">
              <h2 className="resume-heading">Selected Projects</h2>
              <div className="mt-4 space-y-5">
                {resumeProjects.map((project) => (
                  <article key={project.name} className="resume-card rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-heading text-xl text-slate-900">{project.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-teal-800">{project.stack}</p>
                    <ul className="mt-3 space-y-2 text-slate-700">
                      {project.bullets.map((point) => (
                        <li key={point} className="resume-bullet-item">
                          <span className="resume-bullet-dot" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-7">
            <section className="resume-section resume-side-block rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="resume-heading">Core Skills</h2>
              <div className="mt-4 space-y-4">
                {resumeSkillGroups.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{group.title}</p>
                    <p className="mt-1 text-slate-700">{group.items.join(' | ')}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section resume-side-block rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="resume-heading">Education</h2>
              <div className="mt-4 space-y-4">
                {resumeEducation.map((item) => (
                  <div key={item.degree}>
                    <p className="font-heading text-lg text-slate-900">{item.degree}</p>
                    <p className="text-sm font-semibold text-teal-800">{item.institution}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.period}</p>
                    <p className="mt-2 text-slate-700">{item.details}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section resume-side-block rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="resume-heading">Certifications</h2>
              <ul className="mt-4 space-y-2 text-slate-700">
                {resumeCertifications.map((item) => (
                  <li key={item} className="resume-bullet-item">
                    <span className="resume-bullet-dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-section resume-side-block rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="resume-heading">Highlights</h2>
              <ul className="mt-4 space-y-2 text-slate-700">
                {resumeHighlights.map((item) => (
                  <li key={item} className="resume-bullet-item">
                    <span className="resume-bullet-dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </section>
  )
}

export default ResumePage
