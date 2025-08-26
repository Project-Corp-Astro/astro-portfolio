import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calculator, Sun, Moon } from "lucide-react";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

const HomeServicesSection = () => {
  const services = [
    {
      icon: Star,
      title: "Vedic Astrology Consultation",
      description:
        "Unlock your destiny with ancient wisdom. Vedic Astrology reveals your unique karmic map, strengths, and challenges using the sidereal zodiac for precise, personalized guidance.",
      features: []
    },
    {
      icon: Calculator,
      title: "Numerology & Nameology",
      description:
        "Discover the hidden power of numbers and names. Numerology uncovers your Life Path, while Nameology reveals how your name shapes your destiny and success.",
      features: []
    },
    {
      icon: Sun,
      title: "Commercial Vaastu",
      description:
        "Transform your business space for prosperity and harmony. Commercial Vaastu aligns your workplace with natural energies to attract growth, boost productivity, and welcome customers.",
      features: []
    },
    {
      icon: Moon,
      title: "Signature Analysis",
      description:
        "Optimize your signature for success. Signature Analysis assesses personality traits and refines your signature to enhance prosperity and achievement.",
      features: []
    }
  ];

  return (
  <section id="services" className="py-16 md:py-20 mt-6">
      <div className="container mx-auto px-6 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-orange-900 mb-4 tracking-tight drop-shadow-lg">
            Sacred Services
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium px-4">
            Holistic spiritual solutions for business success, blending ancient wisdom with modern insight.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-2/3 bg-gradient-to-t from-orange-100 via-yellow-100 to-transparent transition-all duration-500 z-0"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-300 via-yellow-200 to-orange-100 rounded-xl flex items-center justify-center mb-5 shadow-lg">
                    <IconComponent className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-orange-900 font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-4">
                    {service.description}
                  </p>
                  {service.features.length > 0 && (
                    <ul className="space-y-2 mt-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></span>
                          <span className="text-gray-800 font-semibold text-sm md:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-12">
          <a href="/services">
            <InteractiveHoverButton className="text-orange-900 w-full sm:w-auto font-bold">
              Know More
            </InteractiveHoverButton>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection; 