import { Button } from "@/components/ui/button";
import { Sparkles, CheckSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            HTW Host Portal
          </span>
        </Link>
        
        <nav className="flex items-center space-x-2">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
              className="font-medium"
            >
              Home
            </Button>
          </Link>
          <Link to="/wizard">
            <Button 
              variant={location.pathname === "/wizard" ? "default" : "ghost"}
              size="sm"
              className="font-medium"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Draft Event
            </Button>
          </Link>
          <Link to="/review">
            <Button 
              variant={location.pathname === "/review" ? "default" : "ghost"}
              size="sm"
              className="font-medium"
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Review Queue
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;