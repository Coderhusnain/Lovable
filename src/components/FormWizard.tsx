import React, { useState } from "react";
import { CheckCircle2, Circle, ChevronLeft, FileText, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Field definition for dynamic field rendering
export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "number" | "select" | "email" | "phone";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  dependsOn?: string;
  getOptions?: (value: string) => { value: string; label: string }[];
}

// Step with pre-built content (JSX)
interface ContentStep {
  label: string;
  content: React.ReactNode;
  validate?: () => boolean;
}

// Step with field definitions (auto-rendered)
interface FieldStep {
  label: string;
  fields: FieldDef[];
}

type Step = ContentStep | FieldStep;

interface FormWizardProps {
  steps: Step[];
  onFinish?: () => void;
  onGenerate?: (formData: Record<string, any>) => void;
  title?: string;
  subtitle?: string;
  documentType?: string;
}

// Type guard to check if step has content
const isContentStep = (step: Step): step is ContentStep => {
  return 'content' in step;
};

export const FormWizard: React.FC<FormWizardProps> = ({ 
  steps, 
  onFinish, 
  onGenerate,
  title,
  subtitle,
  documentType 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<Record<string, any>>({});

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  // Validate current step
  const validateStep = (): boolean => {
    const step = steps[currentStep];
    if (isContentStep(step)) {
      return step.validate ? step.validate() : true;
    }
    // For field steps, check required fields
    return step.fields.every(field => 
      !field.required || (formData[field.name] && formData[field.name].toString().trim() !== '')
    );
  };

  const stepValid = validateStep();

  const handleNext = () => {
    setTouched(true);
    if (stepValid && !isLastStep) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((s) => s + 1);
      setTouched(false);
    } else if (stepValid && isLastStep) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      if (onGenerate) {
        onGenerate(formData);
      } else if (onFinish) {
        onFinish();
      }
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((s) => s - 1);
      setTouched(false);
    }
  };

  const jumpToStep = (index: number) => {
    if (completedSteps.has(index) || index <= Math.max(...Array.from(completedSteps), -1) + 1) {
      setCurrentStep(index);
      setTouched(false);
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Render a single field
  const renderField = (field: FieldDef) => {
    const value = formData[field.name] || '';
    const showError = touched && field.required && !value;

    // Handle dependent selects
    let options = field.options || [];
    if (field.dependsOn && field.getOptions) {
      const dependentValue = formData[field.dependsOn];
      if (dependentValue) {
        options = field.getOptions(dependentValue);
      }
    }

    return (
      <div key={field.name} className="space-y-2">
        <Label className={showError ? "text-red-500" : ""}>
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </Label>
        
        {field.type === "textarea" ? (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={showError ? "border-red-500" : ""}
            rows={3}
          />
        ) : field.type === "select" ? (
          <Select value={value} onValueChange={(v) => handleFieldChange(field.name, v)}>
            <SelectTrigger className={showError ? "border-red-500" : ""}>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "email" ? "email" : "text"}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={showError ? "border-red-500" : ""}
          />
        )}
        
        {showError && (
          <p className="text-xs text-red-500">This field is required</p>
        )}
      </div>
    );
  };

  // Render step content
  const renderStepContent = () => {
    const step = steps[currentStep];
    if (isContentStep(step)) {
      return step.content;
    }
    // Render field-based step
    return (
      <div className="space-y-5">
        {step.fields.map(renderField)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-gray-800">{title || documentType || "Document Builder"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm font-semibold text-orange-600">{progress}% Complete</span>
            </div>
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
          )}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Sidebar - Step Navigator */}
        <aside className="w-64 bg-white border-r hidden lg:block overflow-y-auto py-6">
          <nav className="px-4 space-y-1">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(index);
              const isCurrent = index === currentStep;
              const isClickable = isCompleted || index <= Math.max(...Array.from(completedSteps), -1) + 1;

              return (
                <button
                  key={index}
                  onClick={() => isClickable && jumpToStep(index)}
                  disabled={!isClickable}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    isCurrent
                      ? "bg-orange-50 text-orange-700 border border-orange-200"
                      : isCompleted
                      ? "text-gray-600 hover:bg-gray-50"
                      : isClickable
                      ? "text-gray-400 hover:bg-gray-50"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : isCurrent ? (
                      <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <span className={`text-sm font-medium truncate ${isCurrent ? "text-orange-700" : ""}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Form Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-32">
          <div className="max-w-2xl mx-auto">
            {/* Mobile Step Indicator */}
            <div className="lg:hidden flex items-center gap-2 mb-6 text-sm text-gray-500 overflow-x-auto pb-2">
              {steps.slice(Math.max(0, currentStep - 1), currentStep + 3).map((step, idx) => {
                const actualIdx = Math.max(0, currentStep - 1) + idx;
                const isCurrent = actualIdx === currentStep;
                return (
                  <span
                    key={actualIdx}
                    className={`whitespace-nowrap px-2 py-1 rounded ${
                      isCurrent ? "bg-orange-100 text-orange-700 font-medium" : "text-gray-400"
                    }`}
                  >
                    {actualIdx + 1}. {step.label}
                  </span>
                );
              })}
            </div>

            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-orange-600 font-medium mb-2">
                <span className="bg-orange-100 px-2 py-0.5 rounded">Step {currentStep + 1}</span>
                {currentStep < steps.length - 1 && (
                  <span className="text-gray-400">→ Next: {steps[currentStep + 1]?.label}</span>
                )}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{steps[currentStep].label}</h2>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8">
              {renderStepContent()}
            </div>

            {/* Helpful tip for last step */}
            {isLastStep && (
              <div className="mt-6 flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Almost done!</p>
                  <p className="text-sm text-orange-600">Click "Generate Document" below to create your personalized legal document as a PDF.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Persistent Bottom Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
              isFirstStep
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline">
              {completedSteps.size} of {steps.length} steps completed
            </span>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    completedSteps.has(i)
                      ? "bg-green-500"
                      : i === currentStep
                      ? "bg-orange-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!stepValid && touched}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
              isLastStep
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLastStep ? (
              <>
                <FileText className="w-5 h-5" />
                <span>Generate Document</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
