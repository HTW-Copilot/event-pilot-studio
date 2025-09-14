import { useAuth } from "@/components/AuthProvider";
import EventHostDashboard from "./EventHostDashboard";
import SignInDialog from "@/components/SignInDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, BarChart3, LogIn } from "lucide-react";
import honoluluSkylineSunset from "@/assets/honolulu-skyline-sunset.png";

const HTWDashboard = () => {
  const { isAuthenticated, hasRole, user } = useAuth();

  console.log('HTWDashboard render:', { 
    isAuthenticated, 
    userRoles: user?.roles, 
    hasEventHost: hasRole('event_host'),
    hasHtwStaff: hasRole('htw_staff'),
    user 
  });

  // If user is authenticated and is HTW staff, show staff redirect message
  if (isAuthenticated && hasRole('htw_staff')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0" 
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

        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Welcome to HTW Staff Portal
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access the admin dashboard to manage events and venues.
            </p>
            <Button size="lg" onClick={() => window.location.href = '/admin'}>
              Go to Staff Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Public landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" 
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
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Honolulu Tech Week
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                2025
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Join Hawaii's premier technology event. Create amazing tech events, connect with innovators, and be part of the Pacific's most exciting tech celebration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInDialog>
                <Button size="lg" className="px-8 py-4 text-lg shadow-elegant hover:shadow-glow transition-all duration-300">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In to Host Events
                </Button>
              </SignInDialog>
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

        {/* Call to Action */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Host Your Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of innovators and help shape Hawaii's tech future.
            </p>
            <SignInDialog>
              <Button size="lg" className="px-8 py-4 text-lg shadow-elegant">
                <LogIn className="mr-2 h-5 w-5" />
                Get Started Today
              </Button>
            </SignInDialog>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HTWDashboard;