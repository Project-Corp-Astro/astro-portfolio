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

const Index = () => {
  const videoScrollerRef = useRef<HTMLDivElement>(null);

  // List of YouTube video IDs
  const videoIds = [
    "txvPN4lSopM",
    "Cl08la5qCtw",
    "xgvLKHuPAlo",
    "0ZTxa-l150I",
    "joAjV9n2wQ0",
    "SbvcFBkXqvk"
  ];

  useEffect(() => {
    const scroller = videoScrollerRef.current;
    if (!scroller) return;
    let animationFrame: number;
    let paused = false;

    const singleSetWidth = scroller.scrollWidth / 2;

    const scroll = () => {
      if (!paused && scroller) {
        scroller.scrollLeft += 1; // Adjust speed here
        if (scroller.scrollLeft >= singleSetWidth) {
          scroller.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = false; };

    scroller.addEventListener("mouseenter", handleMouseEnter);
    scroller.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      scroller.removeEventListener("mouseenter", handleMouseEnter);
      scroller.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <HomeServicesSection />
      <TestimonialsSection />
      {/* YouTube Video Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-orange-700 font-serif">Watch Dr. Tumul Raathi on YouTube</h2>
          {/* Video carousel with infinite loop */}
          <div ref={videoScrollerRef} className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar">
            {/* Render the video list twice for seamless looping */}
            {[...videoIds, ...videoIds].map((id, idx) => (
              <div key={idx} className="min-w-[320px] max-w-[400px] aspect-w-16 aspect-h-9 rounded-2xl shadow-lg border border-orange-100 overflow-hidden transition-transform duration-300 hover:scale-105 bg-white relative">
                <div className="absolute inset-0 bg-white" />
                <iframe
                  className="relative z-10 rounded-2xl"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`YouTube video ${idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
            {/* Add more videos by adding to the videoIds array */}
          </div>
          <div className="flex justify-center mt-8">
            <a
              href="https://www.youtube.com/@dr.tumulraathi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InteractiveHoverButton
                text="Visit Dr. Tumul Raathi's YouTube Channel"
                className="text-lg px-8 py-3"
                type="button"
              />
            </a>
          </div>
        </div>
      </section>
      <ContactSection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
