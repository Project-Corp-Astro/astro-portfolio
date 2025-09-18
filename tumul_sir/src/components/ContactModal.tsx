import React, { useEffect, useState } from "react";
import ContactWizard from "./ContactWizard";
import ContactForm from "./ContactForm";
const WIZARD_ENABLED = import.meta.env.VITE_CONTACT_WIZARD_ENABLED === 'true';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const [show, setShow] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setShow(true);
      setTimeout(() => setVisible(true), 10); // allow for transition
    } else {
      setVisible(false);
      // Wait for fade-out before unmounting
      const timeout = setTimeout(() => setShow(false), 600); // 600ms for slower fade
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!show) return null;

  return (
    <>
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-600 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-label="Close Modal Backdrop"
      >
        <div
          className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform transition-all duration-600 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ pointerEvents: visible ? 'auto' : 'none' }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-orange font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="p-8">
            <h2 className="text-2xl font-serif font-bold text-center mb-4 text-lavender-dark">Book Your Consultation</h2>
            <p className="text-center text-lavender-dark/70 mb-6">Take the first step towards cosmic business alignment</p>
            {WIZARD_ENABLED ? <ContactWizard /> : <ContactForm />} 
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal; 