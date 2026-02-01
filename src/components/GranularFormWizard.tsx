import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronLeft, ChevronRight, FileText, AlertCircle, Save, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface WizardStep {
  id: string;
  title: string;
  shortTitle?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
  validate?: () => boolean | Promise<boolean>;
  isOptional?: boolean;
  helpText?: string;
}

interface GranularFormWizardProps {
  steps: WizardStep[];
  onFinish: () => void | Promise<void>;
  onSaveDraft?: () => void;
  documentTitle?: string;
  documentDescription?: string;
  showSidebar?: boolean;
  allowJumpToStep?: boolean;
  persistFooter?: boolean;
  accentColor?: string;
}

// ============================================================================
// GRANULAR FORM WIZARD COMPONENT
// ============================================================================

export const GranularFormWizard: React.FC<GranularFormWizardProps> = ({
  steps,
  onFinish,
  onSaveDraft,
  documentTitle = "Create Your Document",
  documentDescription = "Complete each step to generate your legal document",
  showSidebar = true,
  allowJumpToStep = true,
  persistFooter = true,
  accentColor = "#f97316" // Orange-500
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isValidating, setIsValidating] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [touchedSteps, setTouchedSteps] = useState<Set<number>>(new Set());

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const completedPercentage = (completedSteps.size / steps.length) * 100;

  // Validate current step
  const validateCurrentStep = useCallback(async () => {
    if (!currentStepData.validate) return true;
    
    setIsValidating(true);
    try {
      const result = await currentStepData.validate();
      return result;
    } catch {
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [currentStepData]);

  // Handle Next
  const handleNext = useCallback(async () => {
    setTouchedSteps(prev => new Set([...prev, currentStep]));
    
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    // Mark current step as completed
    setCompletedSteps(prev => new Set([...prev, currentStep]));

    if (isLastStep) {
      setIsFinishing(true);
      try {
        await onFinish();
      } finally {
        setIsFinishing(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, isLastStep, onFinish, validateCurrentStep]);

  // Handle Back
  const handleBack = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  }, [isFirstStep]);

  // Handle jump to step (if allowed and step is accessible)
  const handleJumpToStep = useCallback((index: number) => {
    if (!allowJumpToStep) return;
    
    // Can jump to completed steps or the next incomplete step
    const canJump = completedSteps.has(index) || index <= Math.max(...Array.from(completedSteps), 0) + 1;
    if (canJump || index <= currentStep) {
      setCurrentStep(index);
    }
  }, [allowJumpToStep, completedSteps, currentStep]);

  // Estimated time remaining
  const estimatedTimeRemaining = useMemo(() => {
    const remainingSteps = steps.length - currentStep;
    const minutesPerStep = 1.5;
    const totalMinutes = Math.ceil(remainingSteps * minutesPerStep);
    return totalMinutes <= 1 ? "Less than a minute" : `About ${totalMinutes} minutes`;
  }, [currentStep, steps.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <FileText className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-lg">{documentTitle}</h1>
              <p className="text-sm text-gray-500">{estimatedTimeRemaining} remaining</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {onSaveDraft && (
              <Button variant="outline" size="sm" onClick={onSaveDraft} className="gap-2">
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
            )}
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <Progress 
            value={progressPercentage} 
            className="h-2"
            style={{ 
              "--progress-background": accentColor 
            } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Sidebar - Step Navigator */}
        {showSidebar && (
          <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 py-6 px-4 overflow-y-auto">
            <div className="space-y-1">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = completedSteps.has(index);
                const isAccessible = allowJumpToStep && (isCompleted || index <= currentStep);
                const StepIcon = step.icon;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleJumpToStep(index)}
                    disabled={!isAccessible}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200",
                      isActive && "bg-orange-50 border-l-4 border-orange-500",
                      !isActive && isCompleted && "bg-green-50 hover:bg-green-100",
                      !isActive && !isCompleted && "hover:bg-gray-50",
                      !isAccessible && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div 
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                        isActive && "bg-orange-500 text-white",
                        isCompleted && !isActive && "bg-green-500 text-white",
                        !isActive && !isCompleted && "bg-gray-200 text-gray-600"
                      )}
                    >
                      {isCompleted && !isActive ? (
                        <Check className="w-4 h-4" />
                      ) : StepIcon ? (
                        <StepIcon className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "font-medium text-sm truncate",
                        isActive && "text-orange-900",
                        isCompleted && !isActive && "text-green-900",
                        !isActive && !isCompleted && "text-gray-700"
                      )}>
                        {step.shortTitle || step.title}
                      </p>
                      {step.isOptional && (
                        <span className="text-xs text-gray-400">Optional</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Completion Summary */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{Math.round(completedPercentage)}%</span>
              </div>
              <Progress value={completedPercentage} className="h-2" />
              <p className="text-xs text-gray-500 mt-2">
                {completedSteps.size} of {steps.length} steps completed
              </p>
            </div>
          </aside>
        )}

        {/* Main Form Content */}
        <main className="flex-1 overflow-y-auto pb-32">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Step Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}15` }}
                >
                  {currentStepData.icon ? (
                    <currentStepData.icon className="w-5 h-5 text-orange-500" />
                  ) : (
                    <span className="font-semibold text-orange-500">
                      {currentStep + 1}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h2>
                  {currentStepData.isOptional && (
                    <span className="text-sm text-gray-400 ml-2">(Optional)</span>
                  )}
                </div>
              </div>
              {currentStepData.description && (
                <p className="text-gray-600 ml-13">{currentStepData.description}</p>
              )}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {currentStepData.content}
            </div>

            {/* Help Text */}
            {currentStepData.helpText && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">{currentStepData.helpText}</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Persistent Footer */}
      {persistFooter && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Mobile Progress */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-32">
                <Progress value={progressPercentage} className="h-2" />
              </div>
              <span className="text-sm text-gray-500">
                {currentStep + 1}/{steps.length}
              </span>
            </div>

            {/* Desktop: Step indicator dots */}
            <div className="hidden lg:flex items-center gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentStep && "bg-orange-500 w-8",
                    index < currentStep && "bg-green-500",
                    index > currentStep && "bg-gray-300"
                  )}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isFirstStep || isValidating || isFinishing}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={isValidating || isFinishing}
                className="gap-2 px-6"
                style={{ backgroundColor: accentColor }}
              >
                {isValidating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Validating...
                  </>
                ) : isFinishing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : isLastStep ? (
                  <>
                    <Download className="w-4 h-4" />
                    Generate Document
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

// ============================================================================
// HELPER FUNCTION TO AUTO-SPLIT FORM FIELDS INTO MICRO-STEPS
// ============================================================================

interface FieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  helpText?: string;
  group?: string;
}

interface AutoWizardConfig {
  documentTitle: string;
  documentDescription: string;
  fields: FieldDefinition[];
  groupLabels?: Record<string, { title: string; description?: string; icon?: React.ComponentType<{ className?: string }> }>;
  maxFieldsPerStep?: number;
}

/**
 * Auto-generates wizard steps from a flat list of form fields
 * Groups fields by their 'group' property and creates micro-steps
 */
export function generateWizardSteps(
  config: AutoWizardConfig,
  formData: Record<string, any>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
): WizardStep[] {
  const { fields, groupLabels = {}, maxFieldsPerStep = 4 } = config;

  // Group fields
  const groupedFields = fields.reduce((acc, field) => {
    const group = field.group || 'general';
    if (!acc[group]) acc[group] = [];
    acc[group].push(field);
    return acc;
  }, {} as Record<string, FieldDefinition[]>);

  const steps: WizardStep[] = [];
  let stepIndex = 0;

  Object.entries(groupedFields).forEach(([groupKey, groupFields]) => {
    const groupConfig = groupLabels[groupKey] || { title: groupKey.charAt(0).toUpperCase() + groupKey.slice(1) };
    
    // Split large groups into multiple steps
    for (let i = 0; i < groupFields.length; i += maxFieldsPerStep) {
      const stepFields = groupFields.slice(i, i + maxFieldsPerStep);
      const isFirstChunk = i === 0;
      
      steps.push({
        id: `${groupKey}-${stepIndex}`,
        title: isFirstChunk ? groupConfig.title : `${groupConfig.title} (continued)`,
        description: isFirstChunk ? groupConfig.description : undefined,
        icon: groupConfig.icon,
        content: (
          <div className="space-y-4">
            {stepFields.map(field => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={formData[field.name] || false}
                    onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.checked.toString() } } as any)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                )}
                
                {field.helpText && (
                  <p className="text-xs text-gray-500">{field.helpText}</p>
                )}
              </div>
            ))}
          </div>
        ),
        validate: () => {
          // Validate required fields
          return stepFields.every(field => {
            if (!field.required) return true;
            const value = formData[field.name];
            return value !== undefined && value !== null && value !== '';
          });
        }
      });
      
      stepIndex++;
    }
  });

  // Add Review & Generate step
  steps.push({
    id: 'review',
    title: 'Review & Generate',
    description: 'Review your information before generating the document',
    content: (
      <div className="space-y-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">✓ All information collected</h3>
          <p className="text-sm text-green-700">
            Click "Generate Document" to create your professional legal document.
          </p>
        </div>
        
        <div className="space-y-4">
          {Object.entries(groupedFields).map(([groupKey, groupFields]) => {
            const groupConfig = groupLabels[groupKey] || { title: groupKey };
            const filledFields = groupFields.filter(f => formData[f.name]);
            
            if (filledFields.length === 0) return null;
            
            return (
              <div key={groupKey} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{groupConfig.title}</h4>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  {filledFields.map(field => (
                    <React.Fragment key={field.name}>
                      <dt className="text-gray-500">{field.label}:</dt>
                      <dd className="text-gray-900 truncate">
                        {String(formData[field.name]).substring(0, 50)}
                        {String(formData[field.name]).length > 50 ? '...' : ''}
                      </dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    )
  });

  return steps;
}

export default GranularFormWizard;
