import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import AboutSection from "@/components/AboutSection";
import React, { Suspense } from "react";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const TestimonialsSection = React.lazy(() => import("@/components/TestimonialsSection"));
const YoutubeSection = React.lazy(() => import("@/components/YoutubeSection"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <HomeServicesSection />
      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={null}>
        <YoutubeSection />
      </Suspense>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
