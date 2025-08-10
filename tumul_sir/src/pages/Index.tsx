import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import React, { useRef, useEffect } from "react";
import YoutubeSection from "../components/YoutubeSection";

const Index = () => {


  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <HomeServicesSection />
      <TestimonialsSection />
      <YoutubeSection />
      <ContactSection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
