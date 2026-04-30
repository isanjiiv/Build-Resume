import { ResumeData } from '@/types/resume';

interface Props { data: ResumeData; scale?: number; }

export function ElegantSerif({ data, scale = 1 }: Props) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, declaration } = data;
  return (
    <div
      className="bg-white text-gray-900 resume-template"
      style={{
        width: 595, padding: '40px',
        transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left',
        fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 11, lineHeight: 1.5, boxSizing: 'border-box',
      }}
    >
      <div className="text-center pb-4 mb-5" style={{ borderBottom: '2px double #1f2937' }}>
        <h1 className="text-3xl mb-1" style={{ letterSpacing: '0.15em' }}>
          {(personalInfo.fullName || 'Your Name').toUpperCase()}
        </h1>
        <p className="italic text-gray-700 mb-2">{personalInfo.position || 'Your Job Title'}</p>
        <div className="text-xs text-gray-600">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website]
            .filter(Boolean).join('  ·  ')}
        </div>
      </div>

      {summary && (<Section title="Profile">{<p>{summary}</p>}</Section>)}

      {skills.length > 0 && (
        <Section title="Skills">
          <p>{skills.join(' · ')}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{exp.position}</div>
                  <div className="italic text-gray-700">{exp.company}</div>
                </div>
                <div className="text-xs text-gray-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
              </div>
              <p className="mt-1 text-gray-800">{exp.description}</p>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map(edu => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <div>
                <div className="font-semibold">{edu.degree} in {edu.field}</div>
                <div className="italic text-gray-700">{edu.institution}</div>
              </div>
              <div className="text-xs text-gray-600">{edu.startDate} – {edu.endDate}</div>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map(p => (
            <div key={p.id} className="mb-2">
              <div className="font-semibold">{p.name}</div>
              <p className="text-gray-800">{p.description}</p>
              <div className="text-xs text-gray-600 italic">{p.technologies}</div>
            </div>
          ))}
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map(c => (
            <div key={c.id}><span className="font-semibold">{c.name}</span> — {c.issuer}, {c.date}</div>
          ))}
        </Section>
      )}

      {declaration?.text && (
        <Section title="Declaration">
          <p className="italic text-gray-800">{declaration.text}</p>
          <div className="flex justify-between mt-3 text-xs text-gray-700">
            <span>{declaration.place} {declaration.date && `· ${declaration.date}`}</span>
            <span className="font-semibold">{declaration.signatureName || personalInfo.fullName}</span>
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-sm mb-2" style={{ letterSpacing: '0.2em', borderBottom: '1px solid #9ca3af', paddingBottom: 4 }}>
        {title.toUpperCase()}
      </h2>
      <div>{children}</div>
    </div>
  );
}
