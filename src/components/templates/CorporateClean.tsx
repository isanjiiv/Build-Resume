import { ResumeData } from '@/types/resume';

interface CorporateCleanProps {
  data: ResumeData;
  scale?: number;
}

export function CorporateClean({ data, scale = 1 }: CorporateCleanProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = data;

  return (
    <div 
      className="bg-white text-gray-900 font-resume"
      style={{ 
        width: 595, 
        minHeight: 842,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        fontSize: 11,
        lineHeight: 1.4,
      }}
    >
      {/* Header */}
      <div className="bg-gray-100 px-8 py-6 border-b-4 border-blue-700">
        <h1 className="text-2xl font-bold text-gray-800 mb-0.5">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm font-semibold text-blue-700 mb-2">
          {personalInfo.position || 'Your Job Title'}
        </p>
        <div className="text-gray-600 text-xs flex flex-wrap gap-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2 pb-1 border-b border-gray-300">
              Executive Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-3 pb-1 border-b border-gray-300">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900 inline">{exp.position}</h3>
                    <span className="text-gray-600"> | {exp.company}</span>
                  </div>
                  <span className="text-blue-700 text-xs font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2 pb-1 border-b border-gray-300">
              Core Competencies
            </h2>
            <div className="grid grid-cols-3 gap-1">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-700 rounded-full"></span>
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2 pb-1 border-b border-gray-300">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-bold text-gray-900">{edu.institution}</p>
                  <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                  <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2 pb-1 border-b border-gray-300">
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <p className="font-bold text-gray-900">{cert.name}</p>
                  <p className="text-gray-600 text-xs">{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2 pb-1 border-b border-gray-300">
              Notable Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-2">
                <span className="font-bold text-gray-900">{project.name}:</span>
                <span className="text-gray-600"> {project.description}</span>
                <span className="text-gray-500 text-xs ml-2">({project.technologies})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
