import { ResumeData, TemplateId } from '@/types/resume';
import { ATSMinimal } from './ATSMinimal';
import { ModernSidebar } from './ModernSidebar';
import { HeaderFocused } from './HeaderFocused';
import { CreativeProfessional } from './CreativeProfessional';
import { CorporateClean } from './CorporateClean';
import { CompactOnePage } from './CompactOnePage';

// A4 dimensions at 96 DPI: 210mm × 297mm = 794px × 1123px
// Using 595pt × 842pt for PDF generation compatibility (72 DPI)
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;
export const A4_WIDTH_PT = 595;
export const A4_HEIGHT_PT = 842;

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

  return (
    <div 
      id="resume-template-root"
      className="resume-template"
      data-template-id={templateId}
      style={{
        width: A4_WIDTH_PT,
        minHeight: A4_HEIGHT_PT,
        maxWidth: A4_WIDTH_PT,
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <TemplateComponent data={data} scale={scale} />
    </div>
  );
}
