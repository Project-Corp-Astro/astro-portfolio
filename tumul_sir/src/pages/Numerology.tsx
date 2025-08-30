import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calculator, Calendar, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";

const Numerology = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const features = [
    "Life Path Number Analysis",
    "Business Name Numerology",
    "Personal Name Optimization",
    "Lucky Number Identification",
    "Destiny Number Calculation",
    "Name Vibration Enhancement"
  ];

  const benefits = [
    "Optimize your business name for maximum success",
    "Discover your life path and destiny numbers",
    "Enhance personal and professional relationships",
    "Choose auspicious dates for important decisions",
    "Align your name with your life purpose",
    "Unlock hidden potential through number vibrations"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-24 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Numerology & Nameology</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Numerology & Nameology
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Expert Numerology & Name Analysis Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Harness the power of numbers and names to optimize business success and personal growth. Discover your Life Path and understand how your name shapes your destiny and success.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Book Consultation →
                </button>
                <button className="px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Illustrative Graphic */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Main circular background */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center shadow-lg">
                  {/* Number pattern */}
                  <div className="relative w-64 h-64">
                    <div className="absolute top-4 left-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                    <div className="absolute top-12 right-12 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                    <div className="absolute bottom-8 left-16 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">5</div>
                    <div className="absolute bottom-16 right-8 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">7</div>
                    <div className="absolute top-1/2 left-4 w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold text-lg">9</div>
                    <div className="absolute top-1/2 right-4 w-8 h-8 bg-cyan-300 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                    
                    {/* Central calculator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Calculator className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Your Numerology Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive number analysis covering all aspects of your life and business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Numerology & Nameology?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Numbers?</h3>
              <p className="text-gray-600 mb-6">
                Book your personalized Numerology consultation and unlock the power of numbers in your life.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Schedule Your Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Contact Modal */}
      <ContactModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Numerology;