import { TimeSlot } from '@utils';
export type { TimeSlot };

export interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialties: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  languages: string[];
  avatarUrl: string;
  availability: string;
  isVerified: boolean;
  about: string;
}

export type ConsultationMode = 'video' | 'audio' | 'chat';

export interface Booking {
  id: string;
  doctor: Doctor;
  slot: TimeSlot;
  formattedDate: string;
  bookingCreatedAt: string;
  status: 'confirmed' | 'cancelled';
  consultationFee: number;
  mode?: ConsultationMode;
  isOfflineQueued?: boolean;
}
