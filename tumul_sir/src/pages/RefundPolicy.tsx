import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-orange hover:text-orange-dark transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-orange mb-4">
              Our Refund Promise
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We want you to feel completely comfortable booking with us. Here's how we handle refunds and cancellations.
            </p>
          </div>

          {/* Refund Policy Content */}
          <div className="space-y-8">
            <p className="text-lg mb-8 leading-relaxed text-gray-700">
              We want you to feel completely comfortable booking with us. Here's how we handle refunds and cancellations:
            </p>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Our General Approach
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>We believe in fair treatment for everyone. While we can't guarantee refunds in all situations, we'll always consider your request with care.</p>
                <p>Each situation is unique, so we review refund requests individually based on the circumstances.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                If We Need to Cancel
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>Life happens to us too! If we need to cancel your consultation for any reason, you'll get a full refund of what you paid.</p>
                <p>Or, if you prefer, we can reschedule your session at no extra cost - whatever works better for you.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                If You Need to Cancel
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>We understand that plans change. Here's what you can expect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancel 48 hours or more before your session? You'll likely get a full refund (minus any small processing fees).</li>
                  <li>Cancel within 48 hours? We'll review your situation and do our best to help, but we may not be able to offer a refund.</li>
                  <li>Just reach out to us with your booking details, and we'll handle it together.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                If Something Goes Wrong
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>If we don't deliver your consultation as promised, you're absolutely entitled to a full refund.</p>
                <p>If we only partially complete your session, we'll work with you to make it right - possibly with a partial refund.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                About the Reading Itself
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>Astrology is interpretive, so we can't offer refunds if the insights don't match your expectations. But we're here to help you understand everything!</p>
                <p>Feel free to ask questions during your session - we want you to get the most value from our time together.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                Getting Your Money Back
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>If we approve your refund, you'll see it back in your account within 7-10 business days.</p>
                <p>We'll use the same payment method you used originally, and any small processing fees might be deducted.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                How to Ask for a Refund
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>Just reach out to us with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your name and when you booked</li>
                  <li>Why you're requesting a refund</li>
                  <li>Your payment confirmation (if you have it)</li>
                </ul>
                <p>We'll get back to you within 2-3 days to let you know our decision.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
                If We Can't Agree
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>If you feel we've been unfair, you can contact the platform's support team for help.</p>
                <p>Our goal is always to find a solution that works for everyone.</p>
              </div>
            </section>

            {/* Contact Information */}
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
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-4 bg-orange text-white font-bold rounded-full hover:bg-orange-dark transition-colors shadow-lg hover:shadow-xl"
            >
              Ready to Book Your Consultation?
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RefundPolicy; 