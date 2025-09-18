import { type ContactWizardState } from "@/types/contact-wizard";
import { YellowMetallicButton } from "@/components/ui/yellow-metallic-button";
import { Label } from "@/components/ui/label";

type Props = {
  value: ContactWizardState;
  onChange: (next: ContactWizardState) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function ReviewConsentStep({ value, onChange, onBack, onSubmit }: Props) {
  const canSubmit = value.consent.termsAccepted && value.consent.privacyAccepted && !value.isSubmitting;

  const toggle = (key: "termsAccepted" | "privacyAccepted" | "contactConsent") => {
    onChange({
      ...value,
      consent: { ...value.consent, [key]: !value.consent[key] }
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded border p-3 text-sm">
        <div><strong>Name:</strong> {value.identity.fullName}</div>
        <div><strong>Email:</strong> {value.identity.corporateEmail || value.identity.email}</div>
        <div><strong>Phone:</strong> {value.identity.phone}</div>
        <div><strong>Company:</strong> {value.identity.company || "-"}</div>
        <div><strong>Service:</strong> {value.engagement.service}</div>
        <div><strong>Date/Time:</strong> {value.meeting.selectedDate} {value.meeting.slot}</div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={value.consent.termsAccepted} onChange={() => toggle("termsAccepted")} />
          <Label>Agree to Terms</Label>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={value.consent.privacyAccepted} onChange={() => toggle("privacyAccepted")} />
          <Label>Agree to Privacy Policy</Label>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={value.consent.contactConsent || false} onChange={() => toggle("contactConsent")} />
          <Label>Allow updates via email/phone (optional)</Label>
        </label>
      </div>
    
        {value.error && <p className="text-red-500 text-sm">{value.error}</p>}
      <div className="flex gap-3 pt-2">
        <YellowMetallicButton onClick={onBack} className="w-1/2" disabled={value.isSubmitting}>Back</YellowMetallicButton>
        <YellowMetallicButton className="w-1/2" disabled={!canSubmit} onClick={onSubmit}>
            {value.isSubmitting ? "Submitting..." : "Submit"} 
        </YellowMetallicButton>
      </div>
    </div>
  );
}