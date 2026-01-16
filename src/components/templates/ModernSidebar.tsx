import { ResumeData } from '@/types/resume';

interface ModernSidebarProps {
  data: ResumeData;
  scale?: number;
}

export function ModernSidebar({ data, scale = 1 }: ModernSidebarProps) {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = data;

  return (
    <div 
      className="bg-white text-gray-900 font-resume flex"
      style={{ 
        width: 595, 
        minHeight: 842,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        fontSize: 11,
        lineHeight: 1.4,
      }}
    >
      {/* Sidebar */}
      <div className="w-[180px] bg-slate-800 text-white p-5">
        <div className="mb-6">
          <h1 className="text-lg font-bold leading-tight mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            {personalInfo.position || 'Your Job Title'}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">
            Contact
          </h2>
          <div className="space-y-1 text-xs text-slate-200">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            {personalInfo.website && <p>{personalInfo.website}</p>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">
              Skills
            </h2>
            <div className="space-y-1">
              {skills.map((skill, idx) => (
                <p key={idx} className="text-xs text-slate-200">{skill}</p>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 text-xs">
                <p className="font-semibold text-white">{edu.degree}</p>
                <p className="text-slate-300">{edu.field}</p>
                <p className="text-slate-400">{edu.institution}</p>
                <p className="text-slate-400">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2 text-xs">
                <p className="font-semibold text-white">{cert.name}</p>
                <p className="text-slate-400">{cert.issuer}, {cert.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Summary */}
        {summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2 border-b-2 border-slate-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2 border-b-2 border-slate-800 pb-1">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2 border-b-2 border-slate-800 pb-1">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-gray-700">{project.description}</p>
                <p className="text-gray-500 text-xs mt-1">Technologies: {project.technologies}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
