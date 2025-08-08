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
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      {/* <Star className="w-6 h-6 text-orange fill-orange" /> */}
                      <img
                        src="/corpastro.png"
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                      />    
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-2 font-bold">
                        Multi-Disciplinary Expertise
                      </h3>
                      <p className="text-body-warm text-foreground font-bold">
                        Vedic Astrology, Numerology, Nameology, Commercial Vaastu, and Signature Analysis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src="/corpastro.png"
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                    />    
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-2 font-bold">
                        Corporate Focus
                      </h3>
                      <p className="text-body-warm text-foreground font-bold">
                        Specialized in helping business enterprises and creating soul-centric successful businesses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src="/corpastro.png"
                      className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                    />    
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-2 font-bold">
                        Scientific Methodology
                      </h3>
                      <p className="text-body-warm text-foreground font-bold">
                        Modern, tech-savvy approach combining logical thinking with traditional wisdom
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
