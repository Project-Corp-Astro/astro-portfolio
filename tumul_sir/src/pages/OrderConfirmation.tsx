import React from "react";
import { useParams, Link } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  const { id } = useParams();
  return (
    <section className="py-10">
      <div className="container mx-auto px-6 md:px-24 text-center bg-white/80 border border-orange/20 rounded-xl p-8">
        <h1 className="text-2xl font-serif font-bold mb-2">Thank you!</h1>
        <p className="text-gray-700">Your booking is confirmed.</p>
        <p className="mt-2 text-lg font-semibold">Reference: {id}</p>
        <div className="mt-6">
          <Link to="/" className="px-4 py-2 bg-orange text-white rounded-md hover:bg-orange/90">Go to Home</Link>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;


