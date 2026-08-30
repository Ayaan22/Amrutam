import {
  enqueueOfflineBooking,
  getOfflineBookingsQueue,
  removeOfflineBooking,
  clearOfflineBookingsQueue,
  enqueueOfflineOrder,
  getOfflineOrdersQueue,
  clearOfflineOrdersQueue,
  syncAllPendingData,
  OfflineOrder,
} from '../offlineSync';
import { useNetworkStore } from '../../store/networkStore';
import { useAppStore } from '../../store/appStore';
import { storage } from '../storage';
import { Booking, Doctor, TimeSlot } from '../../features/consultation/types';

const mockDoctor: Doctor = {
  id: 'doc-1',
  name: 'Dr. Anandita Verma',
  degree: 'BAMS, MD (Ayurveda)',
  specialties: ['Panchakarma'],
  experienceYears: 12,
  rating: 4.9,
  reviewCount: 340,
  consultationFee: 800,
  about: 'Senior Ayurvedic Physician',
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
  id: 'b-offline-1',
  doctor: mockDoctor,
  slot: mockSlot,
  formattedDate: 'Today, 10:00 AM',
  bookingCreatedAt: new Date().toISOString(),
  status: 'confirmed',
  consultationFee: 800,
  isOfflineQueued: true,
};

const mockOrder: OfflineOrder = {
  orderId: 'AMR-ORD-123456',
  items: [],
  totalAmount: 1499,
  itemCount: 2,
  createdAt: new Date().toISOString(),
  syncStatus: 'pending_sync',
};

describe('Offline Sync Engine Unit Tests', () => {
  beforeEach(() => {
    storage.clearAll();
    useAppStore.getState().clearAllBookings();
  });

  it('should enqueue and retrieve offline bookings from MMKV', () => {
    expect(getOfflineBookingsQueue()).toEqual([]);

    enqueueOfflineBooking(mockBooking);
    const queue = getOfflineBookingsQueue();
    expect(queue.length).toBe(1);
    expect(queue[0].id).toBe('b-offline-1');
  });

  it('should remove an offline booking from the queue', () => {
    enqueueOfflineBooking(mockBooking);
    expect(getOfflineBookingsQueue().length).toBe(1);

    removeOfflineBooking('b-offline-1');
    expect(getOfflineBookingsQueue().length).toBe(0);
  });

  it('should clear all offline bookings', () => {
    enqueueOfflineBooking(mockBooking);
    clearOfflineBookingsQueue();
    expect(getOfflineBookingsQueue()).toEqual([]);
  });

  it('should enqueue and retrieve offline orders from MMKV', () => {
    expect(getOfflineOrdersQueue()).toEqual([]);

    enqueueOfflineOrder(mockOrder);
    const orders = getOfflineOrdersQueue();
    expect(orders.length).toBe(1);
    expect(orders[0].orderId).toBe('AMR-ORD-123456');
  });

  it('should clear all offline orders', () => {
    enqueueOfflineOrder(mockOrder);
    clearOfflineOrdersQueue();
    expect(getOfflineOrdersQueue()).toEqual([]);
  });

  it('should synchronize all pending offline bookings and orders and clear the queues', async () => {
    enqueueOfflineBooking(mockBooking);
    enqueueOfflineOrder(mockOrder);

    expect(getOfflineBookingsQueue().length).toBe(1);
    expect(getOfflineOrdersQueue().length).toBe(1);

    const result = await syncAllPendingData();

    expect(result.syncedBookings).toBe(1);
    expect(result.syncedOrders).toBe(1);
    expect(getOfflineBookingsQueue().length).toBe(0);
    expect(getOfflineOrdersQueue().length).toBe(0);
  });

  it('should auto-sync when network transitions from offline to online', async () => {
    // 1. Set offline
    await useNetworkStore.getState().setOnlineStatus(false);
    expect(useNetworkStore.getState().isOnline).toBe(false);

    // 2. Add offline booking to app store and sync queue
    useAppStore.getState().setBooking(mockBooking);
    enqueueOfflineBooking(mockBooking);
    useNetworkStore.getState().updatePendingCount();

    expect(useNetworkStore.getState().pendingCount).toBe(1);
    expect(useAppStore.getState().bookings[0].isOfflineQueued).toBe(true);

    // 3. Set online -> triggers auto sync
    await useNetworkStore.getState().setOnlineStatus(true);

    expect(useNetworkStore.getState().isOnline).toBe(true);
    expect(useNetworkStore.getState().pendingCount).toBe(0);
    expect(useNetworkStore.getState().showSyncSuccessToast).toBe(true);
    expect(useAppStore.getState().bookings[0].isOfflineQueued).toBe(false);
  });
});
