import { Template } from '@/types/resume';

export const templates: Template[] = [
  {
    id: 'ats-minimal',
    name: 'ATS Minimal',
    description: 'Clean, single-column layout optimized for Applicant Tracking Systems',
    tags: ['ATS-Friendly', 'Simple', 'Professional'],
  },
  {
    id: 'modern-sidebar',
    name: 'Modern Sidebar',
    description: 'Contemporary design with skills highlighted in a left sidebar',
    tags: ['Modern', 'Two-Column', 'Popular'],
  },
  {
    id: 'header-focused',
    name: 'Header Focused',
    description: 'Bold header section with name and title prominently displayed',
    tags: ['Bold', 'Executive', 'Impactful'],
  },
  {
    id: 'creative-professional',
    name: 'Creative Professional',
    description: 'Subtle color accents for creative industries while staying professional',
    tags: ['Creative', 'Stylish', 'Unique'],
  },
  {
    id: 'corporate-clean',
    name: 'Corporate Clean',
    description: 'Traditional corporate style with gray and blue tones',
    tags: ['Corporate', 'Traditional', 'Formal'],
  },
  {
    id: 'compact-one-page',
    name: 'Compact One-Page',
    description: 'Maximum information density for experienced professionals',
    tags: ['Compact', 'Dense', 'Experienced'],
  },
];
