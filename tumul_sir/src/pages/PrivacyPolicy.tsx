import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
              How We Protect Your Privacy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Here's how we take care of your information when you visit our website and use our services.
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            {/* <p className="text-lg mb-8 leading-relaxed text-gray-700 justify-center">
              Your privacy is important to us. Here's how we take care of your information when you visit our website and use our services:
            </p> */}
            
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3 justify-center">
                <span className="rounded-full flex items-center justify-center text-sm font-bold"></span>
                Our Promise to You
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                Dr. Tumul Raathi and our team are committed to keeping your information safe and private. This policy explains how we collect, use, and protect your data when you visit our astrology consultation website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                What Information We Collect
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>Personal Details:</strong> Your name, contact information, birth date, astrological details, company name, and consultation preferences</p>
                <p><strong>Technical Info:</strong> Your device information, how you use our website, and conversations with our chatbot</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                How We Use Your Information
              </h2>
              <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                <li>To provide you with personalized astrology consultations</li>
                <li>To manage your bookings and appointments</li>
                <li>To send you important updates and confirmations</li>
                <li>To improve our services and make your experience better</li>
                <li>To respond to your questions and help you when needed</li>
                <li>To keep our website secure and protect against fraud</li>
                <li>To follow legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                We Keep Your Information Private
              </h2>
              <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                <li>We never sell, trade, or rent your personal information to anyone</li>
                <li>We only share information with trusted service providers who help us run our business (like payment processors and email services)</li>
                <li>We may share information if required by law or to protect everyone's safety</li>
                <li>We'll only share your information with others if you specifically give us permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                Keeping Your Data Safe
              </h2>
              <ul className="text-gray-700 leading-relaxed space-y-2 list-disc pl-6">
                <li>We use encryption to protect your data when it's being sent to us</li>
                <li>Your information is stored on secure servers</li>
                <li>We regularly check and update our security measures</li>
                <li>Only authorized team members can access your personal information</li>
                <li>Our team is trained on how to protect your privacy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                How Long We Keep Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We only keep your information for as long as we need it to serve you, follow the law, or resolve any issues. We typically keep consultation records for 7 years for professional and legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                Your Rights and Choices
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>Access:</strong> You can ask us for a copy of your information</p>
                <p><strong>Update:</strong> You can correct any information that's not accurate</p>
                <p><strong>Delete:</strong> You can ask us to delete your information</p>
                <p><strong>Portable:</strong> You can get your data in a format you can use elsewhere</p>
                <p><strong>Object:</strong> You can tell us if you don't want us to use your information in certain ways</p>
                <p><strong>Withdraw:</strong> You can change your mind about giving us permission at any time</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">8</span>
                Cookies and Website Tracking
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>Essential Cookies:</strong> These help our website work properly</p>
                <p><strong>Analytics Cookies:</strong> These help us understand how people use our website</p>
                <p><strong>Preference Cookies:</strong> These remember your settings and choices</p>
                <p><strong>Marketing Cookies:</strong> These help us show you relevant content</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">9</span>
                Services We Use
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>Payment Processing:</strong> Stripe and Razorpay for secure payments</p>
                <p><strong>Email Services:</strong> For sending you confirmations and updates</p>
                <p><strong>Website Analytics:</strong> Google Analytics to understand how our website is used</p>
                <p><strong>Chatbot:</strong> OpenAI to provide our chatbot service</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">10</span>
                Protecting Children
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are for adults 18 and older. We don't knowingly collect information from children under 18. If you think we might have information from someone under 18, please contact us right away.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">11</span>
                Updates to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We might update this policy from time to time. If we make important changes, we'll let you know by posting the new policy on our website. Using our services after changes means you accept the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <div className="mt-12 p-6 bg-orange/10 rounded-xl border border-orange/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h3>
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
              Ready to Start Your Journey?
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 