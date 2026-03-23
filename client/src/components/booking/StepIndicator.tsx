'use client';

import { Check, Calendar, Clock, User, Sparkles } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { id: 1, label: 'Service', icon: <Sparkles className="h-4 w-4" /> },
  { id: 2, label: 'Date & Time', icon: <Calendar className="h-4 w-4" /> },
  { id: 3, label: 'Details', icon: <User className="h-4 w-4" /> },
  { id: 4, label: 'Confirm', icon: <Check className="h-4 w-4" /> },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar for desktop */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Background line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-primary/10" />
          
          {/* Active progress line */}
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-accent transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300
                      ${isCompleted
                        ? 'border-accent bg-accent text-white'
                        : isCurrent
                        ? 'border-accent bg-background text-accent shadow-md'
                        : 'border-primary/20 bg-background text-secondary'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span
                    className={`
                      text-xs font-medium transition-colors duration-300
                      ${isCurrent ? 'text-accent' : 'text-secondary'}
                    `}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile step indicator */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between rounded-xl border border-primary/10 bg-white/60 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-md">
              {steps[currentStep - 1]?.icon}
            </div>
            <div>
              <p className="text-xs text-secondary">Step {currentStep} of {steps.length}</p>
              <p className="font-heading text-lg text-primary">{steps[currentStep - 1]?.label}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                  step.id <= currentStep ? 'bg-accent' : 'bg-primary/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
