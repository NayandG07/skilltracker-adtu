import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Terminal, FlaskConical, Trophy, User } from "lucide-react";
import { useStudent } from "../../context/StudentContext";

export const MobileNavBar = () => {
  const { labs, student } = useStudent();
  const location = useLocation();
  const activeLabsCount = labs.filter((l) => l.status === "active").length;

  const triggerHaptic = () => {
    if ("vibrate" in navigator) {
      try { navigator.vibrate(12); } catch (e) {}
    }
  };

  const navItems = [
    { to: "/student",             label: "Home",     icon: Home,         end: true },
    { to: "/student/dsa-track",   label: "Practice", icon: Terminal },
    { to: "/student/list",        label: "Labs",     icon: FlaskConical, badge: activeLabsCount > 0 ? activeLabsCount : null },
    { to: "/student/leaderboard", label: "Ranks",    icon: Trophy },
    { to: "/student/profile",     label: "Profile",  icon: User,         isAvatar: true },
  ];

  return (
    <div className="lg:hidden fixed bottom-4 left-3 right-3 z-40 max-w-md mx-auto pointer-events-none">
      <nav aria-label="Mobile Floating Navigation"
        className="pointer-events-auto apple-liquid-glass rounded-full px-2 py-1.5 shadow-2xl">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.end} onClick={triggerHaptic}
                className="relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center select-none">
                {isActive && (
                  <motion.div
                    layoutId="liquidTabPill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className="absolute inset-0 th-bg-subtle th-border-subtle rounded-full border shadow-sm"
                  />
                )}
                <motion.div whileTap={{ scale: 0.82 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="relative z-10 flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center w-7 h-7">
                    {item.isAvatar ? (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? "th-bg text-white shadow-sm ring-2 th-ring ring-offset-1 ring-offset-white"
                          : "bg-[#f4f2eb] text-[#504e48] border border-[#e6e3da]"
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                    ) : (
                      <Icon className={`w-5 h-5 transition-all duration-200 ${
                        isActive ? "th-text scale-110 stroke-[2.4]" : "text-[#78756c] stroke-[1.8]"
                      }`} />
                    )}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 th-bg text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs tracking-tight mt-0.5 transition-colors ${
                    isActive ? "font-black th-text" : "font-semibold text-[#78756c]"
                  }`}>
                    {item.label}
                  </span>
                </motion.div>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};