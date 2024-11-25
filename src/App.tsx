import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

// Add console logs to track routing
const RouteLogger = ({ children }: { children: React.ReactNode }) => {
  console.log("[Router] Rendering route:", window.location.pathname);
  return <>{children}</>;
};

const App = () => {
  console.log("[App] Initializing application");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <RouteLogger>
                  <Index />
                </RouteLogger>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <RouteLogger>
                  <Calendar />
                </RouteLogger>
              } 
            />
            {/* Catch all unknown routes and redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;