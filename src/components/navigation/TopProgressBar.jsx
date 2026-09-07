import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const TopProgressBar = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 340);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none h-[2.5px] overflow-hidden">
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'left center' }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full h-full bg-gradient-to-r from-[#d97757] via-[#e2886b] to-[#d97757] shadow-[0_1px_6px_rgba(217,119,87,0.45)]"
          />
        </div>
      )}
    </AnimatePresence>
  );
};
