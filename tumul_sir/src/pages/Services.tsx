import Header from "@/components/Header";
import PlainServicesSection from "@/components/PlainServicesSection";
import Footer from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Header />
      <PlainServicesSection />
      <div className="flex flex-col sm:flex-row justify-center items-center mb-14 gap-4 px-4">
        <InteractiveHoverButton 
          onClick={() => setModalOpen(true)} 
          className="w-full sm:w-auto text-sm sm:text-base" 
          text="Schedule Your Consultation" 
        />
        <ContactModal open={isModalOpen} onClose={() => setModalOpen(false)} />
        <Link to="/" className="w-full sm:w-auto">
          <InteractiveHoverButton 
            className="w-full text-sm sm:text-base" 
            text="Back to Home" 
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Services; 