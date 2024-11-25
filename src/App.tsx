import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { RegionProvider } from "@/contexts/RegionContext";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

const RouteLogger = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("[Router] Current route:", {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    timestamp: new Date().toISOString()
  });

  React.useEffect(() => {
    if (location.pathname === '/') {
      console.log("[Router] Ensuring welcome page is shown");
    }
  }, [location.pathname]);

  return <>{children}</>;
};

const App = () => {
  console.log("[App] Initializing application with React Router");
  
  return (
    <QueryClientProvider client={queryClient}>
      <RegionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteLogger>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </RouteLogger>
          </BrowserRouter>
        </TooltipProvider>
      </RegionProvider>
    </QueryClientProvider>
  );
};

export default App;