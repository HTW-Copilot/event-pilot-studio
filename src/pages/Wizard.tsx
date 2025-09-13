import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Lightbulb, FileText, Sparkles, Wand2, MapPin, DollarSign, Users, Calendar, Upload, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JourneyTracker, type JourneyStep } from "@/components/JourneyTracker";
import { FAQChatbot } from "@/components/FAQChatbot";
import honoluluSkyline from "@/assets/honolulu-skyline.png";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState("idea");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [coHosts, setCoHosts] = useState("");
  const [marketingNeeds, setMarketingNeeds] = useState<string[]>([]);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    budget: "",
    attendees: "",
    objectives: "",
    requirements: "",
    audienceType: "",
    budgetBreakdown: {
      venue: 0,
      catering: 0,
      av: 0,
      marketing: 0,
      other: 0
    },
    hostAgreementSigned: false,
    planningDoc: null as File | null
  });

  const availableVenues = [
    { id: "coworking-hitech", name: "Coworking Hi-Tech - Main Space", capacity: "50-75", type: "Tech Hub" },
    { id: "coworking-conference", name: "Coworking Hi-Tech - Conference Room", capacity: "15-25", type: "Meeting Room" },
    { id: "university-hawaii", name: "University of Hawaii - Innovation Center", capacity: "100-150", type: "Academic" },
    { id: "honolulu-museum", name: "Honolulu Museum of Art - Event Hall", capacity: "75-100", type: "Cultural" },
    { id: "iolani-palace", name: "Iolani Palace - Reception Hall", capacity: "200+", type: "Historic" },
    { id: "waikiki-beach", name: "Waikiki Beach - Beachfront Pavilion", capacity: "100-200", type: "Outdoor" },
    { id: "diamond-head", name: "Diamond Head - Visitor Center", capacity: "30-50", type: "Outdoor" },
    { id: "pearl-harbor", name: "Pearl Harbor - Memorial Center", capacity: "150-300", type: "Historic" },
  ];
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const generateAIDescription = async () => {
    if (!eventData.title || !selectedEventType) {
      toast({
        title: "Missing Information",
        description: "Please add an event title and select an event type first.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingDescription(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiDescription = `Join us for "${eventData.title}" - an innovative ${selectedEventType.toLowerCase()} designed to bring together Hawaii's tech community. This ${selectedEventType.toLowerCase()} will feature engaging discussions, networking opportunities, and insights into cutting-edge technology trends. Attendees will gain valuable knowledge, make meaningful connections, and contribute to Hawaii's growing tech ecosystem. Whether you're a startup founder, developer, or tech enthusiast, this event promises to inspire and educate while showcasing the unique innovation happening in paradise.`;
      
      handleInputChange("description", aiDescription);
      
      toast({
        title: "Description Generated!",
        description: "AI has created a description based on your event details.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingDescription(false);
    }
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
      if (!eventData.audienceType || !selectedVenue) {
        toast({
          title: "Please complete details",
          description: "Target audience and venue selection are required.",
          variant: "destructive"
        });
        return;
      }
      setCurrentStep("budget");
    } else if (currentStep === "budget") {
      setCurrentStep("submission");
    } else if (currentStep === "submission") {
      setCurrentStep("marketing");
    }
  };

  const handlePrevious = () => {
    if (currentStep === "details") {
      setCurrentStep("idea");
    } else if (currentStep === "budget") {
      setCurrentStep("details");
    } else if (currentStep === "submission") {
      setCurrentStep("budget");
    } else if (currentStep === "marketing") {
      setCurrentStep("submission");
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
    { id: "budget", title: "Budget & Logistics", icon: DollarSign },
    { id: "submission", title: "Submit for Review", icon: Upload },
    { id: "marketing", title: "Marketing Hub", icon: Sparkles }
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
      completed: currentStep === "details" || currentStep === "budget" || currentStep === "submission" || currentStep === "marketing",
      current: currentStep === "idea"
    },
    { 
      step: 3, 
      title: "Pick Venue & Time", 
      description: "Select location and schedule",
      completed: currentStep === "budget" || currentStep === "submission" || currentStep === "marketing",
      current: currentStep === "details"
    },
    { 
      step: 4, 
      title: "Budget & Logistics", 
      description: "Plan resources and requirements",
      completed: currentStep === "submission" || currentStep === "marketing",
      current: currentStep === "budget"
    },
    { 
      step: 5, 
      title: "Submit for Review", 
      description: "Final review and approval",
      completed: currentStep === "marketing",
      current: currentStep === "submission"
    },
    { 
      step: 6, 
      title: "Marketing Hub", 
      description: "Templates and promotion tools",
      completed: false,
      current: currentStep === "marketing"
    }
  ];

  const getCurrentStepNumber = () => {
    if (currentStep === "idea") return 2;
    if (currentStep === "details") return 3;
    if (currentStep === "budget") return 4;
    if (currentStep === "submission") return 5;
    if (currentStep === "marketing") return 6;
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
                            {["Workshop", "Panel", "Mixer", "Fireside Chat", "Conference", "Other"].map((type) => (
                              <Button 
                                key={type}
                                variant="outline" 
                                onClick={() => setSelectedEventType(type)}
                                className={`py-6 text-base transition-all duration-200 ${
                                  selectedEventType === type 
                                    ? "bg-yellow text-secondary border-yellow" 
                                    : "bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow"
                                }`}
                              >
                                {type}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="description" className="text-white text-lg font-medium">Initial Description</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={generateAIDescription}
                              disabled={isGeneratingDescription}
                              className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary hover:border-yellow"
                            >
                              {isGeneratingDescription ? (
                                <>
                                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Wand2 className="mr-2 h-4 w-4" />
                                  AI Generate
                                </>
                              )}
                            </Button>
                          </div>
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
                            Next: Pick Venue & Time →
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
                           <Select value={eventData.audienceType} onValueChange={(value) => handleInputChange("audienceType", value)}>
                             <SelectTrigger className="bg-white/10 border-white/20 text-white text-lg py-6 rounded-xl focus:border-yellow focus:ring-yellow">
                               <SelectValue placeholder="Select your target audience" />
                             </SelectTrigger>
                             <SelectContent className="bg-secondary border-white/20">
                               <SelectItem value="founders" className="text-white hover:bg-white/10">Startup Founders</SelectItem>
                               <SelectItem value="developers" className="text-white hover:bg-white/10">Developers & Engineers</SelectItem>
                               <SelectItem value="designers" className="text-white hover:bg-white/10">Designers & Creatives</SelectItem>
                               <SelectItem value="investors" className="text-white hover:bg-white/10">Investors & VCs</SelectItem>
                               <SelectItem value="students" className="text-white hover:bg-white/10">Students & Learners</SelectItem>
                               <SelectItem value="general" className="text-white hover:bg-white/10">General Tech Community</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>

                        <div className="space-y-3">
                          <Label className="text-white text-lg font-medium">Preferred Venue</Label>
                          <Select value={selectedVenue} onValueChange={setSelectedVenue}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white text-lg py-6 rounded-xl focus:border-yellow focus:ring-yellow">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                <SelectValue placeholder="Select a venue in Honolulu" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="bg-secondary border-white/20">
                              {availableVenues.map((venue) => (
                                <SelectItem 
                                  key={venue.id} 
                                  value={venue.id}
                                  className="text-white hover:bg-white/10"
                                >
                                  <div className="flex flex-col">
                                    <span className="font-medium">{venue.name}</span>
                                    <span className="text-sm text-white/60">{venue.capacity} people • {venue.type}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-white/60 text-sm">We'll help coordinate availability and booking</p>
                        </div>

                         <div className="space-y-3">
                           <Label htmlFor="cohosts" className="text-white text-lg font-medium">Potential Co-Hosts or Partners</Label>
                           <Input
                             id="cohosts"
                             placeholder="e.g., Hawaii Angels, Purple Mai'a"
                             value={coHosts}
                             onChange={(e) => setCoHosts(e.target.value)}
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
                               min="2025-03-10"
                               max="2025-03-16"
                             />
                             <p className="text-white/60 text-sm">HTW 2025: March 10-16</p>
                           </div>
                           <div className="space-y-3">
                             <Label htmlFor="time" className="text-white text-lg font-medium">Preferred Time</Label>
                             <Select value={eventData.time} onValueChange={(value) => handleInputChange("time", value)}>
                               <SelectTrigger className="bg-white/10 border-white/20 text-white text-lg py-6 rounded-xl focus:border-yellow focus:ring-yellow">
                                 <SelectValue placeholder="Select time slot" />
                               </SelectTrigger>
                               <SelectContent className="bg-secondary border-white/20">
                                 <SelectItem value="morning" className="text-white hover:bg-white/10">Morning (9am-12pm) ⚡ Less competition</SelectItem>
                                 <SelectItem value="afternoon" className="text-white hover:bg-white/10">Afternoon (1pm-5pm)</SelectItem>
                                 <SelectItem value="evening" className="text-white hover:bg-white/10">Evening (6pm-9pm)</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>
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

                         <div className="flex justify-between pt-6">
                           <Button 
                             variant="ghost" 
                             onClick={handlePrevious}
                             className="text-white/60 hover:text-white text-lg px-8 py-4"
                           >
                             ← Previous
                           </Button>
                           <Button 
                             onClick={handleNext}
                             className="bg-yellow text-secondary hover:bg-yellow/90 text-lg px-8 py-4 rounded-xl font-semibold"
                           >
                             Next: Budget & Logistics →
                           </Button>
                         </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="budget">
                    <Card className="bg-secondary/95 border-white/10 shadow-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-yellow mb-2">
                          Budget & Logistics
                        </CardTitle>
                        <CardDescription className="text-white/70 text-lg">
                          Plan your resources and logistics checklist
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        {/* Budget Breakdown */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-yellow" />
                            Budget Planning
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <Label className="text-white">Estimated Total Budget</Label>
                              <Input
                                placeholder="e.g., $2,500"
                                value={eventData.budget}
                                onChange={(e) => handleInputChange("budget", e.target.value)}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg py-4 rounded-xl"
                              />
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                              <h4 className="text-white font-medium mb-3">HTW Provides:</h4>
                              <ul className="text-white/80 text-sm space-y-1">
                                <li>✓ Venue coordination</li>
                                <li>✓ Basic AV equipment</li>
                                <li>✓ Marketing support</li>
                                <li>✓ Event management tools</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Logistics Checklist */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <CheckSquare className="h-5 w-5 text-yellow" />
                            Logistics Checklist
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="venue"
                                  checked={checkedItems.venue || false}
                                  onCheckedChange={(checked) => setCheckedItems(prev => ({ ...prev, venue: checked as boolean }))}
                                />
                                <Label htmlFor="venue" className="text-white">Venue confirmed</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="catering"
                                  checked={checkedItems.catering || false}
                                  onCheckedChange={(checked) => setCheckedItems(prev => ({ ...prev, catering: checked as boolean }))}
                                />
                                <Label htmlFor="catering" className="text-white">Food & beverage planned</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="av"
                                  checked={checkedItems.av || false}
                                  onCheckedChange={(checked) => setCheckedItems(prev => ({ ...prev, av: checked as boolean }))}
                                />
                                <Label htmlFor="av" className="text-white">AV requirements identified</Label>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="speakers"
                                  checked={checkedItems.speakers || false}
                                  onCheckedChange={(checked) => setCheckedItems(prev => ({ ...prev, speakers: checked as boolean }))}
                                />
                                <Label htmlFor="speakers" className="text-white">Speakers/panelists confirmed</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="registration"
                                  checked={checkedItems.registration || false}
                                  onCheckedChange={(checked) => setCheckedItems(prev => ({ ...prev, registration: checked as boolean }))}
                                />
                                <Label htmlFor="registration" className="text-white">Registration system ready</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id="marketing"
                                  checked={checkedItems.marketing || false}
                                  onCheckedChange={(checked) => setCheckedItems(prev => ({ ...prev, marketing: checked as boolean }))}
                                />
                                <Label htmlFor="marketing" className="text-white">Marketing materials planned</Label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Co-host Suggestions */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Users className="h-5 w-5 text-yellow" />
                            Suggested Co-hosts
                          </h3>
                          <div className="bg-white/5 p-6 rounded-xl">
                            <p className="text-white/80 mb-4">Based on your event type, we suggest connecting with:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 bg-white/5 rounded-lg">
                                <h4 className="text-white font-medium">Hawaii Angels</h4>
                                <p className="text-white/60 text-sm">Investor network • Great for startup events</p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-lg">
                                <h4 className="text-white font-medium">Purple Mai'a Foundation</h4>
                                <p className="text-white/60 text-sm">Innovation hub • Tech community building</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button 
                            variant="ghost" 
                            onClick={handlePrevious}
                            className="text-white/60 hover:text-white text-lg px-8 py-4"
                          >
                            ← Previous
                          </Button>
                          <Button 
                            onClick={handleNext}
                            className="bg-yellow text-secondary hover:bg-yellow/90 text-lg px-8 py-4 rounded-xl font-semibold"
                          >
                            Next: Submit for Review →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="submission">
                    <Card className="bg-secondary/95 border-white/10 shadow-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-yellow mb-2">
                          Submit for Review
                        </CardTitle>
                        <CardDescription className="text-white/70 text-lg">
                          Final review and official submission
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        {/* Event Summary */}
                        <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                          <h3 className="font-semibold mb-6 text-white text-xl">Event Summary</h3>
                          <div className="space-y-4 text-white/90">
                            <div>
                              <span className="font-medium text-yellow">Title:</span> 
                              <span className="ml-2">{eventData.title || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-yellow">Type:</span> 
                              <span className="ml-2">{selectedEventType || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-yellow">Audience:</span> 
                              <span className="ml-2">{eventData.audienceType || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-yellow">Venue:</span> 
                              <span className="ml-2">{availableVenues.find(v => v.id === selectedVenue)?.name || "Not selected"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-yellow">Date & Time:</span> 
                              <span className="ml-2">{eventData.date} • {eventData.time || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-yellow">Expected Attendees:</span> 
                              <span className="ml-2">{eventData.attendees || "Not specified"}</span>
                            </div>
                            <div>
                              <span className="font-medium text-yellow">Budget:</span> 
                              <span className="ml-2">{eventData.budget || "Not specified"}</span>
                            </div>
                          </div>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Upload className="h-5 w-5 text-yellow" />
                            Supporting Documents
                          </h3>
                          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                            <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                            <p className="text-white/80 mb-2">Upload your event planning document</p>
                            <p className="text-white/60 text-sm mb-4">PDF, DOC, or Google Docs link</p>
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary">
                              Choose File
                            </Button>
                          </div>
                        </div>

                        {/* Host Agreement */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white">Host Agreement</h3>
                          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                id="agreement"
                                checked={eventData.hostAgreementSigned}
                                onCheckedChange={(checked) => handleInputChange("hostAgreementSigned", checked as boolean)}
                              />
                              <Label htmlFor="agreement" className="text-white/90 text-sm leading-relaxed">
                                I agree to the HTW 2025 Host Agreement, including responsibility for event execution, 
                                adherence to HTW brand guidelines, and commitment to community values. I understand 
                                that HTW provides venue coordination and marketing support, while I'm responsible 
                                for content, speakers, and attendee experience.
                              </Label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center pt-4">
                          <Button
                            size="lg"
                            onClick={() => handleNext()}
                            disabled={!eventData.hostAgreementSigned}
                            className="bg-yellow text-secondary hover:bg-yellow/90 text-xl px-12 py-6 rounded-xl font-semibold shadow-2xl hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                          >
                            <Sparkles className="mr-3 h-6 w-6" />
                            Submit for HTW Review
                          </Button>
                          <p className="text-white/60 text-sm mt-2">
                            You'll receive confirmation and feedback within 3-5 business days
                          </p>
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button 
                            variant="ghost" 
                            onClick={handlePrevious}
                            className="text-white/60 hover:text-white text-lg px-8 py-4"
                          >
                            ← Previous
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="marketing">
                    <Card className="bg-secondary/95 border-white/10 shadow-2xl">
                      <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-bold text-yellow mb-2">
                          Marketing Hub
                        </CardTitle>
                        <CardDescription className="text-white/70 text-lg">
                          Templates, tools, and promotion resources
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                        {/* Marketing Templates */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-yellow" />
                            Marketing Templates
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="bg-white/5 border-white/10">
                              <CardContent className="p-6">
                                <h4 className="text-white font-semibold mb-3">Social Media Kit</h4>
                                <p className="text-white/70 text-sm mb-4">Ready-to-use graphics and copy for LinkedIn, Twitter, Instagram</p>
                                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary">
                                  Download Kit
                                </Button>
                              </CardContent>
                            </Card>
                            <Card className="bg-white/5 border-white/10">
                              <CardContent className="p-6">
                                <h4 className="text-white font-semibold mb-3">Email Templates</h4>
                                <p className="text-white/70 text-sm mb-4">Invitation, reminder, and follow-up email templates</p>
                                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary">
                                  View Templates
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        {/* Auto-generated Content */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white">Auto-Generated Content</h3>
                          <div className="bg-white/5 p-6 rounded-xl">
                            <h4 className="text-white font-medium mb-3">Your Event Social Post:</h4>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                              <p className="text-white/90 italic">
                                "🌺 Join us for {eventData.title || '[Your Event]'} during #HTW2025! 
                                {eventData.description ? eventData.description.substring(0, 100) + '...' : 'An amazing tech event'} 
                                📅 {eventData.date || 'March 10-16'} 
                                📍 Honolulu 
                                #HonoluluTechWeek #Innovation #TechCommunity"
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-3 bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary">
                              Copy to Clipboard
                            </Button>
                          </div>
                        </div>

                        {/* Marketing Calendar */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-yellow" />
                            Marketing Schedule
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                              <div>
                                <p className="text-white font-medium">Save the Date Announcement</p>
                                <p className="text-white/60 text-sm">6 weeks before event</p>
                              </div>
                              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary">
                                Schedule Post
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                              <div>
                                <p className="text-white font-medium">Speaker Spotlight</p>
                                <p className="text-white/60 text-sm">3 weeks before event</p>
                              </div>
                              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary">
                                Schedule Post
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                              <div>
                                <p className="text-white font-medium">Final Reminder</p>
                                <p className="text-white/60 text-sm">1 week before event</p>
                              </div>
                              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary">
                                Schedule Post
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Event Day Tools */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white">Event Day & Follow-up</h3>
                          <div className="bg-white/5 p-6 rounded-xl">
                            <p className="text-white/80 mb-4">Post-event checklist will be automatically generated:</p>
                            <ul className="text-white/70 space-y-2 text-sm">
                              <li>📸 Photo capture reminders</li>
                              <li>📱 Social media hashtag guide</li>
                              <li>📧 Thank you email template</li>
                              <li>📋 Feedback collection form</li>
                              <li>📈 Impact report template</li>
                            </ul>
                          </div>
                        </div>

                        <div className="text-center pt-6">
                          <Button 
                            onClick={() => toast({
                              title: "Marketing resources saved!",
                              description: "You'll receive all marketing materials and schedules via email.",
                            })}
                            className="bg-yellow text-secondary hover:bg-yellow/90 text-lg px-8 py-4 rounded-xl font-semibold"
                          >
                            Save Marketing Plan
                          </Button>
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button 
                            variant="ghost" 
                            onClick={handlePrevious}
                            className="text-white/60 hover:text-white text-lg px-8 py-4"
                          >
                            ← Previous
                          </Button>
                          <Button 
                            onClick={() => navigate("/review")}
                            variant="outline"
                            className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary text-lg px-8 py-4"
                          >
                            View My Submissions
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
        <FAQChatbot />
      </div>
    </div>
  );
};

export default Wizard;