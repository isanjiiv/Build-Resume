import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, TemplateId } from '@/types/resume';
import { emptyResumeData } from '@/data/sampleResume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: TemplateId;
  setSelectedTemplate: (template: TemplateId) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEY = 'resume-builder-data';
const TEMPLATE_KEY = 'resume-builder-template';

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : emptyResumeData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(() => {
    const saved = localStorage.getItem(TEMPLATE_KEY);
    return (saved as TemplateId) || 'modern-sidebar';
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Autosave to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
  }, [selectedTemplate]);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
}
