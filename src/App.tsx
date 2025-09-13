import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import HTWDashboard from "./pages/HTWDashboard";
import Wizard from "./pages/Wizard";
import Review from "./pages/Review";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import SystemDocs from "./pages/SystemDocs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HTWDashboard />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/wizard" element={<Wizard />} />
                <Route path="/review" element={<Review />} />
                <Route path="/organizer" element={<OrganizerDashboard />} />
                <Route path="/docs/system" element={<SystemDocs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;