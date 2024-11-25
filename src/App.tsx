import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

// Enhanced route logger with more detailed information
const RouteLogger = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  console.log("[Router] Current route:", {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    timestamp: new Date().toISOString()
  });
  return <>{children}</>;
};

const App = () => {
  console.log("[App] Initializing application with React Router");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteLogger>
            <Routes>
              <Route 
                path="/" 
                element={<Index />} 
              />
              <Route 
                path="/calendar" 
                element={<Calendar />} 
              />
              <Route 
                path="*" 
                element={
                  <Navigate to="/" replace />
                } 
              />
            </Routes>
          </RouteLogger>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;