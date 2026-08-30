import { storage } from './storage';
import { Booking } from '../features/consultation/types';
import { CartItem } from '../store/cartStore';

export interface OfflineOrder {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
  createdAt: string;
  syncStatus: 'pending_sync' | 'synced';
}

export const OFFLINE_QUEUE_KEYS = {
  BOOKINGS: 'offline_bookings_queue',
  ORDERS: 'offline_orders_queue',
} as const;

/**
 * Get Queued Offline Bookings
 */
export const getOfflineBookingsQueue = (): Booking[] => {
  try {
    const raw = storage.getString(OFFLINE_QUEUE_KEYS.BOOKINGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read offline bookings queue', e);
    return [];
  }
};

/**
 * Enqueue an Offline Booking
 */
export const enqueueOfflineBooking = (booking: Booking): void => {
  const queue = getOfflineBookingsQueue();
  const updated = [booking, ...queue.filter((b) => b.id !== booking.id)];
  try {
    storage.set(OFFLINE_QUEUE_KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to enqueue offline booking', e);
  }
};

/**
 * Remove an Offline Booking from queue
 */
export const removeOfflineBooking = (bookingId: string): void => {
  const queue = getOfflineBookingsQueue();
  const updated = queue.filter((b) => b.id !== bookingId);
  try {
    storage.set(OFFLINE_QUEUE_KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to remove offline booking from queue', e);
  }
};

/**
 * Clear Offline Bookings Queue
 */
export const clearOfflineBookingsQueue = (): void => {
  try {
    storage.remove(OFFLINE_QUEUE_KEYS.BOOKINGS);
  } catch (e) {
    console.warn('Failed to clear offline bookings queue', e);
  }
};

/**
 * Get Queued Offline Orders
 */
export const getOfflineOrdersQueue = (): OfflineOrder[] => {
  try {
    const raw = storage.getString(OFFLINE_QUEUE_KEYS.ORDERS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read offline orders queue', e);
    return [];
  }
};

/**
 * Enqueue an Offline Order
 */
export const enqueueOfflineOrder = (order: OfflineOrder): void => {
  const queue = getOfflineOrdersQueue();
  const updated = [order, ...queue.filter((o) => o.orderId !== order.orderId)];
  try {
    storage.set(OFFLINE_QUEUE_KEYS.ORDERS, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to enqueue offline order', e);
  }
};

/**
 * Clear Offline Orders Queue
 */
export const clearOfflineOrdersQueue = (): void => {
  try {
    storage.remove(OFFLINE_QUEUE_KEYS.ORDERS);
  } catch (e) {
    console.warn('Failed to clear offline orders queue', e);
  }
};

/**
 * Sync All Queued Offline Data (Bookings & Orders) with Cloud
 */
export const syncAllPendingData = async (): Promise<{
  syncedBookings: number;
  syncedOrders: number;
}> => {
  const bookingsQueue = getOfflineBookingsQueue();
  const ordersQueue = getOfflineOrdersQueue();

  const totalBookings = bookingsQueue.length;
  const totalOrders = ordersQueue.length;

  if (totalBookings === 0 && totalOrders === 0) {
    return { syncedBookings: 0, syncedOrders: 0 };
  }

  // Simulate network synchronization latency with cloud server
  await new Promise((resolve) => setTimeout(() => resolve(undefined), 800));

  // Clear queues once synchronized
  clearOfflineBookingsQueue();
  clearOfflineOrdersQueue();

  return {
    syncedBookings: totalBookings,
    syncedOrders: totalOrders,
  };
};
