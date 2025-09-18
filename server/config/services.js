export const SERVICES = {
  'vedic-astrology': {
    name: 'Vedic Astrology Consultation',
    fullPrice: 4999,
    minimumPayment: 1249,
    remainingAmount: 3750,
    duration: '60 minutes'
  },
  'numerology': {
    name: 'Numerology & Nameology',
    fullPrice: 1999,
    minimumPayment: 499,
    remainingAmount: 1500,
    duration: '45 minutes'
  },
  'commercial-vaastu': {
    name: 'Commercial Vaastu',
    fullPrice: 7999,
    minimumPayment: 1999,
    remainingAmount: 6000,
    duration: '90 minutes'
  },
  'signature-analysis': {
    name: 'Signature Analysis',
    fullPrice: 3999,
    minimumPayment: 1000,
    remainingAmount: 2999,
    duration: '45 minutes'
  },
  'nameology': {
    name: 'Palmistry & Hand Reading',
    fullPrice: 2999,
    minimumPayment: 499,
    remainingAmount: 2500,
    duration: '45 minutes'
  },
  'mind-meditation-guidance': {
    name: 'Mind & Meditation Guidance',
    fullPrice: 5999,
    minimumPayment: 999,
    remainingAmount: 5000,
    duration: '45 minutes'
  },
  'energy-healing-chakra': {
    name: 'Energy Healing & Chakra Balancing',
    fullPrice: 6999,
    minimumPayment: 1500,
    remainingAmount: 5500,
    duration: '45 minutes'
  },
  'business-success-coaching': {
    name: 'Business Success Coaching',
    fullPrice: 8999,
    minimumPayment: 2000,
    remainingAmount: 6999,
    duration: '45 minutes'
  }
};

export const getServiceConfig = (serviceId) => {
  return SERVICES[serviceId] || null;
}; 