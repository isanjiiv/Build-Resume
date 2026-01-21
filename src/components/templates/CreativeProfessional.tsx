import { ResumeData } from '@/types/resume';

interface CreativeProfessionalProps {
  data: ResumeData;
  scale?: number;
}

export function CreativeProfessional({ data, scale = 1 }: CreativeProfessionalProps) {
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
      {/* Header with accent */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-end gap-4 mb-4">
          <div className="w-2 h-16 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="text-teal-600 font-medium">
              {personalInfo.position || 'Your Job Title'}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 pl-6">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Summary */}
        {summary && (
          <div className="mb-5 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
            <p className="text-gray-700 italic">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-teal-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-teal-500"></span>
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs border border-gray-200"
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
            <h2 className="text-sm font-bold text-teal-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-teal-500"></span>
              Work Experience
            </h2>
            {experience.map((exp, idx) => (
              <div key={exp.id} className="mb-4 relative pl-4">
                <div className="absolute left-0 top-1 w-2 h-2 bg-teal-500 rounded-full"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-teal-600">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-teal-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-teal-500"></span>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-teal-600">{edu.field}</p>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                  <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications & Projects */}
          <div>
            {certifications.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-teal-500"></span>
                  Certifications
                </h2>
                {certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="font-bold text-gray-900 text-xs">{cert.name}</p>
                    <p className="text-gray-500 text-xs">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-teal-500"></span>
                  Projects
                </h2>
                {projects.map((project) => (
                  <div key={project.id} className="mb-2">
                    <p className="font-bold text-gray-900 text-xs">{project.name}</p>
                    <p className="text-gray-600 text-xs">{project.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Declaration */}
        {declaration && declaration.text && (
          <div className="mt-4 pt-3 border-t border-teal-200">
            <h2 className="text-sm font-bold text-teal-700 mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-teal-500"></span>
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
                <p className="font-semibold text-teal-700 text-xs">
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
