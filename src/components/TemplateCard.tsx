import { TemplateId } from '@/types/resume';
import { templates } from '@/data/templates';
import { sampleResumeData } from '@/data/sampleResume';
import { ResumePreview } from './templates/ResumePreview';
import { Check, ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  templateId: TemplateId;
  isSelected: boolean;
  onSelect: (id: TemplateId) => void;
  onUse?: (id: TemplateId) => void;
}

export function TemplateCard({ templateId, isSelected, onSelect, onUse }: TemplateCardProps) {
  const template = templates.find((t) => t.id === templateId)!;

  return (
    <div
      className={`group relative rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${
        isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
    >
      {/* Preview */}
      <button
        type="button"
        onClick={() => onSelect(templateId)}
        className="relative block w-full aspect-[3/4] bg-muted/40 overflow-hidden"
      >
        <div className="absolute inset-0 flex items-start justify-center pt-2 overflow-hidden">
          <div className="transform scale-[0.38] origin-top">
            <ResumePreview templateId={templateId} data={sampleResumeData} />
          </div>
        </div>

        {/* Hover gradient + CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(templateId);
              onUse?.(templateId);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Use this template
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {isSelected && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </button>

      {/* Footer */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground">{template.name}</h3>
          {template.tags?.[0] && (
            <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-primary/10 text-primary rounded-full">
              {template.tags[0]}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
      </div>
    </div>
  );
}
