import { Booking } from '../../types';

export interface UpcomingSlotHeroCardProps {
  booking: Booking;
  onJoinCall: () => void;
  onCancelBooking: () => void;
  onDoctorPress: () => void;
}
