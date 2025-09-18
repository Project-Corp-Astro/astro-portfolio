## Contact Wizard Schema (Corporate-grade)

This document specifies the new multi-step contact/booking wizard for Dr. Tumul Raathi’s corporate astrologer portfolio. It is designed to run alongside the existing `ContactForm` and `POST /api/contact` endpoint and can be toggled via a feature flag.

### Goals
- Professional, trust-building, corporate-friendly flow
- Progressive steps with validation and slot availability
- Backward-compatible server payload (no breaking changes)

---

### Feature Flag
- Env var: `VITE_CONTACT_WIZARD_ENABLED` (`true` | `false`)
- Client read: `const WIZARD_ENABLED = import.meta.env.VITE_CONTACT_WIZARD_ENABLED === 'true'`
- `ContactModal` renders wizard if enabled, else current form.

---

### Step Layout
1) Identity
2) Engagement Details
3) Meeting & Schedule
4) Review & Consent

---

### TypeScript Types

```ts
// src/types/contact-wizard.ts

export type IntentPath = 'corporate' | 'personal' | 'inquiry';
export type MeetingType = 'zoom' | 'google_meet' | 'in_person';

export interface IdentityStep {
  fullName: string;              // Required; 2..50 letters/spaces
  roleTitle?: string;            // Optional; e.g., Founder, CHRO
  company?: string;              // Optional; required when intentPath = corporate
  corporateEmail?: string;       // Optional; validate domain when intentPath = corporate
  email: string;                 // Required; fallback if corporateEmail not provided
  phone: string;                 // Required; E.164
  timezone?: string;             // Optional; default detect
  preferredLanguage?: string;    // Optional; e.g., 'en', 'hi'
}

export interface EngagementStep {
  intentPath: IntentPath;        // Required
  service: string;               // Required; use existing services catalog ids
  organizationSize?: string;     // Optional; e.g., '1-10', '11-50', '51-200', '200+'
  industry?: string;             // Optional; free text or dropdown
  locations?: string[];          // Optional; cities/countries for in-person/vaastu
  urgency?: 'low' | 'medium' | 'high';
  expectedOutcomes?: string;     // Optional; 0..500 chars
}

export interface MeetingStep {
  meetingType: MeetingType;      // Required
  inPersonCity?: string;         // Required if meetingType = in_person
  preferredDates: string[];      // ISO YYYY-MM-DD; at least 1
  selectedDate: string;          // ISO; one of preferredDates
  availableSlots: string[];      // Populated via API for selectedDate
  slot: string;                  // Required; HH:mm from availableSlots
  attachmentUrl?: string;        // Optional; URL to brief/RFP/deck
}

export interface ConsentStep {
  termsAccepted: boolean;        // Required true
  privacyAccepted: boolean;      // Required true
  contactConsent?: boolean;      // Optional marketing/updates consent
}

export interface ContactWizardState {
  identity: IdentityStep;
  engagement: EngagementStep;
  meeting: MeetingStep;
  consent: ConsentStep;
  // Derived/UI state
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
  dob?: string;          // Optional if not used in corporate path; keep supported
  date: string;          // YYYY-MM-DD
  time: string;          // HH:mm

  // New non-breaking optional fields:
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

  // Payments (as in current flow):
  paymentStatus?: 'pending' | 'partial_paid' | 'fully_paid' | 'failed' | 'refunded';
  paidAmount?: number;
};
```

---

### Validation Rules (client-side)
- fullName: letters/spaces only, length 2..50
- email/corporateEmail: RFC-ish regex; if `intentPath = corporate` and `corporateEmail` present, discourage common free domains
- phone: E.164 format, require country code
- company: required if `intentPath = corporate`
- service: required; must be valid service id from `lib/services`
- preferredDates: at least one ISO date in the future
- selectedDate + slot: slot must be in `availableSlots` returned by API
- meetingType: if `in_person`, require `inPersonCity`
- termsAccepted, privacyAccepted: must be true
- expectedOutcomes: max 500 chars

---

### Step State Machine
```txt
1 (Identity) -> 2 (Engagement) -> 3 (Meeting & Schedule) -> 4 (Review & Consent) -> Submit

Guards:
- 1 complete => valid name/email/phone, and company if corporate
- 2 complete => valid intentPath + service
- 3 complete => valid meetingType, selectedDate, slot
- 4 complete => terms & privacy accepted
```

---

### API Contracts (Client)
- Fetch slots (existing): `GET /api/available-slots?date=YYYY-MM-DD` → `{ available: string[] }`
- Submit booking (existing): `POST /api/contact` with `ContactWizardPayload`
  - Keep existing requireds: `name`, `email`, `phone`, `service`, `date`, `time` (and `dob` if you still use it)
  - Add new fields as optional; server should ignore unknowns or persist when recognized

---

### Server Notes (Non-breaking)
- Extend `server/models/Contact.js` to include new optional fields listed above (strings/arrays as appropriate)
- `POST /api/contact` should:
  - Continue to enforce existing required fields
  - Accept and persist new optional fields when present
  - Keep ASTRO-ID generation, duplicate slot guard, and email sending
  - Optionally include an `.ics` attachment and echo `intentPath`/`meetingType` in the email body

---

### UI Composition (Suggested)
- `ContactWizard/IdentityStep.tsx`
- `ContactWizard/EngagementStep.tsx`
- `ContactWizard/MeetingStep.tsx`
- `ContactWizard/ReviewConsentStep.tsx`
- `ContactWizard/index.tsx` (or `ContactWizard.tsx`) to manage state machine
- Replace `ContactForm` reference in `ContactModal` with `ContactWizard` when `WIZARD_ENABLED`

---

### Mapping to Existing Payload
```ts
// Example mapper before submit
function mapWizardToPayload(state: ContactWizardState): ContactWizardPayload {
  return {
    name: state.identity.fullName,
    email: state.identity.corporateEmail || state.identity.email,
    phone: state.identity.phone,
    company: state.identity.company,
    service: state.engagement.service,
    date: state.meeting.selectedDate,
    time: state.meeting.slot,
    // Optional/extensions
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
```

---

### Implementation Checklist
- Add env flag and conditional render in `ContactModal`
- Create wizard components and state types
- Implement per-step validation; block Next until valid
- Integrate slot fetching on date change and when `selectedDate` switches
- Map to payload; POST to `/api/contact`
- On success: show ASTRO-ID, add calendar CTA, and confirmation copy
- After migration: deprecate old `ContactForm`


