import React from 'react';
import { Link } from 'react-router-dom';
import {
  User, Award, BookOpen, CheckCircle2, AlertCircle,
  FileText, ShieldCheck, Bell, Smartphone, HardDrive, Palette
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useTheme } from '../context/ThemeContext';

export const StudentProfileView = () => {
  const {
    student,
    setIsCorrectionModalOpen,
    notificationPermission,
    requestNotificationPermission,
    triggerTestNotification,
    offlineQueue,
    isOnline
  } = useStudent();

  const { theme, themeId, setTheme, themes } = useTheme();

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Student Identity Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-[#f4f2eb] border-2 border-[#d97757] flex items-center justify-center font-black text-2xl sm:text-3xl text-[#1a1918] shadow-sm">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a1918]">
                  {student.name}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20">
                  Verified Student
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#78756c] font-mono mt-1">{student.id}</p>
              <p className="text-xs sm:text-sm text-[#4f4c46] mt-0.5">
                {student.email} &bull; {student.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsCorrectionModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] text-xs sm:text-sm font-bold text-[#1a1918] border border-[#e6e3da] transition-colors"
            >
              <AlertCircle className="w-4 h-4 text-[#d97757]" />
              <span>Data Correction</span>
            </button>
            <Link
              to="/student/transcript"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-xs sm:text-sm font-bold text-white transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>View Transcript</span>
            </Link>
          </div>
        </div>

        {/* Academic Program Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-[#e6e3da]">
          <div className="p-4 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da]/80">
            <span className="text-xs font-bold text-[#78756c] uppercase block">Program & Specialization</span>
            <span className="text-xs sm:text-sm font-bold text-[#1a1918] mt-1 block">{student.program}</span>
            <span className="text-xs font-medium text-[#78756c]">{student.specialization}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da]/80">
            <span className="text-xs font-bold text-[#78756c] uppercase block">Cohort & Class</span>
            <span className="text-xs sm:text-sm font-bold text-[#1a1918] mt-1 block">
              Semester {student.semester} &bull; {student.section}
            </span>
            <span className="text-xs font-medium text-[#78756c]">Batch: {student.batch}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da]/80">
            <span className="text-xs font-bold text-[#78756c] uppercase block">Faculty Advisor</span>
            <span className="text-xs sm:text-sm font-bold text-[#1a1918] mt-1 block">{student.advisor}</span>
            <span className="text-xs font-medium text-[#78756c]">{student.institution}</span>
          </div>
        </div>
      </div>

      {/* Official Academic Performance (Verified 8.95 CGPA) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#d97757]" />
            <h2 className="text-base sm:text-lg font-bold text-[#1a1918]">
              Verified Academic Record & SGPA History
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#3e7b54] font-bold bg-[#3e7b54]/10 px-3 py-1 rounded-full border border-[#3e7b54]/20">
            CGPA: {student.cgpa} / 10.0
          </span>
        </div>

        {/* Semester SGPA Breakdown Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#e6e3da]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#f4f2eb] text-[#78756c] uppercase text-xs font-bold border-b border-[#e6e3da]">
              <tr>
                <th className="py-3 px-5">Semester</th>
                <th className="py-3 px-5 text-center">Registered Credits</th>
                <th className="py-3 px-5 text-center">SGPA</th>
                <th className="py-3 px-5 text-center">Letter Grade</th>
                <th className="py-3 px-5 text-right">Registry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e3da]">
              {student.sgpaHistory.map((sem) => (
                <tr key={sem.semester} className="hover:bg-[#f4f2eb]/50">
                  <td className="py-3.5 px-5 font-bold text-[#1a1918]">Semester {sem.semester}</td>
                  <td className="py-3.5 px-5 text-center font-mono font-semibold text-[#4f4c46]">{sem.credits}</td>
                  <td className="py-3.5 px-5 text-center font-mono font-black text-[#1a1918]">{sem.sgpa}</td>
                  <td className="py-3.5 px-5 text-center font-mono text-[#d97757] font-bold">{sem.grade}</td>
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        sem.status === 'Completed'
                          ? 'bg-[#3e7b54]/10 text-[#3e7b54] border border-[#3e7b54]/20'
                          : 'bg-[#b87728]/10 text-[#b87728] border border-[#b87728]/20'
                      }`}
                    >
                      {sem.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Notifications & Device Settings */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm space-y-5">
        <div className="flex items-center gap-2.5">
          <Smartphone className="w-5 h-5 text-[#d97757]" />
          <h2 className="text-base sm:text-lg font-bold text-[#1a1918]">
            System & Device Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Notifications Diagnostic Card */}
          <div className="p-5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-[#1a1918] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#d97757]" />
                Web Push Notifications
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  notificationPermission === 'granted'
                    ? 'bg-[#3e7b54]/10 text-[#3e7b54]'
                    : 'bg-[#b87728]/10 text-[#b87728]'
                }`}
              >
                {notificationPermission}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
              Browser alerts notify you before upcoming lab submission deadlines.
            </p>
            <div className="pt-2 flex items-center gap-2">
              {notificationPermission !== 'granted' ? (
                <button
                  type="button"
                  onClick={requestNotificationPermission}
                  className="px-4 py-2 rounded-xl bg-[#d97757] hover:bg-[#c15f3e] text-xs sm:text-sm font-bold text-white shadow-sm"
                >
                  Grant Permission
                </button>
              ) : (
                <button
                  type="button"
                  onClick={triggerTestNotification}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#edeae2] text-xs sm:text-sm font-bold text-[#1a1918] border border-[#e6e3da] shadow-xs"
                >
                  Test Notification Chime
                </button>
              )}
            </div>
          </div>

          {/* Offline Storage Diagnostic Card */}
          <div className="p-5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-[#1a1918] flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-[#3e7b54]" />
                IndexedDB Offline Storage
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#3e7b54]/10 text-[#3e7b54]">
                Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4f4c46] leading-relaxed">
              {offlineQueue.length > 0
                ? `${offlineQueue.length} lab submission(s) awaiting network sync.`
                : 'All lab submissions and practice states synchronized with university registry.'}
            </p>
            <div className="pt-2 text-xs sm:text-sm text-[#78756c]">
              Connection Status: <span className={`font-bold ${isOnline ? 'text-[#3e7b54]' : 'text-[#b87728]'}`}>{isOnline ? 'Online (Ethernet/WiFi)' : 'Offline (Storage Active)'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Theme Personalisation ─────────────────────────────── */}
      <div className="card-pop stagger-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
            <Palette className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1a1918]">Theme Personalisation</h2>
            <p className="text-xs sm:text-sm text-[#78756c] mt-0.5">Choose your accent colour — applied instantly across the entire app.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {themes.map((t) => {
            const isActive = t.id === themeId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`group flex flex-col items-center gap-2.5 p-3 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-[#1a1918] bg-[#f4f2eb] shadow-sm'
                    : 'border-[#e6e3da] hover:border-[#c7c3b6] hover:bg-[#f4f2eb]/60'
                }`}
              >
                {/* Colour swatch */}
                <div
                  className="w-10 h-10 rounded-full shadow-sm transition-transform group-hover:scale-110"
                  style={{ backgroundColor: t.accent }}
                >
                  {isActive && (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <span className={`text-xs font-bold block leading-tight ${isActive ? 'text-[#1a1918]' : 'text-[#4f4c46]'}`}>{t.name}</span>
                  <span className="text-[10px] text-[#9e9a90] leading-tight hidden sm:block">{t.description}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current theme preview strip */}
        <div className="mt-5 pt-4 border-t border-[#e6e3da] flex items-center gap-3">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
          <p className="text-xs text-[#78756c]">
            Active theme: <span className="font-bold text-[#1a1918]">{theme.name}</span> — {theme.description}
          </p>
        </div>
      </div>
    </div>
  );
};
