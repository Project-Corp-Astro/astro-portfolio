export const SERVICES = {
  'vedic-astrology': {
    name: 'Vedic Astrology Consultation',
    fullPrice: 2500,
    minimumPayment: 625,
    remainingAmount: 1875,
    duration: '60 minutes'
  },
  'numerology': {
    name: 'Numerology Analysis',
    fullPrice: 800,
    minimumPayment: 200,
    remainingAmount: 600,
    duration: '45 minutes'
  },
  'commercial-vaastu': {
    name: 'Commercial Vaastu',
    fullPrice: 2000,
    minimumPayment: 500,
    remainingAmount: 1500,
    duration: '90 minutes'
  },
  'signature-analysis': {
    name: 'Signature Analysis',
    fullPrice: 1500,
    minimumPayment: 375,
    remainingAmount: 1125,
    duration: '45 minutes'
  },
  'nameology': {
    name: 'Nameology Consultation',
    fullPrice: 1200,
    minimumPayment: 300,
    remainingAmount: 900,
    duration: '45 minutes'
  }
};

export const getServiceConfig = (serviceId) => {
  return SERVICES[serviceId] || null;
}; 