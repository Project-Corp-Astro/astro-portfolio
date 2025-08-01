import React from 'react';
import { createPortal } from 'react-dom';

interface PaymentInfoModalProps {
  open: boolean;
  onClose: () => void;
  paymentInfo: any;
  onPayNow: () => void;
  onPayLater: () => void;
  loading: boolean;
}

const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({
  open,
  onClose,
  paymentInfo,
  onPayNow,
  onPayLater,
  loading
}) => {
  if (!open || !paymentInfo) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-orange/30 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">💰 Payment Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Service Details */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {paymentInfo.serviceName}
          </p>
          <p className="text-sm text-gray-600">
            Duration: {paymentInfo.duration}
          </p>
        </div>

        {/* Payment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Total Price</p>
            <p className="text-2xl font-bold text-orange-600">₹{paymentInfo.totalAmount}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Minimum Payment</p>
            <p className="text-xl font-bold text-green-600">₹{paymentInfo.minimumPayment}</p>
            <p className="text-xs text-gray-500">(25% to confirm)</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Remaining Amount</p>
            <p className="text-lg font-semibold text-blue-600">₹{paymentInfo.remainingAmount}</p>
            <p className="text-xs text-gray-500">(Pay anytime later)</p>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-6 p-3 bg-orange-50 rounded border border-orange-100">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">How it works:</span> Pay ₹{paymentInfo.minimumPayment} now to confirm your booking. 
            The remaining ₹{paymentInfo.remainingAmount} can be paid anytime before or after your consultation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onPayNow}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Processing..." : `�� Pay ₹${paymentInfo.minimumPayment}`}
          </button>
          <button
            onClick={onPayLater}
            disabled={loading}
            className="px-6 py-3 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Later"}
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> Your slot is reserved. Choose your preferred payment option above.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PaymentInfoModal;