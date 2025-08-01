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
    fullPrice: 2500,
    minimumPayment: 625, // 25% of full price
    remainingAmount: 1875,
    duration: '60 minutes',
    description: 'Comprehensive Vedic astrology consultation for personal and business guidance'
  },
  {
    id: 'numerology',
    name: 'Numerology Analysis',
    fullPrice: 800,
    minimumPayment: 200, // 25% of full price
    remainingAmount: 600,
    duration: '45 minutes',
    description: 'Detailed numerology analysis for life path and destiny numbers'
  },
  {
    id: 'commercial-vaastu',
    name: 'Commercial Vaastu',
    fullPrice: 2000,
    minimumPayment: 500, // 25% of full price
    remainingAmount: 1500,
    duration: '90 minutes',
    description: 'Vaastu consultation for commercial properties and business spaces'
  },
  {
    id: 'signature-analysis',
    name: 'Signature Analysis',
    fullPrice: 1500,
    minimumPayment: 375, // 25% of full price
    remainingAmount: 1125,
    duration: '45 minutes',
    description: 'Professional signature analysis for personality insights'
  },
  {
    id: 'nameology',
    name: 'Nameology Consultation',
    fullPrice: 1200,
    minimumPayment: 300, // 25% of full price
    remainingAmount: 900,
    duration: '45 minutes',
    description: 'Name analysis and recommendations for better life outcomes'
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return SERVICES.find(service => service.id === id);
};

export const getServiceByName = (name: string): Service | undefined => {
  return SERVICES.find(service => service.name === name);
}; 