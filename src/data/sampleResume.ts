import { ResumeData } from '@/types/resume';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Sarah Mitchell',
    position: 'Senior Software Engineer',
    email: 'sarah.mitchell@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahmitchell',
    website: 'sarahmitchell.dev',
  },
  summary: 'Senior Software Engineer with 6+ years of experience building scalable web applications. Expert in React, TypeScript, and Node.js. Passionate about clean code, performance optimization, and mentoring junior developers.',
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Git',
    'Agile/Scrum',
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      current: true,
      description: 'Led development of customer-facing dashboard serving 100K+ users. Reduced page load time by 40% through code splitting and caching strategies. Mentored team of 4 junior developers.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      current: false,
      description: 'Built RESTful APIs handling 1M+ daily requests. Implemented CI/CD pipeline reducing deployment time by 60%. Collaborated with product team to define technical requirements.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014',
      endDate: '2018',
      gpa: '3.8',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source CLI Tool',
      description: 'Built a developer productivity tool with 2K+ GitHub stars. Used by teams at major tech companies.',
      technologies: 'Node.js, TypeScript',
      link: 'github.com/sarahm/cli-tool',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022',
    },
  ],
};

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    position: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  declaration: {
    text: 'I hereby declare that the information provided above is true and correct to the best of my knowledge and belief.',
    place: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    signatureName: '',
  },
};
