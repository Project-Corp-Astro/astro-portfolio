import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Circle, Sun, Moon, Calculator } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Star,
      title: "Vedic Astrology Consultation",
      description: "Comprehensive astrological analysis for business decisions, timing, and strategic planning using ancient Vedic principles.",
      features: ["Business Birth Chart Analysis", "Strategic Timing Guidance", "Leadership Assessment"]
    },
    {
      icon: Calculator,
      title: "Numerology & Nameology",
      description: "Harness the power of numbers and names to optimize business success and personal growth.",
      features: ["Business Name Analysis", "Personal Numerology", "Lucky Number Identification"]
    },
    {
      icon: Sun,
      title: "Commercial Vaastu",
      description: "Optimize your business space for maximum prosperity and positive energy flow using Vaastu principles.",
      features: ["Office Layout Planning", "Energy Flow Optimization", "Prosperity Enhancement"]
    },
    {
      icon: Moon,
      title: "Signature Analysis",
      description: "Understand personality traits and optimize signatures for success and prosperity.",
      features: ["Personality Assessment", "Signature Optimization", "Success Enhancement"]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-20 mt-6">
      <div className="container mx-auto px-6 ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-lavender-dark mb-6">
            Sacred Services
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto font-bold">
            Comprehensive spiritual solutions combining multiple disciplines for holistic business success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto justify-center mt-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="group rounded-3xl hover:shadow-2xl transition-all duration-300 p-6 bg-transparent">
                <div className="pb-4 items-center text-center">
                  <div className="w-14 h-14 cosmic-gradient rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                    <IconComponent className="w-9 h-9 text-orange fill-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground font-bold">
                    {service.title}
                  </h3>
                  <p className="text-foreground text-lg font-bold">
                    {service.description}
                  </p>
                </div>
                <div className="items-center text-center">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center gap-3">
                        <div className="w-2 h-2 bg-cosmic-gold rounded-full"></div>
                        <span className="text-foreground font-bold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
