import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Check, Sparkles, AlertCircle, Volume2 } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const NotificationDrawer = () => {
  const {
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markAllNotificationsAsRead,
    triggerTestNotification,
    notificationPermission,
    requestNotificationPermission
  } = useStudent();

  const [activeTab, setActiveTab] = useState('all');
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isNotificationDrawerOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'deadlines') return n.type === 'lab_deadline';
    if (activeTab === 'streaks') return n.type === 'streak_alert';
    if (activeTab === 'system') return n.type === 'system';
    return true;
  });

  const handleSendTest = async () => {
    setTestSending(true);
    setTestResult(null);
    try {
      const success = await triggerTestNotification();
      setTestResult(success ? 'success' : 'permission_needed');
    } catch (e) {
      setTestResult('error');
    } finally {
      setTestSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/35 backdrop-blur-xs transition-opacity"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      {/* Slide-over Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 35 }}
        className="relative w-full max-w-md bg-[#faf9f5] border-l border-[#e6e3da] shadow-2xl flex flex-col h-full z-10"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#e6e3da] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#d97757]/10 text-[#d97757] flex items-center justify-center">
              <Bell className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1a1918]">Notification Center</h3>
              <p className="text-xs text-[#78756c]">Real-time academic alerts</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="p-2 rounded-xl text-[#78756c] hover:text-[#1a1918] hover:bg-[#f4f2eb] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Notification Permission & Verification Banner */}
        <div className="p-4 mx-4 mt-4 rounded-2xl bg-white border border-[#e6e3da] shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#d97757]" />
                <h4 className="text-sm font-bold text-[#1a1918]">Web Notifications Engine</h4>
              </div>
              <p className="text-xs text-[#78756c] mt-0.5">
                Status:{' '}
                <span
                  className={`font-semibold ${
                    notificationPermission === 'granted' ? 'text-[#3e7b54]' : 'text-[#b87728]'
                  }`}
                >
                  {notificationPermission === 'granted' ? 'System Push Active' : 'Permission Required'}
                </span>
              </p>
            </div>

            {notificationPermission !== 'granted' && (
              <button
                type="button"
                onClick={requestNotificationPermission}
                className="px-3 py-1.5 text-xs font-semibold bg-[#d97757] hover:bg-[#c15f3e] text-white rounded-xl transition-colors shadow-sm"
              >
                Enable
              </button>
            )}
          </div>

          {/* Test Push Button */}
          <button
            type="button"
            onClick={handleSendTest}
            disabled={testSending}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#f4f2eb] hover:bg-[#edeae2] text-xs font-semibold text-[#1a1918] border border-[#e6e3da] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            <Volume2 className="w-4 h-4 text-[#d97757]" />
            <span>{testSending ? 'Sending Alert...' : 'Send Test Push Notification'}</span>
          </button>

          {testResult === 'success' && (
            <div className="text-xs text-[#3e7b54] font-medium flex items-center gap-1.5 bg-[#3e7b54]/10 p-2 rounded-lg">
              <Check className="w-3.5 h-3.5" />
              <span>Notification and audio chime dispatched successfully!</span>
            </div>
          )}

          {testResult === 'permission_needed' && (
            <div className="text-xs text-[#b87728] font-medium flex items-center gap-1.5 bg-[#b87728]/10 p-2 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Please grant notification permissions in your browser bar.</span>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 pt-4 pb-2 text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'deadlines', label: 'Deadlines' },
            { id: 'streaks', label: 'Streaks' },
            { id: 'system', label: 'Academic' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1a1918] text-white shadow-sm'
                  : 'bg-white text-[#78756c] hover:text-[#1a1918] border border-[#e6e3da]'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            type="button"
            onClick={markAllNotificationsAsRead}
            className="ml-auto text-xs font-medium text-[#78756c] hover:text-[#d97757] transition-colors"
          >
            Mark read
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 text-[#9e9a90] text-sm">
              No notifications in this category.
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all ${
                  !n.read
                    ? 'bg-white border-[#d97757]/40 shadow-sm'
                    : 'bg-[#f4f2eb] border-[#e6e3da] opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!n.read && <span className="w-2 h-2 rounded-full bg-[#d97757]" />}
                    <h4 className="text-sm font-bold text-[#1a1918]">{n.title}</h4>
                  </div>
                  <span className="text-xs text-[#9e9a90] shrink-0 font-medium">{n.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4f4c46] mt-1.5 leading-relaxed">{n.body}</p>
                {n.actionUrl && (
                  <div className="mt-2.5 pt-2 border-t border-[#e6e3da] flex items-center justify-between text-xs">
                    <span className="text-[#78756c]">Action required</span>
                    <a
                      href={n.actionUrl}
                      onClick={() => setIsNotificationDrawerOpen(false)}
                      className="text-[#d97757] hover:underline font-bold"
                    >
                      View Details &rarr;
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
