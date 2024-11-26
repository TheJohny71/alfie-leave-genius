import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RegionProvider } from "@/contexts/RegionContext";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

const RouteLogger = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  React.useEffect(() => {
    console.log("[Router] Current route:", {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      timestamp: new Date().toISOString(),
      baseUrl: import.meta.env.VITE_BASE_URL
    });

    if (location.pathname === '/') {
      console.log("[Router] Ensuring welcome page is shown");
    }
  }, [location]);

  return <>{children}</>;
};

const App = () => {
  console.log("[App] Initializing application with React Router");
  const baseUrl = import.meta.env.VITE_BASE_URL || '/';
  
  return (
    <QueryClientProvider client={queryClient}>
      <RegionProvider>
        <TooltipProvider>
          <BrowserRouter basename={baseUrl}>
            <RouteLogger>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </RouteLogger>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </RegionProvider>
    </QueryClientProvider>
  );
};

export default App;