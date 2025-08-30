import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sun, Calendar, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";

const Commercial = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const features = [
    "Office Layout Planning",
    "Energy Flow Optimization",
    "Prosperity Enhancement",
    "Business Space Analysis",
    "Directional Alignment",
    "Vibrational Balancing"
  ];

  const benefits = [
    "Optimize your business space for maximum prosperity",
    "Enhance positive energy flow in your workplace",
    "Improve customer attraction and retention",
    "Boost employee productivity and harmony",
    "Align your business with natural energies",
    "Create a harmonious and prosperous environment"
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
            <span className="text-gray-900 font-medium">Commercial Vaastu</span>
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
                Commercial Vaastu and Vibrations
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
                Expert Commercial Vaastu & Space Optimization Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Optimize your business space for maximum prosperity and positive energy flow. Our Commercial Vaastu solutions align your workplace with natural energies to attract growth and boost productivity.
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
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center shadow-lg">
                  {/* Sun rays pattern */}
                  <div className="relative w-64 h-64">
                    <div className="absolute top-2 left-8 w-6 h-6 bg-orange-500 rounded-full"></div>
                    <div className="absolute top-8 right-8 w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="absolute bottom-4 left-12 w-5 h-5 bg-orange-400 rounded-full"></div>
                    <div className="absolute bottom-12 right-4 w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="absolute top-1/2 left-2 w-4 h-4 bg-orange-300 rounded-full"></div>
                    <div className="absolute top-1/2 right-2 w-5 h-5 bg-yellow-300 rounded-full"></div>
                    
                    {/* Central sun */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                        <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                          <Sun className="w-8 h-8 text-white" />
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
              What's Included in Your Vaastu Analysis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive space analysis covering all aspects of your business environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
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
                Why Choose Commercial Vaastu?
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

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Optimize Your Space?</h3>
              <p className="text-gray-600 mb-6">
                Book your personalized Commercial Vaastu consultation and transform your business environment for prosperity.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
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

export default Commercial;