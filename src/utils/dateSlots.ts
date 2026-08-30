export interface TimeSlot {
  id: string;
  time: string;
  hour: number;
  minute: number;
  isExpired: boolean;
}

const DEFAULT_BASE_SLOTS = [
  { time: '09:00 AM', hour: 9, minute: 0 },
  { time: '10:30 AM', hour: 10, minute: 30 },
  { time: '11:45 AM', hour: 11, minute: 45 },
  { time: '02:00 PM', hour: 14, minute: 0 },
  { time: '03:30 PM', hour: 15, minute: 30 },
  { time: '05:00 PM', hour: 17, minute: 0 },
  { time: '06:30 PM', hour: 18, minute: 30 },
  { time: '08:00 PM', hour: 20, minute: 0 },
];

export const getTodayFormattedDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getTodaySlots = (): TimeSlot[] => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  return DEFAULT_BASE_SLOTS.map((slot, index) => {
    const isExpired =
      slot.hour < currentHour ||
      (slot.hour === currentHour && slot.minute <= currentMinute);

    return {
      id: `slot-${index}-${slot.hour}-${slot.minute}`,
      time: slot.time,
      hour: slot.hour,
      minute: slot.minute,
      isExpired,
    };
  });
};
