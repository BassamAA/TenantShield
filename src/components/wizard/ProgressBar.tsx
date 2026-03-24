'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Jurisdiction', 'Issue', 'Details', 'Preview'];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {STEP_LABELS.map((label, idx) => {
          const step = idx + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-trust-green text-white'
                    : isCurrent
                    ? 'bg-navy-800 text-white ring-4 ring-navy-200'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`text-xs mt-1 font-medium hidden sm:block ${
                  isCurrent ? 'text-navy-800' : isCompleted ? 'text-trust-green' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="relative h-1.5 bg-gray-200 rounded-full mt-1 mx-4">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-navy-800 to-trust-green rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-center text-xs text-gray-500 mt-3">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
