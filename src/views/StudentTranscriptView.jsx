import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Printer,
  ShieldCheck,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export const StudentTranscriptView = () => {
  const { student, setIsCorrectionModalOpen } = useStudent();

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      {/* Action Controls (Hidden on Print) */}
      <div className="flex items-center justify-between no-print">
        <Link
          to="/student"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#78756c] hover:text-[#1a1918]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Dashboard</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsCorrectionModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-2xl bg-white border border-[#e6e3da] text-[#1a1918] hover:bg-[#f4f2eb] transition-colors shadow-xs"
          >
            <AlertCircle className="w-4 h-4 text-[#d97757]" />
            <span>Request Correction</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-white transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Transcript</span>
          </button>
        </div>
      </div>

      {/* Official Transcript Sheet */}
      <div className="p-8 sm:p-14 rounded-3xl bg-white border border-[#e6e3da] shadow-sm print-clean-card space-y-7">
        {/* University Letterhead Header */}
        <div className="text-center pb-7 border-b border-[#e6e3da] space-y-1.5">
          <div className="text-xs sm:text-sm tracking-widest text-[#78756c] font-bold uppercase">
            Assam Down Town University
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1918] font-serif">
            Office of the Controller of Examinations
          </h1>
          <p className="text-xs sm:text-sm text-[#4f4c46]">
            Official Cumulative Grade Point Average & Continuous Assessment Transcript
          </p>
        </div>

        {/* Student Credential Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#f4f2eb] border border-[#e6e3da] text-xs sm:text-sm">
          <div>
            <span className="text-xs text-[#78756c] font-semibold uppercase block">Candidate Name</span>
            <span className="font-bold text-[#1a1918] mt-0.5 block">{student.name}</span>
          </div>
          <div>
            <span className="text-xs text-[#78756c] font-semibold uppercase block">Enrollment ID</span>
            <span className="font-mono font-bold text-[#1a1918] mt-0.5 block">{student.id}</span>
          </div>
          <div>
            <span className="text-xs text-[#78756c] font-semibold uppercase block">Program</span>
            <span className="text-[#1a1918] mt-0.5 block">{student.program}</span>
          </div>
          <div>
            <span className="text-xs text-[#78756c] font-semibold uppercase block">Batch & Semester</span>
            <span className="text-[#1a1918] mt-0.5 block">{student.batch} (Sem 5)</span>
          </div>
        </div>

        {/* Official Summary Metrics */}
        <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-[#f4f2eb]/60 border border-[#e6e3da] text-center">
          <div>
            <span className="text-xs text-[#78756c] uppercase font-bold tracking-wider block">Cumulative CGPA</span>
            <span className="text-3xl sm:text-4xl font-black text-[#1a1918] font-mono mt-1 block">{student.cgpa}</span>
            <span className="text-xs font-semibold text-[#3e7b54] mt-1 block">First Class Distinction</span>
          </div>
          <div>
            <span className="text-xs text-[#78756c] uppercase font-bold tracking-wider block">Cohort Standing</span>
            <span className="text-3xl sm:text-4xl font-black text-[#d97757] font-mono mt-1 block">#{student.cohortRank}</span>
            <span className="text-xs text-[#78756c] mt-1 block">Top 3.3% of 59</span>
          </div>
          <div>
            <span className="text-xs text-[#78756c] uppercase font-bold tracking-wider block">Verified Attendance</span>
            <span className="text-3xl sm:text-4xl font-black text-[#3e7b54] font-mono mt-1 block">{student.attendanceRate}%</span>
            <span className="text-xs text-[#78756c] mt-1 block">Eligible for Exams</span>
          </div>
        </div>

        {/* Semester-by-Semester Record */}
        <div className="space-y-4">
          <h2 className="text-xs sm:text-sm font-bold text-[#1a1918] uppercase tracking-wider">
            Semester Grade Breakdown
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-[#e6e3da]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f4f2eb] text-[#78756c] uppercase text-xs font-bold border-b border-[#e6e3da]">
                <tr>
                  <th className="py-3 px-5">Academic Semester</th>
                  <th className="py-3 px-5 text-center">Total Credits</th>
                  <th className="py-3 px-5 text-center">SGPA</th>
                  <th className="py-3 px-5 text-center">Grade</th>
                  <th className="py-3 px-5 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e3da]">
                {student.sgpaHistory.map((sem) => (
                  <tr key={sem.semester} className="hover:bg-[#f4f2eb]/40">
                    <td className="py-3.5 px-5 font-bold text-[#1a1918]">Semester {sem.semester}</td>
                    <td className="py-3.5 px-5 text-center font-mono font-semibold text-[#4f4c46]">{sem.credits}</td>
                    <td className="py-3.5 px-5 text-center font-mono font-black text-[#1a1918]">{sem.sgpa}</td>
                    <td className="py-3.5 px-5 text-center font-mono text-[#d97757] font-bold">{sem.grade}</td>
                    <td className="py-3.5 px-5 text-right font-bold text-[#3e7b54]">
                      {sem.status === 'Completed' ? 'PASSED' : 'CURRENT'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Institutional Sign-off */}
        <div className="pt-8 border-t border-[#e6e3da] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-[#78756c]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#3e7b54]" />
            <div>
              <div className="font-bold text-[#1a1918]">Cryptographically Sealed Digital Record</div>
              <div className="text-xs font-mono">Verification Token: ADTU-REG-2026-BCSM-047-VERIFIED</div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-serif italic text-base font-bold text-[#1a1918]">Dr. S. K. Mahanta</div>
            <div className="text-xs font-semibold uppercase tracking-wider">Controller of Examinations</div>
          </div>
        </div>
      </div>
    </div>
  );
};
