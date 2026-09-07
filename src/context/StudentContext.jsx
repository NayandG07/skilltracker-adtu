import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENT_RECORD,
  COHORT_LEADERBOARD,
  INITIAL_DSA_PROBLEMS,
  INITIAL_LABS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { OfflineQueueService } from '../services/offlineQueue';
import { NotificationManager, registerToastListener } from '../services/notificationManager';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  // 1. Single Source of Truth for Student Record (8.95 CGPA, 92.4% Attendance)
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('skilltracker_student_v2');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_RECORD;
  });

  // 2. Labs State
  const [labs, setLabs] = useState(() => {
    const saved = localStorage.getItem('skilltracker_labs_v2');
    return saved ? JSON.parse(saved) : INITIAL_LABS;
  });

  // 3. DSA Problems State
  const [dsaProblems, setDsaProblems] = useState(() => {
    const saved = localStorage.getItem('skilltracker_dsa_v2');
    return saved ? JSON.parse(saved) : INITIAL_DSA_PROBLEMS;
  });

  // 4. Cohort Leaderboard State
  const [leaderboard, setLeaderboard] = useState(COHORT_LEADERBOARD);
  const [maskEmails, setMaskEmails] = useState(true);

  // 5. Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('skilltracker_notifications_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  const [activeToast, setActiveToast] = useState(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(
    NotificationManager.getPermission()
  );

  // Register toast listener so NotificationManager.dispatch automatically triggers the visible toast
  useEffect(() => {
    registerToastListener((toastData) => {
      setActiveToast(toastData);
    });
  }, []);

  // 6. Network & Offline Queue
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [offlineSyncMessage, setOfflineSyncMessage] = useState(null);

  // 7. Modals
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);

  // Persist student record
  useEffect(() => {
    localStorage.setItem('skilltracker_student_v2', JSON.stringify(student));
  }, [student]);

  // Persist labs
  useEffect(() => {
    localStorage.setItem('skilltracker_labs_v2', JSON.stringify(labs));
  }, [labs]);

  // Persist DSA problems
  useEffect(() => {
    localStorage.setItem('skilltracker_dsa_v2', JSON.stringify(dsaProblems));
  }, [dsaProblems]);

  // Persist notifications
  useEffect(() => {
    localStorage.setItem('skilltracker_notifications_v2', JSON.stringify(notifications));
  }, [notifications]);

  // Read initial offline queue
  useEffect(() => {
    OfflineQueueService.getPendingSubmissions().then(setOfflineQueue);
  }, []);

  // Online / Offline Listeners with automatic background sync
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      const pending = await OfflineQueueService.getPendingSubmissions();
      if (pending && pending.length > 0) {
        setOfflineSyncMessage(`Reconnected to university network. Synchronized ${pending.length} pending offline submission(s)!`);
        
        // Notify user via system notification
        NotificationManager.dispatch({
          title: "Offline Submissions Synced",
          body: `Successfully submitted ${pending.length} queued lab assignment(s) to university servers.`,
          tag: 'sync-alert'
        });

        await OfflineQueueService.clearQueue();
        setOfflineQueue([]);

        setTimeout(() => {
          setOfflineSyncMessage(null);
        }, 5000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Submit Lab
  const submitLab = async (labId, code) => {
    const timestamp = new Date().toISOString();

    if (!isOnline) {
      // Offline mode: Queue to IndexedDB
      const queuedItem = { id: `${labId}-${Date.now()}`, labId, code, submittedAt: timestamp };
      const updatedQueue = await OfflineQueueService.enqueueSubmission(queuedItem);
      setOfflineQueue(updatedQueue);

      setLabs((prev) =>
        prev.map((lab) =>
          lab.id === labId
            ? { ...lab, status: 'submitted', submissionPayload: { code, submittedAt: timestamp, offlineQueued: true } }
            : lab
        )
      );

      return { success: true, offline: true };
    }

    // Online mode: Direct submission
    setLabs((prev) =>
      prev.map((lab) =>
        lab.id === labId
          ? { ...lab, status: 'submitted', submissionPayload: { code, submittedAt: timestamp, offlineQueued: false } }
          : lab
      )
    );

    // Increment student completed labs count
    setStudent((prev) => ({
      ...prev,
      totalLabsCompleted: Math.min(prev.totalLabsAssigned, prev.totalLabsCompleted + 1)
    }));

    // Trigger confirmation notification
    NotificationManager.dispatch({
      title: 'Lab Submitted Successfully',
      body: `Your submission for ${labId.toUpperCase()} has been received for diagnostic evaluation.`,
      tag: 'submission-' + labId
    });

    return { success: true, offline: false };
  };

  // Toggle DSA Problem Solved
  const toggleDsaProblem = (problemId) => {
    setDsaProblems((prev) => {
      let nowSolved = false;
      const updated = prev.map((p) => {
        if (p.id === problemId) {
          nowSolved = !p.solved;
          return {
            ...p,
            solved: nowSolved,
            solvedAt: nowSolved ? new Date().toISOString().split('T')[0] : undefined
          };
        }
        return p;
      });

      // Update student total problems solved
      const solvedCount = updated.filter((p) => p.solved).length;
      setStudent((s) => ({
        ...s,
        totalProblemsSolved: 140 + solvedCount
      }));

      // If solved, subtle vibration
      if (nowSolved && 'vibrate' in navigator) {
        navigator.vibrate?.(15);
      }

      return updated;
    });
  };

  // Notifications API actions
  const requestNotificationPermission = async () => {
    const result = await NotificationManager.requestPermission();
    setNotificationPermission(result);
    return result;
  };

  const triggerTestNotification = async () => {
    const sent = await NotificationManager.sendTestNotification();
    setNotificationPermission(NotificationManager.getPermission());
    
    // Also push to in-app notification list
    const newNotif = {
      id: 'notif-test-' + Date.now(),
      title: 'Real-time Push Notification Verified',
      body: 'System push notifications are active for Nayandeep Goswami (ADTU/0/2024-28/BCSM/047).',
      type: 'system',
      timestamp: 'Just now',
      read: false,
      priority: 'high'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return sent;
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <StudentContext.Provider
      value={{
        student,
        setStudent,
        labs,
        submitLab,
        dsaProblems,
        toggleDsaProblem,
        leaderboard,
        maskEmails,
        setMaskEmails,
        notifications,
        unreadNotificationsCount,
        activeToast,
        setActiveToast,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        notificationPermission,
        requestNotificationPermission,
        triggerTestNotification,
        markAllNotificationsAsRead,
        isOnline,
        offlineQueue,
        offlineSyncMessage,
        setOfflineSyncMessage,
        isCorrectionModalOpen,
        setIsCorrectionModalOpen
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
