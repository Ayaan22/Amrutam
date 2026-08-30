import { useAppStore } from '../appStore';
import { Doctor, TimeSlot, Booking } from '../../features/consultation/types';

const mockDoctor: Doctor = {
  id: 'd1',
  name: 'Dr. Anandita Verma',
  degree: 'BAMS, MD (Ayurveda)',
  specialties: ['Panchakarma', 'Gut Health'],
  experienceYears: 12,
  rating: 4.9,
  reviewCount: 340,
  consultationFee: 800,
  about: 'Senior Ayurvedic Physician specializing in chronic metabolic and digestive balance.',
  avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500',
  languages: ['English', 'Hindi'],
  availability: 'Mon - Fri',
  isVerified: true,
};

const mockSlot: TimeSlot = {
  id: 'slot-1',
  time: '10:00 AM',
  hour: 10,
  minute: 0,
  isExpired: false,
};

const mockBooking: Booking = {
  id: 'b1',
  doctor: mockDoctor,
  slot: mockSlot,
  formattedDate: 'Today, 10:00 AM',
  status: 'confirmed',
  consultationFee: 800,
  bookingCreatedAt: new Date().toISOString(),
  mode: 'video',
};

describe('AppStore / Consultation Bookings Unit Tests', () => {
  beforeEach(() => {
    useAppStore.getState().clearAllBookings();
  });

  it('should initialize with no active booking and empty bookings array', () => {
    const state = useAppStore.getState();
    expect(state.activeBooking).toBeNull();
    expect(state.bookings).toEqual([]);
  });

  it('should save a new booking and set it as activeBooking', () => {
    useAppStore.getState().setBooking(mockBooking);

    const state = useAppStore.getState();
    expect(state.activeBooking).toBeDefined();
    expect(state.activeBooking?.id).toBe('b1');
    expect(state.bookings.length).toBe(1);
    expect(state.bookings[0].doctor.id).toBe('d1');
  });

  it('should cancel a booking by ID and clear activeBooking if matching', () => {
    useAppStore.getState().setBooking(mockBooking);
    expect(useAppStore.getState().activeBooking).not.toBeNull();

    useAppStore.getState().cancelBooking('b1');

    const state = useAppStore.getState();
    expect(state.activeBooking).toBeNull();
    expect(state.bookings.length).toBe(0);
  });

  it('should clear all bookings', () => {
    useAppStore.getState().setBooking(mockBooking);
    useAppStore.getState().clearAllBookings();

    const state = useAppStore.getState();
    expect(state.activeBooking).toBeNull();
    expect(state.bookings).toEqual([]);
  });
});
