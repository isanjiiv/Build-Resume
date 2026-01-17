import { ResumeData } from '@/types/resume';

// A4 at 72 DPI: 595pt × 842pt
const A4_WIDTH = 595;
const A4_HEIGHT = 842;

interface CompactOnePageProps {
  data: ResumeData;
  scale?: number;
}

export function CompactOnePage({ data, scale = 1 }: CompactOnePageProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = data;

  return (
    <div 
      className="bg-white text-gray-900 font-resume"
      style={{ 
        width: A4_WIDTH, 
        minHeight: A4_HEIGHT,
        maxWidth: A4_WIDTH,
        padding: '24px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        fontSize: 10,
        lineHeight: 1.3,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Compact Header */}
      <div className="flex justify-between items-start border-b border-gray-400 pb-2 mb-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs font-semibold text-gray-700">
            {personalInfo.position || 'Your Job Title'}
          </p>
        </div>
        <div className="text-right text-xs text-gray-600">
          <p>{personalInfo.email} | {personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
          <p>{personalInfo.linkedin} {personalInfo.website && `| ${personalInfo.website}`}</p>
        </div>
      </div>

      {/* Summary - Compact */}
      {summary && (
        <div className="mb-3">
          <h2 className="text-xs font-bold text-gray-900 uppercase mb-1">Summary</h2>
          <p className="text-gray-700 text-xs">{summary}</p>
        </div>
      )}

      {/* Two Column Layout for Skills and Experience */}
      <div className="flex gap-4">
        {/* Left Column - Skills, Education, Certs */}
        <div className="w-[35%]">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300 pb-0.5">
                Technical Skills
              </h2>
              <div className="text-xs text-gray-700 space-y-0.5">
                {skills.map((skill, idx) => (
                  <p key={idx}>• {skill}</p>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300 pb-0.5">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-bold text-gray-900 text-xs">{edu.degree}</p>
                  <p className="text-gray-700 text-xs">{edu.field}</p>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                  <p className="text-gray-500 text-xs">{edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300 pb-0.5">
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-1">
                  <p className="font-semibold text-gray-900 text-xs">{cert.name}</p>
                  <p className="text-gray-500 text-xs">{cert.issuer}, {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Experience and Projects */}
        <div className="flex-1">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-3">
              <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300 pb-0.5">
                Professional Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-gray-900 text-xs">{exp.position}</span>
                    <span className="text-gray-500 text-xs">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs font-medium">{exp.company}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase mb-1 border-b border-gray-300 pb-0.5">
                Key Projects
              </h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-2">
                  <p className="font-bold text-gray-900 text-xs">{project.name}</p>
                  <p className="text-gray-600 text-xs">{project.description}</p>
                  <p className="text-gray-500 text-xs">Tech: {project.technologies}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
