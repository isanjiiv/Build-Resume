import { ResumeData, TemplateId } from '@/types/resume';
import { ATSMinimal } from './ATSMinimal';
import { ModernSidebar } from './ModernSidebar';
import { HeaderFocused } from './HeaderFocused';
import { CreativeProfessional } from './CreativeProfessional';
import { CorporateClean } from './CorporateClean';
import { CompactOnePage } from './CompactOnePage';

interface ResumePreviewProps {
  templateId: TemplateId;
  data: ResumeData;
  scale?: number;
}

export function ResumePreview({ templateId, data, scale = 1 }: ResumePreviewProps) {
  const templates: Record<TemplateId, React.ComponentType<{ data: ResumeData; scale?: number }>> = {
    'ats-minimal': ATSMinimal,
    'modern-sidebar': ModernSidebar,
    'header-focused': HeaderFocused,
    'creative-professional': CreativeProfessional,
    'corporate-clean': CorporateClean,
    'compact-one-page': CompactOnePage,
  };

  const TemplateComponent = templates[templateId];

  return <TemplateComponent data={data} scale={scale} />;
}
