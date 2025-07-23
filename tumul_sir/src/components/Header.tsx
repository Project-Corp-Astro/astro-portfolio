import { YellowMetallicButton } from "@/components/ui/yellow-metallic-button";
import { Star, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed left-1/2 top-6 z-50 flex justify-center pointer-events-none -translate-x-1/2 w-full mx-auto">
      <nav className="pointer-events-auto glassmorphism-nav w-[98vw] md:w-[90vw] rounded-none md:rounded-full px-2 md:px-6 py-3 flex items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center space-x-3">
          <img
            src="/corpastro.png"
            alt="Corp Astro Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-orange shadow"
          />
          <div>
            <h1 className="text-xl font-serif font-semibold text-orange">Corp Astro</h1>
            <p className="text-xs text-brown/80">Dr. Tumul Raathi</p>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-bold text-brown hover:text-black transition-colors">Home</Link>
          {/* <Link to="/about" className="font-bold text-brown hover:text-black transition-colors">About</Link> */}
          <Link to="/services" className="font-bold text-brown hover:text-black transition-colors">Services</Link>
          <Link to="/knowmore" className="font-bold text-brown hover:text-black transition-colors">Know More</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
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
        <div className="md:hidden fixed top-20 left-0 right-0 z-[60] glassmorphism-nav rounded-lg mx-2 py-4 px-6 shadow-2xl pointer-events-auto">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-bold text-brown hover:text-black transition-colors py-2 touch-manipulation"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="font-bold text-brown hover:text-black transition-colors py-2 touch-manipulation"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link 
              to="/knowmore" 
              className="font-bold text-brown hover:text-black transition-colors py-2 touch-manipulation"
              onClick={closeMenu}
            >
              Know More
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
