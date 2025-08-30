// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
// import ContactModal from "@/components/ContactModal";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Star, Calculator, Sun, Moon, Sparkles, Clock, Users, Award, Shield, Zap, Heart, Target, TrendingUp, Globe, Crown } from "lucide-react";

// const Services = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [activeService, setActiveService] = useState<number | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const services = [
//     {
//       id: 'vedic-astrology',
//       icon: Star,
//       title: "Vedic Astrology Consultation",
//       subtitle: "Ancient Wisdom for Modern Success",
//       description: "Unlock your destiny with the world's oldest predictive science. Our Vedic Astrology consultations reveal your unique karmic blueprint, helping you navigate life's challenges with cosmic precision.",
//       features: [
//         "Personalized Birth Chart Analysis",
//         "Career & Business Guidance",
//         "Relationship Compatibility",
//         "Life Path Optimization",
//         "Remedial Solutions"
//       ],
//       benefits: [
//         "Clarity on Life Purpose",
//         "Better Decision Making",
//         "Enhanced Relationships",
//         "Career Advancement",
//         "Inner Peace & Balance"
//       ],
//       price: 2500,
//       duration: "60 minutes",
//       popularity: "Most Popular",
//       trustScore: 98,
//       clientsServed: 5000,
//       color: "from-purple-600 to-indigo-700",
//       bgColor: "bg-gradient-to-br from-purple-50 to-indigo-100",
//       borderColor: "border-purple-200"
//     },
//     {
//       id: 'numerology',
//       icon: Calculator,
//       title: "Numerology & Nameology",
//       subtitle: "The Power of Numbers & Names",
//       description: "Discover how numbers and names shape your destiny. Our comprehensive numerology analysis reveals your Life Path Number, Destiny Number, and how your name influences your success.",
//       features: [
//         "Life Path Number Analysis",
//         "Name Numerology",
//         "Business Name Optimization",
//         "Lucky Numbers & Dates",
//         "Personal Year Forecast"
//       ],
//       benefits: [
//         "Better Name Choices",
//         "Optimal Timing for Actions",
//         "Enhanced Personal Power",
//         "Business Success",
//         "Life Balance"
//       ],
//       price: 1200,
//       duration: "45 minutes",
//       popularity: "Trending",
//       trustScore: 95,
//       clientsServed: 3200,
//       color: "from-blue-600 to-cyan-700",
//       bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
//       borderColor: "border-blue-200"
//     },
//     {
//       id: 'commercial-vaastu',
//       icon: Sun,
//       title: "Commercial Vaastu",
//       subtitle: "Transform Your Business Space",
//       description: "Align your workplace with cosmic energies to attract prosperity, boost productivity, and create harmonious work environments that drive business success.",
//       features: [
//         "Office Space Analysis",
//         "Energy Flow Optimization",
//         "Furniture Placement",
//         "Color & Element Balance",
//         "Business Growth Remedies"
//       ],
//       benefits: [
//         "Increased Revenue",
//         "Better Team Harmony",
//         "Enhanced Productivity",
//         "Customer Attraction",
//         "Sustainable Growth"
//       ],
//       price: 2000,
//       duration: "90 minutes",
//       popularity: "Business Favorite",
//       trustScore: 97,
//       clientsServed: 1800,
//       color: "from-orange-600 to-red-700",
//       bgColor: "bg-gradient-to-br from-orange-50 to-red-100",
//       borderColor: "border-orange-200"
//     },
//     {
//       id: 'signature-analysis',
//       icon: Moon,
//       title: "Signature Analysis",
//       subtitle: "Your Signature, Your Success",
//       description: "Your signature reveals your personality, potential, and path to success. Our signature analysis helps you optimize your autograph for maximum impact and achievement.",
//       features: [
//         "Personality Assessment",
//         "Signature Optimization",
//         "Success Enhancement",
//         "Confidence Building",
//         "Professional Image"
//       ],
//       benefits: [
//         "Enhanced Self-Confidence",
//         "Better First Impressions",
//         "Professional Success",
//         "Personal Branding",
//         "Leadership Qualities"
//       ],
//       price: 800,
//       duration: "30 minutes",
//       popularity: "Quick Win",
//       trustScore: 92,
//       clientsServed: 2100,
//       color: "from-green-600 to-emerald-700",
//       bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
//       borderColor: "border-green-200"
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       role: "CEO, TechStart India",
//       text: "Dr. Tumul's Vedic Astrology consultation transformed our business strategy. We've seen 300% growth since implementing his recommendations.",
//       rating: 5
//     },
//     {
//       name: "Rajesh Kumar",
//       role: "Entrepreneur",
//       text: "The Commercial Vaastu analysis completely changed our office dynamics. Our team productivity increased dramatically.",
//       rating: 5
//     },
//     {
//       name: "Anita Patel",
//       role: "Marketing Director",
//       text: "Signature analysis helped me build confidence and make better decisions. Highly recommend for professional growth.",
//       rating: 5
//     }
//   ];

