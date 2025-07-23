import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Circle, MapPin, Mail, Phone } from "lucide-react";
import React from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-center">
          {/* Left Column - Contact Information & Why Choose */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-lavender-dark text-center">Contact Details</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-orange flex-shrink-0" />
                    <h4 className="font-serif font-semibold text-lg text-lavender-dark">Address</h4>
                  </div>
                  <p className="text-brown/90 leading-relaxed text-center">
                    502, Lalithanjali Apartment,<br />
                    6-3-347/11, Dwarakapuri Colony,<br />
                    Punjagutta, Hyderabad,<br />
                    Telangana, India - 500082
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-orange flex-shrink-0" />
                    <h4 className="font-serif font-semibold text-lg text-lavender-dark">Email</h4>
                  </div>
                  <p className="text-brown/90 text-center">consult@corpastro.com</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-orange flex-shrink-0" />
                    <h4 className="font-semibold text-lg text-lavender-dark">Phone</h4>
                  </div>
                  <p className="text-brown/90 text-center">+91 93460 35354</p>
                </div>
              </div>
            </div>
            {/* Why Choose Corp Astro */}
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6 text-lavender-dark text-center">Why Choose Corp Astro?</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-center gap-3">
                  <Star className="w-5 h-5 text-orange flex-shrink-0" />
                  <span className="text-brown/90">Scientific and practical approach to Vedic astrology</span>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <Star className="w-5 h-5 text-orange flex-shrink-0" />
                  <span className="text-brown/90">Multi-disciplinary expertise in corporate consulting</span>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <Star className="w-5 h-5 text-orange flex-shrink-0" />
                  <span className="text-brown/90">Modern, tech-savvy approach with traditional wisdom</span>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <Star className="w-5 h-5 text-orange flex-shrink-0" />
                  <span className="text-brown/90">Focus on soul-centric business success</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Right Column - Contact Form */}
          <div className="flex justify-center">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
