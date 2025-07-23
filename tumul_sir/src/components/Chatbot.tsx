import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, ChatMessage } from "@/lib/chat";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AVATAR_URL = "/Dr.-Tumul-Raathi-astrology.png"; // Use your logo or avatar

// Booking steps
const BOOKING_STEPS = {
  idle: 'idle',
  askService: 'askService',
  askDate: 'askDate',
  askSlot: 'askSlot',
  askInfo: 'askInfo',
  askDob: 'askDob',
  confirm: 'confirm',
};

type BookingStep = keyof typeof BOOKING_STEPS;

interface BookingData {
  date?: string;
  slot?: string;
  name?: string;
  email?: string;
  service?: string;
  dob?: string;
}

const SERVICES = [
  'Business Astrology',
  'Personal Astrology',
  'Numerology',
  'Vaastu',
  'Signature Analysis',
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('idle');
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dob, setDob] = useState<Date | null>(null);

  // Lead qualification steps
  const [leadStep, setLeadStep] = useState<'idle' | 'askConsent' | 'askPhone' | 'askBusinessType' | 'askLanguage' | 'askClientType' | 'askHadSession' | 'done'>('idle');
  const [leadData, setLeadData] = useState<{ phone?: string; businessType?: string; language?: string; clientType?: string; hadSession?: string }>({});

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Detect booking intent
  const isBookingIntent = (text: string) => {
    const triggers = [
      'book', 'appointment', 'consultation', 'schedule', 'meeting', 'slot'
    ];
    return triggers.some(trigger => text.toLowerCase().includes(trigger));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    // Booking flow: detect intent and start booking
    if (bookingStep === 'idle' && isBookingIntent(input)) {
      setBookingStep('askService');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `Which service would you like to book?\n${SERVICES.map((s, i) => `${i + 1}. ${s}`).join('\n')}\nPlease type the service name or number.` }
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle service selection
    if (bookingStep === 'askService') {
      if (input.trim().toLowerCase() === 'back') {
        setMessages(prev => [...prev, { sender: 'bot', text: 'You are at the first step. Please select a service.' }]);
        return;
      }
      let selectedService = '';
      const idx = Number(input.trim()) - 1;
      if (!isNaN(idx) && idx >= 0 && idx < SERVICES.length) {
        selectedService = SERVICES[idx];
      } else if (SERVICES.map(s => s.toLowerCase()).includes(input.trim().toLowerCase())) {
        selectedService = SERVICES.find(s => s.toLowerCase() === input.trim().toLowerCase()) || '';
      }
      if (!selectedService) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please select a valid service by typing its name or number.' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, service: selectedService }));
      setBookingStep('askDate');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Great! What date would you like to book your appointment for? (YYYY-MM-DD)' }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle date input
    if (bookingStep === 'askDate') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askService');
        setMessages(prev => [...prev, { sender: 'bot', text: `Going back. Which service would you like to book?\n${SERVICES.map((s, i) => `${i + 1}. ${s}`).join('\n')}\nPlease type the service name or number.` }]);
        return;
      }
      // Validate date format YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter a valid date in YYYY-MM-DD format, or type "back" to change the service.' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, date: input.trim() }));
      setBookingStep('askSlot');
      setLoading(true);
      // Fetch available slots from backend
      try {
        const res = await fetch(`/api/available-slots?date=${encodeURIComponent(input.trim())}`);
        const data = await res.json();
        setAvailableSlots(data.available || []);
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: data.available && data.available.length > 0
            ? `Here are the available slots for ${input.trim()}:\n${data.available.map((slot: string, i: number) => `${i + 1}. ${slot}`).join('\n')}\nPlease type the slot time (e.g., 14:00) to select, or type "back" to change the date.`
            : 'Sorry, there are no available slots for that date. Please enter another date (YYYY-MM-DD), or type "back" to change the service.'
          }
        ]);
      } catch (err) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I could not fetch available slots. Please try again later, or type "back" to change the date.' }]);
      }
      setLoading(false);
      return;
    }

    // Booking flow: handle slot selection
    if (bookingStep === 'askSlot') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askDate');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Going back. What date would you like to book your appointment for? (YYYY-MM-DD)' }]);
        return;
      }
      if (!availableSlots.includes(input.trim())) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please select a valid slot from the list above (e.g., 14:00), or type "back" to change the date.' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, slot: input.trim() }));
      setBookingStep('askInfo');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Great! Please provide your name and email in this format: Name, email@example.com (or type "back" to change the slot)' }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle user info and show summary for confirmation
    if (bookingStep === 'askInfo') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askSlot');
        setMessages(prev => [...prev, { sender: 'bot', text: `Going back. Here are the available slots for ${bookingData.date}:\n${availableSlots.map((slot: string, i: number) => `${i + 1}. ${slot}`).join('\n')}\nPlease type the slot time (e.g., 14:00) to select.` }]);
        return;
      }
      // Expect input in format: Name, email@example.com
      const [name, email] = input.split(',').map(s => s.trim());
      if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please provide your full name and a valid email, separated by a comma. Example: John Doe, john@example.com (or type "back" to change the slot)' }]);
        return;
      }
      const nameParts = name.split(' ');
      if (nameParts.length < 2) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter your full name (first and last name).' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, name, email }));
      setBookingStep('askDob');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please select your date of birth.' }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle dob
    if (bookingStep === 'askDob') {
      if (dob === null) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please select your date of birth using the date picker below.' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, dob: dob.toISOString().slice(0, 10) }));
      setBookingStep('confirm');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `Please confirm your booking:\nService: ${bookingData.service}\nDate: ${bookingData.date}\nSlot: ${bookingData.slot}\nName: ${bookingData.name}\nEmail: ${bookingData.email}\nDOB: ${dob.toISOString().slice(0, 10)}\n\nType 'yes' to confirm, 'no' to cancel, or 'edit [field]' (e.g., 'edit date', 'edit slot', 'edit name', 'edit email', 'edit dob', 'edit service').` }
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle confirmation
    if (bookingStep === 'confirm') {
      const editMatch = input.trim().toLowerCase().match(/^edit (service|date|slot|name|email|dob)$/);
      if (editMatch) {
        const field = editMatch[1];
        if (field === 'service') {
          setBookingStep('askService');
          setMessages(prev => [...prev, { sender: 'bot', text: `Editing service. Which service would you like to book?\n${SERVICES.map((s, i) => `${i + 1}. ${s}`).join('\n')}\nPlease type the service name or number.` }]);
        } else if (field === 'date') {
          setBookingStep('askDate');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing date. What date would you like to book your appointment for? (YYYY-MM-DD)' }]);
        } else if (field === 'slot') {
          setBookingStep('askSlot');
          setMessages(prev => [...prev, { sender: 'bot', text: `Editing slot. Here are the available slots for ${bookingData.date}:\n${availableSlots.map((slot: string, i: number) => `${i + 1}. ${slot}`).join('\n')}\nPlease type the slot time (e.g., 14:00) to select.` }]);
        } else if (field === 'name' || field === 'email') {
          setBookingStep('askInfo');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing your name and email. Please provide your name and email in this format: Name, email@example.com' }]);
        } else if (field === 'dob') {
          setBookingStep('askDob');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing your date of birth. Please select your date of birth.' }]);
        }
        return;
      }
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askInfo');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Going back. Please provide your name and email in this format: Name, email@example.com' }]);
        return;
      }
      if (input.trim().toLowerCase() === 'yes') {
        setLoading(true);
        // Submit booking to backend
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: bookingData.name?.split(' ')[0] || bookingData.name,
              lastName: bookingData.name?.split(' ').slice(1).join(' ') || '',
              email: bookingData.email,
              dob: bookingData.dob,
              date: bookingData.date,
              time: bookingData.slot,
              service: bookingData.service || 'Astrology Consultation',
            }),
          });
          const data = await res.json();
          if (res.ok) {
            setMessages(prev => [
              ...prev,
              { sender: 'bot', text: `Thank you, ${bookingData.name}! Your appointment is booked for ${bookingData.date} at ${bookingData.slot} (${bookingData.service}). You will receive a confirmation email shortly.` }
            ]);
            // Store bookingId for lead update
            if (data.bookingId) setBookingId(data.bookingId);
            // Start lead qualification
            setLeadStep('askConsent');
            setTimeout(() => {
              setMessages(prev => [
                ...prev,
                { sender: 'bot', text: "Would you like to answer a few quick questions to help us serve you better? (yes/no)" }
              ]);
            }, 800);
          } else {
            setMessages(prev => [
              ...prev,
              { sender: 'bot', text: data.message || 'Sorry, there was a problem booking your appointment. Please try again later.' }
            ]);
          }
        } catch (err) {
          setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, there was a problem booking your appointment. Please try again later.' }]);
        }
        setLoading(false);
        // Reset booking state
        setBookingStep('idle');
        setBookingData({});
        setAvailableSlots([]);
        return;
      } else if (input.trim().toLowerCase() === 'no') {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Booking cancelled. If you want to start over, just let me know!' }]);
        setBookingStep('idle');
        setBookingData({});
        setAvailableSlots([]);
        return;
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: "Please type 'yes' to confirm, 'no' to cancel, 'back' to go to the previous step, or 'edit [field]' (e.g., 'edit date', 'edit slot', 'edit name', 'edit email', 'edit service')." }]);
        return;
      }
    }

    // Lead qualification flow
    if (leadStep !== 'idle') {
      if (leadStep === 'askConsent') {
        if (input.trim().toLowerCase() === 'yes') {
          setLeadStep('askPhone');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Great! What is your phone number?' }]);
          return;
        } else {
          setLeadStep('done');
          setMessages(prev => [...prev, { sender: 'bot', text: 'No problem! Thank you for booking with us.' }]);
          return;
        }
      }
      if (leadStep === 'askPhone') {
        setLeadData(prev => ({ ...prev, phone: input.trim() }));
        setLeadStep('askBusinessType');
        setMessages(prev => [...prev, { sender: 'bot', text: 'What is your business type or profession? (or type "personal" if not business)' }]);
        return;
      }
      if (leadStep === 'askBusinessType') {
        setLeadData(prev => ({ ...prev, businessType: input.trim() }));
        setLeadStep('askLanguage');
        setMessages(prev => [...prev, { sender: 'bot', text: 'What is your preferred language for the session?' }]);
        return;
      }
      if (leadStep === 'askLanguage') {
        setLeadData(prev => ({ ...prev, language: input.trim() }));
        setLeadStep('askClientType');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Are you a new or returning client?' }]);
        return;
      }
      if (leadStep === 'askClientType') {
        setLeadData(prev => ({ ...prev, clientType: input.trim() }));
        setLeadStep('askHadSession');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Have you had an astrology session before? (yes/no)' }]);
        return;
      }
      if (leadStep === 'askHadSession') {
        setLeadData(prev => ({ ...prev, hadSession: input.trim() }));
        setLeadStep('done');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Thank you for sharing! We look forward to serving you.' }]);
        // Send lead data to backend (update booking/contact record)
        if (bookingId) {
          fetch(`/api/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: leadData.phone,
              businessType: leadData.businessType,
              language: leadData.language,
              clientType: leadData.clientType,
              hadSession: leadData.hadSession,
            }),
          })
            .then(() => setMessages(prev => [...prev, { sender: 'bot', text: 'Your information has been saved with your booking.' }]))
            .catch(() => setMessages(prev => [...prev, { sender: 'bot', text: 'There was a problem saving your information, but your booking is still confirmed.' }]));
        }
        return;
      }
      if (leadStep === 'done') {
        setLeadStep('idle');
        setLeadData({});
        setBookingId(null);
        return;
      }
    }

    // Default: normal chat
    setLoading(true);
    try {
      const botReply = await sendChatMessage(messages, input);
      const botMessage: ChatMessage = { sender: 'bot', text: botReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  };

  // When a date is picked from the calendar, auto-fill input and send
  useEffect(() => {
    if (bookingStep === 'askDate' && selectedDate) {
      const formatted = selectedDate.toISOString().slice(0, 10);
      setInput(formatted);
      setTimeout(() => {
        sendMessage();
        setSelectedDate(null);
      }, 100);
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <>
      {/* Floating Chatbot Button */}
      <div className="fixed bottom-8 right-8 z-[1000]">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none border-4 border-white"
            aria-label="Open chatbot"
          >
            {/* Chat icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="white" />
              <path d="M8 13h8M8 9h8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {/* Chatbot Window */}
      {open && (
        <div className="fixed bottom-28 right-8 w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-orange-200 flex flex-col z-[1001] animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-orange-500 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <img src={AVATAR_URL} alt="Astrologer Avatar" className="w-8 h-8 rounded-full border-2 border-white" />
              <span className="text-white font-semibold text-base">Ask Dr. Tumul Raathi</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:bg-orange-600 rounded-full p-1 transition-colors"
              aria-label="Close chatbot"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-orange-50" style={{ maxHeight: 350 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                {msg.sender === 'bot' && (
                  <img src={AVATAR_URL} alt="Bot" className="w-7 h-7 rounded-full mr-2 border border-orange-300" />
                )}
                <span
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-white text-gray-900 border border-orange-200'
                      : 'bg-orange-100 text-orange-900 border border-orange-300'
                  }`}
                >
                  {msg.text}
                </span>
                {msg.sender === 'user' && (
                  <span className="ml-2 w-7 h-7" />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-2">
                <img src={AVATAR_URL} alt="Bot" className="w-7 h-7 rounded-full mr-2 border border-orange-300" />
                <span className="px-4 py-2 rounded-2xl text-sm bg-orange-100 text-orange-900 border border-orange-300 animate-pulse">Bot is typing...</span>
              </div>
            )}
            {/* Slot selection buttons for askSlot step */}
            {bookingStep === 'askSlot' && availableSlots.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-300 hover:bg-orange-200 transition-colors text-sm font-semibold shadow-sm"
                    onClick={() => {
                      setInput(slot);
                      setTimeout(() => {
                        sendMessage();
                      }, 100);
                    }}
                    disabled={loading}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
            {/* DOB picker for askDob step */}
            {bookingStep === 'askDob' && (
              <div className="flex flex-col items-center mb-2">
                <DatePicker
                  selected={dob}
                  onChange={(date: Date | null) => setDob(date)}
                  maxDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select your date of birth"
                  className="px-3 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-orange-50 w-full"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
                <button
                  className="mt-2 px-4 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
                  disabled={!dob}
                  onClick={() => {
                    if (dob) {
                      setInput('dob-selected');
                      setTimeout(() => {
                        sendMessage();
                      }, 100);
                    }
                  }}
                >
                  Confirm DOB
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <div className="flex flex-col gap-2 px-4 py-3 border-t border-orange-200 bg-white rounded-b-2xl">
            {/* Calendar picker for date selection */}
            {bookingStep === 'askDate' && (
              <div className="flex justify-center mb-1">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  className="px-3 py-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-orange-50 w-full"
                  inline={false}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-orange-50"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-all duration-200 focus:outline-none disabled:opacity-50"
                aria-label="Send message"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 12l18-7-7 18-2.5-7L3 12z" fill="currentColor"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
