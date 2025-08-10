import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Circle, MapPin, Mail, Phone } from "lucide-react";
import React from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-lavender-dark mb-6 text-center">
            Begin Your Cosmic Journey
          </h2>
          <p className="text-xl text-brown/90 max-w-3xl mx-auto">
            Ready to align your business with the wisdom of the stars? Let's explore how 
            cosmic intelligence can transform your corporate path.
          </p>
        </div>
        <div className="flex flex-col items-center gap-10">
          <Card className="w-full max-w-lg md:max-w-xl md:w-[600px] rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-lavender-dark text-center">
                Book Your Consultation
              </CardTitle>
              <p className="text-center text-lavender-dark/70">
                Take the first step towards cosmic business alignment
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ContactForm />
              <p className="text-center text-sm text-lavender-dark/60">
                All consultations are completely confidential and conducted by me itself...
              </p>
            </CardContent>
          </Card>
          {/* Why Choose Corp Astro */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-lavender-dark text-center">Why Choose Corp Astro?</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center gap-3">
                <img
                  src="/corpastro.png"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                />                
                <span className="text-brown/90 text-body-warm">Scientific and practical approach to Vedic astrology</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <img
                  src="/corpastro.png"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                />
                <span className="text-brown/90 text-body-warm">Multi-disciplinary expertise in corporate consulting</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <img
                  src="/corpastro.png"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                />
                <span className="text-brown/90 text-body-warm">Modern, tech-savvy approach with traditional wisdom</span>
              </li>
              <li className="flex items-center justify-center gap-3">
                <img
                  src="/corpastro.png"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border-2 border-orange shadow"
                />
                <span className="text-brown/90 text-body-warm">Focus on soul-centric business success</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
