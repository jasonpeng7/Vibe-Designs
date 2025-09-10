import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ui/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/ToS"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isCaseStudyPage = location.pathname.startsWith("/portfolio");

  return (
    <>
      {!isCaseStudyPage && <Navbar />}
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-background" />
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
