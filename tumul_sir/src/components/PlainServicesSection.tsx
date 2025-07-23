import { Star, Circle, Sun, Moon, Calculator } from "lucide-react";

const PlainServicesSection = () => {
  const services = [
    {
      icon: Star,
      title: "Vedic Astrology Consultation",
      description: "Vedic Astrology, also known as Jyotish, is a profound and intricate science of light that originated in ancient India. It's built on the understanding that the positions of celestial bodies at the moment of your birth reveal a detailed map of your karma, destiny, and inherent potential. Unlike Western astrology, Vedic astrology uses the sidereal zodiac, which aligns precisely with the actual positions of the constellations in the sky. This allows for incredibly accurate insights into your personality, strengths, challenges, and life's unfolding events.",
      features: []
    },
    {
      icon: Calculator,
      title: "Numerology & Nameology",
      description: "Ever wondered how your birthdate or name shapes your life? We analyze the unique numerical vibrations of your birthdate (Numerology) and name (Nameology). Numerology reveals your Life Path – your core traits and purpose. Nameology uncovers your Destiny – how your name's energy influences your interactions and achievements.",
      features: []
    },
    {
      icon: Sun,
      title: "Commercial Vaastu",
      description: "Curious why some businesses flourish while others face obstacles? Commercial Vaastu is the time-honored approach to cultivating a prosperous, harmonious, and positive workplace. By aligning your business environment with natural energies, you can:",
      features: ["Attract Wealth & Growth: Enhance financial flow and new opportunities", "Boost Productivity: Foster a vibrant, focused, and balanced workspace", "Improve Customer Flow: Make your space more welcoming and appealing","Unlock your business's full potential with strategic Vaastu guidance"]
    },
    {
      icon: Moon,
      title: "Signature Analysis",
      description: "Understand personality traits and optimize signatures for success and prosperity.",
      features: ["Personality Assessment", "Signature Optimization", "Success Enhancement"]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-32 mt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-lavender-dark mb-4 md:mb-6">
            Sacred Services
          </h2>
          <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-bold px-4">
            Comprehensive spiritual solutions combining multiple disciplines for holistic business success
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto justify-center mt-8 md:mt-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="rounded-3xl transition-all duration-300 p-4 md:p-6 bg-transparent mb-8 md:mb-12">
                <div className="pb-4 items-center text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 cosmic-gradient rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <IconComponent className="w-7 h-7 md:w-9 md:h-9 text-orange fill-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground font-bold mb-3 md:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-foreground text-base md:text-lg font-bold leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {service.features.length > 0 && (
                  <div className="items-center text-center mt-4 md:mt-6">
                    <ul className="space-y-2 md:space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center gap-2 md:gap-3">
                          <div className="w-2 h-2 bg-cosmic-gold rounded-full flex-shrink-0"></div>
                          <span className="text-foreground font-bold text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlainServicesSection; 