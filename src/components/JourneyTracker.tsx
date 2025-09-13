import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  href?: string;
}

interface JourneyTrackerProps {
  steps: JourneyStep[];
  currentStep: number;
  totalSteps: number;
  title?: string;
  description?: string;
}

export const JourneyTracker = ({ 
  steps, 
  currentStep, 
  totalSteps, 
  title = "Your Journey",
  description = "Complete each step to bring your event to life"
}: JourneyTrackerProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-primary/10 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-primary border-primary/20 bg-primary/5">
          Step {currentStep} of {totalSteps}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm font-bold text-primary">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
              step.completed 
                ? 'bg-primary/5 border-primary/20' 
                : step.current
                ? 'bg-primary/10 border-primary shadow-md'
                : 'bg-muted/30 border-border hover:border-border/60'
            }`}
          >
            {/* Step Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
              step.completed 
                ? 'bg-primary text-white' 
                : step.current
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground'
            }`}>
              {step.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span className="text-lg font-bold">{step.step}</span>
              )}
            </div>
            
            {/* Step Content */}
            <h3 className={`font-bold text-base mb-2 ${
              step.current ? 'text-primary' : 'text-foreground'
            }`}>
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {step.description}
            </p>
            
            {/* Continue Button for Current Step */}
            {step.current && step.href && (
              <Link to={step.href}>
                <Button size="sm" className="w-full">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};