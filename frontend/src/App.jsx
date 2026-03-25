import { useState } from 'react'

const profile = {
  name: 'Gaurav',
  title: 'BCA 2nd Year Student | Full Stack Developer',
  shortIntro:
    'I build modern web apps using React, Tailwind CSS, Node.js, and MongoDB with focus on clean UI and practical backend APIs.',
  photo: '/profile-photo.svg',
  resumeUrl: '/resume.pdf',
  location: 'Dacher (Karnal)',
  college: 'Buddha College, Rambha, Karnal',
}

const skills = [
  'C++',
  'JavaScript',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Tailwind CSS',
  'Git & GitHub',
]

const projects = [
  {
    title: 'Smart Attendance System',
    tech: 'React, Node.js, MongoDB',
    description:
      'Web app to track attendance with role-based login, analytics dashboard, and semester-wise reports.',
    live: '#',
    code: '#',
  },
  {
    title: 'Student Notes Hub',
    tech: 'MERN Stack',
    description:
      'Platform for organizing and sharing BCA subject notes with search, tags, and download history.',
    live: '#',
    code: '#',
  },
  {
    title: 'Portfolio Admin CMS',
    tech: 'Node.js, Express, REST API',
    description:
      'Simple admin panel and API layer to update projects, achievements, and contact information.',
    live: '#',
    code: '#',
  },
]

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus('Message sent successfully. I will contact you soon.')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('Backend not running yet. Start backend and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="glass rounded-3xl p-6 shadow-soft sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-800">
              {profile.title}
            </p>
            <h1 className="font-heading text-4xl leading-tight text-slate-900 sm:text-6xl">
              Hi, I am {profile.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-slate-700">{profile.shortIntro}</p>
            <p className="mt-3 text-sm font-semibold text-slate-600">Based in {profile.location}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Contact Me
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
              >
                Download Resume
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700">
                {profile.location}
              </span>
              <span className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700">
                {profile.college}
              </span>
            </div>
          </div>

          <img
            src={profile.photo}
            alt={`${profile.name} profile`}
            className="h-44 w-44 rounded-3xl border-4 border-white object-cover shadow-soft sm:h-56 sm:w-56"
          />
        </div>
      </header>

      <main className="mt-8 space-y-8">
        <section className="glass rounded-3xl p-6 shadow-soft sm:p-10">
          <h2 className="section-title">About Me</h2>
          <p className="mt-4 text-slate-700">
            I am currently pursuing BCA (2nd year) and studying at Buddha College, Rambha, Karnal. I enjoy turning ideas into usable products and improving both frontend experience and backend architecture. My short-term goal is to secure internships where I can contribute to production code and grow as a full-stack engineer.
          </p>
        </section>

        <section className="glass rounded-3xl p-6 shadow-soft sm:p-10">
          <h2 className="section-title">Tech Stack</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="glass rounded-3xl p-6 shadow-soft sm:p-10">
          <h2 className="section-title">Featured Projects</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-heading text-xl text-slate-900">{project.title}</h3>
                <p className="mt-2 text-sm font-semibold text-teal-700">{project.tech}</p>
                <p className="mt-3 text-slate-700">{project.description}</p>
                <div className="mt-4 flex gap-3 text-sm font-semibold">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-slate-900 px-3 py-2 text-white hover:bg-slate-800"
                  >
                    Source Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass rounded-3xl p-6 shadow-soft sm:p-10">
          <h2 className="section-title">Education</h2>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-heading text-lg text-slate-900">Bachelor of Computer Applications (BCA)</p>
            <p className="mt-2 text-slate-700">Currently in 2nd Year</p>
            <p className="mt-1 text-slate-700">Relevant focus: Data Structures, DBMS, OOP, Web Development</p>
          </div>
        </section>

        <section id="contact" className="glass rounded-3xl p-6 shadow-soft sm:p-10">
          <h2 className="section-title">Contact</h2>
          <p className="mt-3 text-slate-700">
            Let us connect for internship opportunities, freelance projects, or collaborations.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none ring-teal-500 focus:ring-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none ring-teal-500 focus:ring-2"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none ring-teal-500 focus:ring-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-fit rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {status ? <p className="mt-4 font-medium text-slate-800">{status}</p> : null}
        </section>
      </main>
    </div>
  )
}

export default App
