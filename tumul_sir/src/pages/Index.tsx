import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <HomeServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
