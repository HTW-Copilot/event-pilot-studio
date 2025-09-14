import { Button } from "@/components/ui/button";
import { Sparkles, CheckSquare, LogOut, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import SignInDialog from "@/components/SignInDialog";
import htwLogoShort from "@/assets/htw-logo-short.svg";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, user, signOut, hasRole } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-3">
          <img src={htwLogoShort} alt="HTW Logo" className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">Honolulu Tech Week</span>
            <span className="text-sm text-muted-foreground">Host Portal</span>
          </div>
        </Link>
        
        <nav className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              {hasRole('event_host') && (
                <Link to="/dashboard">
                  <Button 
                    variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                    size="sm"
                    className="font-medium"
                  >
                    Dashboard
                  </Button>
                </Link>
              )}

              {hasRole('htw_staff') && (
                <Link to="/">
                  <Button 
                    variant={location.pathname === "/" ? "default" : "ghost"}
                    size="sm"
                    className="font-medium"
                  >
                    Dashboard
                  </Button>
                </Link>
              )}
              
              {hasRole('event_host') && (
                <>
                  <Link to="/wizard">
                    <Button 
                      variant={location.pathname === "/wizard" ? "default" : "ghost"}
                      size="sm"
                      className="font-medium"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </Link>
                  <Link to="/review">
                    <Button 
                      variant={location.pathname === "/review" ? "default" : "ghost"}
                      size="sm"
                      className="font-medium"
                    >
                      <CheckSquare className="mr-2 h-4 w-4" />
                      My Events
                    </Button>
                  </Link>
                </>
              )}
              
              {hasRole('htw_staff') && (
                <Link to="/admin">
                  <Button 
                    variant={location.pathname === "/admin" ? "default" : "ghost"}
                    size="sm"
                    className="font-medium"
                  >
                    Staff Portal
                  </Button>
                </Link>
              )}
              
              <div className="flex items-center gap-2 ml-4 pl-4 border-l">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <SignInDialog>
              <Button size="sm">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </SignInDialog>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;