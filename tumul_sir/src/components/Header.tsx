import { YellowMetallicButton } from "@/components/ui/yellow-metallic-button";
import { Star, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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

  return (
    <header className="fixed left-1/2 top-0 z-50 flex justify-center pointer-events-none -translate-x-1/2 w-full mx-auto">
    {/* <header className="fixed left-1/2 top-6 z-50 flex justify-center pointer-events-none -translate-x-1/2 w-full mx-auto"> */}
      {/* <nav className="pointer-events-auto glassmorphism-nav w-[98vw] md:w-[90vw] rounded-none md:rounded-full px-2 md:px-6 py-3 flex items-center justify-between gap-4 md:gap-6"> */}
      <nav className="pointer-events-auto glassmorphism-nav w-full rounded-none px-6 md:px-24 py-2 flex items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center space-x-3">
          <img
            src="/corpastro.png"
            alt="Corp Astro Logo"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-orange shadow"
          />
          <div>
            {/* <h1 className="text-nav-heading md:text-heading text-orange font-semibold">Dr. Tumul Raathi</h1> */}
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
          <button 
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-body-warm text-nav-link md:text-body font-medium text-brown hover:text-black transition-colors cursor-pointer"
          >
            Services
          </button>
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
            <button 
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                closeMenu();
              }}
              className="text-body-warm text-nav-link font-medium text-brown hover:text-black transition-colors py-2 touch-manipulation cursor-pointer text-left w-full"
            >
              Services
            </button>
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
