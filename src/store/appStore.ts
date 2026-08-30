import { create } from 'zustand';
import { Booking } from '@features/consultation/types';

export interface AppState {
  activeBooking: Booking | null;
  bookings: Booking[];
  setBooking: (booking: Booking) => void;
  cancelBooking: (bookingId?: string) => void;
  clearAllBookings: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeBooking: null,
  bookings: [],
  setBooking: (booking: Booking) =>
    set((state) => ({
      activeBooking: booking,
      bookings: [booking, ...state.bookings.filter((b) => b.id !== booking.id)],
    })),
  cancelBooking: (bookingId?: string) =>
    set((state) => {
      const targetId = bookingId || state.activeBooking?.id;
      return {
        activeBooking: state.activeBooking?.id === targetId ? null : state.activeBooking,
        bookings: state.bookings.filter((b) => b.id !== targetId),
      };
    }),
  clearAllBookings: () => set({ activeBooking: null, bookings: [] }),
}));

export default useAppStore;
