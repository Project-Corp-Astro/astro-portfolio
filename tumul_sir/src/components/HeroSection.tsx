
import { useEffect, useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import CelestialOrbit from "./CelestialOrbit";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  // Shared content
  return (
    <div className="typography-style-3">
      <section
        className={
          isMobile
            ? "relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-8"
            : "relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
        }
      >
      <div className="container text-center relative z-10">
        <div
          className={
            isMobile
              ? "w-full animate-fade-in flex flex-col items-center justify-center min-h-[350px] gap-14"
              : "w-full animate-fade-in flex flex-row items-center justify-between min-h-[600px] gap-20"
          }
        >
          {/* Celestial Orbit for mobile, right side for desktop */}
          {isMobile ? (
            <div className="flex items-center justify-center flex-shrink-0 order-1">
              <CelestialOrbit />
            </div>
          ) : null}

          {/* Text Content */}
          <div
            className={
              isMobile
                ? "flex flex-col justify-center h-full text-center flex-1 order-2"
                : "flex flex-col justify-center h-full text-left flex-1 order-1 min-h-[600px]"
            }
          >
            <h1
              className={
                isMobile
                  ? "text-4xl font-serif font-bold text-center text-lavender-dark mb-6 leading-relaxed font-bold"
                  : "text-heading text-lavender-dark mb-8 leading-relaxed font-bold"
              }
            >
              I'm Dr. Tumul Raathi
              <span
                className={
                  isMobile
                    ? "text-subheading block text-foreground text-3xl mt-1 font-bold"
                    : "text-subheading text-foreground block mt-3 font-bold"
                }
              >
                Business Astrologer
              </span>
            </h1>
            <p
              className={
                isMobile
                  ? "text-body-warm text-foreground text-center mb-8 max-w-2xl mx-auto leading-relaxed font-bold"
                  : "text-body-warm text-foreground mb-12 max-w-6xl leading-relaxed font-bold"
              }
            >
              Merging timeless wisdom with contemporary business strategies, I specialize in corporate astrology to help organizations harness cosmic insights for exceptional growth and harmony.
            </p>
            <div
              className={
                isMobile
                  ? "flex flex-col gap-6 justify-center items-center mb-6"
                  : "flex flex-row gap-4 justify-start items-center mb-14"
              }
            >
              <InteractiveHoverButton
                className="w-auto text-button"
                text="Schedule Your Consultation"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              {/*
              <InteractiveHoverButton
                className={isMobile ? "w-full text-button" : "w-auto text-button"}
                text="View My Services"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              */}
            </div>
            {/* Trust indicators */}
            <div
              className={
                isMobile
                  ? "flex flex-wrap justify-center items-center gap-6 text-foreground"
                  : "flex flex-wrap justify-start items-center gap-8 text-foreground"
              }
            >
              <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:text-orange">
                <img
                  src="/corpastro.png"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                />
                <span className="text-body-warm font-bold">Corporate Specialist</span>
              </div>
              <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:text-orange">
                <img
                  src="/corpastro.png"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                />
                <span className="text-body-warm font-bold">Based in Hyderabad</span>
              </div>
              <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:text-orange">
                <img
                  src="/corpastro.png"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                />
                <span className="text-body-warm font-bold">Scientific Approach</span>
              </div>
            </div>
          </div>

          {/* Celestial Orbit for desktop */}
          {!isMobile ? (
            <div className="flex items-center justify-center flex-shrink-0 order-2 min-h-[600px]">
              <CelestialOrbit />
            </div>
          ) : null}
        </div>
      </div>
      </section>
    </div>
  );
};

export default HeroSection;
