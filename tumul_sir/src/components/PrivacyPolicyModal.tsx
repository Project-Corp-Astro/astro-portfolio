import React from "react";
import { createPortal } from "react-dom";

const PrivacyPolicyModal = ({ open, onClose }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full mx-4 shadow-2xl border border-orange/30">
        <h2 className="text-xl md:text-2xl font-serif font-bold text-orange mb-4 text-center">How We Protect Your Privacy</h2>
        <div className="mb-6 max-h-64 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-4 px-1">
          <p className="mb-4">
            Your privacy is important to us. Here's how we take care of your information when you visit our website and use our services:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Our Promise to You</strong>
              <p className="text-xs mt-1">Dr. Tumul Raathi and our team are committed to keeping your information safe and private. This policy explains how we collect, use, and protect your data when you visit our astrology consultation website.</p>
            </li>
            <li>
              <strong>What Information We Collect</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li><strong>Personal Details:</strong> Your name, contact information, birth date, astrological details, company name, and consultation preferences</li>
                <li><strong>Technical Info:</strong> Your device information, how you use our website, and conversations with our chatbot</li>
              </ul>
            </li>
            <li>
              <strong>How We Use Your Information</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li>To provide you with personalized astrology consultations</li>
                <li>To manage your bookings and appointments</li>
                <li>To send you important updates and confirmations</li>
                <li>To improve our services and make your experience better</li>
                <li>To respond to your questions and help you when needed</li>
                <li>To keep our website secure and protect against fraud</li>
                <li>To follow legal requirements</li>
              </ul>
            </li>
            <li>
              <strong>We Keep Your Information Private</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li>We never sell, trade, or rent your personal information to anyone</li>
                <li>We only share information with trusted service providers who help us run our business (like payment processors and email services)</li>
                <li>We may share information if required by law or to protect everyone's safety</li>
                <li>We'll only share your information with others if you specifically give us permission</li>
              </ul>
            </li>
            <li>
              <strong>Keeping Your Data Safe</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li>We use encryption to protect your data when it's being sent to us</li>
                <li>Your information is stored on secure servers</li>
                <li>We regularly check and update our security measures</li>
                <li>Only authorized team members can access your personal information</li>
                <li>Our team is trained on how to protect your privacy</li>
              </ul>
            </li>
            <li>
              <strong>How Long We Keep Your Information</strong>
              <p className="text-xs mt-1">We only keep your information for as long as we need it to serve you, follow the law, or resolve any issues. We typically keep consultation records for 7 years for professional and legal purposes.</p>
            </li>
            <li>
              <strong>Your Rights and Choices</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li><strong>Access:</strong> You can ask us for a copy of your information</li>
                <li><strong>Update:</strong> You can correct any information that's not accurate</li>
                <li><strong>Delete:</strong> You can ask us to delete your information</li>
                <li><strong>Portable:</strong> You can get your data in a format you can use elsewhere</li>
                <li><strong>Object:</strong> You can tell us if you don't want us to use your information in certain ways</li>
                <li><strong>Withdraw:</strong> You can change your mind about giving us permission at any time</li>
              </ul>
            </li>
            <li>
              <strong>Cookies and Website Tracking</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li><strong>Essential Cookies:</strong> These help our website work properly</li>
                <li><strong>Analytics Cookies:</strong> These help us understand how people use our website</li>
                <li><strong>Preference Cookies:</strong> These remember your settings and choices</li>
                <li><strong>Marketing Cookies:</strong> These help us show you relevant content</li>
              </ul>
            </li>
            <li>
              <strong>Services We Use</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li><strong>Payment Processing:</strong> Stripe and Razorpay for secure payments</li>
                <li><strong>Email Services:</strong> For sending you confirmations and updates</li>
                <li><strong>Website Analytics:</strong> Google Analytics to understand how our website is used</li>
                <li><strong>Chatbot:</strong> OpenAI to provide our chatbot service</li>
              </ul>
            </li>
            <li>
              <strong>Protecting Children</strong>
              <p className="text-xs mt-1">Our services are for adults 18 and older. We don't knowingly collect information from children under 18. If you think we might have information from someone under 18, please contact us right away.</p>
            </li>
            <li>
              <strong>International Data</strong>
              <p className="text-xs mt-1">Your information might be processed in countries other than your own. We make sure it's protected according to this policy and local laws.</p>
            </li>
            <li>
              <strong>Updates to This Policy</strong>
              <p className="text-xs mt-1">We might update this policy from time to time. If we make important changes, we'll let you know by posting the new policy on our website. Using our services after changes means you accept the updated policy.</p>
            </li>
            <li>
              <strong>Get in Touch</strong>
              <ul className="list-disc pl-6 text-xs mt-1">
                <li>Dr. Tumul Raathi</li>
                <li>Email: consult@corpastro.com</li>
                <li>Phone: +91 93460 35354</li>
                <li>Address: 502, Lalithanjali Apartment, 6-3-347/11, Dwarakapuri Colony, Punjagutta, Hyderabad, Telangana, India - 500082</li>
              </ul>
            </li>
          </ol>
          <p className="mt-4 text-xs text-gray-500">Dr. Tumul Raathi, 502, Lalithanjali Apartment, 6-3-347/11, Dwarakapuri Colony, Punjagutta, Hyderabad, Telangana, India - 500082</p>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold">Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PrivacyPolicyModal; 