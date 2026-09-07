import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, WifiOff } from "lucide-react";
import { useStudent } from "../../context/StudentContext";

export const MobileHeader = () => {
  const { student, unreadNotificationsCount, setIsNotificationDrawerOpen, isOnline } = useStudent();

  return (
    <div className="lg:hidden fixed top-3 left-3 right-3 z-40 max-w-md mx-auto pointer-events-none">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 34, delay: 0.05 }}
        className="pointer-events-auto apple-liquid-glass rounded-full px-4 py-2.5 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <Link to="/student" className="flex items-center gap-2.5 group select-none">
            <div className="w-7 h-7 rounded-xl bg-white border border-[#e6e3da] shadow-sm flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-[4px] th-bg" />
            </div>
            <span className="font-bold text-base tracking-tight text-[#1a1918]">SkillTracker</span>
          </Link>
          <div className="flex items-center gap-2">
            {!isOnline && (
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#b87728] bg-[#b87728]/10 border border-[#b87728]/25 px-2 py-0.5 rounded-full animate-pulse">
                <WifiOff className="w-3 h-3" /><span>Offline</span>
              </div>
            )}
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f4f2eb]/80 text-[#78756c] border border-[#e6e3da]">Sem 5A</span>
            <motion.button whileTap={{ scale: 0.88 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}
              type="button" onClick={() => setIsNotificationDrawerOpen(true)} aria-label="Open notifications"
              className="relative p-2 rounded-full text-[#4f4c46] hover:text-[#1a1918] hover:bg-black/5 transition-colors">
              <Bell className="w-[18px] h-[18px] stroke-[2]" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full th-bg ring-2 ring-white" />
              )}
            </motion.button>
            <motion.div whileTap={{ scale: 0.88 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
              <Link to="/student/profile" aria-label="View Profile"
                className="w-7 h-7 rounded-full bg-[#f4f2eb] border border-[#e6e3da] flex items-center justify-center text-[11px] font-black text-[#1a1918] hover:th-text transition-colors select-none">
                {student.name.charAt(0)}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </div>
  );
};