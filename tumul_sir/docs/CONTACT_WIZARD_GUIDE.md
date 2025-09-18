## Contact Wizard Implementation Guide

This guide documents the new multi-step Contact/Booking Wizard for Dr. Tumul Raathi’s corporate astrologer portfolio. It complements `CONTACT_WIZARD_SCHEMA.md` and covers setup, environment flags, component structure, validation, submission, backend expectations, deployment, and troubleshooting.

Refer to `CONTACT_WIZARD_SCHEMA.md` for detailed types and payload mapping.

---

### 1) Overview
- Purpose: Provide a professional, corporate-friendly, multi-step contact/booking experience.
- Migration plan: The wizard is gated behind a feature flag so the legacy `ContactForm` keeps working for chatbot and existing flows.
- Backward compatibility: Uses the existing `POST /api/contact` endpoint with optional new fields.

---

### 2) Environment Flag
- Add in frontend env (local recommended): `tumul_sir/.env.local`
```
VITE_CONTACT_WIZARD_ENABLED=true
```
- Optional default (committed): `tumul_sir/.env` with `false` to keep off by default.
- Read in code:
```ts
const WIZARD_ENABLED = import.meta.env.VITE_CONTACT_WIZARD_ENABLED === 'true';
```

---

### 3) Component Structure
- Wizard container and steps live in `src/components/ContactWizard/`:
  - `index.tsx` — owns state machine, navigation, submission
  - `IdentityStep.tsx` — name, emails, phone, company, etc.
  - `EngagementStep.tsx` — intent (corporate/personal/inquiry), service, org size, industry, outcomes
  - `MeetingStep.tsx` — meeting type, date, slot (auto-fetch), attachment URL
  - `ReviewConsentStep.tsx` — summary, terms/privacy consent, submit

- Toggle in `src/components/ContactModal.tsx`:
```tsx
{WIZARD_ENABLED ? <ContactWizard /> : <ContactForm />}
```

---

### 4) Types and Payload Mapping
- Types live in `src/types/contact-wizard.ts` and include:
  - `IdentityStep`, `EngagementStep`, `MeetingStep`, `ConsentStep`, `ContactWizardState`
  - `ContactWizardPayload` (backward-compatible fields)
  - `mapWizardToPayload(state)` helper to transform wizard state into server payload

Key mapping (abbreviated):
```ts
name = identity.fullName
email = identity.corporateEmail || identity.email
phone = identity.phone
company = identity.company
service = engagement.service
date = meeting.selectedDate
time = meeting.slot
// Optional extensions passed-through when present
```

---

### 5) Validation
Client-side minimal guards are implemented:
- Identity: full name (2+ chars), at least one email, phone required
- Engagement: `intentPath` and `service` required
- Meeting: `meetingType`, `selectedDate`, `slot` required; `inPersonCity` required if `in_person`
- Consent: `termsAccepted` and `privacyAccepted` must be true before enabling submit

You can enhance:
- Email format checks, disallow free domains for corporate path (hint only)
- E.164 phone number check
- Future-date constraint for selected date

---

### 6) Slot Availability
- Uses existing helper `fetchAvailableSlots(date)` from `src/lib/chat.ts`.
- `MeetingStep.tsx` calls it when `selectedDate` changes and populates `availableSlots`.

API contract:
```
GET /api/available-slots?date=YYYY-MM-DD -> { available: string[] }
```

---

### 7) Submission Flow
- Submission is wired in `ContactWizard/index.tsx` using:
  - `mapWizardToPayload(state)` to build payload
  - `bookContact(payload)` to call `POST /api/contact`

- Required fields before submit (to avoid server 400): `name`, `email`, `phone`, `service`, `date`, `time`.

- On success: shows a basic `alert` with ASTRO-ID. Replace with a toast or custom success UI as desired.

---

### 8) Backend Expectations (Non-breaking)
- Existing endpoint: `POST /api/contact` (in `server/index.js`)
  - Continues to require `name`, `email`, `phone`, `service`, `date`, and `time` (and `dob` if used elsewhere)
  - Accepts optional extensions (roleTitle, intentPath, meetingType, etc.)
  - Keeps ASTRO-ID generation, duplicate slot guard, email notification
  - Payment fields remain optional (`paymentStatus`, `paidAmount`)

- Data model: `server/models/Contact.js` already includes several optional fields (payment and lead-qualification). Add any additional fields you plan to persist.

---

### 9) Styling and UI
- Uses existing UI primitives:
  - `Input` — `src/components/ui/input.tsx`
  - `Label` — `src/components/ui/label.tsx`
  - `YellowMetallicButton` — `src/components/ui/yellow-metallic-button.tsx`

Adjust spacing and layout via Tailwind classes in each step.

---

### 10) Deployment Notes
- Vercel/hosted envs: set `VITE_CONTACT_WIZARD_ENABLED` in project environment variables for Preview/Production.
- Remember: frontend env changes require a rebuild/restart.

---

### 11) Migration Plan
1. Develop and test wizard locally with flag ON.
2. Keep legacy `ContactForm` for chatbot and fallback flows.
3. Roll out wizard in Preview. Validate bookings, emails, and slots.
4. When stable, enable flag in Production.
5. Optionally deprecate/remove legacy `ContactForm` after a safe window.

---

### 12) Troubleshooting
- Wizard not showing: ensure `.env.local` has `VITE_CONTACT_WIZARD_ENABLED=true` and dev server restarted.
- API 400/500 on submit: check required fields and server logs; verify `VITE_API_BASE` if using remote server.
- Slots empty: confirm `/api/available-slots` implementation and that selected date is valid.
- TypeScript import errors: verify `paths` alias `@` is configured in `tsconfig` and the file paths exist.

---

### 13) Next Enhancements
- Stronger validation (email/phone/timezone)
- Real service selector from `src/lib/services.ts`
- Replace `alert` with toast + success screen showing ASTRO-ID and calendar links
- Anti-spam: reCAPTCHA v3, rate limiting
- Corporate email hints and validations
- CRM webhooks (HubSpot/Pipedrive) keyed by ASTRO-ID


