import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import TermsModal from "./TermsModal";
import RefundPolicyModal from "./RefundPolicyModal";
import { YellowMetallicButton } from "./ui/yellow-metallic-button";
import { getServiceById, type Service } from "@/lib/services";
import PaymentModal from "./PaymentModal";
import PaymentInfoModal from "./PaymentInfoModal";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const validateFullName = (name: string) => {
  if (!name.trim()) return "Full Name is required.";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Full Name must contain only letters.";
  if (name.trim().length < 2) return "Full Name must be at least 2 characters.";
  if (name.trim().length > 50) return "Full Name must be at most 50 characters.";
  return "";
};

const validatePhone = (phone: string) => {
  if (!phone.trim()) return "Contact Number is required.";
  if (!/^\d{10,15}$/.test(phone.trim())) return "Contact Number must be 10-15 digits.";
  return "";
};

const validateEmail = (email: string) => {
  if (!email.trim()) return "Email is required.";
  // Stricter email regex
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
    return "Please enter a valid email address.";
  // Optionally block disposable domains (advanced)
  // if (/@(mailinator|tempmail|10minutemail)\./.test(email)) return "Disposable email addresses are not allowed.";
  return "";
};

const validateCompany = (company: string) => {
  if (!company.trim()) return ""; // Optional field
  if (company.trim().length > 50) return "Company name must be at most 50 characters.";
  // Optional: Only allow letters, numbers, spaces, and basic punctuation
  if (!/^[A-Za-z0-9\s.,&'-]*$/.test(company)) return "Company name contains invalid characters.";
  return "";
};

const validateDOB = (dob: string) => {
  if (!dob.trim()) return "Date of birth is required.";
  const dobDate = new Date(dob);
  const today = new Date();
  if (dobDate > today) return "Date of birth cannot be in the future.";
  // Minimum age check (e.g., 18 years)
  const minAge = 18;
  const age = today.getFullYear() - dobDate.getFullYear() - (today < new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate()) ? 1 : 0);
  if (age < minAge) return "You must be at least 18 years old.";
  return "";
};

const validateConsultationDate = (date: string) => {
  if (!date.trim()) return "Consultation date is required.";
  const selected = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore time for comparison
  if (selected < today) return "Consultation date cannot be in the past.";
  // Max 3 months ahead
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  if (selected > maxDate) return "Consultation date can be at most 3 months from today.";
  return "";
};

const validateService = (service: string) => {
  if (!service.trim()) return "Please select a service.";
  // List of valid options (should match your select options' values)
  const validOptions = [
    "vedic-astrology",
    "numerology",
    "commercial-vaastu",
    "signature-analysis",
    "nameology"
  ];
  if (!validOptions.includes(service)) return "Invalid service selected.";
  return "";
};

const validateTime = (time: string, availableSlots: string[], date: string) => {
  if (!date) return ""; // Don't validate if date not selected
  if (!time.trim()) return "Please select a consultation time.";
  if (!availableSlots.includes(time)) return "Invalid or unavailable time selected.";
  return "";
};

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'manage'>('book');
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    dob: "",
    date: "",
    time: ""
  });
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentInfoModal, setShowPaymentInfoModal] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null); // Store form data for later booking creation
  // Manage Booking state
  const [manageId, setManageId] = useState('');
  const [manageAction, setManageAction] = useState<'none' | 'reschedule' | 'cancel'>('none');
  const [manageStatus, setManageStatus] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlots, setRescheduleSlots] = useState<string[]>([]);
  const [rescheduleSlot, setRescheduleSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [showTerms, setShowTerms] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    dob: "",
    date: "",
    service: "",
    time: ""
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [refundAccepted, setRefundAccepted] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [refundError, setRefundError] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    let error = "";
    switch (id) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "company":
        error = validateCompany(value);
        break;
      case "dob":
        error = validateDOB(value);
        break;
      case "date":
        error = validateConsultationDate(value);
        break;
      case "service":
        error = validateService(value);
        // Update selected service when service changes
        const service = getServiceById(value);
        setSelectedService(service || null);
        break;
      case "time":
        error = validateTime(value, availableSlots, form.date);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [id]: error });
  };

  useEffect(() => {
    if (form.date) {
      fetch(`${API_BASE}/api/available-slots?date=${form.date}`)
        .then(res => res.json())
        .then(data => {
          setAvailableSlots(data.available || []);
          // Re-validate time if needed
          setErrors(errors => ({
            ...errors,
            time: validateTime(form.time, data.available || [], form.date)
          }));
        });
    } else {
      setAvailableSlots([]);
      setErrors(errors => ({
        ...errors,
        time: ""
      }));
    }
  }, [form.date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      ...errors,
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      company: validateCompany(form.company),
      dob: validateDOB(form.dob),
      date: validateConsultationDate(form.date),
      service: validateService(form.service),
      time: validateTime(form.time, availableSlots, form.date),
    };

    setErrors(newErrors);

    // If any errors, do not proceed
    if (Object.values(newErrors).some(error => error)) return;

    setShowTerms(true);
    setPendingSubmit(true);
  };

  // Called when Terms are accepted
  const handleAcceptTerms = () => {
    setShowTerms(false);
    setTermsAccepted(true);
    setShowRefund(true);
  };

  // Called when Refund Policy is accepted
  const handleAcceptRefund = () => {
    setShowRefund(false);
    setRefundAccepted(true);
    actuallySubmit();
  };

  const actuallySubmit = async () => {
    setShowTerms(false);
    setLoading(true);
    setStatus(null);
    try {
      console.log('API_BASE:', API_BASE);
      console.log('Checking slot availability for:', { date: form.date, time: form.time });
      
      const slotCheckRes = await fetch(`${API_BASE}/api/check-slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          date: form.date,
          time: form.time
        })
      });

      console.log('Slot check response status:', slotCheckRes.status);

      if (slotCheckRes.status === 409) {
        setStatus("slot-booked");
        setLoading(false);
        setPendingSubmit(false);
        return;
      }

      if (!slotCheckRes.ok) {
        const errorData = await slotCheckRes.json();
        console.error('Slot check error:', errorData);
        setStatus("error");
        setLoading(false);
        setPendingSubmit(false);
        return;
      }
      
      // Slot is available, show payment information
      const service = getServiceById(form.service);
      console.log('Selected service:', service);
      
      if (service) {
        setPaymentInfo({
          totalAmount: service.fullPrice,
          minimumPayment: service.minimumPayment,
          remainingAmount: service.remainingAmount,
          serviceName: service.name,
          duration: service.duration
        });
        setShowPaymentInfoModal(true);
        setStatus("payment-required");
      } else {
        console.error('Service not found for:', form.service);
        setStatus("error");
      }
    } catch (error) {
      console.error('Error in actuallySubmit:', error);
      setStatus("error");
    }

    setLoading(false);
    setPendingSubmit(false);
  };
  //     const res = await fetch(`${API_BASE}/api/contact`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload)
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       setConsultationId(data.bookingId);
  //       setPaymentInfo(data.paymentInfo);
  //       setShowPayment(true);
  //       setStatus("success");
  //       setForm({ fullName: "", email: "", phone: "", company: "", service: "", dob: "", date: "", time: "" });
  //     } else if (res.status === 409) {
  //       setStatus("slot-booked");
  //     } else {
  //       setStatus("error");
  //     }
  //   } catch {
  //     setStatus("error");
  //   }
  //   setLoading(false);
  //   setPendingSubmit(false);
  // };

  const handlePayment = async () => {
    if (!paymentInfo || !form) {
      setStatus("error");
      return;
    }

    setLoading(true);

    try {
      // Store booking data for later creation
      const bookingPayload = {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        dob: form.dob,
        date: form.date,
        time: form.time,
        service: form.service
      };
      // TODO: Integrate with actual payment gateway(Stripe/Razorpay)
      // For now, simulate payment success
      const paymentSuccess = true;

      if (paymentSuccess) {
        // Payment successful, now create booking
        const res = await fetch(`${API_BASE}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...bookingPayload,
            paymentStatus: "partial_paid",
            paidAmount: paymentInfo.minimumPayment,
          })
        });

        if (res.ok) {
          const data = await res.json();
          setConsultationId(data.bookingId);
          setStatus("success");
          setShowPayment(false);
          setForm({ fullName: "", email: "", phone: "", company: "", service: "", dob: "", date: "", time: "" });
        } else {
          setStatus("error");
        }
      } else {
        setStatus("payment-failed");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  const handlePayLater = async () => {
    if (!paymentInfo || !form) {
      setStatus("error");
      return;
    }

    setLoading(true);

    try {
      // Create booking with pending payment status
      const bookingPayload = {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        dob: form.dob,
        date: form.date,
        time: form.time,
        service: form.service
      };

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingPayload,
          paymentStatus: "pending",
          paidAmount: 0,
        })
      });

      if (res.ok) {
        const data = await res.json();
        setConsultationId(data.bookingId);
        setStatus("pay-later-success");
        setShowPayment(false);
        setForm({ fullName: "", email: "", phone: "", company: "", service: "", dob: "", date: "", time: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      // Create booking with partial payment status
      const bookingPayload = {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        dob: form.dob,
        date: form.date,
        time: form.time,
        service: form.service
      };

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingPayload,
          paymentStatus: "partial_paid",
          paidAmount: paymentInfo.minimumPayment,
        })
      });

      if (res.ok) {
        const data = await res.json();
        setConsultationId(data.bookingId);
        setStatus("success");
        setShowPaymentModal(false);
        setShowPayment(false);
        setForm({ fullName: "", email: "", phone: "", company: "", service: "", dob: "", date: "", time: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handlePaymentFailure = (error: string) => {
    setStatus("payment-failed");
    setShowPaymentModal(false);
  };

  return (
    <>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
            activeTab === 'book' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('book')}
        >
          📅 Book Session
        </button>
        <button
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
            activeTab === 'manage' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200' 
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600'
          }`}
          onClick={() => setActiveTab('manage')}
        >
          ⚙️ Manage Booking
        </button>
      </div>
      {activeTab === 'book' && (
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="text-lavender-dark">Full Name</Label>
          <Input id="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className="border-orange/30 focus:border-orange bg-white" required />
          {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
        </div>
        <div>
          <Label htmlFor="phone" className="text-lavender-dark">Contact Number</Label>
          <Input id="phone" value={form.phone} onChange={handleChange} placeholder="Enter your contact number" className="border-orange/30 focus:border-orange bg-white" required />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dob" className="text-lavender-dark">Date of Birth</Label>
            <Input id="dob" type="date" value={form.dob} onChange={handleChange} className="border-orange/30 focus:border-orange bg-white" required />
            {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
          </div>
          <div>
            <Label htmlFor="date" className="text-lavender-dark">Consultation Date</Label>
            <Input id="date" type="date" value={form.date} onChange={handleChange} className="border-orange/30 focus:border-orange bg-white" required />
            {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-lavender-dark">Email Address</Label>
          <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="border-orange/30 focus:border-orange bg-white" required />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="company" className="text-lavender-dark">Company Name</Label>
          <Input id="company" value={form.company} onChange={handleChange} placeholder="Your company name" className="border-orange/30 focus:border-orange bg-white" />
          {errors.company && <p className="text-red-600 text-sm">{errors.company}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="service" className="text-lavender-dark">Service Interest</Label>
            <select id="service" value={form.service} onChange={handleChange} className="w-full px-3 py-2 border border-orange/30 rounded-md focus:border-orange focus:outline-none bg-white" required>
              <option value="">Select a service</option>
              <option value="vedic-astrology">Vedic Astrology Consultation</option>
              <option value="numerology">Numerology Analysis</option>
              <option value="commercial-vaastu">Commercial Vaastu</option>
              <option value="signature-analysis">Signature Analysis</option>
              <option value="nameology">Nameology Consultation</option>
            </select>
            {errors.service && <p className="text-red-600 text-sm">{errors.service}</p>}
          </div>
          <div>
            <Label htmlFor="time" className="text-lavender-dark">Consultation Time</Label>
            <select id="time" value={form.time} onChange={handleChange} className="w-full px-3 py-2 border border-orange/30 rounded-md focus:border-orange focus:outline-none bg-white" required disabled={!form.date}>
              <option value="">{form.date ? (availableSlots.length ? "Select a time" : "No slots available") : "Select a date first"}</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-600 text-sm">{errors.time}</p>}
          </div>
        </div>
        

        <div className="flex justify-center">
          <InteractiveHoverButton type="submit" className="w-full sm:w-auto" text={loading ? "Booking..." : "Book Consultation"} disabled={loading} />
        </div>
        {status === "payment-required" && (
          <div className="text-orange-600 text-center">
            <p>Please pay ₹{paymentInfo?.minimumPayment} now to confirm your booking.</p>
            <p>The remaining amount can be paid anytime before or after your consultation.</p>
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600 text-center">
            <p>Your booking was created successfully!</p>
            {consultationId && (
              <p className="mt-1">Your Consultation ID is: <span className="font-mono text-orange-700">{consultationId}</span></p>
            )}
          </div>
        )}
        {status === "slot-booked" && <p className="text-orange-600 text-center">This slot is already booked. Please choose another.</p>}
        {status === "error" && <p className="text-red-600 text-center">Something went wrong. Please try again.</p>}
        {status === "payment-failed" && (
          <div className="text-red-600 text-center">
            <p>Payment failed. Please try again.</p>
          </div>
        )}
        {status === "pay-later-success" && (
          <div className="text-blue-600 text-center">
            <p>✅ Booking confirmed! Your slot is reserved.</p>
            {consultationId && (
              <p className="mt-1">Your Consultation ID is: <span className="font-mono text-orange-700">{consultationId}</span></p>
            )}
            <p className="mt-2 text-sm">
              You can pay the minimum amount (₹{paymentInfo?.minimumPayment}) anytime before your consultation.
            </p>
            <p className="text-sm">
              We'll send you a payment reminder via email.
            </p>
          </div>
        )}
        

        </form>
      )}
      {activeTab === 'manage' && (
        <div className="space-y-6 bg-white p-6 rounded-xl border border-orange-100 shadow">
          <div>
            <label htmlFor="manageId" className="block text-lavender-dark font-semibold mb-2">Consultation ID (ASTRO-ID)</label>
            <input
              id="manageId"
              type="text"
              value={manageId}
              onChange={e => {
                setManageId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                setManageAction('none');
                setManageStatus(null);
              }}
              placeholder="e.g. ASTRO12345"
              className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              maxLength={10}
              disabled={loading}
            />
          </div>
          {manageId.match(/^ASTRO\d{5}$/) && manageAction === 'none' && !loading && (
            <div className="flex gap-4 justify-center">
              <InteractiveHoverButton
                className="w-auto px-4 py-1 text-sm"
                onClick={() => { setManageAction('reschedule'); setManageStatus(null); }}
                type="button"
                text="Reschedule"
              />
              <InteractiveHoverButton
                className="w-auto px-4 py-1 text-sm"
                onClick={() => setShowCancelConfirm(true)}
                type="button"
                text="Cancel Consultation"
              />
            </div>
          )}
          {/* Cancel confirmation dialog */}
          {showCancelConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white p-6 rounded-xl shadow-xl border border-orange-200 max-w-xs w-full">
                <p className="text-center text-orange-700 font-semibold mb-4">Are you sure you want to cancel this booking?</p>
                <div className="flex gap-4 justify-center">
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-5 py-2 shadow"
                    onClick={async () => {
                      setShowCancelConfirm(false);
                      setLoading(true);
                      setManageStatus('Processing...');
                      try {
                        const res = await fetch(`${API_BASE}/api/bookings/${manageId}/cancel`, { method: 'PATCH' });
                        const data = await res.json();
                        if (res.ok) {
                          setManageStatus('Booking cancelled successfully.');
                          setManageId('');
                          setManageAction('none');
                        } else {
                          setManageStatus(data.error || 'Could not cancel booking.');
                        }
                      } catch {
                        setManageStatus('Could not cancel booking. Please try again.');
                      }
                      setLoading(false);
                    }}
                    type="button"
                    disabled={loading}
                  >Yes, Cancel</button>
                  <button
                    className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold rounded-full px-5 py-2 border border-orange-300 shadow"
                    onClick={() => setShowCancelConfirm(false)}
                    type="button"
                    disabled={loading}
                  >No</button>
                </div>
              </div>
            </div>
          )}
          {/* Reschedule flow */}
          {manageAction === 'reschedule' && (
            <div className="space-y-4">
              <label className="block text-lavender-dark font-semibold">New Date</label>
              <input
                type="date"
                value={rescheduleDate}
                onChange={async e => {
                  setRescheduleDate(e.target.value);
                  setRescheduleSlot('');
                  setManageStatus(null);
                  if (e.target.value) {
                    const res = await fetch(`${API_BASE}/api/available-slots?date=${e.target.value}`);
                    const data = await res.json();
                    setRescheduleSlots(data.available || []);
                  } else {
                    setRescheduleSlots([]);
                  }
                }}
                className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                disabled={loading}
              />
              {rescheduleSlots.length > 0 && (
                <div>
                  <label className="block text-lavender-dark font-semibold mb-1">Select New Time</label>
                  <select
                    value={rescheduleSlot}
                    onChange={e => setRescheduleSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    disabled={loading}
                  >
                    <option value="">Select a time</option>
                    {rescheduleSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              )}
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-5 py-2 shadow mt-2"
                disabled={!rescheduleDate || !rescheduleSlot || loading}
                onClick={async () => {
                  setManageStatus('Processing...');
                  setLoading(true);
                  try {
                    const res = await fetch(`${API_BASE}/api/bookings/${manageId}/reschedule`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ date: rescheduleDate, time: rescheduleSlot })
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setManageStatus('Booking rescheduled successfully.');
                      setManageId('');
                      setManageAction('none');
                      setRescheduleDate('');
                      setRescheduleSlot('');
                      setRescheduleSlots([]);
                    } else {
                      setManageStatus(data.error || 'Could not reschedule booking.');
                    }
                  } catch {
                    setManageStatus('Could not reschedule booking. Please try again.');
                  }
                  setLoading(false);
                }}
                type="button"
              >Confirm Reschedule</button>
            </div>
          )}
          {manageStatus && <p className="text-center text-orange-700 font-semibold mt-2">{manageStatus}</p>}
        </div>
      )}
      <TermsModal
        open={showTerms}
        onAccept={handleAcceptTerms}
        onClose={() => { setShowTerms(false); setPendingSubmit(false); }}
      />
      <RefundPolicyModal
        open={showRefund}
        onAccept={handleAcceptRefund}
        onClose={() => { setShowRefund(false); setPendingSubmit(false); }}
      />
      
      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={paymentInfo?.minimumPayment || 0}
        serviceName={paymentInfo?.serviceName || ''}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />
      
      {/* Payment Info Modal */}
      <PaymentInfoModal
        open={showPaymentInfoModal}
        onClose={() => setShowPaymentInfoModal(false)}
        paymentInfo={paymentInfo}
        onPayNow={() => {
          setShowPaymentInfoModal(false);
          setShowPaymentModal(true);
        }}
        onPayLater={() => {
          setShowPaymentInfoModal(false);
          handlePayLater();
        }}
        loading={loading}
      />
    </>
  );
};

export default ContactForm; 