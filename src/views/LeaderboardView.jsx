import React, { useState } from 'react';
import { Trophy, Search, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const LeaderboardView = () => {
  const { leaderboard, maskEmails, setMaskEmails } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredStudents = leaderboard.filter((s) => {
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.enrollment.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const currentUserRecord = leaderboard.find((s) => s.isCurrentUser);

  const rankBadgeClass = (rank) => {
    if (rank === 1) return 'bg-[#c4ad8f] text-white';
    if (rank === 2) return 'bg-[#d97757] text-white';
    if (rank === 3) return 'bg-[#9e9a90] text-white';
    return 'bg-[#f4f2eb] text-[#78756c] border border-[#e6e3da]';
  };

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header card */}
      <div className="card-pop stagger-1 p-6 sm:p-7 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
                <Trophy className="w-5 h-5 stroke-[2.2]" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1a1918]">Cohort Leaderboard</h1>
            </div>
            <p className="text-xs sm:text-sm text-[#4f4c46]">
              Department of CSE &bull; Semester 5 Section A &bull; Full Cohort of 59 Students
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMaskEmails(!maskEmails)}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] border border-[#e6e3da] text-xs sm:text-sm font-bold text-[#1a1918] transition-colors"
          >
            {maskEmails
              ? <EyeOff className="w-4 h-4 text-[#d97757]" />
              : <Eye className="w-4 h-4 text-[#3e7b54]" />}
            <span>{maskEmails ? 'Email Masking: Active' : 'Email Masking: Off'}</span>
          </button>
        </div>
      </div>

      {/* Your standing */}
      {currentUserRecord && (
        <div className="card-pop stagger-2 p-5 rounded-3xl bg-white border-2 border-[#d97757] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#d97757] text-white font-black text-xl flex items-center justify-center shrink-0">
            #{currentUserRecord.rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-black text-[#1a1918]">{currentUserRecord.name}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#d97757]/15 text-[#d97757] font-bold shrink-0">YOU</span>
            </div>
            <p className="text-xs text-[#78756c] font-mono mt-0.5 truncate">{currentUserRecord.enrollment}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs font-semibold text-[#78756c] block uppercase tracking-wider">Score</span>
            <span className="text-xl font-black text-[#d97757] font-mono">{currentUserRecord.score}</span>
            <span className="text-xs text-[#78756c]"> pts</span>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="card-pop stagger-3 p-4 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#78756c]" />
          <input
            type="text"
            id="leaderboard-search"
            name="leaderboardSearch"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name or enrollment ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:border-[#d97757] transition-colors"
          />
        </div>
        <p className="text-xs text-[#78756c] font-medium mt-2 text-right">
          {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length} students
        </p>
      </div>

      {/* Rankings — responsive flex list, zero horizontal scroll */}
      <div className="card-pop stagger-4 rounded-3xl bg-white border border-[#e6e3da] shadow-sm overflow-hidden">

        {/* Desktop column headers (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-3 px-5 py-3 bg-[#f4f2eb] border-b border-[#e6e3da] text-xs font-bold uppercase tracking-wider text-[#78756c]">
          <div className="w-8 shrink-0">Rank</div>
          <div className="w-8 shrink-0" />
          <div className="flex-1">Student</div>
          <div className="w-16 text-center">DSA</div>
          <div className="w-14 text-center">Labs</div>
          <div className="w-24 text-right">Score</div>
        </div>

        <div className="divide-y divide-[#e6e3da]">
          {currentStudents.map((st) => (
            <div
              key={st.enrollment}
              className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 transition-colors ${
                st.isCurrentUser ? 'bg-[#d97757]/6' : 'hover:bg-[#f4f2eb]/50'
              }`}
            >
              {/* Rank */}
              <div className="shrink-0">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs font-black ${rankBadgeClass(st.rank)}`}>
                  {st.rank}
                </span>
              </div>

              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: st.avatarColor }}
              >
                {st.name.charAt(0)}
              </div>

              {/* Name + enrollment — grows to fill space */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-[#1a1918] leading-tight">{st.name}</span>
                  {st.isCurrentUser && (
                    <span className="text-[10px] px-1.5 py-px rounded bg-[#d97757] text-white font-bold shrink-0">YOU</span>
                  )}
                </div>
                <div className="text-[11px] text-[#78756c] font-mono truncate">{st.enrollment}</div>
                {/* Mobile-only: DSA + Labs inline */}
                <div className="flex items-center gap-2 mt-0.5 sm:hidden text-[11px] font-semibold text-[#9e9a90]">
                  <span>{st.dsaSolved} DSA</span>
                  <span>&bull;</span>
                  <span>{st.labsDone} Labs</span>
                </div>
              </div>

              {/* Desktop: DSA + Labs */}
              <div className="hidden sm:flex items-center gap-0 shrink-0">
                <span className="w-16 text-center font-mono font-semibold text-sm text-[#4f4c46]">{st.dsaSolved}</span>
                <span className="w-14 text-center font-mono font-semibold text-sm text-[#4f4c46]">{st.labsDone}</span>
              </div>

              {/* Score — always shown */}
              <div className="shrink-0 text-right w-16 sm:w-24">
                <span className="font-mono font-black text-sm text-[#1a1918]">{st.score}</span>
                <span className="text-[11px] text-[#78756c] font-normal"> pts</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-5 py-4 border-t border-[#e6e3da] flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl bg-[#f4f2eb] hover:bg-[#edeae2] border border-[#e6e3da] text-xs sm:text-sm font-semibold text-[#1a1918] disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-[#1a1918] text-white'
                      : 'bg-[#f4f2eb] text-[#78756c] hover:text-[#1a1918]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl bg-[#f4f2eb] hover:bg-[#edeae2] border border-[#e6e3da] text-xs sm:text-sm font-semibold text-[#1a1918] disabled:opacity-40 transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
