import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OrderSummary from "@/components/checkout/OrderSummary";
import { getServiceById } from "@/lib/services";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const serviceId = params.get("service") || "vedic-astrology";
  const svc = getServiceById(serviceId);

  const proceed = () => {
    navigate(`/checkout?service=${serviceId}`);
  };

  if (!svc) return <div className="container mx-auto p-6">Invalid service.</div>;

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-24 grid md:grid-cols-[1fr,320px] gap-4 md:gap-6">
        <div className="bg-white/80 border border-orange/20 rounded-xl p-4 md:p-6">
          <h1 className="text-2xl font-serif font-bold mb-3">Your Cart</h1>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="font-semibold">{svc.name}</div>
              <div className="text-sm text-gray-600">Single session</div>
            </div>
            <div className="text-lg font-bold">₹{svc.fullPrice.toLocaleString("en-IN")}</div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:justify-end gap-2">
            <button onClick={proceed} className="w-full md:w-auto px-4 py-2 bg-orange text-white rounded-md hover:bg-orange/90">Proceed to Checkout</button>
          </div>
        </div>

        <div className="md:sticky md:top-6">
          <OrderSummary serviceName={svc.name} priceInr={svc.fullPrice} />
        </div>
      </div>
    </section>
  );
};

export default Cart;


