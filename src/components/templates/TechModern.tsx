import { ResumeData } from '@/types/resume';

interface Props { data: ResumeData; scale?: number; }

const ACCENT = '#0ea5e9';

export function TechModern({ data, scale = 1 }: Props) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, declaration } = data;
  return (
    <div
      className="bg-white text-gray-900 resume-template font-resume"
      style={{
        width: 595, padding: '36px',
        transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left',
        fontSize: 11, lineHeight: 1.45, boxSizing: 'border-box',
      }}
    >
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span style={{ width: 24, height: 3, background: ACCENT, display: 'inline-block' }} />
          <p className="text-sm font-medium" style={{ color: ACCENT }}>
            {personalInfo.position || 'Your Job Title'}
          </p>
        </div>
        <div className="text-xs text-gray-600 mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>☏ {personalInfo.phone}</span>}
          {personalInfo.location && <span>⌖ {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>in {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>⚭ {personalInfo.website}</span>}
        </div>
      </div>

      {summary && <Block title="// Summary">{<p className="text-gray-800">{summary}</p>}</Block>}

      {skills.length > 0 && (
        <Block title="// Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: '#f1f5f9', border: `1px solid ${ACCENT}33`, color: '#0f172a' }}>
                {s}
              </span>
            ))}
          </div>
        </Block>
      )}

      {experience.length > 0 && (
        <Block title="// Experience">
          {experience.map(exp => (
            <div key={exp.id} className="mb-3" style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 10 }}>
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{exp.position}</div>
                  <div className="text-gray-700">{exp.company}</div>
                </div>
                <span className="text-xs text-gray-500">{exp.startDate} → {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p className="text-gray-800 mt-1">{exp.description}</p>
            </div>
          ))}
        </Block>
      )}

      {projects.length > 0 && (
        <Block title="// Projects">
          {projects.map(p => (
            <div key={p.id} className="mb-2">
              <div className="font-bold">{p.name}</div>
              <p className="text-gray-800">{p.description}</p>
              <div className="text-xs" style={{ color: ACCENT }}>{p.technologies}</div>
            </div>
          ))}
        </Block>
      )}

      {education.length > 0 && (
        <Block title="// Education">
          {education.map(edu => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <div>
                <div className="font-bold">{edu.degree} · {edu.field}</div>
                <div className="text-gray-700">{edu.institution}</div>
              </div>
              <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </Block>
      )}

      {certifications.length > 0 && (
        <Block title="// Certifications">
          {certifications.map(c => (
            <div key={c.id} className="text-gray-800"><span className="font-semibold">{c.name}</span> — {c.issuer} ({c.date})</div>
          ))}
        </Block>
      )}

      {declaration?.text && (
        <Block title="// Declaration">
          <p className="text-gray-800">{declaration.text}</p>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>{declaration.place} {declaration.date && `· ${declaration.date}`}</span>
            <span className="font-semibold">{declaration.signatureName || personalInfo.fullName}</span>
          </div>
        </Block>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>{title}</h2>
      {children}
    </div>
  );
}
