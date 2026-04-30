export interface PersonalInfo {
  fullName: string;
  position?: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Declaration {
  text: string;
  place: string;
  date: string;
  signatureName: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  declaration?: Declaration;
}

export type TemplateId = 
  | 'ats-minimal'
  | 'modern-sidebar'
  | 'header-focused'
  | 'creative-professional'
  | 'corporate-clean'
  | 'compact-one-page'
  | 'elegant-serif'
  | 'tech-modern'
  | 'executive-bold'
  | 'creative-gradient';

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  tags: string[];
}
