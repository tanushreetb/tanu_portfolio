'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#E9CEB3] dark:bg-[#1C120C]"
        >
          <div className="flex flex-col items-center max-w-sm px-6 text-center">
            {/* Monogram T. */}
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl sm:text-7xl font-display font-black text-[#4C3526] dark:text-[#FBEAD5] mb-2"
            >
              T.
            </motion.h1>

            {/* Name */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg sm:text-xl font-display font-medium text-[#4C3526] dark:text-[#FBEAD5] tracking-wide mb-1"
            >
              Tanushree T B
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] text-[#8F6E54] dark:text-[#C9A687] uppercase mb-8"
            >
              CODE · CREATE · GROW
            </motion.p>

            {/* Progressive loading line */}
            <div className="w-36 h-[2px] bg-[rgba(76,53,38,0.18)] dark:bg-[rgba(251,234,213,0.15)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-[#4C3526] dark:bg-[#FBEAD5]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
