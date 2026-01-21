import { ResumeData } from '@/types/resume';

interface HeaderFocusedProps {
  data: ResumeData;
  scale?: number;
}

export function HeaderFocused({ data, scale = 1 }: HeaderFocusedProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, declaration } = data;

  return (
    <div 
      className="bg-white text-gray-900 font-resume resume-template"
      style={{ 
        width: 595, 
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        fontSize: 11,
        lineHeight: 1.4,
        boxSizing: 'border-box',
      }}
    >
      {/* Bold Header */}
      <div className="bg-indigo-900 text-white px-8 py-6">
        <h1 className="text-3xl font-bold mb-0.5">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg font-medium text-indigo-200 mb-2">
          {personalInfo.position || 'Your Job Title'}
        </p>
        <div className="text-indigo-300 text-xs space-x-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        <div className="text-indigo-300 text-xs mt-1 space-x-3">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-2">
              About Me
            </h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-2">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 bg-indigo-50 text-indigo-800 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-3">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-4 border-l-2 border-indigo-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-indigo-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-2">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-700">{edu.field}</p>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                  <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-2">
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <p className="font-bold text-gray-900">{cert.name}</p>
                  <p className="text-gray-600 text-xs">{cert.issuer}, {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mt-5">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-2">
              Key Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-2">
                <h3 className="font-bold text-gray-900 inline">{project.name}</h3>
                <span className="text-gray-600"> - {project.description}</span>
                <p className="text-gray-500 text-xs">Tech: {project.technologies}</p>
              </div>
            ))}
          </div>
        )}

        {/* Declaration */}
        {declaration && declaration.text && (
          <div className="mt-5 pt-4 border-t border-gray-200">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-2">
              Declaration
            </h2>
            <p className="text-gray-700 text-justify text-xs mb-2">{declaration.text}</p>
            <div className="flex justify-between items-end mt-3">
              <div className="text-gray-500 text-xs">
                {declaration.place && <span>Place: {declaration.place}</span>}
                {declaration.place && declaration.date && <span> | </span>}
                {declaration.date && <span>Date: {declaration.date}</span>}
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-xs">
                  {declaration.signatureName || personalInfo.fullName || 'Signature'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
