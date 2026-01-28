import React, { useState } from "react";

interface Step {
  label: string;
  content: React.ReactNode;
  validate?: () => boolean;
}

interface FormWizardProps {
  steps: Step[];
  onFinish: () => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({ steps, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [touched, setTouched] = useState(false);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const stepValid = steps[currentStep].validate ? steps[currentStep].validate!() : true;

  const handleNext = () => {
    setTouched(true);
    if (stepValid && !isLastStep) {
      setCurrentStep((s) => s + 1);
      setTouched(false);
    } else if (stepValid && isLastStep) {
      onFinish();
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((s) => s - 1);
      setTouched(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-semibold">
          Step {currentStep + 1} of {steps.length}
        </div>
        <div className="w-1/2 bg-gray-200 rounded-full h-2">
          <div
            className="bg-bright-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{steps[currentStep].label}</h2>
        <div>{steps[currentStep].content}</div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
          onClick={handleBack}
          disabled={isFirstStep}
        >
          Back
        </button>
        <button
          type="button"
          className="px-6 py-2 rounded bg-bright-orange-500 text-white font-semibold disabled:opacity-50"
          onClick={handleNext}
          disabled={!stepValid && touched}
        >
          {isLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
