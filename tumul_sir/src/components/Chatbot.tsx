import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage, ChatMessage } from "@/lib/chat";
const API_BASE = import.meta.env.VITE_API_BASE;
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AVATAR_URL = "/bot.png"; // Use the new chatbot icon

// Booking steps
const BOOKING_STEPS = {
  idle: 'idle',
  askService: 'askService',
  askDate: 'askDate',
  askSlot: 'askSlot',
  askName: 'askName',
  askEmail: 'askEmail',
  askPhone: 'askPhone',
  askCompany: 'askCompany',
  askDob: 'askDob',
  confirm: 'confirm',
};

type BookingStep = keyof typeof BOOKING_STEPS;

interface BookingData {
  date?: string;
  slot?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  dob?: string;
}

// Enhanced service definitions with pricing and descriptions
const SERVICES = [
  {
    id: 'vedic-astrology',
    name: 'Vedic Astrology Consultation',
    description: 'Strategic guidance for companies and entrepreneurs',
    price: 2500,
    duration: '60 minutes',
    addons: ['numerology', 'commercial-vaastu']
  },
  {
    id: 'numerology',
    name: 'Numerology & Nameology',
    description: 'Insights based on numbers and names',
    price: 1200,
    duration: '30 minutes',
    addons: ['vedic-astrology', 'signature-analysis']
  },
  {
    id: 'commercial-vaastu',
    name: 'Commercial Vaastu',
    description: 'Space and energy alignment for homes and offices',
    price: 2000,
    duration: '45 minutes',
    addons: ['vedic-astrology']
  },
  {
    id: 'signature-analysis',
    name: 'Signature Analysis',
    description: 'Personality and authenticity insights',
    price: 800,
    duration: '20 minutes',
    addons: ['vedic-astrology', 'numerology']
  },
];

