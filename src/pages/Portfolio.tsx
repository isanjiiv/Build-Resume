import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, MapPin, Globe, Linkedin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resumeData;

  const hasData = personalInfo.fullName || summary || skills.length > 0 || experience.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">No Portfolio Data</h1>
          <p className="text-muted-foreground mb-6">
            Fill in your resume details to generate your portfolio page.
          </p>
          <Button onClick={() => navigate('/builder')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Builder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate('/builder')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editor
          </Button>
          <div className="text-sm text-muted-foreground">
            Portfolio Preview
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-50"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
            {experience[0]?.position || 'Professional'}
          </p>
          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <a
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {personalInfo.website && (
              <a
                href={`https://${personalInfo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">Website</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      {summary && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              {summary}
            </p>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium hover-lift"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-background rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{exp.position}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-card-hover transition-all hover-lift"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    {project.link && (
                      <a
                        href={`https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <p className="text-sm text-primary/80">{project.technologies}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {(education.length > 0 || certifications.length > 0) && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Education */}
              {education.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Education</h2>
                  <div className="space-y-6">
                    {education.map((edu) => (
                      <div key={edu.id} className="bg-background rounded-lg p-5 border border-border">
                        <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-primary">{edu.field}</p>
                        <p className="text-muted-foreground text-sm">{edu.institution}</p>
                        <p className="text-muted-foreground text-sm">{edu.startDate} - {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Certifications</h2>
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="bg-background rounded-lg p-5 border border-border">
                        <h3 className="font-semibold text-foreground">{cert.name}</h3>
                        <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                        <p className="text-muted-foreground text-sm">{cert.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          {personalInfo.email && (
            <Button size="lg" asChild>
              <a href={`mailto:${personalInfo.email}`}>
                <Mail className="w-5 h-5 mr-2" />
                Send me an email
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {personalInfo.fullName}. Built with Resume Builder.</p>
        </div>
      </footer>
    </div>
  );
}
