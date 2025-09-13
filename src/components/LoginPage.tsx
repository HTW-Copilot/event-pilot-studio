import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Calendar, ArrowRight } from "lucide-react";
import { LoginMode } from "@/types/auth";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import htwLogoLong from "@/assets/htw-logo-long.svg";

const loginModes: LoginMode[] = [
  {
    mode: 'event_host',
    title: 'Event Host Portal',
    description: 'Create and manage your HTW 2025 events'
  },
  {
    mode: 'venue_host',
    title: 'Venue Host Portal', 
    description: 'Manage venue listings and availability'
  }
];

const LoginPage = () => {
  const [activeMode, setActiveMode] = useState<'event_host' | 'venue_host'>('event_host');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const role = activeMode === 'event_host' ? 'event_host' : 'venue_host';
      login(email, [role]);
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  const staffLogin = () => {
    login('admin@htwweek.org', ['htw_staff']);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <img src={htwLogoLong} alt="Honolulu Tech Week" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Welcome to HTW 2025</h1>
          <p className="text-muted-foreground">Choose your portal to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {loginModes.map((mode) => (
            <Card 
              key={mode.mode}
              className={`cursor-pointer border-2 transition-all ${
                activeMode === mode.mode 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setActiveMode(mode.mode)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                  {mode.mode === 'event_host' ? (
                    <Calendar className="h-8 w-8 text-primary" />
                  ) : (
                    <Building2 className="h-8 w-8 text-primary" />
                  )}
                </div>
                <CardTitle className="text-xl">{mode.title}</CardTitle>
                <CardDescription>{mode.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              {activeMode === 'event_host' 
                ? 'Access your event creation tools' 
                : 'Manage your venue listings'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={staffLogin}
                className="w-full text-xs text-muted-foreground"
              >
                HTW Staff Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;