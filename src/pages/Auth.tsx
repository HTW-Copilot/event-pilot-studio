import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  // Sign In Form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up Form
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  
  const { signIn, signUp, isAuthenticated, hasRole, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated and user profile is loaded
  useEffect(() => {
    if (isAuthenticated && user && user.roles && user.roles.length > 0) {
      redirectToRoleDashboard();
    }
  }, [isAuthenticated, user]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(signInEmail, signInPassword);
    
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've been signed in successfully.",
      });
      // Wait for auth state to update, then redirect based on role
      setTimeout(() => {
        redirectToRoleDashboard();
      }, 1000);
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signUp(signUpEmail, signUpPassword, signUpName);
    
    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });
    }
    
    setIsLoading(false);
  };

  const handleCreateTestAdmin = async () => {
    setIsLoading(true);
    
    // Use a valid email format that Supabase accepts
    const testEmail = 'admin@test.com';
    const testPassword = 'admin123456';
    
    const { error: signUpError } = await signUp(testEmail, testPassword, 'HTW Admin');
    
    if (signUpError && !signUpError.message.includes('already registered')) {
      toast({
        title: "Failed to Create Test Admin",
        description: signUpError.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Test Admin Account Created",
      description: `Check your email to verify, then sign in with ${testEmail} / ${testPassword}`,
    });
    
    setIsLoading(false);
  };

  const redirectToRoleDashboard = () => {
    console.log('redirectToRoleDashboard called', { isAuthenticated, user });
    
    if (isAuthenticated && user && user.roles && user.roles.length > 0) {
      console.log('User has roles, redirecting based on role');
      if (hasRole('htw_staff')) {
        console.log('Redirecting HTW staff to /organizer');
        navigate('/organizer');
      } else {
        console.log('Redirecting event host to /');
        navigate('/');
      }
    } else if (isAuthenticated && !user) {
      console.log('User is authenticated but profile not loaded yet, waiting...');
      // Wait a bit longer for the user profile to load with roles
      setTimeout(() => {
        redirectToRoleDashboard();
      }, 500);
    } else {
      console.log('User not authenticated or no roles');
    }
  };

  const handleQuickSignIn = async (email: string, password: string, role: string) => {
    setIsLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      // If sign in fails, try to create the account first
      const { error: signUpError } = await signUp(email, password, role);
      
      if (signUpError && !signUpError.message.includes('already registered')) {
        toast({
          title: "Authentication Failed",
          description: "Please create this account first using the sign up form.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account, then try signing in again.",
        });
      }
    } else {
      toast({
        title: `Welcome, ${role}!`,
        description: "You've been signed in successfully.",
      });
      // Wait for auth state to update, then redirect based on role
      setTimeout(() => {
        redirectToRoleDashboard();
      }, 1000);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            HTW 2025 Portal
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your event management dashboard
          </p>
        </div>

        <Card className="shadow-elegant border-0 bg-white">
          <CardHeader className="text-center">
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Sign in to manage your events or access the staff portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <LogIn className="mr-2 h-4 w-4" />
                    )}
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your Name"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <UserPlus className="mr-2 h-4 w-4" />
                    )}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="border-t pt-4 mt-6 space-y-2">
              <div className="text-xs text-center text-muted-foreground mb-2">
                Quick Test Accounts
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleQuickSignIn('admin@test.com', 'admin123456', 'HTW Admin')}
                  disabled={isLoading}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleQuickSignIn('host@test.com', 'host123456', 'Event Host')}
                  disabled={isLoading}
                  className="text-xs"
                >
                  Host
                </Button>
              </div>
              <div className="text-xs text-center text-muted-foreground">
                Creates accounts automatically if they don't exist
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;