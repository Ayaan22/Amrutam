import { create } from 'zustand';
import {
  getOfflineBookingsQueue,
  getOfflineOrdersQueue,
  syncAllPendingData,
} from '../services/offlineSync';
import { useAppStore } from './appStore';

export interface NetworkState {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  lastSyncResult: { syncedBookings: number; syncedOrders: number } | null;
  showSyncSuccessToast: boolean;
  setOnlineStatus: (isOnline: boolean) => Promise<void>;
  toggleOnlineStatus: () => Promise<void>;
  triggerSync: () => Promise<void>;
  updatePendingCount: () => void;
  dismissSyncToast: () => void;
}

export const useNetworkStore = create<NetworkState>((set, get) => ({
  isOnline: true,
  isSyncing: false,
  pendingCount: 0,
  lastSyncResult: null,
  showSyncSuccessToast: false,

  updatePendingCount: () => {
    const bookings = getOfflineBookingsQueue();
    const orders = getOfflineOrdersQueue();
    set({ pendingCount: bookings.length + orders.length });
  },

  setOnlineStatus: async (isOnline: boolean) => {
    const wasOffline = !get().isOnline;
    set({ isOnline });

    // When connection transitions from offline to online, auto-sync
    if (wasOffline && isOnline) {
      await get().triggerSync();
    }
  },

  toggleOnlineStatus: async () => {
    const newStatus = !get().isOnline;
    await get().setOnlineStatus(newStatus);
  },

  triggerSync: async () => {
    const { isOnline, isSyncing } = get();
    if (!isOnline || isSyncing) return;

    set({ isSyncing: true });

    try {
      const result = await syncAllPendingData();

      // Mark all local bookings in appStore as confirmed / synced
      const currentBookings = useAppStore.getState().bookings;
      const updatedBookings = currentBookings.map((b) => ({
        ...b,
        isOfflineQueued: false,
      }));
      useAppStore.setState({ bookings: updatedBookings });

      if (useAppStore.getState().activeBooking) {
        const active = useAppStore.getState().activeBooking;
        if (active) {
          useAppStore.setState({
            activeBooking: { ...active, isOfflineQueued: false },
          });
        }
      }

      set({
        isSyncing: false,
        pendingCount: 0,
        lastSyncResult: result,
        showSyncSuccessToast: result.syncedBookings > 0 || result.syncedOrders > 0,
      });
    } catch (e) {
      console.warn('Sync failed', e);
      set({ isSyncing: false });
    }
  },

  dismissSyncToast: () => {
    set({ showSyncSuccessToast: false });
  },
}));

export default useNetworkStore;
