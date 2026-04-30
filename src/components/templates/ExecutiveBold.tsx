import { ResumeData } from '@/types/resume';

interface Props { data: ResumeData; scale?: number; }

export function ExecutiveBold({ data, scale = 1 }: Props) {
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
      <div style={{ background: '#111827', color: 'white', padding: '28px 36px' }}>
        <h1 className="text-3xl font-extrabold tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-sm uppercase tracking-widest mt-1" style={{ color: '#fbbf24' }}>
          {personalInfo.position || 'Your Job Title'}
        </p>
        <div className="text-xs mt-3 flex flex-wrap gap-x-4 gap-y-1" style={{ color: '#d1d5db' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      <div style={{ padding: '24px 36px' }}>
        {summary && <Sect title="Executive Summary">{<p className="text-gray-800">{summary}</p>}</Sect>}

        {experience.length > 0 && (
          <Sect title="Professional Experience">
            {experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <div className="font-bold uppercase">{exp.position}</div>
                  <span className="text-xs text-gray-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-gray-700 italic">{exp.company}</div>
                <p className="text-gray-800 mt-1">{exp.description}</p>
              </div>
            ))}
          </Sect>
        )}

        {skills.length > 0 && (
          <Sect title="Core Competencies">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {skills.map((s, i) => (
                <div key={i} className="text-gray-800">▸ {s}</div>
              ))}
            </div>
          </Sect>
        )}

        {education.length > 0 && (
          <Sect title="Education">
            {education.map(edu => (
              <div key={edu.id} className="mb-2 flex justify-between">
                <div>
                  <div className="font-bold">{edu.degree}, {edu.field}</div>
                  <div className="text-gray-700">{edu.institution}</div>
                </div>
                <span className="text-xs text-gray-600">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </Sect>
        )}

        {projects.length > 0 && (
          <Sect title="Notable Projects">
            {projects.map(p => (
              <div key={p.id} className="mb-2">
                <div className="font-bold">{p.name}</div>
                <p className="text-gray-800">{p.description}</p>
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
      <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1" style={{ borderBottom: '2px solid #111827' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