//   const trustIndicators = [
//     { icon: Users, label: "10,000+ Clients Served", value: "10K+" },
//     { icon: Award, label: "15+ Years Experience", value: "15+" },
//     { icon: Shield, label: "100% Confidential", value: "100%" },
//     { icon: Star, label: "4.9/5 Rating", value: "4.9" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
//       {/* Cosmic Background Animation */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] animate-pulse"></div>
//         <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
//         <div className="absolute top-40 right-40 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
//         <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
//       </div>

//       <Header />

//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 px-6 md:px-24">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-8">
//               <Sparkles className="w-5 h-5 text-yellow-400" />
//               <span className="text-purple-200 font-medium">Sacred Services</span>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
//               Discover Your
//               <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
//                 Cosmic Potential
//               </span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
//               Ancient wisdom meets modern insight. Transform your life with personalized spiritual guidance that has helped thousands achieve their dreams.
//             </p>

//             {/* Trust Indicators */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//               {trustIndicators.map((indicator, index) => (
//                 <div key={index} className="text-center">
//                   <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl">
//                     <indicator.icon className="w-8 h-8 text-yellow-400" />
//                   </div>
//                   <div className="text-2xl font-bold text-white mb-1">{indicator.value}</div>
//                   <div className="text-sm text-gray-400">{indicator.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="px-6 md:px-24 pb-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {services.map((service, index) => {
//               const IconComponent = service.icon;
//               return (
//                 <div
//                   key={index}
//                   className={`group relative overflow-hidden rounded-3xl border ${service.borderColor} ${service.bgColor} backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
//                   onMouseEnter={() => setActiveService(index)}
//                   onMouseLeave={() => setActiveService(null)}
//                 >
//                   {/* Popularity Badge */}
//                   {service.popularity && (
//                     <div className="absolute top-6 right-6 z-10">
//                       <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                         {service.popularity}
//                       </div>
//                     </div>
//                   )}

//                   {/* Service Content */}
//                   <div className="p-8">
//                     <div className="flex items-start gap-6 mb-6">
//                       <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}>
//                         <IconComponent className="w-8 h-8 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
//                           {service.title}
//                         </h3>
//                         <p className="text-gray-600 font-medium mb-3">
//                           {service.subtitle}
//                         </p>
//                         <div className="flex items-center gap-4 text-sm text-gray-500">
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-4 h-4" />
//                             {service.duration}
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Users className="w-4 h-4" />
//                             {service.clientsServed.toLocaleString()}+ clients
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Star className="w-4 h-4 text-yellow-500" />
//                             {service.trustScore}% success
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <p className="text-gray-700 mb-6 leading-relaxed">
//                       {service.description}
//                     </p>

//                     {/* Features & Benefits */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                       <div>
//                         <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                           <Zap className="w-4 h-4 text-blue-500" />
//                           What You'll Get
//                         </h4>
//                         <ul className="space-y-2">
//                           {service.features.map((feature, idx) => (
//                             <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
//                               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
//                               {feature}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                           <Target className="w-4 h-4 text-green-500" />
//                           Expected Results
//                         </h4>
//                         <ul className="space-y-2">
//                           {service.benefits.map((benefit, idx) => (
//                             <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
//                               <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                               {benefit}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>

//                     {/* Price & CTA */}
//                     <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                       <div>
//                         <div className="text-3xl font-bold text-gray-800">₹{service.price.toLocaleString()}</div>
//                         <div className="text-sm text-gray-500">One-time consultation</div>
//                       </div>
//                       <InteractiveHoverButton
//                         onClick={() => setModalOpen(true)}
//                         className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                         text="Book Consultation"
//                       />
//                     </div>
//                   </div>

//                   {/* Hover Effect */}
//                   <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="px-6 md:px-24 py-20 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
//               Trusted by Successful Leaders
//             </h2>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               See how our services have transformed lives and businesses across India
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-200 mb-6 leading-relaxed">
//                   "{testimonial.text}"
//                 </p>
//                 <div>
//                   <div className="font-semibold text-white">{testimonial.name}</div>
//                   <div className="text-sm text-gray-400">{testimonial.role}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="px-6 md:px-24 py-20">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12">
//             <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
//             <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
//               Ready to Transform Your Life?
//             </h2>
//             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//               Join thousands of successful individuals who have discovered their true potential through our sacred services.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//         <InteractiveHoverButton 
//           onClick={() => setModalOpen(true)} 
//                 className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
//                 text="Start Your Journey"
//         />
//               <Link to="/">
//           <InteractiveHoverButton 
//                   className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 text-lg"
//                   text="Learn More"
//           />
//         </Link>
//       </div>
//           </div>
//         </div>
//       </section>

//       <ContactModal open={isModalOpen} onClose={() => setModalOpen(false)} />
//       <Footer />
//     </div>
//   );
// };

// export default Services; 