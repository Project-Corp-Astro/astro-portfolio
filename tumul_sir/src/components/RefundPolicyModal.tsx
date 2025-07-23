import React from "react";
import { createPortal } from "react-dom";

const RefundPolicyModal = ({ open, onAccept, onClose }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (!open) setChecked(false);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-orange/30">
        <h2 className="text-2xl font-serif font-bold text-orange mb-4 text-center">Refund Policy for Business Astrology Consultation</h2>
        <div className="mb-6 max-h-64 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-4 px-1">
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>General Policy</strong>
              <ul className="list-disc pl-6">
                <li>Refunds are not guaranteed unless explicitly stated at the time of booking or if the consultation is canceled by the astrologer before delivery.</li>
                <li>All refund requests are evaluated on a case-by-case basis, subject to the conditions below.</li>
              </ul>
            </li>
            <li>
              <strong>Cancellation by the Astrologer</strong>
              <ul className="list-disc pl-6">
                <li>If the astrologer cancels a scheduled consultation for any reason (e.g., unforeseen circumstances, scheduling conflicts), clients are entitled to a full refund of any fees paid.</li>
                <li>Alternatively, clients may choose to reschedule the consultation at no additional cost, subject to availability.</li>
              </ul>
            </li>
            <li>
              <strong>Cancellation by the Client</strong>
              <ul className="list-disc pl-6">
                <li>Clients may cancel a booked consultation before it begins. Refunds are subject to the following:</li>
                <li>Cancellations made at least 48 hours before the scheduled consultation may be eligible for a full refund, less any processing fees (if applicable).</li>
                <li>Cancellations within 48 hours of the scheduled consultation may not be eligible for a refund, at the astrologer’s discretion.</li>
                <li>To request a cancellation, contact the astrologer via the designated platform (e.g., this chat or specified email) with your booking details.</li>
              </ul>
            </li>
            <li>
              <strong>Non-Delivery or Incomplete Services</strong>
              <ul className="list-disc pl-6">
                <li>If the astrologer fails to deliver the consultation as agreed (e.g., no response within the promised timeframe), clients may request a full refund.</li>
                <li>Partial refunds may be considered if the consultation is partially delivered but does not meet the agreed scope, at the astrologer’s discretion.</li>
              </ul>
            </li>
            <li>
              <strong>Unsatisfactory Readings</strong>
              <ul className="list-disc pl-6">
                <li>Due to the interpretive nature of astrology, refunds are not provided for dissatisfaction with the content or outcome of a reading (e.g., if the predicted timeline or advice does not align with expectations).</li>
                <li>Clients are encouraged to ask clarifying questions during the consultation to ensure understanding and value.</li>
              </ul>
            </li>
            <li>
              <strong>Free Consultations</strong>
              <ul className="list-disc pl-6">
                <li>For consultations provided at no cost (e.g., via platforms with usage quotas), no refunds apply, as no payment is involved.</li>
                <li>Usage limits are governed by the platform’s policies (e.g., free plan quotas on grok.com or x.com).</li>
              </ul>
            </li>
            <li>
              <strong>Processing Refunds</strong>
              <ul className="list-disc pl-6">
                <li>Approved refunds will be processed within 7–10 business days, using the original payment method, unless otherwise agreed.</li>
                <li>Any processing fees (e.g., bank or platform charges) may be deducted from the refund amount.</li>
              </ul>
            </li>
            <li>
              <strong>How to Request a Refund</strong>
              <ul className="list-disc pl-6">
                <li>Submit a refund request via the designated contact method (e.g., this platform or specified email) with:</li>
                <li>Your name and booking details.</li>
                <li>Reason for the refund request.</li>
                <li>Proof of payment (if applicable).</li>
                <li>The astrologer will review the request and respond within 48–72 hours.</li>
              </ul>
            </li>
            <li>
              <strong>Disputes</strong>
              <ul className="list-disc pl-6">
                <li>If a client believes a refund was unfairly denied, they may escalate the issue by contacting the platform’s support team (e.g., https://x.ai/grok for platform-related issues).</li>
                <li>The astrologer’s decision on refunds is final, subject to platform policies.</li>
              </ul>
            </li>
          </ol>
        </div>
        {onAccept ? (
          <>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="acceptRefund"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                className="mr-2 accent-orange"
              />
              <label htmlFor="acceptRefund" className="text-sm">I accept the refund policy</label>
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
          </>
        ) : (
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold">Close</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default RefundPolicyModal; 