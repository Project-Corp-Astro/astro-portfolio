import { type EngagementStep as EngagementStepType } from "@/types/contact-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YellowMetallicButton } from "@/components/ui/yellow-metallic-button";

type Props = {
  value: EngagementStepType;
  onChange: (next: EngagementStepType) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function EngagementStep({ value, onChange, onNext, onBack }: Props) {
  const canContinue = value.intentPath && value.service;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="intentPath">Intent</Label>
          <select
            id="intentPath"
            className="w-full border rounded px-3 py-2"
            value={value.intentPath}
            onChange={e => onChange({ ...value, intentPath: e.target.value as EngagementStepType["intentPath"] })}
          >
            <option value="corporate">Corporate Consultation</option>
            <option value="personal">Personal Consultation</option>
            <option value="inquiry">General Inquiry</option>
          </select>
        </div>
        <div>
          <Label htmlFor="service">Service</Label>
          <Input
            id="service"
            placeholder="service id (from lib/services)"
            value={value.service}
            onChange={e => onChange({ ...value, service: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organizationSize">Organization Size</Label>
          <Input
            id="organizationSize"
            placeholder="e.g., 11-50"
            value={value.organizationSize || ""}
            onChange={e => onChange({ ...value, organizationSize: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            placeholder="e.g., Fintech"
            value={value.industry || ""}
            onChange={e => onChange({ ...value, industry: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="expectedOutcomes">Expected Outcomes</Label>
        <Input
          id="expectedOutcomes"
          placeholder="Brief goals for this engagement"
          value={value.expectedOutcomes || ""}
          onChange={e => onChange({ ...value, expectedOutcomes: e.target.value })}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <YellowMetallicButton onClick={onBack} className="w-1/2">Back</YellowMetallicButton>
        <YellowMetallicButton onClick={onNext} className="w-1/2" disabled={!canContinue}>Continue</YellowMetallicButton>
      </div>
    </div>
  );
}