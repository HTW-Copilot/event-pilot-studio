import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-card border-0">
        <CardContent className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! This page doesn't exist
          </p>
          <Button asChild size="lg" className="shadow-elegant">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
