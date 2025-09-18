import { useState, useEffect } from "react";
import { type IdentityStep as IdentityStepType } from "@/types/contact-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YellowMetallicButton } from "@/components/ui/yellow-metallic-button";

type Props = {
  value: IdentityStepType;
  onChange: (next: IdentityStepType) => void;
  onNext: () => void;
};

function validateIdentity(v: IdentityStepType) {
  const errors: Partial<Record<keyof IdentityStepType, string>> = {};
  if (!v.fullName.trim() || v.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!v.email.trim() && !v.corporateEmail?.trim()) errors.email = "Provide an email.";
  if (!v.phone.trim()) errors.phone = "Provide your phone with country code.";
  return errors;
}

export default function IdentityStep({ value, onChange, onNext }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof IdentityStepType, string>>>({});

  useEffect(() => {
    // live validation (optional)
  }, [value]);

  const handleNext = () => {
    const newErrors = validateIdentity(value);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) onNext();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" value={value.fullName} onChange={e => onChange({ ...value, fullName: e.target.value })} />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="roleTitle">Role / Title</Label>
          <Input id="roleTitle" value={value.roleTitle || ""} onChange={e => onChange({ ...value, roleTitle: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" value={value.company || ""} onChange={e => onChange({ ...value, company: e.target.value })} />
        </div>
      </div>

      <div>
        <Label htmlFor="corporateEmail">Corporate Email (preferred)</Label>
        <Input id="corporateEmail" type="email" value={value.corporateEmail || ""} onChange={e => onChange({ ...value, corporateEmail: e.target.value })} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Personal/Backup Email</Label>
          <Input id="email" type="email" value={value.email} onChange={e => onChange({ ...value, email: e.target.value })} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone (with country code)</Label>
          <Input id="phone" value={value.phone} onChange={e => onChange({ ...value, phone: e.target.value })} />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Input id="timezone" placeholder="e.g., Asia/Kolkata" value={value.timezone || ""} onChange={e => onChange({ ...value, timezone: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="preferredLanguage">Preferred Language</Label>
          <Input id="preferredLanguage" placeholder="e.g., en, hi" value={value.preferredLanguage || ""} onChange={e => onChange({ ...value, preferredLanguage: e.target.value })} />
        </div>
      </div>

      <div className="pt-2">
        <YellowMetallicButton onClick={handleNext} className="w-full">Continue</YellowMetallicButton>
      </div>
    </div>
  );
}