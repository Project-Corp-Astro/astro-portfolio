import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Award, BookOpen, Users, Clock, Target } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const KnowMore = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const expertise = [
    {
      icon: Star,
      title: "Vedic Astrology Expert",
      description: "Over 15 years of experience in Vedic astrology with specialization in business and corporate astrology."
    },
    {
      icon: Award,
      title: "Certified Professional",
      description: "Certified by leading astrological institutions and recognized for excellence in corporate consultation."
    },
    {
      icon: BookOpen,
      title: "Ancient Wisdom",
      description: "Deep knowledge of ancient Vedic texts and their practical application in modern business scenarios."
    },
    {
      icon: Users,
      title: "Corporate Success",
      description: "Helped 500+ businesses and entrepreneurs achieve success through astrological guidance."
    }
  ];

  const achievements = [
    {
      icon: Target,
      title: "Success Rate",
      value: "95%",
      description: "Client satisfaction and business improvement rate"
    },
    {
      icon: Clock,
      title: "Experience",
      value: "15+ Years",
      description: "Professional astrological consultation experience"
    },
    {
      icon: Users,
      title: "Clients Served",
      value: "500+",
      description: "Businesses and individuals guided to success"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Areas of Expertise */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Areas of Expertise
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Specialized knowledge in multiple disciplines for comprehensive business guidance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {expertise.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="group rounded-3xl hover:shadow-2xl transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 cosmic-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-orange fill-white" />
                    </div>
                    <CardTitle className="text-xl font-serif text-foreground font-bold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Track Record of Success */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
              Track Record of Success
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Proven results and achievements in helping businesses grow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="group rounded-3xl hover:shadow-2xl transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 cosmic-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-orange fill-white" />
                    </div>
                    <CardTitle className="text-3xl font-serif text-foreground font-bold">
                      {item.value}
                    </CardTitle>
                    <CardTitle className="text-xl font-serif text-foreground font-bold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Book a consultation with Dr. Tumul Raathi and discover how ancient wisdom can guide your modern business success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InteractiveHoverButton onClick={() => setModalOpen(true)} className="w-full sm:w-auto text-button" text="Schedule Your Consultation" />
            <ContactModal open={isModalOpen} onClose={() => setModalOpen(false)} />
            <Link to="/">
              <InteractiveHoverButton className="w-full sm:w-auto text-button" text="Back to Home" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KnowMore; 