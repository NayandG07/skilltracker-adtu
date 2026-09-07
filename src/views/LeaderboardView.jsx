import React, { useState } from 'react';
import {
  Trophy,
  Search,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Medal,
  Sparkles,
  Filter,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const LeaderboardView = () => {
  const { leaderboard, maskEmails, setMaskEmails } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('Overall');
  const ITEMS_PER_PAGE = 10;

  const filteredStudents = leaderboard.filter((s) => {
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.enrollment.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const currentUserRecord = leaderboard.find((s) => s.isCurrentUser);

  const getMedalBadge = (rank) => {
    if (rank === 1) return <span className="text-xl" title="Rank 1 - Gold">🥇</span>;
    if (rank === 2) return <span className="text-xl" title="Rank 2 - Silver">🥈</span>;
    if (rank === 3) return <span className="text-xl" title="Rank 3 - Bronze">🥉</span>;
    return (
      <span className="w-7 h-7 rounded-xl bg-[#f4f2eb] text-[#78756c] font-black text-xs flex items-center justify-center font-mono border border-[#e6e3da]">
        {rank}
      </span>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Header card with Department info */}
      <div className="card-pop stagger-1 p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20">
              <Trophy className="w-5 h-5 stroke-[2.2]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#d97757]">
              ADTU Cohort Rankings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1a1918]">
            Cohort Academic Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-[#4f4c46] mt-1">
            Department of Computer Science & Engineering &bull; Semester 5 Section A &bull; Verified 137 Student Records
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMaskEmails(!maskEmails)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#f4f2eb] hover:bg-[#edeae2] border border-[#e6e3da] text-xs sm:text-sm font-bold text-[#1a1918] transition-colors"
          >
            {maskEmails ? (
              <>
                <EyeOff className="w-4 h-4 text-[#d97757]" />
                <span>Masking: Active</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-[#3e7b54]" />
                <span>Masking: Off</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sticky Standing Card for Nayandeep Goswami (Rank #2) */}
      {currentUserRecord && (
        <div className="card-pop stagger-2 p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#d97757] shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#d97757] text-white flex items-center justify-center text-2xl font-black shadow-xs shrink-0">
              🥈
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base sm:text-lg font-black text-[#1a1918]">
                  {currentUserRecord.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d97757] text-white font-bold">
                  YOU
                </span>
                <span className="text-xs font-mono font-bold text-[#3e7b54] bg-[#3e7b54]/10 px-2 py-0.5 rounded-md">
                  Rank #2
                </span>
              </div>
              <p className="text-xs text-[#78756c] font-mono mt-0.5">
                {currentUserRecord.enrollment} &bull; {maskEmails ? currentUserRecord.email : 'nayandg8@gmail.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0 text-right">
            <div className="hidden sm:block">
              <span className="text-[10px] text-[#78756c] uppercase font-bold block">LeetCode Solved</span>
              <span className="text-sm font-black font-mono text-[#1a1918]">{currentUserRecord.dsaSolved}</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[10px] text-[#78756c] uppercase font-bold block">Labs Completed</span>
              <span className="text-sm font-black font-mono text-[#1a1918]">{currentUserRecord.labsDone} / 20</span>
            </div>
            <div>
              <span className="text-[10px] text-[#78756c] uppercase font-bold block">Overall Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-[#d97757] font-mono">
                  {currentUserRecord.score}
                </span>
                <span className="text-xs font-bold text-[#78756c]">pts</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Controls (Matching Design 3 Mockup) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#e6e3da] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold font-mono px-3 py-1.5 rounded-xl bg-[#f4f2eb] text-[#1a1918] border border-[#e6e3da] shrink-0">
            Semester 5 &bull; B.Tech CSE
          </span>

          {['Overall', 'Academics', 'Coding', 'DSA Track'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab
                  ? 'bg-[#1a1918] text-white shadow-xs'
                  : 'bg-[#f4f2eb] text-[#78756c] hover:text-[#1a1918]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#78756c]" />
          <input
            type="text"
            id="leaderboard-search"
            name="leaderboardSearch"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search student or ID..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm text-[#1a1918] placeholder-[#9e9a90] focus:outline-none focus:border-[#d97757]"
          />
        </div>
      </div>

      {/* Leaderboard Table / Card List */}
      <div className="rounded-3xl bg-white border border-[#e6e3da] shadow-sm overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#f4f2eb] border-b border-[#e6e3da] text-xs font-bold uppercase tracking-wider text-[#78756c]">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Student Name</div>
          <div className="col-span-3">Email (Masked)</div>
          <div className="col-span-1 text-center">Labs</div>
          <div className="col-span-1 text-center">DSA</div>
          <div className="col-span-1 text-right">Score</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#e6e3da]">
          {currentStudents.map((st) => {
            const isMe = st.isCurrentUser;
            return (
              <div
                key={st.enrollment}
                className={`flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 px-5 sm:px-6 py-4 items-center transition-colors ${
                  isMe ? 'bg-[#d97757]/8 border-l-4 border-l-[#d97757]' : 'hover:bg-[#faf9f5]'
                }`}
              >
                {/* Rank & Medal */}
                <div className="sm:col-span-1 flex items-center gap-2 self-start sm:self-center">
                  {getMedalBadge(st.rank)}
                </div>

                {/* Name & Avatar */}
                <div className="sm:col-span-5 flex items-center gap-3 w-full">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: st.avatarColor || '#d97757' }}
                  >
                    {st.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-[#1a1918] truncate">
                        {st.name}
                      </span>
                      {isMe && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#d97757] text-white font-bold">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#78756c] block">
                      {st.enrollment}
                    </span>
                  </div>
                </div>

                {/* Email (with privacy toggle) */}
                <div className="sm:col-span-3 text-xs font-mono text-[#4f4c46] truncate w-full sm:w-auto">
                  {maskEmails ? st.email : (isMe ? 'nayandg8@gmail.com' : st.email.replace('***', 'student'))}
                </div>

                {/* Labs Done */}
                <div className="sm:col-span-1 text-center font-mono text-xs sm:text-sm font-bold text-[#4f4c46] hidden sm:block">
                  {st.labsDone}
                </div>

                {/* DSA Solved */}
                <div className="sm:col-span-1 text-center font-mono text-xs sm:text-sm font-bold text-[#d97757] hidden sm:block">
                  {st.dsaSolved}
                </div>

                {/* Score */}
                <div className="sm:col-span-1 text-right font-mono font-black text-sm sm:text-base text-[#1a1918] w-full sm:w-auto flex sm:block justify-between items-center">
                  <span className="sm:hidden text-xs text-[#78756c] font-normal">Score:</span>
                  <span>{st.score}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-[#e6e3da] flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f4f2eb] hover:bg-[#edeae2] text-xs font-bold text-[#1a1918] disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-medium text-[#78756c]">
              Page <span className="font-bold text-[#1a1918]">{currentPage}</span> of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f4f2eb] hover:bg-[#edeae2] text-xs font-bold text-[#1a1918] disabled:opacity-40 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
