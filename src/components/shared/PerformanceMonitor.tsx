/**
 * PerformanceMonitor Component
 * 
 * Development tool for monitoring animation performance and FPS.
 * Only active in development mode.
 * 
 * Requirements: 8.2, 8.5
 */

'use client';

import { useEffect, useState } from 'react';
import { measureFPS, monitorLongTasks } from '@/utils/performanceOptimization';

interface PerformanceStats {
  fps: number;
  longTasks: number;
  avgTaskDuration: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 0,
    longTasks: 0,
    avgTaskDuration: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    let longTaskCount = 0;
    let totalTaskDuration = 0;

    // Monitor FPS
    const measurePerformance = async () => {
      const fps = await measureFPS(1000);
      setStats((prev) => ({
        ...prev,
        fps,
        avgTaskDuration: longTaskCount > 0 ? totalTaskDuration / longTaskCount : 0,
      }));
    };

    // Monitor long tasks
    monitorLongTasks(50, (duration) => {
      longTaskCount++;
      totalTaskDuration += duration;
      setStats((prev) => ({
        ...prev,
        longTasks: longTaskCount,
      }));
    });

    // Measure FPS every 2 seconds
    const interval = setInterval(measurePerformance, 2000);
    measurePerformance();

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-9999 bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono hover:bg-black/90 transition-colors"
        aria-label="Toggle performance monitor"
      >
        {isVisible ? 'Hide' : 'Show'} Perf
      </button>

      {/* Stats panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-9999 bg-black/90 text-white p-4 rounded-lg text-xs font-mono space-y-2 min-w-[200px]">
          <div className="font-bold text-sm mb-2 border-b border-white/20 pb-2">
            Performance Monitor
          </div>
          
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={stats.fps >= 55 ? 'text-green-400' : stats.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
              {stats.fps}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Long Tasks:</span>
            <span className={stats.longTasks === 0 ? 'text-green-400' : stats.longTasks < 5 ? 'text-yellow-400' : 'text-red-400'}>
              {stats.longTasks}
            </span>
          </div>
          
          {stats.avgTaskDuration > 0 && (
            <div className="flex justify-between">
              <span>Avg Task:</span>
              <span className={stats.avgTaskDuration < 100 ? 'text-green-400' : stats.avgTaskDuration < 200 ? 'text-yellow-400' : 'text-red-400'}>
                {stats.avgTaskDuration.toFixed(1)}ms
              </span>
            </div>
          )}
          
          <div className="text-[10px] text-white/60 mt-2 pt-2 border-t border-white/20">
            Target: 60 FPS, &lt;50ms tasks
          </div>
        </div>
      )}
    </>
  );
};
