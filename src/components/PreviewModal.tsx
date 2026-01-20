import { useRef } from 'react';
import { ResumeData, TemplateId } from '@/types/resume';
import { ResumePreview } from '@/components/templates/ResumePreview';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import html2pdf from 'html2pdf.js';

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: TemplateId;
  data: ResumeData;
  onExportPDF: () => void;
  onExportHTML: () => void;
}

export function PreviewModal({
  open,
  onOpenChange,
  templateId,
  data,
  onExportPDF,
  onExportHTML,
}: PreviewModalProps) {
  const modalPreviewRef = useRef<HTMLDivElement>(null);

  const handleModalExportPDF = async () => {
    // Wait for DOM to be fully updated
    await new Promise(resolve => setTimeout(resolve, 100));

    // Target the template inside this modal specifically
    const templateComponent = modalPreviewRef.current?.querySelector('#resume-template-root');
    
    if (!templateComponent) {
      // Fallback to parent handler if modal template not found
      onExportPDF();
      return;
    }

    // Validate template matches
    const renderedTemplate = templateComponent.getAttribute('data-template-id');
    if (renderedTemplate && renderedTemplate !== templateId) {
      toast.error('Template mismatch. Please close and reopen the preview.');
      return;
    }

    try {
      const fileName = data.personalInfo.fullName
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      const options = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          width: 595,
          height: 842,
          windowWidth: 595,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { 
          unit: 'pt', 
          format: [595, 842],
          orientation: 'portrait' as const,
        },
      };

      await html2pdf().set(options).from(templateComponent).save();
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('PDF download failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-border bg-card flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            Resume Preview
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onExportHTML}>
              <FileText className="w-4 h-4 mr-2" />
              HTML
            </Button>
            <Button size="sm" onClick={handleModalExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 h-[calc(90vh-80px)]">
          <div className="p-4 md:p-8 bg-muted min-h-full flex justify-center">
            <div ref={modalPreviewRef} className="resume-preview-modal bg-white shadow-xl">
              <ResumePreview templateId={templateId} data={data} scale={1} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
