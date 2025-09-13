import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckSquare, Calendar, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              HTW Host Copilot
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Streamline your event planning process with AI-powered assistance. 
              From initial ideas to final approval, we've got you covered.
            </p>
            
            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/wizard">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Draft New Event
                </Button>
              </Link>
              <Link to="/review">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-primary/20 hover:bg-accent">
                  <CheckSquare className="mr-2 h-5 w-5" />
                  Review Queue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simplify Event Management</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our intelligent platform guides you through every step of event creation and approval.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Smart Planning</CardTitle>
                <CardDescription>
                  AI-powered wizard walks you through every detail of your event planning process.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Seamless approval workflow keeps your team aligned and events on track.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  From idea to approved event plan in minutes, not hours. Focus on what matters.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;