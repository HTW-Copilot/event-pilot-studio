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
import { JourneyTracker, type JourneyStep } from "@/components/JourneyTracker";
import honoluluSkyline from "@/assets/honolulu-skyline.png";

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

  const journeySteps: JourneyStep[] = [
    { 
      step: 1, 
      title: "Welcome & Orientation", 
      description: "Get familiar with HTW hosting",
      completed: true,
      current: false
    },
    { 
      step: 2, 
      title: "Draft Event Idea", 
      description: "Create your event concept",
      completed: currentStep === "details" || currentStep === "generate",
      current: currentStep === "idea"
    },
    { 
      step: 3, 
      title: "Pick Venue & Time", 
      description: "Select location and schedule",
      completed: currentStep === "generate",
      current: currentStep === "details"
    },
    { 
      step: 4, 
      title: "Budget & Logistics", 
      description: "Plan resources and requirements",
      completed: false,
      current: false
    },
    { 
      step: 5, 
      title: "Submit for Review", 
      description: "Final review and approval",
      completed: false,
      current: currentStep === "generate"
    }
  ];

  const getCurrentStepNumber = () => {
    if (currentStep === "idea") return 2;
    if (currentStep === "details") return 3;
    if (currentStep === "generate") return 5;
    return 2;
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='60' cy='20' r='3'/%3E%3Ccircle cx='20' cy='60' r='3'/%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-8">
              {/* Left Sidebar - Progress Steps */}
              <div className="w-80 flex-shrink-0">
                <div className="space-y-6">
                  {/* Event Basics */}
                  <div className={`p-4 rounded-xl border ${currentStep === "idea" ? 'bg-yellow/10 border-yellow/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "idea" ? 'bg-yellow text-secondary' : 'bg-white/20 text-white/60'}`}>
                        📝
                      </div>
                      <div>
                        <div className={`font-semibold ${currentStep === "idea" ? 'text-yellow' : 'text-white/60'}`}>Event Basics</div>
                        <div className="text-sm text-white/60">Title & Concept</div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className={`p-4 rounded-xl border ${currentStep === "details" ? 'bg-yellow/10 border-yellow/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "details" ? 'bg-yellow text-secondary' : 'bg-white/20 text-white/60'}`}>
                        🎯
                      </div>
                      <div>
                        <div className={`font-semibold ${currentStep === "details" ? 'text-yellow' : 'text-white/60'}`}>Details</div>
                        <div className="text-sm text-white/60">Audience & Format</div>
                      </div>
                    </div>
                  </div>

                  {/* Logistics */}
                  <div className="p-4 rounded-xl border bg-white/5 border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 text-white/60">
                        🔧
                      </div>
                      <div>
                        <div className="font-semibold text-white/60">Logistics</div>
                        <div className="text-sm text-white/60">Venue & Timing</div>
                      </div>
                    </div>
                  </div>

                  {/* Review */}
                  <div className={`p-4 rounded-xl border ${currentStep === "generate" ? 'bg-yellow/10 border-yellow/30' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "generate" ? 'bg-yellow text-secondary' : 'bg-white/20 text-white/60'}`}>
                        ✉️
                      </div>
                      <div>
                        <div className={`font-semibold ${currentStep === "generate" ? 'text-yellow' : 'text-white/60'}`}>Review</div>
                        <div className="text-sm text-white/60">Final Submission</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
                  <TabsContent value="idea">
                    <Card className="bg-secondary/95 border-white/10 shadow-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-yellow mb-2">
                          What's Your Event Concept?
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        <div className="space-y-3">
                          <Label htmlFor="title" className="text-white text-lg font-medium">Event Title</Label>
                          <Input
                            id="title"
                            placeholder="e.g., AI in Paradise: Building the Future"
                            value={eventData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg py-6 rounded-xl focus:border-yellow focus:ring-yellow"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-white text-lg font-medium">Event Type</Label>
                          <div className="grid grid-cols-3 gap-3">
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow py-6 text-base">
                              Workshop
                            </Button>
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow py-6 text-base">
                              Panel
                            </Button>
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow py-6 text-base">
                              Mixer
                            </Button>
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow py-6 text-base">
                              Fireside Chat
                            </Button>
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow py-6 text-base">
                              Conference
                            </Button>
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow py-6 text-base">
                              Other
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="description" className="text-white text-lg font-medium">Initial Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your event concept, what attendees will gain, key topics..."
                            value={eventData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows={6}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-base rounded-xl focus:border-yellow focus:ring-yellow"
                          />
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button variant="ghost" disabled className="text-white/40 text-lg px-8 py-4">
                            Previous
                          </Button>
                          <Button 
                            onClick={handleNext}
                            className="bg-yellow text-secondary hover:bg-yellow/90 text-lg px-8 py-4 rounded-xl font-semibold"
                          >
                            Next →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="details">
                    <Card className="bg-secondary/95 border-white/10 shadow-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-yellow mb-2">
                          Who Is This For?
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        <div className="space-y-3">
                          <Label className="text-white text-lg font-medium">Target Audience</Label>
                          <select className="w-full bg-white/10 border-white/20 text-white text-lg py-6 px-4 rounded-xl focus:border-yellow focus:ring-yellow">
                            <option value="" className="bg-secondary text-white">Select your target audience</option>
                            <option value="founders" className="bg-secondary text-white">Startup Founders</option>
                            <option value="developers" className="bg-secondary text-white">Developers & Engineers</option>
                            <option value="designers" className="bg-secondary text-white">Designers & Creatives</option>
                            <option value="investors" className="bg-secondary text-white">Investors & VCs</option>
                            <option value="students" className="bg-secondary text-white">Students & Learners</option>
                            <option value="general" className="bg-secondary text-white">General Tech Community</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="cohosts" className="text-white text-lg font-medium">Potential Co-Hosts or Partners</Label>
                          <Input
                            id="cohosts"
                            placeholder="e.g., Hawaii Angels, Purple Mai'a"
                            value={eventData.venue}
                            onChange={(e) => handleInputChange("venue", e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg py-6 rounded-xl focus:border-yellow focus:ring-yellow"
                          />
                          <p className="text-white/60 text-sm">Optional - we can help connect you</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="date" className="text-white text-lg font-medium">Preferred Date</Label>
                            <Input
                              id="date"
                              type="date"
                              value={eventData.date}
                              onChange={(e) => handleInputChange("date", e.target.value)}
                              className="bg-white/10 border-white/20 text-white text-lg py-6 rounded-xl focus:border-yellow focus:ring-yellow"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="attendees" className="text-white text-lg font-medium">Expected Attendees</Label>
                            <Input
                              id="attendees"
                              placeholder="e.g., 50-100 people"
                              value={eventData.attendees}
                              onChange={(e) => handleInputChange("attendees", e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg py-6 rounded-xl focus:border-yellow focus:ring-yellow"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button 
                            variant="ghost" 
                            onClick={() => setCurrentStep("idea")}
                            className="text-white/60 hover:text-white text-lg px-8 py-4"
                          >
                            ← Previous
                          </Button>
                          <Button 
                            onClick={handleNext}
                            className="bg-yellow text-secondary hover:bg-yellow/90 text-lg px-8 py-4 rounded-xl font-semibold"
                          >
                            Next →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="generate">
                    <Card className="bg-secondary/95 border-white/10 shadow-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-yellow mb-2">
                          Review & Submit
                        </CardTitle>
                        <CardDescription className="text-white/70 text-lg">
                          Review your event details and submit for approval
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                          <h3 className="font-semibold mb-6 text-white text-xl">Event Summary</h3>
                          <div className="space-y-4 text-white/90">
                            <div>
                              <span className="font-medium text-yellow">Title:</span> 
                              <span className="ml-2">{eventData.title || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-yellow">Description:</span> 
                              <span className="ml-2">{eventData.description || "Not specified"}</span>
                            </div>
                            {eventData.venue && (
                              <div>
                                <span className="font-medium text-yellow">Co-hosts:</span> 
                                <span className="ml-2">{eventData.venue}</span>
                              </div>
                            )}
                            {eventData.date && (
                              <div>
                                <span className="font-medium text-yellow">Date:</span> 
                                <span className="ml-2">{eventData.date}</span>
                              </div>
                            )}
                            {eventData.attendees && (
                              <div>
                                <span className="font-medium text-yellow">Attendees:</span> 
                                <span className="ml-2">{eventData.attendees}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-center pt-4">
                          <Button
                            size="lg"
                            onClick={handleGeneratePlan}
                            className="bg-yellow text-secondary hover:bg-yellow/90 text-xl px-12 py-6 rounded-xl font-semibold shadow-2xl hover:shadow-glow transition-all duration-300"
                          >
                            <Sparkles className="mr-3 h-6 w-6" />
                            Submit for Review
                          </Button>
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button 
                            variant="ghost" 
                            onClick={() => setCurrentStep("details")}
                            className="text-white/60 hover:text-white text-lg px-8 py-4"
                          >
                            ← Previous
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;