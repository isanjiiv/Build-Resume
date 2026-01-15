import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '@/data/templates';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateId } from '@/types/resume';
import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Sparkles, Download, Globe, Check } from 'lucide-react'; // Added Check

export default function Index() {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useResume();
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateId | null>(null);
  
  // New state for Declaration option
  const [includeDeclaration, setIncludeDeclaration] = useState(false);

  const handleTemplateSelect = (id: TemplateId) => {
    setSelectedTemplate(id);
  };

  const handleStartBuilding = () => {
    // Navigate with the declaration state preference
    navigate('/builder', { 
      state: { withDeclaration: includeDeclaration } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Professional Resume Builder
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Build Your Perfect Resume
              <span className="block gradient-text">in Minutes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose from professionally designed templates, fill in your details, and export 
              a stunning resume that gets you noticed by employers.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">ATS-Friendly</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">PDF Export</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">Portfolio Page</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Template Selection */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Choose Your Template
            </h2>
            <p className="text-muted-foreground">
              Select a template to get started. You can always change it later.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {templates.map((template, idx) => (
              <div
                key={template.id}
                className="animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <TemplateCard
                  templateId={template.id}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleTemplateSelect}
                />
              </div>
            ))}
          </div>

          {/* CTA with Declaration Option */}
          <div className="text-center animate-fade-in">
            
            {/* NEW: Declaration Checkbox */}
            <div 
              className="flex items-center justify-center gap-2 mb-6 cursor-pointer group select-none"
              onClick={() => setIncludeDeclaration(!includeDeclaration)}
            >
              <div className={`
                w-5 h-5 rounded border flex items-center justify-center transition-all duration-200
                ${includeDeclaration 
                  ? 'bg-primary border-primary' 
                  : 'border-muted-foreground/30 bg-background group-hover:border-primary'}
              `}>
                {includeDeclaration && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Include <strong>Declaration</strong> section in resume
              </span>
            </div>

            <Button
              size="lg"
              onClick={handleStartBuilding}
              className="px-8 py-6 text-lg font-semibold shadow-elevated hover:shadow-card-hover transition-all duration-300"
            >
              Start Building Your Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Free to use • No signup required • Export anytime
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Build professional resumes that stand out. All templates are ATS-friendly.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
