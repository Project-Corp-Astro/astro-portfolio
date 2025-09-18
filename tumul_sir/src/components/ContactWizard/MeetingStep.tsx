import { useEffect } from "react";
import { type MeetingStep as MeetingStepType } from "@/types/contact-wizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YellowMetallicButton } from "@/components/ui/yellow-metallic-button";
import { fetchAvailableSlots } from "@/lib/chat";

type Props = {
  value: MeetingStepType;
  onChange: (next: MeetingStepType) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function MeetingStep({ value, onChange, onNext, onBack }: Props) {
  useEffect(() => {
    const run = async () => {
      if (value.selectedDate) {
        const available = await fetchAvailableSlots(value.selectedDate);
        onChange({ ...value, availableSlots: available });
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.selectedDate]);

  const canContinue = value.meetingType && value.selectedDate && value.slot && (value.meetingType !== "in_person" || !!value.inPersonCity);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="meetingType">Meeting Type</Label>
          <select
            id="meetingType"
            className="w-full border rounded px-3 py-2"
            value={value.meetingType}
            onChange={e => onChange({ ...value, meetingType: e.target.value as MeetingStepType["meetingType"] })}
          >
            <option value="zoom">Zoom</option>
            <option value="google_meet">Google Meet</option>
            <option value="in_person">In-person</option>
          </select>
        </div>
        {value.meetingType === "in_person" && (
          <div>
            <Label htmlFor="inPersonCity">City</Label>
            <Input
              id="inPersonCity"
              placeholder="City for in-person"
              value={value.inPersonCity || ""}
              onChange={e => onChange({ ...value, inPersonCity: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="selectedDate">Date</Label>
          <Input
            id="selectedDate"
            type="date"
            value={value.selectedDate || ""}
            onChange={e => onChange({ ...value, selectedDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="slot">Slot</Label>
          <select
            id="slot"
            className="w-full border rounded px-3 py-2"
            value={value.slot}
            onChange={e => onChange({ ...value, slot: e.target.value })}
            disabled={!value.availableSlots?.length}
          >
            <option value="" disabled>Select a slot</option>
            {value.availableSlots?.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="attachmentUrl">Attachment URL (optional)</Label>
        <Input
          id="attachmentUrl"
          placeholder="Link to brief/RFP/deck"
          value={value.attachmentUrl || ""}
          onChange={e => onChange({ ...value, attachmentUrl: e.target.value })}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <YellowMetallicButton onClick={onBack} className="w-1/2">Back</YellowMetallicButton>
        <YellowMetallicButton onClick={onNext} className="w-1/2" disabled={!canContinue}>Continue</YellowMetallicButton>
      </div>
    </div>
  );
}