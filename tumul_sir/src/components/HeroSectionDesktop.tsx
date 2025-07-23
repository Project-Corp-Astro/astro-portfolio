import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Star, Circle } from "lucide-react";
import CelestialOrbit from "./CelestialOrbit";

const HeroSectionDesktop = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-36">
      <div className="container text-center relative z-10">
        <div className="w-full animate-fade-in flex flex-row items-center justify-between min-h-[600px] gap-20">
          {/* Text Content */}
          <div className="flex flex-col justify-center h-full text-left flex-1 order-1 min-h-[600px]">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-10 leading-tight transition-colors duration-200 hover:text-orange">
              Dr. Tumul Raathi
              <span className="text-orange block text-3xl mt-1 transition-colors duration-200 hover:text-foreground">Business Astrologer</span>
            </h1>
            <p className="text-xl text-foreground mb-12 max-w-3xl leading-relaxed font-bold">
                Merging timeless wisdom with contemporary business strategies, I specialize in corporate astrology to help organizations harness cosmic insights for exceptional growth and harmony.
            </p>
            <div className="flex flex-row gap-4 justify-start items-center mb-14">
              <InteractiveHoverButton
                className="w-auto font-bold"
                text="Schedule Your Consultation"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
              <InteractiveHoverButton
                className="w-auto font-bold"
                text="View My Services"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-start items-center gap-8 text-foreground">
              <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:text-orange">
                <Star className="w-5 h-5 text-orange" />
                <span className="font-bold">Corporate Specialist</span>
              </div>
              <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:text-orange">
                <Circle className="w-5 h-5 text-orange" />
                <span className="font-bold">Based in Hyderabad</span>
              </div>
              <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:text-orange">
                <Star className="w-5 h-5 text-orange" />
                <span className="font-bold">Scientific Approach</span>
              </div>
            </div>
          </div>

          {/* Celestial Orbit Component */}
          <div className="flex items-center justify-center flex-shrink-0 order-2 min-h-[600px]">
            <CelestialOrbit />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSectionDesktop; 