// Context tracking for better conversations
interface ConversationContext {
  userGoals?: string[];
  businessType?: string;
  previousServices?: string[];
  budget?: string;
  urgency?: string;
  preferredLanguage?: string;
  lastIntent?: string;
  followUpQuestions?: string[];
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // maximized/minimized state
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('idle');
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dob, setDob] = useState<Date | null>(null);

  // Enhanced context tracking
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const [currentService, setCurrentService] = useState<any>(null);
  const [suggestedAddons, setSuggestedAddons] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Lead qualification steps
  const [leadStep, setLeadStep] = useState<'idle' | 'askConsent' | 'askPhone' | 'askBusinessType' | 'askLanguage' | 'askClientType' | 'askHadSession' | 'done'>('idle');
  const [leadData, setLeadData] = useState<{ phone?: string; businessType?: string; language?: string; clientType?: string; hadSession?: string }>({});



  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Enhanced intent detection
  const detectIntent = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Booking intent
    if (/\b(book|appointment|consultation|schedule|meeting|slot|reserve)\b/.test(lowerText)) {
      return 'booking';
    }
    
    // Pricing intent
    if (/\b(price|cost|fee|how much|rate|charges)\b/.test(lowerText)) {
      return 'pricing';
    }
    
    // Service inquiry
    if (/\b(service|help|what do you|offer|provide)\b/.test(lowerText)) {
      return 'service_inquiry';
    }
    
    // Business vs Personal
    if (/\b(business|company|entrepreneur|startup|corporate)\b/.test(lowerText)) {
      return 'business_focus';
    }
    
    if (/\b(personal|life|relationship|family|individual)\b/.test(lowerText)) {
      return 'personal_focus';
    }
    
    // Urgency
    if (/\b(urgent|asap|quick|immediate|emergency)\b/.test(lowerText)) {
      return 'urgency';
    }
    
    // Follow-up questions
    if (/\b(what about|how about|also|additionally|more)\b/.test(lowerText)) {
      return 'follow_up';
    }
    
    return 'general';
  };

  // Dynamic service recommendation based on context
  const recommendServices = (context: ConversationContext) => {
    let recommendations = [...SERVICES];
    
    if (context.userGoals?.includes('business')) {
      recommendations = recommendations.filter(s => s.id.includes('business') || s.id === 'vaastu');
    }
    
    if (context.userGoals?.includes('personal')) {
      recommendations = recommendations.filter(s => s.id.includes('personal') || s.id === 'numerology' || s.id === 'signature-analysis');
    }
    
    if (context.budget === 'low') {
      recommendations = recommendations.filter(s => s.price <= 1200);
    }
    
    if (context.urgency === 'high') {
      recommendations = recommendations.filter(s => s.duration <= '30 minutes');
    }
    
    return recommendations;
  };

  // Enhanced response generation
  const generateContextualResponse = (intent: string, userInput: string, context: ConversationContext) => {
    switch (intent) {
      case 'pricing':
        if (currentService) {
          return `The ${currentService.name} consultation costs ₹${currentService.price} for ${currentService.duration}. Would you like to book this service?`;
        }
        return "I offer various services at different price points:\n" + 
               SERVICES.map(s => `• ${s.name}: ₹${s.price} (${s.duration})`).join('\n') +
               "\n\nWhich service interests you? I can provide more details and help you book.";
      
      case 'business_focus':
        setConversationContext(prev => ({ ...prev, userGoals: [...(prev.userGoals || []), 'business'] }));
        return "Great! For business guidance, I recommend:\n" +
               "• Business Astrology (₹2500) - Strategic insights for companies\n" +
               "• Vaastu (₹2000) - Office space optimization\n" +
               "• Numerology (₹1200) - Business name analysis\n\n" +
               "What specific business challenge are you facing?";
      
      case 'personal_focus':
        setConversationContext(prev => ({ ...prev, userGoals: [...(prev.userGoals || []), 'personal'] }));
        return "Perfect! For personal guidance, I recommend:\n" +
               "• Personal Astrology (₹1500) - Life and relationship advice\n" +
               "• Numerology (₹1200) - Personal number insights\n" +
               "• Signature Analysis (₹800) - Personality assessment\n\n" +
               "What area of your personal life would you like guidance on?";
      
      case 'follow_up':
        if (currentService && suggestedAddons.length > 0) {
          return `Great question! For ${currentService.name}, I also recommend:\n` +
                 suggestedAddons.map(addon => `• ${addon.name} (₹${addon.price}) - ${addon.description}`).join('\n') +
                 "\nWould you like to add any of these services to your consultation?";
        }
        return "I'd be happy to help! Could you please clarify what specific information you're looking for?";
      
      default:
        return null; // Let AI handle general responses
    }
  };

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

    // Enhanced intent detection and context handling
    const intent = detectIntent(input);
    const contextualResponse = generateContextualResponse(intent, input, conversationContext);
    
    if (contextualResponse) {
      setMessages(prev => [...prev, { sender: 'bot', text: contextualResponse }]);
      return;
    }

    // If user asks about cancel or reschedule, prompt to use Contact Form
    if (/\b(cancel|reschedule)\b/i.test(input)) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'To cancel or reschedule your booking, please use the Manage Booking section in the Contact Form below.' }
      ]);
      return;
    }

    // Enhanced booking flow with context awareness
    if (bookingStep === 'idle' && isBookingIntent(input)) {
      setBookingStep('askService');
      setLoading(true);
      
      // Use context to suggest relevant services
      const recommendations = recommendServices(conversationContext);
      const serviceList = recommendations.map((s, i) => `${i + 1}. ${s.name} - ₹${s.price}`).join('\n');
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `Based on our conversation, here are the services I recommend:\n${serviceList}\n\nPlease type the service name or number to proceed with booking.` }
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle service selection with enhanced validation
    if (bookingStep === 'askService') {
      if (input.trim().toLowerCase() === 'back') {
        setMessages(prev => [...prev, { sender: 'bot', text: 'You are at the first step. Please select a service.' }]);
        return;
      }
      
      let selectedService = null;
      const idx = Number(input.trim()) - 1;
      
      if (!isNaN(idx) && idx >= 0 && idx < SERVICES.length) {
        selectedService = SERVICES[idx];
      } else {
        const serviceName = input.trim().toLowerCase();
        selectedService = SERVICES.find(s => s.name.toLowerCase().includes(serviceName) || s.id.includes(serviceName));
      }
      
      if (!selectedService) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please select a valid service by typing its name or number.' }]);
        return;
      }
      
      setCurrentService(selectedService);
      setBookingData(prev => ({ ...prev, service: selectedService.id }));
      
      // Suggest add-ons
      const addons = SERVICES.filter(s => selectedService.addons.includes(s.id));
      setSuggestedAddons(addons);
      
      setBookingStep('askDate');
      setLoading(true);
      
      setTimeout(() => {
        let response = `Great choice! ${selectedService.name} (₹${selectedService.price}) for ${selectedService.duration}.\n\nWhat date would you like to book your appointment for? (YYYY-MM-DD)`;
        
        if (addons.length > 0) {
          response += `\n\n💡 Tip: You might also benefit from:\n${addons.map(a => `• ${a.name} (₹${a.price})`).join('\n')}`;
        }
        
        setMessages(prev => [...prev, { sender: 'bot', text: response }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle date input
    if (bookingStep === 'askDate') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askService');
        setMessages(prev => [...prev, { sender: 'bot', text: `Going back. Which service would you like to book?\n${SERVICES.map((s, i) => `${i + 1}. ${s.name} - ₹${s.price}`).join('\n')}\nPlease type the service name or number.` }]);
        return;
      }
      // Validate date format YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(input.trim())) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter a valid date in YYYY-MM-DD format, or type "back" to change the service.' }]);
        return;
      }
      // Use local date string if selectedDate is set
      let localDate = input.trim();
      if (selectedDate) {
        const pad = (n: number) => n.toString().padStart(2, '0');
        localDate = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
      }
      setBookingData(prev => ({ ...prev, date: localDate }));
      setBookingStep('askSlot');
      setLoading(true);
      // Fetch available slots from backend
      try {
        const res = await fetch(`${API_BASE}/api/available-slots?date=${encodeURIComponent(localDate)}`);
        const data = await res.json();
        setAvailableSlots(data.available || []);
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: data.available && data.available.length > 0
            ? `Here are the available slots for ${localDate}:\n${data.available.map((slot: string, i: number) => `${i + 1}. ${slot}`).join('\n')}\nPlease type the slot time (e.g., 14:00) to select, or type "back" to change the date.`
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
      setBookingStep('askName');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Great! What is your full name?' }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle full name
    if (bookingStep === 'askName') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askSlot');
        setMessages(prev => [...prev, { sender: 'bot', text: `Going back. Here are the available slots for ${bookingData.date}:\n${availableSlots.map((slot: string, i: number) => `${i + 1}. ${slot}`).join('\n')}\nPlease type the slot time (e.g., 14:00) to select.` }]);
        return;
      }
      const fullName = input.trim();
      if (!fullName || fullName.length < 2 || fullName.length > 50 || !/^[A-Za-z\s]+$/.test(fullName)) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter a valid full name (letters and spaces only, 2-50 characters).' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, fullName }));
      setBookingStep('askEmail');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Thanks! What is your email address?' }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle email
    if (bookingStep === 'askEmail') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askName');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Going back. What is your full name?' }]);
        return;
      }
      const email = input.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter a valid email address.' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, email }));
      setBookingStep('askPhone');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'And your contact number?' }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle phone
    if (bookingStep === 'askPhone') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askEmail');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Going back. What is your email address?' }]);
        return;
      }
      const phone = input.trim();
      if (!/^\d{10,15}$/.test(phone)) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Please enter a valid contact number (10-15 digits).' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, phone }));
      setBookingStep('askCompany');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: 'What is your company name? (optional, you can leave blank or type "none")' }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle company
    if (bookingStep === 'askCompany') {
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askPhone');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Going back. What is your contact number?' }]);
        return;
      }
      const company = input.trim();
      if (company.length > 50) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Company name must be at most 50 characters.' }]);
        return;
      }
      if (company && !/^[A-Za-z0-9\s.,&'-]*$/.test(company)) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Company name contains invalid characters.' }]);
        return;
      }
      setBookingData(prev => ({ ...prev, company }));
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
      // Use local date string instead of UTC
      const pad = (n: number) => n.toString().padStart(2, '0');
      const localDob = `${dob.getFullYear()}-${pad(dob.getMonth() + 1)}-${pad(dob.getDate())}`;
      setBookingData(prev => ({ ...prev, dob: localDob }));
      setBookingStep('confirm');
      setLoading(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `Please confirm your booking:\nService: ${currentService.name}\nDate: ${bookingData.date}\nSlot: ${bookingData.slot}\nFull Name: ${bookingData.fullName}\nEmail: ${bookingData.email}\nContact: ${bookingData.phone}\nCompany: ${bookingData.company || 'N/A'}\nDOB: ${localDob}\n\nType 'yes' to confirm, 'no' to cancel, or 'edit [field]' (e.g., 'edit date', 'edit slot', 'edit fullName', 'edit email', 'edit phone', 'edit dob', 'edit service').` }
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // Booking flow: handle confirmation
    if (bookingStep === 'confirm') {
      const editMatch = input.trim().toLowerCase().match(/^edit (service|date|slot|fullName|email|phone|dob)$/);
      if (editMatch) {
        const field = editMatch[1];
        if (field === 'service') {
          setBookingStep('askService');
          setMessages(prev => [...prev, { sender: 'bot', text: `Editing service. Which service would you like to book?\n${SERVICES.map((s, i) => `${i + 1}. ${s.name} - ₹${s.price}`).join('\n')}\nPlease type the service name or number.` }]);
        } else if (field === 'date') {
          setBookingStep('askDate');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing date. What date would you like to book your appointment for? (YYYY-MM-DD)' }]);
        } else if (field === 'slot') {
          setBookingStep('askSlot');
          setMessages(prev => [...prev, { sender: 'bot', text: `Editing slot. Here are the available slots for ${bookingData.date}:\n${availableSlots.map((slot: string, i: number) => `${i + 1}. ${slot}`).join('\n')}\nPlease type the slot time (e.g., 14:00) to select.` }]);
        } else if (field === 'fullName') {
          setBookingStep('askName');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing your full name. What is your full name?' }]);
        } else if (field === 'email') {
          setBookingStep('askEmail');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing your email. What is your email address?' }]);
        } else if (field === 'phone') {
          setBookingStep('askPhone');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing your contact number. What is your contact number?' }]);
        } else if (field === 'dob') {
          setBookingStep('askDob');
          setMessages(prev => [...prev, { sender: 'bot', text: 'Editing your date of birth. Please select your date of birth.' }]);
        }
        return;
      }
      if (input.trim().toLowerCase() === 'back') {
        setBookingStep('askPhone');
        setMessages(prev => [...prev, { sender: 'bot', text: 'Going back. What is your contact number?' }]);
        return;
      }
      if (input.trim().toLowerCase() === 'yes') {
        setLoading(true);
        // Submit booking to backend
        try {
          const payload = {
            name: bookingData.fullName,
            email: bookingData.email,
            phone: bookingData.phone,
            company: bookingData.company,
            dob: bookingData.dob,
            date: bookingData.date,
            time: bookingData.slot,
            service: bookingData.service
          };
          const res = await fetch(`${API_BASE}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (res.ok) {
            let confirmationText = `Thank you, ${bookingData.fullName}! Your appointment is booked for ${bookingData.date} at ${bookingData.slot} (${currentService.name}).\nContact: ${bookingData.phone}\nCompany: ${bookingData.company || 'N/A'}\nYour Consultation ID is: ${data.bookingId}\nYou will receive a confirmation email shortly.`;
            
            if (data.bookingId) {
              confirmationText += `\n\nYour ASTRO-ID: ${data.bookingId}`;
            }
            if (data.calendarLink) {
              confirmationText += `\n\nAdd to your calendar: ${data.calendarLink}`;
            }
            
            // Add payment information if service has a price
            if (currentService && currentService.price > 0) {
              confirmationText += `\n\n💰 Payment: ₹${currentService.price} for ${currentService.duration}`;
              setPaymentAmount(currentService.price);
              setShowPayment(true);
            }
            
            setMessages(prev => [
              ...prev,
              { sender: 'bot', text: confirmationText }
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
        setMessages(prev => [...prev, { sender: 'bot', text: "Please type 'yes' to confirm, 'no' to cancel, 'back' to go to the previous step, or 'edit [field]' (e.g., 'edit date', 'edit slot', 'edit name', 'edit email', 'edit phone', 'edit service')." }]);
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
          fetch(`${API_BASE}/api/bookings/${bookingId}`, {
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

      // Default: normal chat with enhanced context
  setLoading(true);
  try {
    // Update conversation context with current intent
    setConversationContext(prev => ({
      ...prev,
      lastIntent: intent,
      followUpQuestions: [...(prev.followUpQuestions || []), input]
    }));

    const botReply = await sendChatMessage(messages, input);
    const botMessage: ChatMessage = { sender: 'bot', text: botReply };
    setMessages((prev) => [...prev, botMessage]);
    

  } catch (error) {
    setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong. Would you like to talk to a human specialist?' }]);
  }
  setLoading(false);
  };

  // When a date is picked from the calendar, auto-fill input and send
  useEffect(() => {
    if (bookingStep === 'askDate' && selectedDate) {
      // Use local date string instead of UTC
      const pad = (n: number) => n.toString().padStart(2, '0');
      const localDate = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
      setInput(localDate);
      setTimeout(() => {
        sendMessage();
        setSelectedDate(null);
      }, 100);
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  // Helper to open/close with animation
  const handleToggle = () => {
    if (open) {
      setIsMinimizing(true);
      setTimeout(() => {
        setOpen(false);
        setIsMinimizing(false);
      }, 500); // match new animation duration
    } else {
      setOpen(true);
      // Add welcome message when first opened
      if (messages.length === 0) {
        setTimeout(() => {
          setMessages([{
            sender: 'bot',
            text: 'Namaste! 🙏 I am Astro-Ratan, your cosmic guide. How may I assist you today? You can ask me about astrology, numerology, or book a consultation with Dr. Tumul Raathi.'
          }]);
        }, 300);
      }
    }
  };

  // Helper to close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 350); // match fade-out duration
  };

  // Payment handling
  const handlePayment = async () => {
    try {
      // In a real implementation, this would integrate with Stripe/Razorpay
      const response = await fetch(`${API_BASE}/api/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: paymentAmount,
          bookingId: bookingId,
          service: currentService?.name,
          customerEmail: bookingData.email,
          customerName: bookingData.fullName
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: `Payment link generated! Please complete your payment to confirm your booking.\n\nPayment Link: ${data.paymentUrl}\n\nAmount: ₹${paymentAmount}` }
        ]);
        setShowPayment(false);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'Payment processing is temporarily unavailable. Please contact us directly to complete your booking.' }
        ]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Payment processing error. Please contact us directly to complete your booking.' }
      ]);
    }
  };

  // Feedback collection
  const handleFeedback = (rating: number) => {
    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: `Thank you for your feedback! ${rating >= 4 ? 'We\'re glad we could help!' : 'We\'ll work to improve our service.'}` }
    ]);
  };

  // Human handoff
  const handleHumanHandoff = () => {
    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: "I'm connecting you to a human specialist. Please wait a moment..." }
    ]);
    
    // In a real implementation, this would trigger a notification to human agents
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "A specialist will be with you shortly. In the meantime, you can also reach us at:\n📞 Phone: +91-XXXXXXXXXX\n📧 Email: info@tumulraathi.com\n\nOr use our contact form below." }
      ]);
    }, 2000);
  };



  return (
    <>
      {/* Floating Chatbot Button - always visible */}
      <div className="fixed bottom-8 right-8 z-[1000]">
        <button
          onClick={handleToggle}
          className={`w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none
            ${open || isAnimating ? 'pointer-events-none opacity-80' : ''}`}
          aria-label="Toggle Astro-Ratan"
          disabled={isAnimating}
        >
          {/* Chatbot icon */}
          <img 
            src={AVATAR_URL} 
            alt="Astro-Ratan" 
            className="w-16 h-16 object-cover cursor-pointer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="white" />
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f97316"/>
                  </svg>
                `;
              }
            }}
          />
        </button>
      </div>
      
      {/* Modern Glassmorphism Chatbot Modal - anchored to button */}
      {(open || isMinimizing) && (
        <div className="fixed inset-0 z-[1001] flex items-end justify-end" style={{ pointerEvents: 'auto' }}>
          {/* Backdrop covers the whole modal and is clickable, with ultra-smooth fade */}
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer transition-all duration-500 ${isMinimizing ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleToggle}
            style={{ zIndex: 1 }}
          />
          {/* Chat Window with ultra-smooth pop/minimize animation and opacity/scale */}
          <div className={`relative w-[90vw] max-w-md md:max-w-lg h-[80vh] md:h-[70vh] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 flex flex-col
            ${isMinimizing ? 'animate-chat-minimize opacity-0 scale-95' : 'animate-chat-pop opacity-100 scale-100'}`}
            style={{ zIndex: 2, right: '2rem', bottom: '6.5rem', position: 'absolute', transition: 'opacity 0.5s cubic-bezier(0.4,0.2,0.2,1.1), transform 0.5s cubic-bezier(0.4,0.2,0.2,1.1)' }}>
            <style>{`
              @keyframes chat-pop {
                0% { opacity: 0; transform: translateY(40px) scale(0.92); }
                60% { opacity: 1; transform: translateY(-8px) scale(1.04); }
                80% { opacity: 1; transform: translateY(0) scale(1.02); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
              }
              .animate-chat-pop {
                animation: chat-pop 0.5s cubic-bezier(0.4,0.2,0.2,1.1);
              }
              @keyframes chat-minimize {
                0% { opacity: 1; transform: translateY(0) scale(1); }
                80% { opacity: 0.7; transform: translateY(40px) scale(0.85); }
                100% { opacity: 0; transform: translateY(60px) scale(0.92); }
              }
              .animate-chat-minimize {
                animation: chat-minimize 0.5s cubic-bezier(0.4,0.2,0.2,1.1);
              }
            `}</style>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500/90 to-blue-600/90 backdrop-blur-sm rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-white/80 bg-blue-100 flex items-center justify-center">
                    <img 
                      src={AVATAR_URL} 
                      alt="Astro-Ratan" 
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="#f97316"/>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/>
                            </svg>
                          `;
                        }
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <span className="text-white font-bold text-lg">Astro-Ratan</span>
                  <p className="text-white/80 text-xs">Cosmic Assistant</p>
                </div>
              </div>
              <button
                onClick={handleToggle}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                aria-label="Minimize Astro-Ratan"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
            </div>
            
          {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-blue-50/60 to-white/60">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
              >
                {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full mr-3 border border-blue-300/50 bg-blue-100 flex items-center justify-center">
                      <img 
                        src={AVATAR_URL} 
                        alt="Astro-Ratan" 
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#f97316"/>
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/>
                              </svg>
                            `;
                          }
                        }}
                      />
                    </div>
                )}
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-sm backdrop-blur-sm ${
                    msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-white/80 text-gray-800 border border-blue-200/50'
                  }`}
                >
                    <span className="whitespace-pre-line text-sm md:text-base">{msg.text}</span>
                  </div>
                {msg.sender === 'user' && (
                    <span className="ml-3 w-8 h-8" />
                )}
              </div>
            ))}
            {loading && (
                <div className="flex justify-start mb-4 animate-fade-in">
                  <div className="w-8 h-8 rounded-full mr-3 border border-blue-300/50 bg-blue-100 flex items-center justify-center">
                    <img 
                      src={AVATAR_URL} 
                      alt="Astro-Ratan" 
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="#f97316"/>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/>
                            </svg>
                          `;
                        }
                      }}
                    />
                  </div>
                  <div className="bg-white/80 text-gray-800 border border-blue-200/50 px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm">
                                          <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                  </div>
              </div>
            )}
              
            {/* Date picker for askDate step */}
            {bookingStep === 'askDate' && (
              <div className="flex flex-col items-center mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select appointment date"
                  className="px-4 py-3 rounded-lg border border-orange-200/50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white/80 backdrop-blur-sm w-full"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
                <button
                  className="mt-3 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                  disabled={!selectedDate}
                  onClick={() => {
                    if (selectedDate) {
                      const pad = (n: number) => n.toString().padStart(2, '0');
                      const localDate = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
                      setInput(localDate);
                      setTimeout(() => {
                        sendMessage();
                      }, 100);
                    }
                  }}
                >
                  Confirm Date
                </button>
              </div>
            )}

            {/* Slot selection buttons for askSlot step */}
            {bookingStep === 'askSlot' && availableSlots.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-300/50 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-semibold shadow-sm backdrop-blur-sm"
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
                <div className="flex flex-col items-center mb-4">
                <DatePicker
                  selected={dob}
                  onChange={(date: Date | null) => setDob(date)}
                  maxDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select your date of birth"
                    className="px-4 py-3 rounded-lg border border-orange-200/50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white/80 backdrop-blur-sm w-full"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                />
                <button
                    className="mt-3 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
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

            {/* Payment Section */}
            {showPayment && (
              <div className="flex flex-col items-center mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Complete Your Payment</h3>
                <p className="text-sm text-gray-600 mb-3">Amount: ₹{paymentAmount}</p>
                <div className="flex gap-2">
                  <button
                    onClick={handlePayment}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
                  >
                    💳 Pay Now
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-full text-sm font-semibold hover:bg-gray-600 transition-all duration-200"
                  >
                    Later
                  </button>
                </div>
              </div>
            )}



            {/* Human Handoff Button */}
            {messages.length > 3 && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleHumanHandoff}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
                >
                  👨‍💼 Talk to Human
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
            
            {/* Input Area */}
            <div className="px-6 py-4 bg-white/90 border-t border-blue-200/50 flex items-center gap-3 rounded-b-2xl">
              {/* Bot avatar with floating and hover effect */}
              <div className="relative group">
                <div className="w-10 h-10 rounded-full bg-white/70 border border-blue-200/60 shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:shadow-blue-300/60 animate-float-bot cursor-pointer">
                  <img 
                    src={AVATAR_URL} 
                    alt="Astro-Ratan" 
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <circle cx='12' cy='12' r='10' fill='#f97316'/>
                            <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' fill='white'/>
                          </svg>
                        `;
                      }
                    }}
                  />
                </div>
                {/* Floating animation keyframes */}
                <style>{`
                  @keyframes float-bot {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                  }
                  .animate-float-bot { animation: float-bot 2.5s ease-in-out infinite; }
                `}</style>
              </div>
                              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 rounded-full border border-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base bg-white/80 backdrop-blur-sm"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-3 transition-all duration-200 focus:outline-none disabled:opacity-50 shadow-sm"
                aria-label="Send message"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M3 12l18-7-7 18-2.5-7L3 12z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;