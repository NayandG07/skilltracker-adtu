/**
 * NotificationManager
 * Ultra-robust Web Notifications API, Service Worker Push, and Web Audio chime engine
 */

let toastListener = null;

export const registerToastListener = (callback) => {
  toastListener = callback;
};

// Elegant Web Audio synthetic chime (Anthropic-style warm double-tap chime)
export const playNotificationSound = async () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const now = ctx.currentTime;

    // First tone (E5 - 659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.14, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.22);

    // Second tone (G#5 - 830.61 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(830.61, now + 0.12);
    gain2.gain.setValueAtTime(0.18, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.42);
  } catch (err) {
    console.debug('Audio playback note:', err);
  }
};

export const NotificationManager = {
  isSupported: () => {
    return typeof window !== 'undefined' && 'Notification' in window;
  },

  getPermission: () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    return Notification.permission;
  },

  requestPermission: async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return 'denied';
    }
  },

  /**
   * Dispatch system notification and trigger visible in-app dynamic island banner
   */
  dispatch: async ({
    title,
    body,
    icon = '/icons/icon-192.png',
    tag = 'skilltracker-alert',
    data = {},
    actionUrl = '/student'
  }) => {
    // 1. Instantly fire audio feedback
    playNotificationSound();

    // 2. Tactile vibration feedback on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([120, 60, 120]);
      } catch (e) {
        // Ignored
      }
    }

    // 3. Immediately dispatch visible in-app liquid toast so the student SEES the notification instantly
    if (toastListener) {
      toastListener({ title, body, actionUrl });
    }

    // 4. Trigger OS-level system push notification
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        let sentViaSw = false;

        if ('serviceWorker' in navigator) {
          try {
            // Race with 800ms timeout to avoid hanging if SW is not ready
            const registration = await Promise.race([
              navigator.serviceWorker.ready,
              new Promise((_, reject) => setTimeout(() => reject(new Error('SW timeout')), 800))
            ]);

            if (registration && registration.showNotification) {
              await registration.showNotification(title, {
                body,
                icon,
                badge: '/icons/logo.svg',
                tag: tag + '-' + Date.now(),
                data: { ...data, url: actionUrl },
                renotify: true,
                requireInteraction: false
              });
              sentViaSw = true;
            }
          } catch (swErr) {
            // Fallback to standard window Notification
          }
        }

        if (!sentViaSw) {
          const notification = new Notification(title, {
            body,
            icon,
            tag: tag + '-' + Date.now(),
            data: { ...data, url: actionUrl }
          });

          notification.onclick = function () {
            window.focus();
            if (actionUrl) {
              window.location.href = actionUrl;
            }
            this.close();
          };
        }

        return true;
      } catch (err) {
        console.error('System notification dispatch error:', err);
      }
    }

    return true;
  },

  /**
   * Triggers an immediate verification test notification
   */
  sendTestNotification: async () => {
    let currentPerm = NotificationManager.getPermission();
    if (currentPerm === 'default') {
      try {
        currentPerm = await NotificationManager.requestPermission();
      } catch (e) {
        // Fall back gracefully
      }
    }

    return await NotificationManager.dispatch({
      title: 'Lab Deadline Alert Active',
      body: 'Hi Nayandeep! Real-time deadline monitoring is active. CS502 Virtual Memory lab is due in 4 hours.',
      tag: 'test-push',
      actionUrl: '/student/list'
    });
  }
};
