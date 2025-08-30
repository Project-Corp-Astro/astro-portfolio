import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-lavender-dark mb-8 text-center">
                Where Ancient Wisdom Meets Modern Business
              </h2>
              <div className="space-y-6 text-lg text-foreground font-bold text-center">
                <p className="text-body-warm font-bold">
                  I'm Dr. Tumul Raathi, a modern Vedic Astrologer based in Hyderabad, known for blending traditional wisdom with a practical, results-driven approach—especially in the corporate world. My focus is on helping business leaders and entrepreneurs make clear, strategic decisions through a scientific lens on astrology.
                </p>
                <p className="text-body-warm font-bold" >
                  My work draws from Vedic Astrology, Numerology, Nameology, Commercial Vaastu, and Signature Analysis. I combine these disciplines to provide clients with grounded, holistic solutions—not vague predictions.
                </p>
                <p className="text-body-warm font-bold">
                  Having traveled widely and worked across both spiritual and business spaces, I bring a tech-savvy, analytical mindset to everything I do. I see astrology as a tool for clarity and direction—when applied with logic, it can truly transform lives and careers.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="group relative bg-white/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/40 h-full flex flex-col hover:scale-105 hover:bg-white/70 hover:border-white/60 p-6 md:p-8">
                {/* Gradient hover effect overlay */}
                <div className="absolute inset-0 w-full h-0 group-hover:h-full bg-gradient-to-br from-orange-200/40 via-yellow-100/30 to-transparent backdrop-blur-sm transition-all duration-500 z-0 rounded-xl"></div>
                
                {/* Content with higher z-index */}
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-300 via-yellow-200 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <img
                      src="/corpastro.png"
                      className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full object-cover border-2 border-orange group-hover:rotate-12 transition-transform duration-300"
                    />    
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-serif font-semibold text-orange-900 mb-2 font-bold group-hover:text-orange-700 transition-colors duration-300">
                      Multi-Disciplinary Expertise
                    </h3>
                    <p className="text-gray-700 font-bold text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">
                      Vedic Astrology, Numerology, Nameology, Commercial Vaastu, and Signature Analysis
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative bg-white/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/40 h-full flex flex-col hover:scale-105 hover:bg-white/70 hover:border-white/60 p-6 md:p-8">
                {/* Gradient hover effect overlay */}
                <div className="absolute inset-0 w-full h-0 group-hover:h-full bg-gradient-to-br from-orange-200/40 via-yellow-100/30 to-transparent backdrop-blur-sm transition-all duration-500 z-0 rounded-xl"></div>
                
                {/* Content with higher z-index */}
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-300 via-yellow-200 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <img
                      src="/corpastro.png"
                      className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full object-cover border-2 border-orange group-hover:rotate-12 transition-transform duration-300"
                    />    
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-serif font-semibold text-orange-900 mb-2 font-bold group-hover:text-orange-700 transition-colors duration-300">
                      Corporate Focus
                    </h3>
                    <p className="text-gray-700 font-bold text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">
                      Specialized in helping business enterprises and creating soul-centric successful businesses
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group relative bg-white/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/40 h-full flex flex-col hover:scale-105 hover:bg-white/70 hover:border-white/60 p-6 md:p-8">
                {/* Gradient hover effect overlay */}
                <div className="absolute inset-0 w-full h-0 group-hover:h-full bg-gradient-to-br from-orange-200/40 via-yellow-100/30 to-transparent backdrop-blur-sm transition-all duration-500 z-0 rounded-xl"></div>
                
                {/* Content with higher z-index */}
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-300 via-yellow-200 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                    <img
                      src="/corpastro.png"
                      className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full object-cover border-2 border-orange group-hover:rotate-12 transition-transform duration-300"
                    />    
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-serif font-semibold text-orange-900 mb-2 font-bold group-hover:text-orange-700 transition-colors duration-300">
                      Scientific Methodology
                    </h3>
                    <p className="text-gray-700 font-bold text-sm md:text-base group-hover:text-gray-800 transition-colors duration-300">
                      Modern, tech-savvy approach combining logical thinking with traditional wisdom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
