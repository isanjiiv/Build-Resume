import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, Sparkles, Loader2 } from 'lucide-react';
import { Experience, Education, Project, Certification, Declaration } from '@/types/resume';
import { aiAssist } from '@/lib/aiAssist';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSteps = [
  'Personal Info',
  'Summary',
  'Skills',
  'Experience',
  'Education',
  'Projects',
  'Certifications',
  'Declaration',
];

const DEFAULT_DECLARATION = 'I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.';

export function ResumeForm() {
  const { resumeData, setResumeData, currentStep, setCurrentStep } = useResume();
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const runAI = async (key: string, fn: () => Promise<void>) => {
    setAiLoading(key);
    try {
      await fn();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'AI request failed');
    } finally {
      setAiLoading(null);
    }
  };

  const aiGenerateSummary = () =>
    runAI('summary', async () => {
      const jobTitle = resumeData.personalInfo.position || resumeData.personalInfo.fullName;
      if (!jobTitle) { toast.error('Add your job title first (Personal Info)'); return; }
      const ctx = resumeData.experience.map(e => `${e.position} at ${e.company}: ${e.description}`).join('\n');
      const result = await aiAssist({ mode: 'summary', jobTitle, context: ctx });
      setResumeData(prev => ({ ...prev, summary: String(result) }));
      toast.success('Summary generated');
    });

  const aiSuggestSkills = () =>
    runAI('skills', async () => {
      const jobTitle = resumeData.personalInfo.position;
      if (!jobTitle) { toast.error('Add your job title first (Personal Info)'); return; }
      const result = await aiAssist({ mode: 'skills', jobTitle });
      const list = Array.isArray(result) ? result : [];
      setResumeData(prev => ({ ...prev, skills: Array.from(new Set([...prev.skills.filter(Boolean), ...list])) }));
      toast.success(`Added ${list.length} skill suggestions`);
    });

  const aiGenerateBullets = (expId: string) =>
    runAI(`bullets-${expId}`, async () => {
      const exp = resumeData.experience.find(e => e.id === expId);
      if (!exp) return;
      const jobTitle = exp.position || resumeData.personalInfo.position;
      if (!jobTitle) { toast.error('Add the position title first'); return; }
      const ctx = `Company: ${exp.company}. Existing notes: ${exp.description || '(none)'}`;
      const result = await aiAssist({ mode: 'bullets', jobTitle, context: ctx });
      const bullets = Array.isArray(result) ? result : [];
      const text = bullets.map(b => `• ${b}`).join('\n');
      setResumeData(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === expId ? { ...e, description: text } : e),
      }));
      toast.success('Bullets generated');
    });

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateSummary = (value: string) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  // Skills management - dynamic array
  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: '',
    };
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id),
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id),
    }));
  };

  // Declaration management
  const updateDeclaration = (field: keyof Declaration, value: string) => {
    setResumeData(prev => ({
      ...prev,
      declaration: {
        text: prev.declaration?.text || DEFAULT_DECLARATION,
        place: prev.declaration?.place || '',
        date: prev.declaration?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        signatureName: prev.declaration?.signatureName || '',
        [field]: value,
      },
    }));
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      {/* Step Indicators */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {formSteps.map((step, idx) => (
          <button
            key={step}
            onClick={() => setCurrentStep(idx)}
            className={`flex-shrink-0 px-3 py-1.5 text-xs rounded-full font-medium transition-all ${
              currentStep === idx
                ? 'bg-primary text-primary-foreground'
                : idx < currentStep
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Personal Info */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position / Job Title *</Label>
                  <Input
                    id="position"
                    value={resumeData.personalInfo.position || ''}
                    onChange={(e) => updatePersonalInfo('position', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn (optional)</Label>
                  <Input
                    id="linkedin"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    value={resumeData.personalInfo.website}
                    onChange={(e) => updatePersonalInfo('website', e.target.value)}
                    placeholder="johndoe.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Write a brief professional summary highlighting your key skills and experience..."
                rows={5}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Tip: Keep it concise (2-3 sentences) and focus on your value proposition.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Skills - Dynamic List */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Skills</h3>
              <Button onClick={addSkill} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </Button>
            </div>
            
            {resumeData.skills.length > 0 ? (
              <Card>
                <CardContent className="pt-4 space-y-3">
                  {resumeData.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      <Input
                        value={skill}
                        onChange={(e) => updateSkill(idx, e.target.value)}
                        placeholder={`Skill ${idx + 1} (e.g., JavaScript, React, Python)`}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(idx)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p>Add your skills</p>
                  <p className="text-xs mt-1">Click "Add Skill" to get started. You can add unlimited skills.</p>
                </CardContent>
              </Card>
            )}
            
            <p className="text-xs text-muted-foreground">
              Add as many skills as you need. Include both technical and soft skills.
            </p>
          </div>
        )}

        {/* Experience */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" /> Add Experience
              </Button>
            </div>
            {resumeData.experience.map((exp, idx) => (
              <Card key={exp.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Experience {idx + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Tech Company"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="Present"
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="rounded border-input"
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-sm">Currently working here</Label>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Describe your key responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            {resumeData.experience.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p>No experience added yet. Click "Add Experience" to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Education */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button onClick={addEducation} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" /> Add Education
              </Button>
            </div>
            {resumeData.education.map((edu, idx) => (
              <Card key={edu.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Education {idx + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <Label>GPA (optional)</Label>
                      <Input
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        placeholder="3.8"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        placeholder="2016"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        placeholder="2020"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {resumeData.education.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p>No education added yet. Click "Add Education" to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Projects */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Projects</h3>
              <Button onClick={addProject} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" /> Add Project
              </Button>
            </div>
            {resumeData.projects.map((project, idx) => (
              <Card key={project.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Project {idx + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div>
                      <Label>Technologies</Label>
                      <Input
                        value={project.technologies}
                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      placeholder="Brief description of what the project does..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Link (optional)</Label>
                    <Input
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      placeholder="github.com/username/project"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            {resumeData.projects.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p>No projects added yet. Click "Add Project" to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Certifications */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <Button onClick={addCertification} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" /> Add Certification
              </Button>
            </div>
            {resumeData.certifications.map((cert, idx) => (
              <Card key={cert.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Certification {idx + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Certification Name</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        placeholder="AWS Solutions Architect"
                      />
                    </div>
                    <div>
                      <Label>Issuing Organization</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div>
                      <Label>Date Obtained</Label>
                      <Input
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        placeholder="2023"
                      />
                    </div>
                    <div>
                      <Label>Link (optional)</Label>
                      <Input
                        value={cert.link}
                        onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                        placeholder="credential URL"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {resumeData.certifications.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p>No certifications added yet. Click "Add Certification" to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Declaration */}
        {currentStep === 7 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Declaration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="declarationText">Declaration Text</Label>
                <Textarea
                  id="declarationText"
                  value={resumeData.declaration?.text || DEFAULT_DECLARATION}
                  onChange={(e) => updateDeclaration('text', e.target.value)}
                  placeholder="I hereby declare that..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="declarationPlace">Place</Label>
                  <Input
                    id="declarationPlace"
                    value={resumeData.declaration?.place || ''}
                    onChange={(e) => updateDeclaration('place', e.target.value)}
                    placeholder="New Delhi"
                  />
                </div>
                <div>
                  <Label htmlFor="declarationDate">Date</Label>
                  <Input
                    id="declarationDate"
                    value={resumeData.declaration?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    onChange={(e) => updateDeclaration('date', e.target.value)}
                    placeholder="January 17, 2026"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="signatureName">Signature Name</Label>
                <Input
                  id="signatureName"
                  value={resumeData.declaration?.signatureName || ''}
                  onChange={(e) => updateDeclaration('signatureName', e.target.value)}
                  placeholder={resumeData.personalInfo.fullName || 'Your Name'}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will appear as your signature at the bottom of the resume.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(formSteps.length - 1, currentStep + 1))}
            disabled={currentStep === formSteps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
