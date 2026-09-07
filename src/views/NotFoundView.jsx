import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundView = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4 p-8 sm:p-10 rounded-3xl bg-white border border-[#e6e3da] shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#d97757]/10 text-[#d97757] border border-[#d97757]/20 flex items-center justify-center mx-auto text-xl font-black font-mono">
          404
        </div>

        <h1 className="text-2xl font-black tracking-tight text-[#1a1918]">
          Page Not Found
        </h1>

        <p className="text-sm text-[#4f4c46] leading-relaxed">
          The requested module path does not exist in the ADTU Student Portal.
          Return directly to your student dashboard.
        </p>

        <div className="pt-3 flex items-center justify-center">
          <Link
            to="/student"
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#d97757] hover:bg-[#c15f3e] text-sm font-bold text-white transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
