'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KineticMarqueeProps {
  speed?: number;
  reverse?: boolean;
  className?: string;
  items?: string[];
}

const defaultMarqueeItems = [
  'TANUSHREE T B',
  'COMPUTER SCIENCE ENGINEER',
  'CAREEASE AI & MULTILINGUAL CHATBOT',
  'PYTHON · AI/ML & LLMS',
  'FASTAPI & REACT ARCHITECTURE',
  'KAFKA & PYSPARK STREAMING',
  'AUTOMATION WORKFLOWS & SQL',
  'CODE · CREATE · GROW',
];

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  speed = 35,
  reverse = false,
  className = '',
  items = defaultMarqueeItems,
}) => {
  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 border-y border-[rgba(76,53,38,0.15)] dark:border-[rgba(240,214,189,0.12)] bg-[#E1C3A7]/30 dark:bg-[#20140D]/40 backdrop-blur-sm select-none pointer-events-none relative z-10 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="flex items-center gap-8 w-max"
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Double array for seamless infinite looping */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-sm sm:text-base font-mono font-bold tracking-[0.25em] uppercase text-[#4C3526] dark:text-[#FBEAD5]/90">
              {item}
            </span>
            <span className="text-xs text-[#8F6E54] dark:text-[#C9A687]">
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
