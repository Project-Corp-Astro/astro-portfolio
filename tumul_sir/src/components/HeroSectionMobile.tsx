import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Star, Circle } from "lucide-react";
import CelestialOrbit from "./CelestialOrbit";

const HeroSectionMobile = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-8">
      <div className="container text-center relative z-10">
        <div className="w-full animate-fade-in flex flex-col items-center justify-center min-h-[350px] gap-14">
          {/* Celestial Orbit Component */}
          <div className="flex items-center justify-center flex-shrink-0 order-1">
            <CelestialOrbit />
          </div>
          {/* Text Content */}
          <div className="flex flex-col justify-center h-full text-center flex-1 order-2">
            <h1 className="text-4xl font-serif font-bold text-center text-dark-brown text-foreground mb-6 leading-relaxed font-bold">
              I'm Dr. Tumul Raathi
              <span className="text-subheading block text-3xl mt-1 font-bold">Business Astrologer</span>
            </h1>
            <p className="text-body-warm text-foreground text-center mb-8 max-w-2xl mx-auto leading-relaxed font-bold">
                Merging timeless wisdom with contemporary business strategies, I specialize in corporate astrology to help organizations harness cosmic insights for exceptional growth and harmony.
            </p>
            <div className="flex flex-col gap-6 justify-center items-center mb-6">
              <InteractiveHoverButton
                className="w-auto text-button"
                text="Schedule Your Consultation"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              {/* <InteractiveHoverButton
                className="w-full text-button"
                text="View My Services"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              /> */}
            </div>
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-foreground">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile; 