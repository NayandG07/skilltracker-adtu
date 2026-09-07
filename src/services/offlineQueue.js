import { get, set } from 'idb-keyval';

const QUEUE_KEY = 'skilltracker_offline_submissions_queue';

export const OfflineQueueService = {
  getPendingSubmissions: async () => {
    try {
      const items = await get(QUEUE_KEY);
      return items || [];
    } catch (e) {
      console.error('Failed to read offline queue from IndexedDB:', e);
      return [];
    }
  },

  enqueueSubmission: async (submission) => {
    try {
      const current = (await get(QUEUE_KEY)) || [];
      const updated = [...current, { ...submission, queuedAt: new Date().toISOString() }];
      await set(QUEUE_KEY, updated);
      return updated;
    } catch (e) {
      console.error('Failed to write to offline queue in IndexedDB:', e);
      return [];
    }
  },

  clearQueue: async () => {
    try {
      await set(QUEUE_KEY, []);
      return [];
    } catch (e) {
      console.error('Failed to clear offline queue:', e);
      return [];
    }
  },

  removeSubmission: async (id) => {
    try {
      const current = (await get(QUEUE_KEY)) || [];
      const updated = current.filter((item) => item.id !== id);
      await set(QUEUE_KEY, updated);
      return updated;
    } catch (e) {
      console.error('Failed to remove submission from offline queue:', e);
      return [];
    }
  }
};
