import { useNavigate } from "react-router-dom";
import { Modal } from "./ui/modal";

const RefundPolicyViewModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  if (open === false) return null;

  return (
    <Modal isOpen={open ?? true} onClose={handleClose} title="Our Refund Promise">
        <div className="mb-6 max-h-64 overflow-y-auto text-gray-800 text-sm leading-relaxed space-y-4 px-1">
          <p className="mb-4">
            We want you to feel completely comfortable booking with us. Here's how we handle refunds and cancellations:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Our General Approach</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>We believe in fair treatment for everyone. While we can't guarantee refunds in all situations, we'll always consider your request with care.</li>
                <li>Each situation is unique, so we review refund requests individually based on the circumstances.</li>
              </ul>
            </li>
            <li>
              <strong>If We Need to Cancel</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Life happens to us too! If we need to cancel your consultation for any reason, you'll get a full refund of what you paid.</li>
                <li>Or, if you prefer, we can reschedule your session at no extra cost - whatever works better for you.</li>
              </ul>
            </li>
            <li>
              <strong>If You Need to Cancel</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>We understand that plans change. Here's what you can expect:</li>
                <li>Cancel 48 hours or more before your session? You'll likely get a full refund (minus any small processing fees).</li>
                <li>Cancel within 48 hours? We'll review your situation and do our best to help, but we may not be able to offer a refund.</li>
                <li>Just reach out to us with your booking details, and we'll handle it together.</li>
              </ul>
            </li>
            <li>
              <strong>If Something Goes Wrong</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>If we don't deliver your consultation as promised, you're absolutely entitled to a full refund.</li>
                <li>If we only partially complete your session, we'll work with you to make it right - possibly with a partial refund.</li>
              </ul>
            </li>
            <li>
              <strong>About the Reading Itself</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Astrology is interpretive, so we can't offer refunds if the insights don't match your expectations. But we're here to help you understand everything!</li>
                <li>Feel free to ask questions during your session - we want you to get the most value from our time together.</li>
              </ul>
            </li>
            <li>
              <strong>Getting Your Money Back</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>If we approve your refund, you'll see it back in your account within 7-10 business days.</li>
                <li>We'll use the same payment method you used originally, and any small processing fees might be deducted.</li>
              </ul>
            </li>
            <li>
              <strong>How to Ask for a Refund</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Just reach out to us with:</li>
                <li>Your name and when you booked</li>
                <li>Why you're requesting a refund</li>
                <li>Your payment confirmation (if you have it)</li>
                <li>We'll get back to you within 2-3 days to let you know our decision.</li>
              </ul>
            </li>
          </ol>
          <p className="mt-4 text-xs text-gray-500">Dr. Tumul Raathi, 502, Lalithanjali Apartment, 6-3-347/11, Dwarakapuri Colony, Punjagutta, Hyderabad, Telangana, India - 500082</p>
        </div>
    </Modal>
  );
};

export default RefundPolicyViewModal;