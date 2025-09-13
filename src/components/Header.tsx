import { Button } from "@/components/ui/button";
import { Sparkles, CheckSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            HTW Host Copilot
          </span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
            >
              Home
            </Button>
          </Link>
          <Link to="/wizard">
            <Button 
              variant={location.pathname === "/wizard" ? "default" : "ghost"}
              size="sm"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Draft Event
            </Button>
          </Link>
          <Link to="/review">
            <Button 
              variant={location.pathname === "/review" ? "default" : "ghost"}
              size="sm"
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