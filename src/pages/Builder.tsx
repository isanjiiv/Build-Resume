import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '@/context/ResumeContext';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/templates/ResumePreview';
import { PreviewModal } from '@/components/PreviewModal';
import { templates } from '@/data/templates';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Lock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Builder() {
  const navigate = useNavigate();
  const { resumeData, selectedTemplate } = useResume();
  const [showPreview, setShowPreview] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Get current template info
  const currentTemplate = templates.find((t) => t.id === selectedTemplate);

  const handleExportPDF = async () => {
    // Create a printable version from the preview
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const templateComponent = document.querySelector('.resume-preview-container') || 
                              document.querySelector('.resume-preview-modal');
    if (!templateComponent) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${resumeData.personalInfo.fullName || 'Download'}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; }
            @page { size: A4; margin: 0; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${templateComponent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleExportHTML = () => {
    const templateComponent = document.querySelector('.resume-preview-container') ||
                              document.querySelector('.resume-preview-modal');
    if (!templateComponent) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${resumeData.personalInfo.fullName || 'Download'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; line-height: 1.4; }
  </style>
</head>
<body>
  ${templateComponent.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-${resumeData.personalInfo.fullName?.toLowerCase().replace(/\s+/g, '-') || 'download'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewPortfolio = () => {
    navigate('/portfolio');
  };

  const hasData = resumeData.personalInfo.fullName || resumeData.summary || resumeData.skills.length > 0;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <div className="h-6 w-px bg-border" />
            {/* Locked Template Display */}
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <Badge variant="secondary" className="font-medium">
                {currentTemplate?.name || 'Modern Sidebar'}
              </Badge>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPreviewModalOpen(true)}
              disabled={!hasData}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Resume
            </Button>
            <Button variant="outline" size="sm" onClick={handleViewPortfolio}>
              <Globe className="w-4 h-4 mr-2" />
              Portfolio
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportHTML} disabled={!hasData}>
              <FileText className="w-4 h-4 mr-2" />
              HTML
            </Button>
            <Button size="sm" onClick={handleExportPDF} disabled={!hasData}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>

          {/* Mobile Preview Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Edit
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`w-full md:w-1/2 lg:w-[45%] editor-panel overflow-hidden ${
            showPreview ? 'hidden md:block' : ''
          }`}
        >
          <ResumeForm />
        </div>

        {/* Preview Panel */}
        <div
          className={`w-full md:w-1/2 lg:w-[55%] preview-panel ${
            !showPreview ? 'hidden md:flex' : 'flex'
          }`}
          ref={previewRef}
        >
          <div className="resume-preview-container shadow-elevated rounded-lg overflow-hidden">
            <ResumePreview templateId={selectedTemplate} data={resumeData} />
          </div>
        </div>
      </div>

      {/* Mobile Floating Actions - Sticky Bottom Bar */}
      <div className="floating-actions md:hidden">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setPreviewModalOpen(true)}
          disabled={!hasData}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleViewPortfolio}>
          <Globe className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportHTML} disabled={!hasData}>
          <FileText className="w-4 h-4" />
        </Button>
        <Button size="sm" onClick={handleExportPDF} disabled={!hasData}>
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        templateId={selectedTemplate}
        data={resumeData}
        onExportPDF={handleExportPDF}
        onExportHTML={handleExportHTML}
      />
    </div>
  );
}
