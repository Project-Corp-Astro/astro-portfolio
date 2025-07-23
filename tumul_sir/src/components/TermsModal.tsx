import React from "react";
import { createPortal } from "react-dom";

const TermsModal = ({ open, onAccept, onClose }) => {
  const [checked, setChecked] = React.useState(false);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-orange/30">
        <h2 className="text-2xl font-serif font-bold text-orange mb-4 text-center">Terms & Conditions</h2>
        <div className="mb-6 max-h-64 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-4 px-1">
          <p>
            By booking a consultation with <span className="font-semibold text-orange">Dr. Tumul Raathi</span>, you agree to the following terms:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Confidentiality:</span> All information shared during your consultation will be kept strictly confidential and used solely for the purpose of providing astrological, numerological, vaastu, or signature analysis services.
            </li>
            <li>
              <span className="font-semibold">Consultation Purpose:</span> The advice and insights provided are intended to guide and empower you in your business and personal decisions. They are not a substitute for professional legal, medical, or financial advice.
            </li>
            <li>
              <span className="font-semibold">Booking & Cancellation:</span> Appointments are subject to availability. If you need to reschedule or cancel, please notify us at <span className="underline">consult@corpastro.com</span> at least 24 hours in advance.
            </li>
            <li>
              <span className="font-semibold">Payment & Refunds:</span> Payment details and refund policies will be communicated prior to your session, if applicable.
            </li>
            <li>
              <span className="font-semibold">Contact:</span> For any queries, you may reach us at <span className="underline">consult@corpastro.com</span> or call <span className="underline">+91 93460 35354</span>.
            </li>
            <li>
              <span className="font-semibold">Consent:</span> By proceeding, you consent to the collection and use of your information as described above and in our privacy policy.
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
          <label htmlFor="accept" className="text-sm">I accept the terms and conditions</label>
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