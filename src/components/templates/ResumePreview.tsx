import { ResumeData, TemplateId } from '@/types/resume';
import { ATSMinimal } from './ATSMinimal';
import { ModernSidebar } from './ModernSidebar';
import { HeaderFocused } from './HeaderFocused';
import { CreativeProfessional } from './CreativeProfessional';
import { CorporateClean } from './CorporateClean';
import { CompactOnePage } from './CompactOnePage';
import { ElegantSerif } from './ElegantSerif';
import { TechModern } from './TechModern';
import { ExecutiveBold } from './ExecutiveBold';
import { CreativeGradient } from './CreativeGradient';

// A4 width in points (72 DPI) - height is dynamic for multi-page content
export const A4_WIDTH_PT = 595;

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
    'elegant-serif': ElegantSerif,
    'tech-modern': TechModern,
    'executive-bold': ExecutiveBold,
    'creative-gradient': CreativeGradient,
  };

  const TemplateComponent = templates[templateId];

  return (
    <div 
      id="resume-template-root"
      className="resume-template"
      data-template-id={templateId}
      style={{
        width: A4_WIDTH_PT,
        margin: '0 auto',
      }}
    >
      <TemplateComponent data={data} scale={scale} />
    </div>
  );
}
