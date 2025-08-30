import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Sun, Moon, Calculator, Eye, Brain, Zap, TrendingUp } from "lucide-react";

const HomeServicesSection = () => {
  const services = [
    {
      icon: Star,
      title: "Vedic Astrology Consultation",
      description: "Transform your life with ancient wisdom. Our comprehensive Vedic Astrology analysis reveals your unique karmic map, strengths, and challenges using the sidereal zodiac for precise, personalized guidance.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: Calculator,
      title: "Numerology & Nameology",
      description: "Harness the power of numbers and names to optimize business success and personal growth. Discover your Life Path and understand how your name shapes your destiny and success.",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: Sun,
      title: "Commercial Vaastu",
      description: "Optimize your business space for maximum prosperity and positive energy flow. Our Commercial Vaastu solutions align your workplace with natural energies to attract growth and boost productivity.",
      color: "from-orange-400 to-yellow-400"
    },
    {
      icon: Moon,
      title: "Signature Analysis",
      description: "Understand personality traits and optimize signatures for success and prosperity. Our signature analysis helps you enhance your personal brand and achieve greater success.",
      color: "from-indigo-400 to-purple-400"
    },
    {
      icon: Eye,
      title: "Palmistry & Hand Reading",
      description: "Discover your life's journey through the ancient art of palmistry. Our expert analysis reveals your personality traits, career potential, and life path through detailed hand reading.",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: Brain,
      title: "Mind & Meditation Guidance",
      description: "Achieve mental clarity and spiritual growth through personalized meditation techniques. Our guidance helps you develop mindfulness practices for stress relief and inner peace.",
      color: "from-teal-400 to-blue-400"
    },
    {
      icon: Zap,
      title: "Energy Healing & Chakra Balancing",
      description: "Restore balance and vitality through energy healing practices. Our chakra balancing sessions help clear blockages and promote physical, emotional, and spiritual well-being.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: TrendingUp,
      title: "Business Success Coaching",
      description: "Accelerate your business growth with spiritual wisdom and strategic guidance. Our coaching combines ancient principles with modern business strategies for sustainable success.",
      color: "from-red-400 to-pink-400"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-20 mt-6">
      <div className="container mx-auto px-6 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            Sacred Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium px-4">
            Holistic spiritual solutions for business success, blending ancient wisdom with modern insight.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
                  <Card
                  key={index}
                  className="group relative bg-white/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/40 h-full flex flex-col hover:scale-105 hover:bg-white/70 hover:border-white/60"
                >
                <CardContent className="p-4 md:p-6 flex flex-col h-full relative">
                  {/* Gradient hover effect overlay */}
                  <div className="absolute inset-0 w-full h-0 group-hover:h-full bg-gradient-to-br from-orange-200/40 via-yellow-100/30 to-transparent backdrop-blur-sm transition-all duration-500 z-0 rounded-xl"></div>
                  
                  {/* Content with higher z-index */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    {index === 0 ? (
                      <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-all duration-300">
                        <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-lg border border-lavender-400 flex items-center justify-center">
                        <img 
                          src="/vedic-astrology.png" 
                          alt="Vedic Astrology" 
                          className="w-full h-full object-contain group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300"
                        />
                        </div>
                      </div>
                      ) : index === 1 ? (
                        <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-all duration-300">
                        <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg border border-lavender-300 flex items-center justify-center">
                          <img 
                            src="/numerology.png" 
                            alt="Vedic Astrology" 
                            className="w-full h-full object-contain group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300"
                          />
                          </div>
                        </div>
                      ) : index === 2 ? (
                        <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 transition-all duration-300">
                        <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg border border-lavender-300 flex items-center justify-center">
                          <img 
                            src="/commercial-vastu.png" 
                            alt="Commercial Vaastu" 
                            className="w-full h-full object-contain group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300"
                          />
                          </div>
                        </div>
                      ) : index === 3 ? (
                        <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-all duration-300">
                        <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg border border-lavender-300 flex items-center justify-center">
                          <img
                            src="/Signature.png"
                            alt="Signature Analysis"
                            className="w-full h-full object-contain group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300"
                          />
                          </div>
                        </div>
                    ) : (
                      <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-3 md:mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 overflow-hidden`}>
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                    )}

                    {/* Title */}
                    <CardTitle className="text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-2 md:mb-3 leading-tight group-hover:text-orange-700 transition-colors duration-300">
                      {service.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 flex-grow group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </CardDescription>

                    {/* Learn More Link */}
                    <a 
                      href={index === 0 ? "/vedic-astrology" : index === 1 ? "/numerology-nameology" : index === 2 ? "/commercial-vaastu" : index === 3 ? "/signature-analysis" : "#" }
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-all duration-300 mt-auto group-hover:translate-x-1 group-hover:text-blue-800"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default HomeServicesSection; 