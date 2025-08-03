import React from "react";
import { createPortal } from "react-dom";

const TermsModal = ({ open, onAccept, onClose }) => {
  const [checked, setChecked] = React.useState(false);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-orange/30">
        <h2 className="text-2xl font-serif font-bold text-orange mb-4 text-center">How We Work Together</h2>
        <div className="mb-6 max-h-64 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-4 px-1">
          <p>
            We're excited to work with you! Before we begin your consultation with <span className="font-semibold text-orange">Dr. Tumul Raathi</span>, here's what you can expect:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Your Privacy Matters:</span> Everything you share with us stays completely private. We use your information only to provide you with the best astrological, numerological, vaastu, or signature analysis guidance.
            </li>
            <li>
              <span className="font-semibold">What We Do:</span> We're here to guide and support you in making better decisions for your business and personal life. Think of us as your trusted advisors - but remember, we're not lawyers, doctors, or financial planners, so please consult those professionals for their specific expertise.
            </li>
            <li>
              <span className="font-semibold">Scheduling Flexibility:</span> We know life happens! If you need to change or cancel your appointment, just let us know at least 24 hours ahead at <span className="underline">consult@corpastro.com</span>. We'll be happy to reschedule.
            </li>
            <li>
              <span className="font-semibold">Payment & Refunds:</span> We'll discuss all payment details and our refund policy with you before your session begins, so there are no surprises.
            </li>
            <li>
              <span className="font-semibold">We're Here for You:</span> Questions? Concerns? Just reach out! Email us at <span className="underline">consult@corpastro.com</span> or call <span className="underline">+91 93460 35354</span>. We love hearing from you.
            </li>
            <li>
              <span className="font-semibold">Your Agreement:</span> By continuing, you're saying it's okay for us to collect and use your information as we've described here and in our privacy policy.
            </li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">Dr. Tumul Raathi, 502, Lalithanjali Apartment, 6-3-347/11, Dwarakapuri Colony, Punjagutta, Hyderabad, Telangana, India - 500082</p>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="accept"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            className="mr-2 accent-orange"
          />
          <label htmlFor="accept" className="text-sm">I understand and agree to these terms</label>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold">Cancel</button>
          <button
            onClick={() => { if (checked) onAccept(); }}
            className={`px-4 py-2 rounded bg-orange text-white font-bold ${!checked ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!checked}
          >
            Accept & Submit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TermsModal; 