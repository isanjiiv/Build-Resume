import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '@/data/templates';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateId } from '@/types/resume';
import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  ShieldCheck,
  Zap,
  FileText,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Professional',
  'Modern',
  'Creative',
  'Simple',
  'Executive',
  'Tech',
] as const;

type Category = (typeof CATEGORIES)[number];

export default function Index() {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useResume();
  const [category, setCategory] = useState<Category>('All');

  const filtered = useMemo(() => {
    if (category === 'All') return templates;
    return templates.filter((t) =>
      t.tags?.some((tag) => tag.toLowerCase().includes(category.toLowerCase())),
    );
  }, [category]);

  const handleSelect = (id: TemplateId) => setSelectedTemplate(id);
  const handleUse = (id: TemplateId) => {
    setSelectedTemplate(id);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span>BuildResume</span>
          </div>
          <Button size="sm" onClick={() => navigate('/builder')}>
            Create my resume
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: 'var(--gradient-hero)' }}
        />
        <div className="relative container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered • ATS-friendly
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 tracking-tight leading-[1.05]">
              Pick a template.
              <span className="block gradient-text">Land the interview.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professionally designed, recruiter-approved resume templates. Customize in minutes
              and download as a pixel-perfect PDF.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Free, no signup
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" /> ATS-optimized
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" /> AI suggestions
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" /> 4.9/5 from users
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Templates section */}
      <main className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
              Choose your resume template
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hover any template and click <span className="font-medium text-foreground">Use this template</span>{' '}
              to start building. You can switch templates anytime.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  category === cat
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-14">
            {filtered.map((template, idx) => (
              <div
                key={template.id}
                className="animate-slide-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <TemplateCard
                  templateId={template.id}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleSelect}
                  onUse={handleUse}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-16">
              No templates in this category yet.
            </div>
          )}

          {/* CTA */}
          <div className="text-center animate-fade-in">
            <Button
              size="lg"
              onClick={() => navigate('/builder')}
              className="px-8 py-6 text-base font-semibold shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-card-hover)] transition-all"
            >
              Start building with selected template
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Free forever • No signup required • Download unlimited PDFs
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          Build professional, ATS-friendly resumes that get noticed.
        </div>
      </footer>
    </div>
  );
}
