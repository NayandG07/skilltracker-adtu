import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';

export const FloatingNotificationToast = () => {
  const { activeToast, setActiveToast, notificationPermission, requestNotificationPermission } = useStudent();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeToast, setActiveToast]);

  if (!activeToast) return null;

  const handleClick = () => {
    if (activeToast.actionUrl) {
      navigate(activeToast.actionUrl);
    }
    setActiveToast(null);
  };

  return (
    <div className="fixed top-4 left-3 right-3 z-50 max-w-md mx-auto pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeToast?.title ?? 'toast'}
          data-testid="floating-notification-toast"
          initial={{ opacity: 0, y: -32, scale: 0.92, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, scale: 0.96, filter: 'blur(2px)' }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          className="pointer-events-auto apple-liquid-glass rounded-3xl p-4 shadow-2xl border border-white/90 cursor-pointer select-none"
          onClick={handleClick}
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#d97757] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Bell className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d97757]">
                  SkillTracker Push Notification
                </span>
                <span className="text-[11px] font-medium text-[#78756c]">Just now</span>
              </div>

              <h4 className="text-sm sm:text-base font-black text-[#1a1918] mt-0.5 leading-snug">
                {activeToast.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#4f4c46] mt-1 leading-relaxed line-clamp-2">
                {activeToast.body}
              </p>

              {notificationPermission !== 'granted' && (
                <div className="mt-2.5 pt-2 border-t border-[#e6e3da] flex items-center justify-between">
                  <span className="text-xs text-[#b87728] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Enable OS Push
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      requestNotificationPermission();
                    }}
                    className="px-2.5 py-1 text-xs font-bold bg-[#d97757] hover:bg-[#c15f3e] text-white rounded-lg shadow-xs"
                  >
                    Allow
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveToast(null);
              }}
              className="text-[#78756c] hover:text-[#1a1918] p-1 rounded-lg hover:bg-black/5"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
