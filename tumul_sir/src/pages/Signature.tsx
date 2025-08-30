import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Moon, Calendar, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ContactModal from "@/components/ContactModal";
import CelestialOrbit from "@/components/CelestialOrbit";
import { useState } from "react";

const Signature = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const features = [
    "Personality Assessment",
    "Signature Optimization",
    "Success Enhancement",
    "Character Analysis",
    "Professional Branding",
    "Personal Development"
  ];

  const benefits = [
    "Understand your personality traits through signature analysis",
    "Optimize your signature for success and prosperity",
    "Enhance your personal and professional image",
    "Improve your business relationships and networking",
    "Align your signature with your life goals",
    "Create a signature that reflects your true potential"
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
            <span className="text-gray-900 font-medium">Signature Analysis</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Celestial Orbit with Signature */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-1">
              <CelestialOrbit 
                centralImage="/Signature.png"
                centralAlt="Signature Analysis"
              />
            </div>

            {/* Content */}
            <div className="space-y-6 order-2 lg:order-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Signature Analysis
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Expert Signature Analysis & Optimization Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Understand personality traits and optimize signatures for success and prosperity. Our signature analysis helps you enhance your personal brand and achieve greater success.
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Your Signature Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive signature analysis covering all aspects of your personality and success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
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
                Why Choose Signature Analysis?
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

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Optimize Your Signature?</h3>
              <p className="text-gray-600 mb-6">
                Book your personalized Signature Analysis consultation and discover the power of your signature.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
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

export default Signature;