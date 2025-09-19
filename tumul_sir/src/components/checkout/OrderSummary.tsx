import React from "react";

type Props = {
  serviceName: string;
  priceInr: number;
  date?: string;
  slot?: string;
  children?: React.ReactNode;
};

const OrderSummary: React.FC<Props> = ({ serviceName, priceInr, date, slot, children }) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 border border-orange/20 rounded-xl p-4 bg-white/80 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <span>Service</span>
          <span className="font-medium">{serviceName}</span>
        </div>
        {date && (
          <div className="flex items-center justify-between">
            <span>Date</span>
            <span className="font-medium">{date}</span>
          </div>
        )}
        {slot && (
          <div className="flex items-center justify-between">
            <span>Slot</span>
            <span className="font-medium">{slot}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-orange/20 mt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900 font-bold">₹{priceInr.toLocaleString("en-IN")}</span>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </aside>
  );
};

export default OrderSummary;


