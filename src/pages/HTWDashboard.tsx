import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Users, Calendar, BarChart3, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import htwLogoLong from "@/assets/htw-logo-long.svg";
import honoluluSkyline from "@/assets/honolulu-skyline.png";
import honoluluSkylineSunset from "@/assets/honolulu-skyline-sunset.png";

const HTWDashboard = () => {
  const mockEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Meetup",
      status: "approved",
      date: "March 12, 2025",
      attendees: 45,
      type: "Workshop"
    },
    {
      id: 2,
      title: "Blockchain Innovation Panel",
      status: "pending",
      date: "March 14, 2025", 
      attendees: 32,
      type: "Panel Discussion"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      status: "draft",
      date: "March 16, 2025",
      attendees: 0,
      type: "Competition"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "draft":
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 animate-slide-in-right" 
             style={{
               backgroundImage: `url(${honoluluSkylineSunset})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               animation: 'slide-left-to-right 20s linear infinite',
               width: '120%',
               height: '100%'
             }}>
        </div>
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Host Portal • Honolulu Tech Week 2025
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Create Amazing
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Tech Events
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Welcome to the Host Portal for Honolulu Tech Week 2025. Plan, submit, and manage your events with our intelligent platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/wizard">
                  <Button size="lg" className="px-8 py-4 text-lg shadow-elegant hover:shadow-glow transition-all duration-300">
                    <Plus className="mr-2 h-5 w-5" />
                    Create New Event
                  </Button>
                </Link>
                <Link to="/review">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    View Submissions
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative lg:block hidden">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30"></div>
              <img 
                src={honoluluSkyline} 
                alt="Honolulu Skyline" 
                className="relative rounded-3xl shadow-elegant w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-elegant border-0 bg-white">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">2,500+</div>
                <div className="text-muted-foreground">Expected Attendees</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant border-0 bg-white">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">7</div>
                <div className="text-muted-foreground">Days of Innovation</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant border-0 bg-white">
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">50+</div>
                <div className="text-muted-foreground">Amazing Hosts</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Events Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Your Events</h2>
              <p className="text-muted-foreground">Manage and track your HTW 2025 submissions</p>
            </div>
            <Link to="/wizard">
              <Button className="shadow-elegant">
                <Plus className="mr-2 h-4 w-4" />
                New Event
              </Button>
            </Link>
          </div>
          
          <div className="grid gap-6">
            {mockEvents.map((event) => (
              <Card key={event.id} className="shadow-elegant border-0 bg-white hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(event.status)}
                        <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-muted-foreground text-sm">
                        <span>📅 {event.date}</span>
                        <span>👥 {event.attendees} attendees</span>
                        <span className="capitalize">Status: {event.status}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default HTWDashboard;