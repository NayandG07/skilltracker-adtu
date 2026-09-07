import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TopProgressBar } from '../navigation/TopProgressBar';
import { MobileNavBar } from '../navigation/MobileNavBar';
import { MobileHeader } from '../navigation/MobileHeader';
import { DesktopSidebar } from '../navigation/DesktopSidebar';
import { NotificationDrawer } from '../notifications/NotificationDrawer';
import { FloatingNotificationToast } from '../notifications/FloatingNotificationToast';
import { DataCorrectionModal } from '../profile/DataCorrectionModal';
import { useStudent } from '../../context/StudentContext';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import { CheckCircle2 } from 'lucide-react';

// Page wrapper: instant exit, smooth entrance rise
const pageVariants = {
  enter: {
    opacity: 0,
    y: 14,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
      y: { type: 'spring', stiffness: 380, damping: 38, mass: 0.7 },
    }
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      opacity: { duration: 0.12, ease: 'easeIn' },
      y: { duration: 0.12, ease: 'easeIn' },
    }
  }
};

export const AppLayout = () => {
  const { offlineSyncMessage } = useStudent();
  const location = useLocation();
  useSwipeNavigation();

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#1a1918] flex flex-col lg:flex-row antialiased">
      {/* Top Navigation Progress Bar */}
      <TopProgressBar />

      {/* Offline Sync Banner */}
      {offlineSyncMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#3e7b54] text-white text-sm py-2.5 px-4 flex items-center justify-center gap-2 shadow-lg animate-fade-in font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>{offlineSyncMessage}</span>
        </div>
      )}

      {/* Desktop Command Sidebar (>= 1024px) */}
      <DesktopSidebar />

      {/* Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header (< 1024px) */}
        <MobileHeader />

        {/* Dynamic Route Canvas with Safe-Area Clearance for Floating Islands */}
        <main className="flex-1 pb-28 lg:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto pt-20 lg:pt-6 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Apple Liquid Glass Navigation (< 1024px) */}
        <MobileNavBar />
      </div>

      {/* Global Modals, Floating Island Notifications, & Drawers */}
      <FloatingNotificationToast />
      <NotificationDrawer />
      <DataCorrectionModal />
    </div>
  );
};
