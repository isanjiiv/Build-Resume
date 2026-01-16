import { ResumeData, TemplateId } from '@/types/resume';
import { ResumePreview } from '@/components/templates/ResumePreview';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
            <Button size="sm" onClick={onExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
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
