import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Services from "./pages/Services";
import KnowMore from "./pages/KnowMore";
import NotFound from "./pages/NotFound";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ParticleBackground from "@/components/ParticleBackground";
import Chatbot from "@/components/Chatbot";
import TermsViewModal from "@/components/TermsViewModal";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import RefundPolicyViewModal from "@/components/RefundPolicyViewModal";
import { RouteModal } from "@/components/ui/modal";

const queryClient = new QueryClient();

// Layout component that wraps all pages with common elements
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <ParticleBackground />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
      <Chatbot />
    </TooltipProvider>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state?.background;

  // Wrap the main content with the layout
  const renderWithLayout = (component: React.ReactNode) => (
    <PageLayout>
      {component}
    </PageLayout>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={background || location} key={location.pathname}>
          <Route path="/" element={renderWithLayout(<Index />)} />
          <Route path="/services" element={renderWithLayout(<Services />)} />
          <Route path="/knowmore" element={renderWithLayout(<KnowMore />)} />
          
          {/* Legal Pages */}
          <Route path="/terms-and-conditions" element={renderWithLayout(<TermsAndConditions />)} />
          <Route path="/refund-policy" element={renderWithLayout(<RefundPolicy />)} />
          <Route path="/privacy-policy" element={renderWithLayout(<PrivacyPolicy />)} />
          
          {/* Policy routes for direct navigation (full page) */}
          <Route path="/terms&conditions" element={
            renderWithLayout(
              <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <TermsViewModal open={true} onClose={() => window.history.back()} />
                </div>
              </div>
            )
          } />
          <Route path="/privacy-policy" element={
            renderWithLayout(
              <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <PrivacyPolicyModal open={true} onClose={() => window.history.back()} />
                </div>
              </div>
            )
          } />
          <Route path="/refund-policy" element={
            renderWithLayout(
              <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <RefundPolicyViewModal open={true} onClose={() => window.history.back()} />
                </div>
              </div>
            )
          } />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={renderWithLayout(<NotFound />)} />
        </Routes>

        {/* Modal routes */}
        {background && (
          <Routes>
            <Route path="/terms&conditions" element={
              <TermsViewModal open={true} onClose={() => window.history.back()} />
            } />
            <Route path="/privacy-policy" element={
              <PrivacyPolicyModal open={true} onClose={() => window.history.back()} />
            } />
            <Route path="/refund-policy" element={
              <RefundPolicyViewModal open={true} onClose={() => window.history.back()} />
            } />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
};


const App = () => (
  <div className="typography-style-3 min-h-screen">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </div>
);

export default App;
