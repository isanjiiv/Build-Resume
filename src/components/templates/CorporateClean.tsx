import { ResumeData } from '@/types/resume';

// A4 at 72 DPI: 595pt × 842pt
const A4_WIDTH = 595;
const A4_HEIGHT = 842;

interface CorporateCleanProps {
  data: ResumeData;
  scale?: number;
}

export function CorporateClean({ data, scale = 1 }: CorporateCleanProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications, declaration } = data;

  return (
    <div 
      className="bg-white text-gray-900 font-resume"
      style={{ 
        width: A4_WIDTH, 
        minHeight: A4_HEIGHT,
        maxWidth: A4_WIDTH,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        fontSize: 11,
        lineHeight: 1.4,
        boxSizing: 'border-box',
        overflow: 'hidden',
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

        {/* Declaration */}
        {declaration && declaration.text && (
          <div className="mt-5 pt-4 border-t border-gray-300">
            <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2">
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
                <p className="font-semibold text-blue-800 text-xs">
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
