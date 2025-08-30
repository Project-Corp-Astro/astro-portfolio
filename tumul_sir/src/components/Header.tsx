import { YellowMetallicButton } from "@/components/ui/yellow-metallic-button";
import { Star, Menu, X, ChevronDown, Calculator, Sun, Moon, Eye, Brain, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const services = [
    {
      category: "Core Astrology Services",
      items: [
        { name: "Vedic Astrology Consultation", icon: Star, path: "/vedic-astrology" },
        { name: "Numerology & Nameology", icon: Calculator, path: "/numerology-nameology" },
        { name: "Palmistry & Hand Reading", icon: Eye, path: "/palmistry-hand-reading" }
      ]
    },
    {
      category: "Business & Spiritual Solutions",
      items: [
        { name: "Commercial Vaastu", icon: Sun, path: "/commercial-vaastu" },
        { name: "Business Success Coaching", icon: TrendingUp, path: "/business-success-coaching" },
        { name: "Mind & Meditation Guidance", icon: Brain, path: "/mind-meditation-guidance" }
      ]
    },
    {
      category: "Personal Development",
      items: [
        { name: "Signature Analysis", icon: Moon, path: "/signature-analysis" },
        { name: "Energy Healing & Chakra Balancing", icon: Zap, path: "/energy-healing-chakra" }
      ]
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const closeServicesDropdown = () => {
    setIsServicesDropdownOpen(false);
  };

  const toggleMobileServices = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  const handleMenuButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    toggleMenu();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        const menuButton = target.closest('.menu-button');
        const mobileMenu = target.closest('.mobile-menu');
        
        // Don't close if clicking on menu button or inside menu
        if (!menuButton && !mobileMenu) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesDropdownOpen) {
        const target = event.target as Element;
        const servicesButton = target.closest('.services-dropdown');
        
        if (!servicesButton) {
          setIsServicesDropdownOpen(false);
        }
      }
    };

    if (isServicesDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isServicesDropdownOpen]);

  return (
    <header className="fixed left-1/2 top-0 z-50 flex justify-center pointer-events-none -translate-x-1/2 w-full mx-auto">
      <nav className="pointer-events-auto glassmorphism-nav w-full rounded-none px-6 md:px-24 py-2 flex items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center space-x-3">
          <img
            src="/corpastro.png"
            alt="Corp Astro Logo"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-orange shadow"
          />
          <div>
            <h1 className="md:text-subheading text-lavender-dark font-bold">Business Astrologer</h1>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-body-warm text-nav-link md:text-body font-medium text-brown hover:text-black transition-colors cursor-pointer"
          >
            About
          </button>
          
          {/* Services Dropdown */}
          <div className="relative services-dropdown">
            <button 
              onClick={toggleServicesDropdown}
              className="text-body-warm text-nav-link md:text-body font-medium text-brown hover:text-black transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isServicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-orange/20 py-6 z-50">
                {services.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-6 last:mb-0">
                    <h3 className="px-6 py-3 text-xs font-bold text-lavender-dark uppercase tracking-wider bg-orange/10 rounded-lg mx-4 mb-3">
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 px-4">
                      {category.items.map((service, serviceIndex) => {
                        const IconComponent = service.icon;
                        return (
                          <Link
                            key={serviceIndex}
                            to={service.path}
                            onClick={closeServicesDropdown}
                            className="flex items-center space-x-3 p-3 hover:bg-orange/5 transition-all duration-200 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-3 h-3 text-orange" />
                            </div>
                            <span className="text-brown font-medium text-xs leading-tight">{service.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-body-warm text-nav-link md:text-body font-medium text-brown hover:text-black transition-colors cursor-pointer"
          >
            Testimonials
          </button>
          <button 
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-body-warm text-nav-link md:text-body font-medium text-brown hover:text-black transition-colors cursor-pointer"
          >
            Contact
          </button>
          <Link to="/knowmore" className="text-body-warm text-nav-link md:text-body font-medium text-brown hover:text-black transition-colors">Know More</Link>
          <Link to="/" className="text-body-warm text-nav-link md:text-body font-medium text-brown hover:text-black transition-colors">Home</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleMenuButtonClick}
          className="menu-button md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
          aria-label="Toggle menu"
          type="button"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-brown" />
          ) : (
            <Menu className="w-6 h-6 text-brown" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden fixed top-20 left-0 right-0 z-[60] glassmorphism-nav rounded-lg mx-2 py-4 px-6 shadow-2xl pointer-events-auto">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                closeMenu();
              }}
              className="text-body-warm text-nav-link font-medium text-brown hover:text-black transition-colors py-2 touch-manipulation cursor-pointer text-left w-full"
            >
              About
            </button>
            
            {/* Mobile Services Section */}
            <div className="space-y-2">
              <button
                onClick={toggleMobileServices}
                className="flex items-center justify-between w-full text-body-warm text-nav-link font-semibold text-brown py-2 touch-manipulation cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMobileServicesOpen && (
                <div className="ml-4 space-y-4">
                  {services.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-2">
                      <div className="text-sm font-medium text-gray-600 py-1">{category.category}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {category.items.map((service, serviceIndex) => {
                          const IconComponent = service.icon;
                          return (
                            <Link
                              key={serviceIndex}
                              to={service.path}
                              onClick={closeMenu}
                              className="flex items-center space-x-2 text-body-warm text-nav-link font-medium text-brown hover:text-black transition-colors py-2 px-3 touch-manipulation bg-white/50 rounded-lg border border-gray-200"
                            >
                              <IconComponent className="w-4 h-4 flex-shrink-0" />
                              <span className="text-xs leading-tight">{service.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => {
                document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                closeMenu();
              }}
              className="text-body-warm text-nav-link font-medium text-brown hover:text-black transition-colors py-2 touch-manipulation cursor-pointer text-left w-full"
            >
              Testimonials
            </button>
            <Link 
              to="/knowmore" 
              className="text-body-warm text-nav-link font-medium text-brown hover:text-black transition-colors py-2 touch-manipulation"
              onClick={closeMenu}
            >
              Know More
            </Link>
            <Link 
              to="/" 
              className="text-body-warm text-nav-link font-medium text-brown hover:text-black transition-colors py-2 touch-manipulation"
              onClick={closeMenu}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
