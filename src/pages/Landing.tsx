import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckSquare, Calendar, Users, Zap, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Host Portal • Honolulu Tech Week 2025
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Plan Amazing
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Tech Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              Your intelligent companion for creating unforgettable experiences during Hawaii's premier tech celebration.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/wizard">
              <Button size="lg" className="px-10 py-4 text-lg shadow-elegant hover:shadow-glow transition-all duration-300">
                <Sparkles className="mr-3 h-5 w-5" />
                Start Planning
              </Button>
            </Link>
            <Link to="/review">
              <Button variant="outline" size="lg" className="px-10 py-4 text-lg border-2 hover:bg-accent/50 transition-all duration-300">
                <CheckSquare className="mr-3 h-5 w-5" />
                View Submissions
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="text-sm">March 10-16, 2025 • Honolulu, Hawaii</div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Join 50+ hosts creating amazing experiences
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything you need
              <br />
              <span className="text-muted-foreground">to succeed</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From initial concept to post-event celebration, our platform guides you through every step.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="shadow-elegant border-0 bg-white hover:shadow-glow hover:-translate-y-2 transition-all duration-500 group">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Intelligent Planning</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  AI-powered insights help you choose the perfect venue, timing, and format for maximum impact.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant border-0 bg-white hover:shadow-glow hover:-translate-y-2 transition-all duration-500 group">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Seamless Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Real-time feedback from organizers and tools to connect with fellow hosts in your field.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant border-0 bg-white hover:shadow-glow hover:-translate-y-2 transition-all duration-500 group">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Transform your idea into an approved event in minutes with smart automation and templates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;