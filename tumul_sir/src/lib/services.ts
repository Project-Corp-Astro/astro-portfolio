export interface Service {
  id: string;
  name: string;
  fullPrice: number;
  minimumPayment: number;
  remainingAmount: number;
  duration: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: 'vedic-astrology',
    name: 'Vedic Astrology Consultation',
    fullPrice: 4999,
    minimumPayment: 1249,
    remainingAmount: 3750,
    duration: '60 minutes',
    description: 'Comprehensive Vedic astrology consultation for personal and business guidance'
  },
  {
    id: 'numerology',
    name: 'Numerology & Nameology',
    fullPrice: 1999,
    minimumPayment: 499,
    remainingAmount: 1500,
    duration: '45 minutes',
    description: 'Detailed numerology analysis for life path and destiny numbers'
  },
  {
    id: 'commercial-vaastu',
    name: 'Commercial Vaastu',
    fullPrice: 7999,
    minimumPayment: 1999,
    remainingAmount: 6000,
    duration: '90 minutes',
    description: 'Vaastu consultation for commercial properties and business spaces'
  },
  {
    id: 'signature-analysis',
    name: 'Signature Analysis',
    fullPrice: 3999,
    minimumPayment: 1000,
    remainingAmount: 2999,
    duration: '45 minutes',
    description: 'Professional signature analysis for personality insights'
  },
  {
    id: 'nameology',
    name: 'Palmistry & Hand Reading',
    fullPrice: 2999,
    minimumPayment: 499,
    remainingAmount: 2500,
    duration: '45 minutes',
    description: 'Hand reading for personality, career potential, and life path'
  },
  {
    id: 'mind-meditation-guidance',
    name: 'Mind & Meditation Guidance',
    fullPrice: 5999,
    minimumPayment: 999,
    remainingAmount: 5000,
    duration: '45 minutes',
    description: 'Personalized meditation and mindfulness guidance'
  },
  {
    id: 'energy-healing-chakra',
    name: 'Energy Healing & Chakra Balancing',
    fullPrice: 6999,
    minimumPayment: 1500,
    remainingAmount: 5500,
    duration: '45 minutes',
    description: 'Energy healing to restore balance and vitality'
  },
  {
    id: 'business-success-coaching',
    name: 'Business Success Coaching',
    fullPrice: 8999,
    minimumPayment: 2000,
    remainingAmount: 6999,
    duration: '45 minutes',
    description: 'Strategic coaching combining ancient principles and modern strategy'
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return SERVICES.find(service => service.id === id);
};

export const getServiceByName = (name: string): Service | undefined => {
  return SERVICES.find(service => service.name === name);
}; 