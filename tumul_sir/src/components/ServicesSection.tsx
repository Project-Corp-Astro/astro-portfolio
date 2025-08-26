import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Sun, Moon, Calculator } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Star,
      title: "Vedic Astrology Consultation",
      description:
        "Comprehensive astrological analysis for business decisions, timing, and strategic planning using ancient Vedic principles.",
      features: ["Business Birth Chart Analysis", "Strategic Timing Guidance", "Leadership Assessment"]
    },
    {
      icon: Calculator,
      title: "Numerology & Nameology",
      description:
        "Harness the power of numbers and names to optimize business success and personal growth.",
      features: ["Business Name Analysis", "Personal Numerology", "Lucky Number Identification"]
    },
    {
      icon: Sun,
      title: "Commercial Vaastu",
      description:
        "Optimize your business space for maximum prosperity and positive energy flow using Vaastu principles.",
      features: ["Office Layout Planning", "Energy Flow Optimization", "Prosperity Enhancement"]
    },
    {
      icon: Moon,
      title: "Signature Analysis",
      description:
        "Understand personality traits and optimize signatures for success and prosperity.",
      features: ["Personality Assessment", "Signature Optimization", "Success Enhancement"]
    }
  ];

  return (
    <section
      id="services"
      className="py-16 md:py-28 bg-gradient-to-b from-white via-lavender-50 to-footer-dark"
    >
      <div className="container mx-auto px-6 md:px-24">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-lavender-dark mb-4 tracking-tight drop-shadow-lg">
            Sacred Services
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium px-4">
            Holistic spiritual solutions for business success, blending ancient wisdom with modern insight.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group relative bg-white/80 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-2/3 bg-gradient-to-t from-orange-100 via-lavender-100 to-transparent transition-all duration-500 z-0"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <CardHeader className="flex flex-col items-center">
                    {/* Icon container with cosmic gradient */}
                    <div className="w-14 h-14 cosmic-gradient rounded-xl flex items-center justify-center mb-5 shadow-lg">
                      <IconComponent className="w-8 h-8 text-orange" />
                    </div>
                    <CardTitle className="text-2xl font-serif text-lavender-dark font-bold mb-3">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-4">
                      {service.description}
                    </CardDescription>

                    {service.features.length > 0 && (
                      <ul className="space-y-2 mt-2">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center justify-center gap-2"
                          >
                            <span className="w-2 h-2 bg-cosmic-gold rounded-full flex-shrink-0"></span>
                            <span className="text-gray-800 font-semibold text-sm md:text-base">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
