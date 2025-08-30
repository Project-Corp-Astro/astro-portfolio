import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sumeet Somani",
      title: "Director, Karni Packaging",
      content: "Our's was a very well established manufacturing unit and we were planning for expansion of our business. To set up a new manufacturing unit we reached out to Dr. Tumul Raathi for Vastu Consultation. It was very insightful and helped us with selecting the right location and set the right energies at the new Manufacturing Unit. Happy to share that we have tripled our production in just 3 months and will consult you very soon as we look for another space!",
      rating: 5
    },
    {
      name: "Jorawar Singh, ",
      title: "Founder, JS Enterprises",
      content: "I wish I had consulted Dr. Tumul Raathi when I was working on my first business idea. His expertise on Business and Astrology has helped me with strategizing multiple businesses. From astro-branding to his business consultation, I can vouch for him and have helped my friends by recommending his services.",
      rating: 5
    },
    {
      name: "Amit Bajaj, ",
      title: "Founder, Estrella Ceramica",
      content: "A great command on his subject and with amazing analytical & predictive abilities, Tumul ji is one of the finest Astrologers I've ever met his remedies have helped me a lot in business as well as in my personal life. I heart full of wishes & thanks to him.",
      rating: 5
    }
  ];

  // Autoplay logic with pause on hover
  const carouselApiRef = useRef<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApiRef.current && !isPaused) {
        carouselApiRef.current.scrollNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-lavender-dark mb-6">
            Voices of Transformation
          </h2>
          <p className="text-body-warm font-semibold text-xl text-cosmic-brown/80 max-w-3xl mx-auto">
            Discover how cosmic wisdom has guided leaders to unprecedented success
          </p>
        </div>
        
        <Carousel 
          opts={{ loop: true }} 
          setApi={api => (carouselApiRef.current = api)} 
          className="max-w-2xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="px-2 w-80 md:w-96 h-96 flex items-center justify-center">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <div className="group relative w-full h-full bg-white/60 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/40 flex flex-col justify-between hover:scale-105 hover:bg-white/70 hover:border-white/60">
                    {/* Enhanced hover effect with glassmorphism */}
                    <div className="absolute bottom-0 left-0 w-full h-0 group-hover:h-2/3 bg-gradient-to-t from-orange-200/60 via-yellow-100/60 to-transparent backdrop-blur-sm transition-all duration-500 z-0"></div>
                    <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full">
                      <div className="flex gap-1 mb-4 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-orange-500 fill-orange-400 group-hover:scale-110 transition-transform duration-300" />
                        ))}
                      </div>
                      <p className="text-orange-900 mb-6 italic text-base md:text-lg text-center leading-relaxed group-hover:text-orange-800 transition-colors duration-300">
                        "{testimonial.content}"
                      </p>
                      <div className="text-center">
                        <h4 className="font-semibold text-orange-900 text-base md:text-lg group-hover:text-orange-800 transition-colors duration-300">{testimonial.name}</h4>
                        <p className="text-orange-700 text-sm md:text-base group-hover:text-orange-600 transition-colors duration-300">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white/60 backdrop-blur-md hover:bg-white/80 text-orange border-orange/30 shadow-lg hover:shadow-xl transition-all duration-300" />
          <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white/60 backdrop-blur-md hover:bg-white/80 text-orange border-orange/30 shadow-lg hover:shadow-xl transition-all duration-300" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
