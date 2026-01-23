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
import { Download, Loader2, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { exportToPDF, generateFilename } from '@/lib/pdfExport';

interface PDFPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: TemplateId;
  data: ResumeData;
}

// A4 dimensions in points (1 point = 1/72 inch)
const A4_WIDTH_PT = 595;
const A4_HEIGHT_PT = 842;

export function PDFPreviewModal({
  open,
  onOpenChange,
  templateId,
  data,
}: PDFPreviewModalProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);

    // Create a dedicated container for PDF export
    const exportContainer = document.createElement('div');
    exportContainer.id = 'pdf-export-container-preview';
    exportContainer.style.position = 'absolute';
    exportContainer.style.left = '-9999px';
    exportContainer.style.top = '0';
    exportContainer.style.width = `${A4_WIDTH_PT}pt`;
    exportContainer.style.background = 'white';
    document.body.appendChild(exportContainer);

    // Render the current template to the export container
    const root = createRoot(exportContainer);
    root.render(<ResumePreview templateId={templateId} data={data} scale={1} />);

    // Wait for render to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    const templateComponent = exportContainer.querySelector('#resume-template-root') as HTMLElement;

    if (!templateComponent) {
      toast.error('PDF generation failed. Please try again.');
      root.unmount();
      document.body.removeChild(exportContainer);
      setIsExporting(false);
      return;
    }

    try {
      const fileName = generateFilename(data.personalInfo.fullName);
      await exportToPDF(templateComponent, { filename: fileName, scale: 2 });
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('PDF download failed. Please try again.');
    } finally {
      root.unmount();
      document.body.removeChild(exportContainer);
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] w-[95vw] h-[95vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-border bg-card flex flex-row items-center justify-between shrink-0">
          <DialogTitle className="text-lg font-semibold">
            PDF Preview (A4 Format)
          </DialogTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">
              This is exactly how your PDF will look
            </span>
            <Button size="sm" onClick={handleExportPDF} disabled={isExporting}>
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isExporting ? 'Exporting...' : 'Download PDF'}
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 h-[calc(95vh-80px)]">
          <div className="p-6 md:p-10 bg-muted/50 min-h-full flex justify-center">
            {/* A4 Preview Container - exact proportions */}
            <div 
              className="bg-white shadow-2xl border border-border/50"
              style={{
                width: `${A4_WIDTH_PT}px`,
                minHeight: `${A4_HEIGHT_PT}px`,
                // Show A4 page outline
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <ResumePreview templateId={templateId} data={data} scale={1} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
