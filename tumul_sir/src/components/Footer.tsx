
import { Link } from "react-router-dom";
import TermsViewModal from "./TermsViewModal";
import { useState } from "react";
import RefundPolicyViewModal from "./RefundPolicyViewModal";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <footer className="bg-cosmic-brown text-foreground py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-serif font-semibold text-orange">Corp Astro</h3>
                <p className="text-xs md:text-sm text-foreground/90">Dr. Tumul Raathi - Modern Vedic Astrologer</p>
              </div>
            </div>
            <p className="text-foreground/95 mb-4 max-w-md mx-auto md:mx-0 text-sm md:text-base leading-relaxed">
              Bridging ancient Vedic wisdom with modern business success through scientific 
              and practical astrological consultation.
            </p>
            <div className="text-xs md:text-sm text-foreground/85 space-y-1">
              <p>502, Lalithanjali Apartment, Dwarakapuri Colony</p>
              <p>Punjagutta, Hyderabad, Telangana - 500082</p>
              <p>© 2024 Corp Astro. All rights reserved.</p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 text-center md:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-orange text-base md:text-lg">Services</h4>
            <ul className="space-y-2 text-sm md:text-base text-foreground/90">
              <li><Link to="/services" className="hover:text-orange transition-colors">All Services</Link></li>
            </ul>
          </div>
          
          <div className="mt-6 md:mt-0 text-center md:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-orange text-base md:text-lg">Connect</h4>
            <ul className="space-y-2 text-sm md:text-base text-foreground/90">
              <li><a href="tel:+919346035354" className="hover:text-orange transition-colors">+91 93460 35354</a></li>
              <li><a href="mailto:consult@corpastro.com" className="hover:text-orange transition-colors">consult@corpastro.com</a></li>
              <li><a href="#about" className="hover:text-orange transition-colors">About Dr. Raathi</a></li>
              <li>
                <button
                  className="hover:text-orange transition-colors underline bg-transparent border-none p-0 cursor-pointer text-center md:text-left"
                  onClick={() => setShowTerms(true)}
                  type="button"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  className="hover:text-orange transition-colors underline bg-transparent border-none p-0 cursor-pointer text-center md:text-left"
                  onClick={() => setShowRefund(true)}
                  type="button"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  className="hover:text-orange transition-colors underline bg-transparent border-none p-0 cursor-pointer text-center md:text-left"
                  onClick={() => setShowPrivacy(true)}
                  type="button"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-orange/30 pt-6 md:pt-8 mt-6 md:mt-8 text-center text-xs md:text-sm text-foreground/85">
          <p>Designed with cosmic intention • Built for transformation</p>
        </div>
      </div>
      <TermsViewModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
      />
      <RefundPolicyViewModal
        open={showRefund}
        onClose={() => setShowRefund(false)}
      />
      <PrivacyPolicyModal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />
    </footer>
  );
};

export default Footer;
