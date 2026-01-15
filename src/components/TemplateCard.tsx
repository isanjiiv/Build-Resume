import { TemplateId } from '@/types/resume';
import { templates } from '@/data/templates';
import { sampleResumeData } from '@/data/sampleResume';
import { ResumePreview } from './templates/ResumePreview';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  templateId: TemplateId;
  isSelected: boolean;
  onSelect: (id: TemplateId) => void;
}

export function TemplateCard({ templateId, isSelected, onSelect }: TemplateCardProps) {
  const template = templates.find(t => t.id === templateId)!;

  return (
    <button
      onClick={() => onSelect(templateId)}
      className={`template-card group text-left w-full transition-all duration-300 ${
        isSelected ? 'selected ring-2 ring-primary ring-offset-2' : ''
      }`}
    >
      {/* Preview Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <div className="absolute inset-0 flex items-start justify-center pt-2 overflow-hidden">
          <div className="transform scale-[0.38] origin-top">
            <ResumePreview templateId={templateId} data={sampleResumeData} />
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
        
        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-border">
        <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
