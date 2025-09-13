import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import HTWDashboard from "./pages/HTWDashboard";
import Wizard from "./pages/Wizard";
import Review from "./pages/Review";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SystemDocs from "./pages/SystemDocs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { isAuthenticated, hasRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (requiredRole && !hasRole(requiredRole as any)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<HTWDashboard />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/wizard" element={
            <ProtectedRoute requiredRole="event_host">
              <Wizard />
            </ProtectedRoute>
          } />
          <Route path="/review" element={
            <ProtectedRoute requiredRole="event_host">
              <Review />
            </ProtectedRoute>
          } />
          <Route path="/organizer" element={
            <ProtectedRoute requiredRole="htw_staff">
              <OrganizerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="htw_staff">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/docs/system" element={<SystemDocs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;