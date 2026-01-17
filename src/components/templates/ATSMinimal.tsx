import { ResumeData } from '@/types/resume';

// A4 at 72 DPI: 595pt × 842pt
const A4_WIDTH = 595;
const A4_HEIGHT = 842;

interface ATSMinimalProps {
  data: ResumeData;
  scale?: number;
}

export function ATSMinimal({ data, scale = 1 }: ATSMinimalProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = data;

  return (
    <div 
      className="bg-white text-gray-900 font-resume"
      style={{ 
        width: A4_WIDTH, 
        minHeight: A4_HEIGHT,
        maxWidth: A4_WIDTH,
        padding: '32px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        fontSize: 11,
        lineHeight: 1.4,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
          {personalInfo.position || 'Your Job Title'}
        </p>
        <div className="text-gray-600 text-xs space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        <div className="text-gray-600 text-xs mt-1 space-x-2">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <p className="text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <span className="text-gray-600 text-xs">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <span className="text-gray-600 text-xs">{edu.startDate} - {edu.endDate}</span>
              </div>
              {edu.gpa && <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
              <p className="text-gray-600 text-xs">Technologies: {project.technologies}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 border-b border-gray-200 pb-1">
            Certifications
          </h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-1">
              <span className="font-bold text-gray-900">{cert.name}</span>
              <span className="text-gray-600"> - {cert.issuer}, {cert.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
