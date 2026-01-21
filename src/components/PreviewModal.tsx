import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ResumeData, TemplateId } from '@/types/resume';
import { ResumePreview } from '@/components/templates/ResumePreview';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, Loader2 } from 'lucide-react';
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
  const [isExporting, setIsExporting] = useState(false);

  const handleModalExportPDF = async () => {
    setIsExporting(true);

    // Create a dedicated container for PDF export to ensure correct template
    const exportContainer = document.createElement('div');
    exportContainer.id = 'pdf-export-container-modal';
    exportContainer.style.position = 'absolute';
    exportContainer.style.left = '-9999px';
    exportContainer.style.top = '0';
    exportContainer.style.width = '595pt';
    exportContainer.style.background = 'white';
    document.body.appendChild(exportContainer);

    // Render the current template to the export container
    const root = createRoot(exportContainer);
    root.render(<ResumePreview templateId={templateId} data={data} scale={1} />);

    // Wait for render to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    const templateComponent = exportContainer.querySelector('#resume-template-root');

    if (!templateComponent) {
      toast.error('PDF generation failed. Please try again.');
      root.unmount();
      document.body.removeChild(exportContainer);
      setIsExporting(false);
      return;
    }

    try {
      const fileName = data.personalInfo.fullName
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      // Get actual content height for dynamic PDF sizing
      const contentHeight = (templateComponent as HTMLElement).scrollHeight || (templateComponent as HTMLElement).offsetHeight;
      const pdfHeight = Math.max(contentHeight, 842); // Minimum A4 height

      const options = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          width: 595,
          height: pdfHeight,
          windowWidth: 595,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { 
          unit: 'pt', 
          format: [595, pdfHeight],
          orientation: 'portrait' as const,
        },
      };

      await html2pdf().set(options).from(templateComponent).save();
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('PDF download failed. Please try again.');
    } finally {
      // Cleanup
      root.unmount();
      document.body.removeChild(exportContainer);
      setIsExporting(false);
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
            <Button size="sm" onClick={handleModalExportPDF} disabled={isExporting}>
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isExporting ? 'Exporting...' : 'PDF'}
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 h-[calc(90vh-80px)]">
          <div className="p-4 md:p-8 bg-muted min-h-full flex justify-center">
            <div className="resume-preview-modal bg-white shadow-xl">
              <ResumePreview templateId={templateId} data={data} scale={1} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
