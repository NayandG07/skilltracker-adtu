import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  Terminal,
  FlaskConical,
  Trophy,
  User,
  FileText,
  Bell,
  Wifi,
  WifiOff,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const DesktopSidebar = () => {
  const {
    student,
    labs,
    unreadNotificationsCount,
    setIsNotificationDrawerOpen,
    isOnline
  } = useStudent();

  const activeLabsCount = labs.filter((l) => l.status === 'active').length;

  const links = [
    { to: '/student', label: 'Command Dashboard', icon: Home, end: true },
    { to: '/student/dsa-track', label: 'DSA 300 Practice', icon: Terminal },
    {
      to: '/student/list',
      label: 'Continuous Labs',
      icon: FlaskConical,
      badge: activeLabsCount > 0 ? `${activeLabsCount} Active` : null
    },
    { to: '/student/leaderboard', label: 'Cohort Leaderboard', icon: Trophy },
    { to: '/student/transcript', label: 'Academic Transcript', icon: FileText },
    { to: '/student/profile', label: 'Student Profile', icon: User }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-[#f4f2eb] border-r border-[#e6e3da] shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#e6e3da] flex items-center justify-between">
        <Link to="/student" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#e6e3da] flex items-center justify-center shadow-sm">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#d97757]" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-[#1a1918]">SkillTracker</div>
            <div className="text-xs text-[#78756c] font-medium tracking-wide">ADTU Student Portal</div>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="relative p-2 rounded-xl text-[#4f4c46] hover:text-[#1a1918] hover:bg-white transition-colors"
          aria-label="Open notifications"
          title="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#d97757] ring-2 ring-white" />
          )}
        </button>
      </div>

      {/* Student Badge Card */}
      <div className="p-4 mx-3 my-4 rounded-2xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#f4f2eb] border border-[#e6e3da] flex items-center justify-center font-bold text-base text-[#1a1918]">
            {student.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-[#1a1918] truncate">{student.name}</h4>
            <p className="text-xs text-[#78756c] truncate font-mono">{student.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#e6e3da]">
          <div>
            <span className="text-xs text-[#78756c] font-medium uppercase tracking-wider block">CGPA</span>
            <span className="text-base font-bold text-[#1a1918]">{student.cgpa}</span>
          </div>
          <div>
            <span className="text-xs text-[#78756c] font-medium uppercase tracking-wider block">Cohort Rank</span>
            <span className="text-base font-bold text-[#d97757]">#{student.cohortRank} <span className="text-xs font-normal text-[#78756c]">/ {student.totalCohortSize}</span></span>
          </div>
        </div>
      </div>

      {/* Navigation Group */}
      <div className="flex-1 px-3 space-y-1">
        <div className="px-3 pb-2 text-xs font-bold text-[#9e9a90] uppercase tracking-wider">
          Portal Modules
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                ${isActive
                  ? 'bg-white text-[#1a1918] border border-[#e6e3da] shadow-sm font-semibold'
                  : 'text-[#4f4c46] hover:text-[#1a1918] hover:bg-white/60'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#d97757] stroke-[2.2]' : 'text-[#78756c] group-hover:text-[#1a1918]'
                      }`}
                    />
                    <span>{link.label}</span>
                  </div>

                  {link.badge ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-[#d97757]' : 'text-[#9e9a90]'}`} />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Network & Session Status */}
      <div className="p-4 border-t border-[#e6e3da] space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-[#78756c]">
          <div className="flex items-center gap-1.5">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-[#3e7b54]" />
                <span className="text-[#3e7b54] font-semibold">Online Mode</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-[#b87728]" />
                <span className="text-[#b87728] font-semibold">Offline Mode</span>
              </>
            )}
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-white text-[#78756c] border border-[#e6e3da]">v2.0</span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to end your student session?')) {
              alert('Session terminated.');
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#78756c] hover:text-[#ba3c3c] hover:bg-white transition-colors border border-transparent hover:border-[#ba3c3c]/20"
        >
          <LogOut className="w-4 h-4" />
          <span>End Session</span>
        </button>
      </div>
    </aside>
  );
};
