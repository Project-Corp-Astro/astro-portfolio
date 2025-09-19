import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";

const Index = React.lazy(() => import("./pages/Index"))
const VedicAstrology = React.lazy(() => import("./pages/VedicAstrology"))
const Numerology = React.lazy(() => import("./pages/Numerology"))
const Commercial = React.lazy(() => import("./pages/Commercial"))
const Signature = React.lazy(() => import("./pages/Signature"))
const KnowMore = React.lazy(() => import("./pages/KnowMore"))
const NotFound = React.lazy(() => import("./pages/NotFound"))
const TermsAndConditions = React.lazy(() => import("./pages/TermsAndConditions"))
const RefundPolicy = React.lazy(() => import("./pages/RefundPolicy"))
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"))
const Cart = React.lazy(() => import("./pages/Cart"))
const Checkout = React.lazy(() => import("./pages/Checkout"))
const OrderConfirmation = React.lazy(() => import("./pages/OrderConfirmation"))
const ParticleBackground = React.lazy(() => import("@/components/ParticleBackground"))
const Chatbot = React.lazy(() => import("@/components/Chatbot"))
const TermsViewModal = React.lazy(() => import("@/components/TermsViewModal"))
const PrivacyPolicyModal = React.lazy(() => import("@/components/PrivacyPolicyModal"))
const RefundPolicyViewModal = React.lazy(() => import("@/components/RefundPolicyViewModal"))
const RouteModal = React.lazy(() => import("@/components/ui/modal").then(mod => ({ default: mod.RouteModal })))


// import Index from "./pages/Index";
// import VedicAstrology from "./pages/VedicAstrology";
// import Numerology from "./pages/Numerology";
// import Commercial from "./pages/Commercial";
// import Signature from "./pages/Signature";
// import KnowMore from "./pages/KnowMore";
// import NotFound from "./pages/NotFound";
// import TermsAndConditions from "./pages/TermsAndConditions";
// import RefundPolicy from "./pages/RefundPolicy";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import ParticleBackground from "@/components/ParticleBackground";
// import Chatbot from "@/components/Chatbot";
// import TermsViewModal from "@/components/TermsViewModal";
// import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
// import RefundPolicyViewModal from "@/components/RefundPolicyViewModal";
// import { RouteModal } from "@/components/ui/modal";

const queryClient = new QueryClient();

// Layout component that wraps all pages with common elements
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <Suspense fallback = {null}>
      <ParticleBackground />
    </Suspense>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
      <Suspense fallback = {null}>
        <Chatbot />
      </Suspense>
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"> Loading... </div>}>
          <Routes location={background || location} key={location.pathname}>
            <Route path="/" element={renderWithLayout(<Index />)} />
            <Route path="/vedic-astrology" element={renderWithLayout(<VedicAstrology />)} />
            <Route path="/numerology-nameology" element={renderWithLayout(<Numerology />)} />
            <Route path="/commercial-vaastu" element={renderWithLayout(<Commercial />)} /> 
            <Route path="/signature-analysis" element={renderWithLayout(<Signature />)} />
            <Route path="/knowmore" element={renderWithLayout(<KnowMore />)} />
            <Route path="/cart" element={renderWithLayout(<Cart />)} />
            <Route path="/checkout" element={renderWithLayout(<Checkout />)} />
            <Route path="/order/:id" element={renderWithLayout(<OrderConfirmation />)} />
            
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
        </Suspense>

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
