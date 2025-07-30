import React from "react";
import { createPortal } from "react-dom";

const PrivacyPolicyModal = ({ open, onClose }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full mx-4 shadow-2xl border border-orange/30">
        <h2 className="text-xl md:text-2xl font-serif font-bold text-orange mb-4 text-center">Privacy Policy</h2>
        <div className="mb-6 max-h-64 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-4 px-1">
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Introduction</strong>
              <p className="text-xs">Dr. Tumul Raathi ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our astrology consultation website and use our services.</p>
            </li>
            <li>
              <strong>Information We Collect</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>Personal Information: Full name, contact details, date of birth, astrological information, company name, consultation preferences, booking information</li>
                <li>Technical Information: IP address, device information, browser type, website usage patterns, chatbot conversation data</li>
              </ul>
            </li>
            <li>
              <strong>How We Use Your Information</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>Provide astrology consultations and personalized services</li>
                <li>Process bookings and manage appointments</li>
                <li>Send confirmation emails and important updates</li>
                <li>Improve our services and user experience</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </li>
            <li>
              <strong>Information Sharing and Disclosure</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>We do not sell, trade, or rent your personal information to third parties</li>
                <li>We may share information with service providers for payment processing, email delivery, and website hosting</li>
                <li>We may share information when required by law or to protect our rights and safety</li>
                <li>We may share information with your explicit consent for specific purposes</li>
              </ul>
            </li>
            <li>
              <strong>Data Security</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>Encryption of sensitive data during transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Employee training on data protection</li>
              </ul>
            </li>
            <li>
              <strong>Data Retention</strong>
              <p className="text-xs">We retain your personal information only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Consultation records are typically retained for 7 years for professional and legal purposes.</p>
            </li>
            <li>
              <strong>Your Rights and Choices</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>Access: Request a copy of your personal information</li>
                <li>Correction: Update or correct inaccurate information</li>
                <li>Deletion: Request deletion of your personal information</li>
                <li>Portability: Receive your data in a portable format</li>
                <li>Objection: Object to certain processing activities</li>
                <li>Withdrawal: Withdraw consent at any time</li>
              </ul>
            </li>
            <li>
              <strong>Cookies and Tracking</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>Essential Cookies: Required for website functionality</li>
                <li>Analytics Cookies: Help us understand website usage</li>
                <li>Preference Cookies: Remember your settings and preferences</li>
                <li>Marketing Cookies: Provide relevant content and advertisements</li>
              </ul>
            </li>
            <li>
              <strong>Third-Party Services</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>Payment Processors: Stripe, Razorpay for secure payments</li>
                <li>Email Services: For sending confirmations and updates</li>
                <li>Analytics: Google Analytics for website insights</li>
                <li>Chat Services: OpenAI for chatbot functionality</li>
              </ul>
            </li>
            <li>
              <strong>Children's Privacy</strong>
              <p className="text-xs">Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.</p>
            </li>
            <li>
              <strong>International Data Transfers</strong>
              <p className="text-xs">Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.</p>
            </li>
            <li>
              <strong>Changes to This Policy</strong>
              <p className="text-xs">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.</p>
            </li>
            <li>
              <strong>Contact Information</strong>
              <ul className="list-disc pl-6 text-xs">
                <li>Dr. Tumul Raathi</li>
                <li>Email: privacy@tumulraathi.com</li>
                <li>Phone: +91-XXXXXXXXXX</li>
                <li>Address: [Your Business Address]</li>
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