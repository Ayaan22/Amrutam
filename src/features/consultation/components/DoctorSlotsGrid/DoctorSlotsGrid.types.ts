import { TimeSlot } from '@utils';

export interface DoctorSlotsGridProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  todayFormatted: string;
  isSlotBooked: (slotId: string, slotTime: string) => boolean;
  onSelectSlot: (slot: TimeSlot) => void;
}
