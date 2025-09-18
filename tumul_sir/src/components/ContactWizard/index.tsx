import { useState } from "react";
import { mapWizardToPayload, type ContactWizardState } from "@/types/contact-wizard";
import { bookContact } from "@/lib/chat";

import IdentityStep from "./IdentityStep";
import EngagementStep from "./EngagementStep";
import MeetingStep from "./MeetingStep";
import ReviewConsentStep from "./ReviewConsentStep";

const initialState: ContactWizardState = {
  identity: {
    fullName: "",
    roleTitle: "",
    company: "",
    corporateEmail: "",
    email: "",
    phone: "",
    timezone: "",
    preferredLanguage: ""
  },
  engagement: {
    intentPath: "corporate",
    service: "",
    organizationSize: "",
    industry: "",
    locations: [],
    urgency: "medium",
    expectedOutcomes: ""
  },
  meeting: {
    meetingType: "zoom",
    inPersonCity: "",
    preferredDates: [],
    selectedDate: "",
    availableSlots: [],
    slot: "",
    attachmentUrl: ""
  },
  consent: {
    termsAccepted: false,
    privacyAccepted: false,
    contactConsent: false
  },
  currentStep: 1,
  isSubmitting: false
};

export default function ContactWizard() {
  const [state, setState] = useState<ContactWizardState>(initialState);

  const goNext = () => {
    if (state.currentStep < 4) {
      setState(prev => ({ ...prev, currentStep: (prev.currentStep + 1) as 2 | 3 | 4 }));
    }
  };

  const goBack = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: (prev.currentStep - 1) as 1 | 2 | 3 }));
    }
  };

  async function submitWizard() {
    if (state.isSubmitting) return;
    if (!state.consent.termsAccepted || !state.consent.privacyAccepted) return;

    const payload = mapWizardToPayload(state);

    if (!payload.name || !payload.email || !payload.phone || !payload.service || !payload.date || !payload.time) {
      setState(prev => ({ ...prev, error: "Missing required fields before submit." }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isSubmitting: true, error: undefined }));
      const res = await bookContact(payload);
      const confirmation = `Booked! ID: ${res.bookingId || "N/A"}`;
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: undefined
      }));
      alert(confirmation);
    } catch (err: any) {
      setState(prev => ({ ...prev, isSubmitting: false, error: err?.message || "Failed to submit." }));
    }
  }

  return (
    <div className="w-full">
      {state.currentStep === 1 && (
        <IdentityStep
          value={state.identity}
          onChange={(identity) => setState(prev => ({ ...prev, identity }))}
          onNext={goNext}
        />
      )}
      {state.currentStep === 2 && (
        <EngagementStep
          value={state.engagement}
          onChange={(engagement) => setState(prev => ({ ...prev, engagement }))}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {state.currentStep === 3 && (
        <MeetingStep
          value={state.meeting}
          onChange={(meeting) => setState(prev => ({ ...prev, meeting }))}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {state.currentStep === 4 && (
        <ReviewConsentStep
          value={state}
          onChange={(updated) => setState(updated)}
          onBack={goBack}
          onSubmit={submitWizard}
        />
      )}
    </div>
  );
}