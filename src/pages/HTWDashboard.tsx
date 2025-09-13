import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  MapPin,
  DollarSign,
  Send,
  Star,
  HelpCircle,
  Settings,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const HTWDashboard = () => {
  const currentStep = 2;
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const journeySteps = [
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
      completed: true,
      current: true
    },
    { 
      step: 3, 
      title: "Pick Venue & Time", 
      description: "Select location and schedule",
      completed: false,
      current: false
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
      current: false
    }
  ];

  const quickActions = [
    { 
      icon: FileText, 
      title: "Full Event Submission",
      description: "Complete detailed submission form",
      href: "/submit",
      variant: "outline" as const
    },
    { 
      icon: MapPin, 
      title: "View Available Venues",
      description: "Browse vetted locations",
      href: "/venues",
      variant: "outline" as const
    },
    { 
      icon: Users, 
      title: "Marketing Hub",
      description: "Access templates and assets",
      href: "/marketing",
      variant: "outline" as const
    }
  ];

  const importantDates = [
    { 
      label: "Submission Deadline", 
      date: "July 15, 2025", 
      color: "bg-red-100 text-red-700 border-red-200" 
    },
    { 
      label: "Calendar Goes Live", 
      date: "August 1, 2025", 
      color: "bg-yellow-100 text-yellow-700 border-yellow-200" 
    },
    { 
      label: "HTW 2025", 
      date: "Sep 8-14, 2025", 
      color: "bg-primary/10 text-primary border-primary/20" 
    }
  ];

  const commonQuestions = [
    {
      question: "Do I need to pay fees?",
      answer: "No, hosting is free. You cover your own venue and catering costs."
    },
    {
      question: "Can I co-host with others?",
      answer: "Yes! We encourage collaboration between hosts."
    }
  ];

  // Check user role - in real app this would come from auth/context
  const [userRole, setUserRole] = useState<"submitter" | "judge">("submitter");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Enhanced Header with Hawaiian Vibes */}
      <div className="bg-gradient-tropical text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Host Portal
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Create Your Perfect Event
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join Hawaii's premier tech gathering. Our guided process helps you create meaningful connections and showcase innovation in paradise.
            </p>
            
            {/* Key Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <Calendar className="w-4 h-4 mr-2" />
                Sep 8-14, 2025
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <Users className="w-4 h-4 mr-2" />
                3,000+ Attendees
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                50+ Events
              </Badge>
            </div>

            {/* Role-based Navigation */}
            <div className="mb-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setUserRole(userRole === "submitter" ? "judge" : "submitter")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Switch to {userRole === "submitter" ? "Judge" : "Submitter"} View
              </Button>
            </div>

            {userRole === "submitter" && (
              <div className="flex justify-center gap-3">
                <Link to="/wizard">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Your Event
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <FileText className="mr-2 h-5 w-5" />
                  View Guide
                </Button>
              </div>
            )}

            {userRole === "judge" && (
              <div className="flex justify-center gap-3">
                <Link to="/review">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Review Submissions
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Settings className="mr-2 h-5 w-5" />
                  Admin Panel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {userRole === "submitter" && (
          <>
            {/* Journey Progress */}
            <Card className="mb-12 shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl font-semibold text-primary flex items-center">
                      <Sparkles className="mr-3 h-6 w-6" />
                      Your Journey
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Complete each step to bring your event to life
                    </p>
                  </div>
                  <Badge className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary">
                    Step {currentStep} of {totalSteps}
                  </Badge>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-primary font-semibold">{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-3 bg-primary/10" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-6">
                  {journeySteps.map((step, index) => (
                    <div key={index} className={`relative p-4 rounded-xl border-2 transition-all ${
                      step.completed 
                        ? 'bg-primary/5 border-primary/20' 
                        : step.current
                        ? 'bg-primary/10 border-primary shadow-md'
                        : 'bg-muted/30 border-border'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${
                        step.completed 
                          ? 'bg-primary text-white' 
                          : step.current
                          ? 'bg-primary text-white animate-pulse'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-bold">{step.step}</span>
                        )}
                      </div>
                      <h4 className={`font-semibold text-sm mb-1 ${
                        step.current ? 'text-primary' : 'text-foreground'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                      {step.current && (
                        <div className="mt-3">
                          <Link to="/wizard">
                            <Button size="sm" className="w-full">
                              Continue
                              <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Event Draft Section */}
              <div className="lg:col-span-2">
                <Card className="shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary flex items-center">
                      <FileText className="mr-3 h-5 w-5" />
                      Draft Your Event Idea
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Create a compelling event that resonates with Hawaii's tech community
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Event Title */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g., AI in Healthcare: The Future is Now"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Select event type</option>
                        <option>Panel Discussion</option>
                        <option>Workshop</option>
                        <option>Networking Mixer</option>
                        <option>Product Launch</option>
                        <option>Fireside Chat</option>
                      </select>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Target Audience</label>
                      <div className="flex flex-wrap gap-2">
                        {['Founders', 'Investors', 'Students', 'Developers', 'Designers', 'Marketing'].map((audience) => (
                          <Button 
                            key={audience}
                            variant="outline" 
                            size="sm" 
                            className="rounded-full hover:bg-primary hover:text-white transition-colors"
                          >
                            {audience}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Save Draft
                      </Button>
                      <Button variant="outline">
                        <Star className="mr-2 h-4 w-4" />
                        AI Suggestions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                      <Link key={index} to={action.href}>
                        <Button variant="ghost" className="w-full justify-start p-4 h-auto hover:bg-primary/5 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                            <action.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-sm">{action.title}</div>
                            <div className="text-xs text-muted-foreground">{action.description}</div>
                          </div>
                        </Button>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Important Dates */}
                <Card className="shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Important Dates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {importantDates.map((date, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${date.color}`}>
                        <div className="font-semibold text-sm">{date.label}</div>
                        <div className="text-sm opacity-80">{date.date}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Common Questions */}
                <Card className="shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Common Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {commonQuestions.map((qa, index) => (
                      <div key={index}>
                        <div className="flex items-start space-x-2 mb-2">
                          <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <h4 className="font-medium text-sm">{qa.question}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground ml-6">{qa.answer}</p>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">
                      View All FAQs
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {userRole === "judge" && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Judge Dashboard Content */}
            <div className="lg:col-span-3">
              <Card className="shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary">
                    Review Dashboard
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Evaluate and provide feedback on event submissions
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="text-3xl font-bold text-primary mb-2">12</div>
                      <div className="text-sm text-muted-foreground">Pending Review</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-success/5 border border-success/20">
                      <div className="text-3xl font-bold text-success mb-2">8</div>
                      <div className="text-sm text-muted-foreground">Approved</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-warning/5 border border-warning/20">
                      <div className="text-3xl font-bold text-warning mb-2">3</div>
                      <div className="text-sm text-muted-foreground">Needs Changes</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link to="/review" className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <FileText className="mr-2 h-4 w-4" />
                        Review Submissions
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Judge Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-elegant border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Admin Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-3 h-4 w-4" />
                    Manage Hosts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="mr-3 h-4 w-4" />
                    Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HTWDashboard;