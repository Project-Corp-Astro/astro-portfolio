import React from "react";
import { Modal } from "@/components/ui/modal";

type Props = { open: boolean; onClose: () => void; };

const ShippingPolicyModal: React.FC<Props> = ({ open, onClose }) => (
  <Modal isOpen={open} onClose={onClose} title="Shipping & Delivery Policy">
    <div className="space-y-3 text-sm text-gray-700">
      <p><strong>Digital Services:</strong> We do not ship physical products. Consultations are delivered via Zoom/Google Meet at the scheduled time.</p>
      <p><strong>Scheduling:</strong> Sessions are typically scheduled within 1–3 business days. If a specific date/time is requested, we do our best to accommodate.</p>
      <p><strong>Reports:</strong> If your service includes a written report, it will be delivered to your registered email within 3–5 business days after the session.</p>
      <p><strong>Contact:</strong> For changes or delays, email support@corpastro.com.</p>
    </div>
  </Modal>
);

export default ShippingPolicyModal;


