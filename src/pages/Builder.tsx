import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '@/context/ResumeContext';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/templates/ResumePreview';
import { PreviewModal } from '@/components/PreviewModal';
import { templates } from '@/data/templates';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Palette,
  Loader2,
} from 'lucide-react';
import { TemplateId } from '@/types/resume';
import { toast } from 'sonner';
import html2pdf from 'html2pdf.js';

export default function Builder() {
  const navigate = useNavigate();
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const [showPreview, setShowPreview] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Get current template info
  const currentTemplate = templates.find((t) => t.id === selectedTemplate);

  const handleExportPDF = async () => {
    const templateComponent = document.querySelector('.resume-preview-container') || 
                              document.querySelector('.resume-preview-modal');
    
    if (!templateComponent) {
      toast.error('PDF download failed. Please try again.');
      return;
    }

    setIsExporting(true);

    try {
      const fileName = resumeData.personalInfo.fullName
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      const options = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { 
          unit: 'pt', 
          format: 'a4', 
          orientation: 'portrait' as const,
        },
      };

      await html2pdf().set(options).from(templateComponent).save();
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('PDF download failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
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
            {/* Template Selector - Free Switching */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <Select
                value={selectedTemplate}
                onValueChange={(value) => setSelectedTemplate(value as TemplateId)}
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Button size="sm" onClick={handleExportPDF} disabled={!hasData || isExporting}>
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isExporting ? 'Exporting...' : 'PDF'}
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
        <Button size="sm" onClick={handleExportPDF} disabled={!hasData || isExporting}>
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
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
