import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import TermsModal from "./TermsModal";
import RefundPolicyModal from "./RefundPolicyModal";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const validateName = (name: string, field: string) => {
  if (!name.trim()) return `${field} is required.`;
  if (!/^[A-Za-z\s]+$/.test(name)) return `${field} must contain only letters.`;
  if (name.trim().length < 2) return `${field} must be at least 2 characters.`;
  if (name.trim().length > 30) return `${field} must be at most 30 characters.`;
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
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    dob: "",
    date: "",
    time: ""
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [showTerms, setShowTerms] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    let error = "";
    switch (id) {
      case "firstName":
        error = validateName(value, "First Name");
        break;
      case "lastName":
        error = validateName(value, "Last Name");
        break;
      case "email":
        error = validateEmail(value);
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
      firstName: validateName(form.firstName, "First Name"),
      lastName: validateName(form.lastName, "Last Name"),
      email: validateEmail(form.email),
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
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", email: "", company: "", service: "", dob: "", date: "", time: "" });
      } else if (res.status === 409) {
        setStatus("slot-booked");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
    setPendingSubmit(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-lavender-dark">First Name</Label>
            <Input id="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your first name" className="border-orange/30 focus:border-orange bg-white" required />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-lavender-dark">Last Name</Label>
            <Input id="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter your last name" className="border-orange/30 focus:border-orange bg-white" required />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
          </div>
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
        {status === "success" && <p className="text-green-600 text-center">Your booking was successful!</p>}
        {status === "slot-booked" && <p className="text-orange-600 text-center">This slot is already booked. Please choose another.</p>}
        {status === "error" && <p className="text-red-600 text-center">Something went wrong. Please try again.</p>}
      </form>
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
    </>
  );
};

export default ContactForm; 