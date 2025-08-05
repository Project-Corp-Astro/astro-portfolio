import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-orange hover:text-orange-dark transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div> */}

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-orange mb-4">
              How We Work Together
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're excited to work with you! Here's what you can expect when you book a consultation with Me.
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* <p className="text-lg mb-8 leading-relaxed text-gray-700">
              We're excited to work with you! Before we begin your consultation with <span className="font-semibold text-orange">Dr. Tumul Raathi</span>, here's what you can expect:
            </p> */}
            
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 justify-center">
                <span className="justify-center text-sm font-bold"></span>
                Your Privacy Matters
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                Everything you share with us stays completely private. We use your information only to provide you with the best astrological, numerological, vaastu, or signature analysis guidance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 justify-center">
                <span className="justify-center text-sm font-bold"></span>
                What We Do
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                We're here to guide and support you in making better decisions for your business and personal life. Think of us as your trusted advisors - but remember, we're not lawyers, doctors, or financial planners, so please consult those professionals for their specific expertise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 justify-center">
                <span className="justify-center text-sm font-bold"></span>
                Scheduling Flexibility
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                We know life happens! If you need to change or cancel your appointment, just let us know at least 24 hours ahead at <span className="text-orange font-semibold">consult@corpastro.com</span>. We'll be happy to reschedule.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 justify-center">
                <span className="justify-center text-sm font-bold"></span>
                Payment & Refunds
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                We'll discuss all payment details and our refund policy with you before your session begins, so there are no surprises.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 justify-center">
                <span className="justify-center text-sm font-bold"></span>
                We're Here for You
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                Questions? Concerns? Just reach out! Email us at <span className="text-orange font-semibold">consult@corpastro.com</span> or call <span className="text-orange font-semibold">+91 93460 35354</span>. We love hearing from you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 justify-center">
                <span className="justify-center text-sm font-bold"></span>
                Your Agreement
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                By continuing, you're saying it's okay for us to collect and use your information as we've described here and in our privacy policy.
              </p>
            </section>

            {/* Contact Information
            <div className="mt-12 p-6 bg-orange/10 rounded-xl border border-orange/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="text-gray-700 space-y-2">
                <p><strong>Dr. Tumul Raathi</strong></p>
                <p>502, Lalithanjali Apartment</p>
                <p>6-3-347/11, Dwarakapuri Colony</p>
                <p>Punjagutta, Hyderabad, Telangana, India - 500082</p>
                <p className="mt-3">
                  <strong>Email:</strong> <span className="text-orange">consult@corpastro.com</span>
                </p>
                <p>
                  <strong>Phone:</strong> <span className="text-orange">+91 93460 35354</span>
                </p>
              </div>
            </div> */}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-4 bg-orange text-white font-bold rounded-full hover:bg-orange-dark transition-colors shadow-lg hover:shadow-xl"
            >
              Ready to Get Started?
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions; 