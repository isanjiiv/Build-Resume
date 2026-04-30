import { ResumeData } from '@/types/resume';

interface Props { data: ResumeData; scale?: number; }

const ACCENT = '#db2777';

export function CreativeGradient({ data, scale = 1 }: Props) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, declaration } = data;
  return (
    <div
      className="bg-white text-gray-900 resume-template font-resume"
      style={{
        width: 595,
        transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left',
        fontSize: 11, lineHeight: 1.45, boxSizing: 'border-box',
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg,#db2777 0%,#7c3aed 100%)',
        color: 'white', padding: '32px 36px',
      }}>
        <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-base mt-1 opacity-90">{personalInfo.position || 'Your Job Title'}</p>
        <div className="text-xs mt-3 flex flex-wrap gap-x-3 gap-y-1 opacity-95">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website]
            .filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
        </div>
      </div>

      <div style={{ padding: '24px 36px' }}>
        {summary && <Sect title="About Me">{<p className="text-gray-800">{summary}</p>}</Sect>}

        {experience.length > 0 && (
          <Sect title="Experience">
            {experience.map(exp => (
              <div key={exp.id} className="mb-3 relative" style={{ paddingLeft: 14 }}>
                <span style={{ position: 'absolute', left: 0, top: 6, width: 8, height: 8, borderRadius: '50%', background: ACCENT }} />
                <div className="flex justify-between">
                  <div className="font-bold">{exp.position}</div>
                  <span className="text-xs text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-gray-700">{exp.company}</div>
                <p className="text-gray-800 mt-1">{exp.description}</p>
              </div>
            ))}
          </Sect>
        )}

        {skills.length > 0 && (
          <Sect title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span key={i} className="text-xs px-2.5 py-0.5 rounded-full text-white"
                  style={{ background: 'linear-gradient(135deg,#db2777,#7c3aed)' }}>{s}</span>
              ))}
            </div>
          </Sect>
        )}

        {projects.length > 0 && (
          <Sect title="Projects">
            {projects.map(p => (
              <div key={p.id} className="mb-2">
                <div className="font-bold" style={{ color: ACCENT }}>{p.name}</div>
                <p className="text-gray-800">{p.description}</p>
                <div className="text-xs text-gray-600">{p.technologies}</div>
              </div>
            ))}
          </Sect>
        )}

        {education.length > 0 && (
          <Sect title="Education">
            {education.map(edu => (
              <div key={edu.id} className="mb-2 flex justify-between">
                <div>
                  <div className="font-bold">{edu.degree} · {edu.field}</div>
                  <div className="text-gray-700">{edu.institution}</div>
                </div>
                <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </Sect>
        )}

        {certifications.length > 0 && (
          <Sect title="Certifications">
            {certifications.map(c => (
              <div key={c.id}><span className="font-semibold">{c.name}</span> — {c.issuer}, {c.date}</div>
            ))}
          </Sect>
        )}

        {declaration?.text && (
          <Sect title="Declaration">
            <p className="text-gray-800">{declaration.text}</p>
            <div className="flex justify-between mt-3 text-xs text-gray-600">
              <span>{declaration.place} {declaration.date && `· ${declaration.date}`}</span>
              <span className="font-semibold">{declaration.signatureName || personalInfo.fullName}</span>
            </div>
          </Sect>
        )}
      </div>
    </div>
  );
}

function Sect({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
