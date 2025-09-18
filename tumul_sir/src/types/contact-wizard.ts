// src/types/contact-wizard.ts

export type IntentPath = 'corporate' | 'personal' | 'inquiry';
export type MeetingType = 'zoom' | 'google_meet' | 'in_person';

export interface IdentityStep {
  fullName: string;            // Required; 2..50 letters/spaces
  roleTitle?: string;          // Optional; e.g., Founder, CHRO
  company?: string;            // Optional; required when intentPath = corporate
  corporateEmail?: string;     // Optional; prefer for corporate path
  email: string;               // Required; used if corporateEmail not provided
  phone: string;               // Required; E.164 format
  timezone?: string;           // Optional; e.g., 'Asia/Kolkata'
  preferredLanguage?: string;  // Optional; e.g., 'en', 'hi'
}

export interface EngagementStep {
  intentPath: IntentPath;      // Required
  service: string;             // Required; use existing services catalog ids
  organizationSize?: string;   // Optional; '1-10' | '11-50' | '51-200' | '200+'
  industry?: string;           // Optional
  locations?: string[];        // Optional; cities/countries
  urgency?: 'low' | 'medium' | 'high';
  expectedOutcomes?: string;   // Optional; 0..500 chars
}

export interface MeetingStep {
  meetingType: MeetingType;    // Required
  inPersonCity?: string;       // Required if meetingType = 'in_person'
  preferredDates: string[];    // ISO YYYY-MM-DD; at least 1
  selectedDate: string;        // ISO; one of preferredDates
  availableSlots: string[];    // Filled from API for selectedDate
  slot: string;                // Required; HH:mm from availableSlots
  attachmentUrl?: string;      // Optional; brief/RFP/deck URL
}

export interface ConsentStep {
  termsAccepted: boolean;      // Required true
  privacyAccepted: boolean;    // Required true
  contactConsent?: boolean;    // Optional marketing/updates consent
}

export interface ContactWizardState {
  identity: IdentityStep;
  engagement: EngagementStep;
  meeting: MeetingStep;
  consent: ConsentStep;
  currentStep: 1 | 2 | 3 | 4;
  isSubmitting: boolean;
  error?: string;
}

export type ContactWizardPayload = {
  // Existing server-required fields (keep names as server expects):
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  dob?: string;                // Keep supported; optional for corporate path
  date: string;                // YYYY-MM-DD
  time: string;                // HH:mm

  // New optional fields (non-breaking):
  roleTitle?: string;
  corporateEmail?: string;
  timezone?: string;
  preferredLanguage?: string;
  intentPath?: IntentPath;
  organizationSize?: string;
  industry?: string;
  locations?: string[];
  urgency?: 'low' | 'medium' | 'high';
  expectedOutcomes?: string;
  meetingType?: MeetingType;
  inPersonCity?: string;
  attachmentUrl?: string;

  // Payments (existing behavior):
  paymentStatus?: 'pending' | 'partial_paid' | 'fully_paid' | 'failed' | 'refunded';
  paidAmount?: number;
};

// Helper to map wizard state to server payload
export function mapWizardToPayload(state: ContactWizardState): ContactWizardPayload {
  return {
    name: state.identity.fullName,
    email: state.identity.corporateEmail || state.identity.email,
    phone: state.identity.phone,
    company: state.identity.company,
    service: state.engagement.service,
    date: state.meeting.selectedDate,
    time: state.meeting.slot,

    // Optional extensions
    roleTitle: state.identity.roleTitle,
    timezone: state.identity.timezone,
    preferredLanguage: state.identity.preferredLanguage,
    intentPath: state.engagement.intentPath,
    organizationSize: state.engagement.organizationSize,
    industry: state.engagement.industry,
    locations: state.engagement.locations,
    urgency: state.engagement.urgency,
    expectedOutcomes: state.engagement.expectedOutcomes,
    meetingType: state.meeting.meetingType,
    inPersonCity: state.meeting.inPersonCity,
    attachmentUrl: state.meeting.attachmentUrl,
  };
}