import { ResumeData } from '@/types/resume';

interface ATSMinimalProps {
  data: ResumeData;
  scale?: number;
}

export function ATSMinimal({ data, scale = 1 }: ATSMinimalProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, declaration } = data;

  return (
    <div 
      className="bg-white text-gray-900 font-resume resume-template"
      style={{ 
        width: 595, 
        padding: '32px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        fontSize: 11,
        lineHeight: 1.4,
        boxSizing: 'border-box',
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

      {/* Declaration */}
      {declaration && declaration.text && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
            Declaration
          </h2>
          <p className="text-gray-700 text-justify mb-3">{declaration.text}</p>
          <div className="flex justify-between items-end mt-4">
            <div className="text-gray-600 text-xs">
              {declaration.place && <span>Place: {declaration.place}</span>}
              {declaration.place && declaration.date && <span> | </span>}
              {declaration.date && <span>Date: {declaration.date}</span>}
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {declaration.signatureName || personalInfo.fullName || 'Signature'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
