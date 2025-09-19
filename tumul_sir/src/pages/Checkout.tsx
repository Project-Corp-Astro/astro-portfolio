import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OrderSummary from "@/components/checkout/OrderSummary";
import { getServiceById } from "@/lib/services";
import { fetchAvailableSlots } from "@/lib/chat";
import TermsModal from "@/components/TermsModal";
import RefundPolicyModal from "@/components/RefundPolicyModal";
import PaymentModal from "@/components/PaymentModal";

type ContactInfo = { fullName: string; email: string; phone: string; company: string; dob: string };

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const serviceId = params.get("service") || "vedic-astrology";
  const svc = getServiceById(serviceId);

  const [step, setStep] = useState<"contact" | "schedule" | "review">((params.get("step") as any) || "contact");
  const [contact, setContact] = useState<ContactInfo>({ fullName: "", email: "", phone: "", company: "", dob: "" });
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [slot, setSlot] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [action, setAction] = useState<"pay_now" | "pay_later" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setParams(prev => { prev.set("step", step); return prev; }, { replace: true });
  }, [step]);

  useEffect(() => {
    (async () => {
      if (date) setSlots(await fetchAvailableSlots(date));
    })();
  }, [date]);

  if (!svc) return <div className="container mx-auto p-6">Invalid service.</div>;

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-24 grid md:grid-cols-[1fr,320px] gap-4 md:gap-6">
        <div className="bg-white/80 border border-orange/20 rounded-xl p-4 md:p-6">
          <h1 className="text-2xl font-serif font-bold mb-4">Checkout</h1>

          {/* Step 1: Contact Details */}
          {step === "contact" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Please enter your details</h2>
                {step !== "contact" && (
                  <button onClick={()=>setStep("contact")} className="text-sm text-blue-600 hover:underline">Edit</button>
                )}
              </div>
              <input className="w-full border rounded px-3 py-2" placeholder="Full Name" value={contact.fullName} onChange={e=>setContact({...contact, fullName: e.target.value})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="w-full border rounded px-3 py-2" placeholder="Email" value={contact.email} onChange={e=>setContact({...contact, email: e.target.value})} />
                <input className="w-full border rounded px-3 py-2" placeholder="Phone" value={contact.phone} onChange={e=>setContact({...contact, phone: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="w-full border rounded px-3 py-2" placeholder="Company (optional)" value={contact.company} onChange={e=>setContact({...contact, company: e.target.value})} />
                <input type="date" className="w-full border rounded px-3 py-2" value={contact.dob} onChange={e=>setContact({...contact, dob: e.target.value})} />
              </div>
              {step === "contact" && (
                <div className="flex justify-end">
                  <button onClick={()=>setStep("schedule")} className="w-full md:w-auto px-4 py-2 bg-orange text-white rounded-md" disabled={!contact.fullName || !contact.email || !contact.phone || !contact.dob}>Continue</button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === "schedule" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Choose a slot</h2>
                {step !== "schedule" && (
                  <button onClick={()=>setStep("schedule")} className="text-sm text-blue-600 hover:underline">Edit</button>
                )}
              </div>
              <input type="date" className="w-full border rounded px-3 py-2" value={date} onChange={e=>{setDate(e.target.value); setSlot("");}} />
              <select className="w-full border rounded px-3 py-2" value={slot} onChange={e=>setSlot(e.target.value)} disabled={!slots.length}>
                <option value="">Select a slot</option>
                {slots.map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
              {date && slots.length === 0 && (
                <p className="text-sm text-red-600">No slots available for the selected date. Please choose another date.</p>
              )}
              {step === "schedule" && (
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                  <button onClick={()=>setStep("contact")} className="w-full md:w-auto px-4 py-2 border rounded-md">Back</button>
                  <button onClick={()=>setStep("review")} className="w-full md:w-auto px-4 py-2 bg-orange text-white rounded-md" disabled={!date || !slot}>Continue</button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Review & confirm</h2>
                  <button onClick={()=>setStep("contact")} className="text-sm text-blue-600 hover:underline">Edit details</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 mt-2">
                  <div><strong>Name:</strong> {contact.fullName}</div>
                  <div><strong>Email:</strong> {contact.email}</div>
                  <div><strong>Phone:</strong> {contact.phone}</div>
                  <div><strong>Company:</strong> {contact.company || '-'}</div>
                  <div><strong>DOB:</strong> {contact.dob}</div>
                  <div><strong>Service:</strong> {svc.name}</div>
                  <div><strong>Date:</strong> {date || '-'}</div>
                  <div><strong>Slot:</strong> {slot || '-'}</div>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)} />
                I confirm the above details are correct.
              </label>
              <div className="flex flex-col md:flex-row md:justify-between gap-2">
                <button onClick={()=>setStep("schedule")} className="w-full md:w-auto px-4 py-2 border rounded-md">Back</button>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                  <button
                    onClick={()=>{ setAction("pay_later"); setShowTerms(true); }}
                    className="w-full md:w-auto px-4 py-2 border rounded-md"
                    disabled={submitting || !confirmed}
                  >Pay Later</button>
                  <button
                    onClick={()=>{ setAction("pay_now"); setShowTerms(true); }}
                    className="w-full md:w-auto px-4 py-2 bg-orange text-white rounded-md"
                    disabled={submitting || !confirmed}
                  >Pay Now</button>
                </div>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          )}
        </div>

        <OrderSummary serviceName={svc.name} priceInr={svc.fullPrice} date={date} slot={slot} />
      </div>

      {/* Policy Modals */}
      <TermsModal open={showTerms} onClose={()=>setShowTerms(false)} onAccept={()=>{ setShowTerms(false); setShowRefund(true); }} />
      <RefundPolicyModal open={showRefund} onClose={()=>setShowRefund(false)} onAccept={async ()=>{
        setShowRefund(false);
        setSubmitting(true); setError(undefined);
        try {
          const API_BASE = import.meta.env.VITE_API_BASE || "";
          const payload = {
            name: contact.fullName,
            email: contact.email,
            phone: contact.phone,
            company: contact.company,
            dob: contact.dob,
            date,
            time: slot,
            service: serviceId
          };
          if (action === "pay_now") {
            // Open payment modal; booking will be created after successful payment
            setShowPayment(true);
          } else {
            const res = await fetch(`${API_BASE}/api/contact`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || data?.error || "Failed to create booking");
            navigate(`/order/${data.bookingId || `ASTRO${Math.floor(10000+Math.random()*90000)}`}`);
          }
        } catch (e: any) {
          setError(e?.message || "Failed to submit");
        } finally {
          setSubmitting(false);
        }
      }} />

      {/* Payment Modal (minimum payment) */}
      {svc && (
        <PaymentModal
          isOpen={showPayment}
          onClose={()=>setShowPayment(false)}
          amount={svc.minimumPayment}
          serviceName={svc.name}
          onSuccess={async (_payment) => {
            try {
              const API_BASE = import.meta.env.VITE_API_BASE || "";
              const res = await fetch(`${API_BASE}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: contact.fullName,
                  email: contact.email,
                  phone: contact.phone,
                  company: contact.company,
                  dob: contact.dob,
                  date,
                  time: slot,
                  service: serviceId,
                  paymentStatus: "partial_paid",
                  paidAmount: svc.minimumPayment
                })
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data?.message || data?.error || "Failed to create booking");
              setShowPayment(false);
              navigate(`/order/${data.bookingId || `ASTRO${Math.floor(10000+Math.random()*90000)}`}`);
            } catch (e: any) {
              setError(e?.message || "Failed to submit after payment");
            }
          }}
          onFailure={(msg) => { setShowPayment(false); setError(msg || 'Payment failed'); }}
        />
      )}
    </section>
  );
};

export default Checkout;


