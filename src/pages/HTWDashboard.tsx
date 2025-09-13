import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Users, FileText, CheckCircle, Clock, ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const HTWDashboard = () => {
  const currentStep = 2;
  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const nextMilestones = [
    { date: "Dec 15", task: "Submit event idea", status: "pending" },
    { date: "Jan 8", task: "Calendar goes live", status: "upcoming" },
    { date: "Mar 10-16", task: "HTW Event Week", status: "upcoming" }
  ];

  const quickActions = [
    { icon: Plus, label: "Draft New Event", href: "/wizard", variant: "default" as const },
    { icon: FileText, label: "View Submissions", href: "/submissions", variant: "outline" as const },
    { icon: Users, label: "Find Co-hosts", href: "/cohost", variant: "outline" as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Honolulu Tech Week
              </h1>
              <p className="text-muted-foreground mt-1">Host Portal</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                March 10-16, 2025
              </Badge>
              <Button size="sm" className="shadow-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <Card className="mb-8 shadow-card border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Your Journey</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  Step {currentStep} of {totalSteps} completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-primary">{Math.round(progress)}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Button 
                    variant={action.variant} 
                    className="w-full h-auto p-4 justify-start shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <action.icon className="w-5 h-5 mr-3 shrink-0" />
                    <span className="font-medium">{action.label}</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Dates */}
            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold">
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  Key Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nextMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center p-3 rounded-xl bg-muted/50 border border-border/30">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-sm font-semibold text-foreground">{milestone.date}</div>
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="font-medium text-foreground">{milestone.task}</div>
                    </div>
                    <div className="flex-shrink-0">
                      {milestone.status === 'pending' ? (
                        <Clock className="w-4 h-4 text-warning" />
                      ) : milestone.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">Welcome to HTW Host Portal!</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start by drafting your event idea. Our AI assistant will help you create a compelling submission.
                      </p>
                      <div className="mt-3">
                        <Link to="/wizard">
                          <Button size="sm" className="shadow-sm">
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Stats */}
            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">HTW 2025</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">7</div>
                  <div className="text-sm text-muted-foreground">Days to Plan</div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-foreground">50+</div>
                    <div className="text-xs text-muted-foreground">Expected Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-foreground">2K+</div>
                    <div className="text-xs text-muted-foreground">Attendees</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Resources */}
            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start p-3 h-auto">
                  <FileText className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Host Guide</div>
                    <div className="text-xs text-muted-foreground">Planning checklist</div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-3 h-auto">
                  <Users className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Venue Database</div>
                    <div className="text-xs text-muted-foreground">Find locations</div>
                  </div>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-3 h-auto">
                  <Sparkles className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Marketing Kit</div>
                    <div className="text-xs text-muted-foreground">Templates & assets</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTWDashboard;