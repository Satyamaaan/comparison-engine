import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  steps?: string[];
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  currentStep,
  steps = ['Property', 'Personal', 'Income', 'Confirm']
}) => {
  return (
    <div className="flex justify-between mb-8 w-full max-w-md">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div 
              className={`h-8 w-8 rounded-full flex items-center justify-center
                ${index + 1 <= currentStep ? 'bg-emerald-600' : 'bg-gray-200'}`}
            >
              <span 
                className={`font-bold
                  ${index + 1 <= currentStep ? 'text-white' : 'text-gray-500'}`}
              >
                {index + 1}
              </span>
            </div>
            <span 
              className={`text-xs mt-1
                ${index + 1 <= currentStep ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}
            >
              {step}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-1 flex items-center mx-2">
              <div 
                className={`h-1 w-full 
                  ${index + 1 < currentStep ? 'bg-emerald-600' : 'bg-gray-200'}`}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps; 