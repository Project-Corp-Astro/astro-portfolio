
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = (path: string) => {
    navigate(path, {
      state: { background: location },
    });
  };
  return (
  <footer className="bg-cosmic-brown text-foreground py-8 md:py-12 typography-style-3">
      <div className="container mx-auto px-6 md:px-24">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-8 items-center md:items-start text-center md:text-left">
          <div className="md:col-span-2 w-full flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div>
                {/* <h3 className="text-lg md:text-xl font-serif font-semibold text-orange">Corp Astro</h3> */}
                <h3 className="text-lg md:text-lg text-lavender-dark/90">Dr. Tumul Raathi - Business Astrologer</h3>
              </div>
            </div>
            <p className="text-body-warm/95 mb-4 max-w-md mx-auto md:mx-0 text-sm text-semibold md:text-base leading-relaxed">
              Bridging ancient Vedic wisdom with modern business success through scientific
              and practical astrological consultation.
            </p>
            <div className="text-body-warm text-lg md:text-sm text-black/85 space-y-1">
              <a
                href="https://maps.google.com/?q=502, Lalithanjali Apartment, Dwarakapuri Colony, Punjagutta, Hyderabad, Telangana - 500082"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange transition-colors underline"
              >
                502, Lalithanjali Apartment, Dwarakapuri Colony<br />
                Punjagutta, Hyderabad, Telangana - 500082
              </a>
              <div className="w-full flex justify-center mt-3">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-xs aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0430084249097!2d78.44900937498613!3d17.424071683469325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9726e1281c53%3A0xcfa46f2e2164293c!2sCorp%20Astro!5e1!3m2!1sen!2sin!4v1754840200479!5m2!1sen!2sin"
                    width="100%"
                    height="180"
                    style={{ border: 0, borderRadius: '0.5rem', width: '100%' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Corp Astro Location"
                  ></iframe>
                </div>
              </div>
              <p>© 2025 Corp Astro. All rights reserved.</p>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0 w-full flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-3 md:mb-4 text-lavender-dark text-base md:text-lg">Services</h4>
            <ul className="space-y-2 text-sm md:text-base text-foreground/90">
              <li><Link to="/services" className="text-body-warm font-bold hover:text-orange transition-colors">All Services</Link></li>
            </ul>
          </div>
          
          <div className="mt-8 md:mt-0 w-full flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-3 md:mb-4 text-lavender-dark text-base md:text-lg">Connect</h4>
            <ul className="text-body-warm font-bold space-y-2 text-sm md:text-base text-foreground/90">
              <li><a href="tel:+919346035354" className="hover:text-orange hover:underline transition-colors">Phone: +91 93460 35354</a></li>
              <li><a href="mailto:consult@corpastro.com" className="hover:text-orange hover:underline transition-colors">consult@corpastro.com</a></li>
              <li><a href="#about" className="hover:text-orange hover:underline transition-colors">About Dr. Raathi</a></li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-orange hover:underline transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-orange hover:underline transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-orange hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="https://instagram.com/corpastro" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange transition-colors text-xl">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/in/drtumulraathi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange transition-colors text-xl">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com/@corpastro" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-orange transition-colors text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        
  <div className="border-t border-orange/30 pt-6 md:pt-8 mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-between text-xs md:text-sm text-foreground/85 gap-2 text-center">
          <p>Designed with cosmic intention • Built for transformation</p>
          <p className="opacity-80">&copy; 2025 Corp Astro</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
