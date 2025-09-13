import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Lightbulb, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState("idea");
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    budget: "",
    attendees: "",
    objectives: "",
    requirements: ""
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === "idea") {
      if (!eventData.title || !eventData.description) {
        toast({
          title: "Please fill required fields",
          description: "Event title and description are required to proceed.",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep("details");
    } else if (currentStep === "details") {
      setCurrentStep("generate");
    }
  };

  const handleGeneratePlan = () => {
    toast({
      title: "Event plan generated!",
      description: "Your event has been submitted for review.",
    });
    navigate("/review");
  };

  const steps = [
    { id: "idea", title: "Event Idea", icon: Lightbulb },
    { id: "details", title: "Event Details", icon: FileText },
    { id: "generate", title: "Generate Plan", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Event Creation Wizard
            </h1>
            <p className="text-muted-foreground text-lg">
              Let's bring your event idea to life in just 3 simple steps
            </p>
          </div>

          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <TabsTrigger 
                    key={step.id} 
                    value={step.id}
                    disabled={currentStep === "idea" && step.id !== "idea"}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {step.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="idea">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Tell us about your event idea
                  </CardTitle>
                  <CardDescription>
                    Start with the basics - what's your vision?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., HTW Tech Conference 2024"
                      value={eventData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event, its purpose, and what makes it special..."
                      value={eventData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="objectives">Key Objectives</Label>
                    <Textarea
                      id="objectives"
                      placeholder="What do you hope to achieve with this event?"
                      value={eventData.objectives}
                      onChange={(e) => handleInputChange("objectives", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Event Details
                  </CardTitle>
                  <CardDescription>
                    Let's get into the specifics of your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        placeholder="Event location"
                        value={eventData.venue}
                        onChange={(e) => handleInputChange("venue", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={eventData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Input
                        id="budget"
                        placeholder="e.g., $5,000 - $10,000"
                        value={eventData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="attendees">Expected Attendees</Label>
                      <Input
                        id="attendees"
                        placeholder="e.g., 100-200 people"
                        value={eventData.attendees}
                        onChange={(e) => handleInputChange("attendees", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Any special needs, equipment, catering preferences, etc."
                      value={eventData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generate">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Generate Your Event Plan
                  </CardTitle>
                  <CardDescription>
                    Review your details and generate a comprehensive event plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent/50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Event Summary</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Title:</span> {eventData.title}</p>
                      <p><span className="font-medium">Description:</span> {eventData.description}</p>
                      {eventData.venue && <p><span className="font-medium">Venue:</span> {eventData.venue}</p>}
                      {eventData.date && <p><span className="font-medium">Date:</span> {eventData.date}</p>}
                      {eventData.budget && <p><span className="font-medium">Budget:</span> {eventData.budget}</p>}
                      {eventData.attendees && <p><span className="font-medium">Attendees:</span> {eventData.attendees}</p>}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={handleGeneratePlan}
                      className="px-8 shadow-elegant hover:shadow-glow transition-all duration-300"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Event Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep === "details") setCurrentStep("idea");
                else if (currentStep === "generate") setCurrentStep("details");
              }}
              disabled={currentStep === "idea"}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep !== "generate" && (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;