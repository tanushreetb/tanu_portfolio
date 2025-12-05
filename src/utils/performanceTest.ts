/**
 * Performance Testing Utilities
 * 
 * Utilities for testing and validating animation performance.
 * Helps ensure 60fps target is achieved.
 * 
 * Requirements: 8.2, 8.5
 */

/**
 * Test animation performance over a duration
 * 
 * @param testName - Name of the test
 * @param duration - Duration to test in ms
 * @returns Performance test results
 */
export const testAnimationPerformance = async (
  testName: string,
  duration = 2000
): Promise<{
  testName: string;
  avgFPS: number;
  minFPS: number;
  maxFPS: number;
  frameCount: number;
  passed: boolean;
}> => {
  return new Promise((resolve) => {
    const fpsReadings: number[] = [];
    let frameCount = 0;
    let lastTime = performance.now();
    const startTime = lastTime;

    const measureFrame = (currentTime: number) => {
      frameCount++;
      const delta = currentTime - lastTime;
      
      if (delta > 0) {
        const fps = 1000 / delta;
        fpsReadings.push(fps);
      }
      
      lastTime = currentTime;

      if (currentTime - startTime < duration) {
        requestAnimationFrame(measureFrame);
      } else {
        const avgFPS = Math.round(
          fpsReadings.reduce((a, b) => a + b, 0) / fpsReadings.length
        );
        const minFPS = Math.round(Math.min(...fpsReadings));
        const maxFPS = Math.round(Math.max(...fpsReadings));
        const passed = avgFPS >= 55 && minFPS >= 30; // Target: avg 60fps, min 30fps

        const results = {
          testName,
          avgFPS,
          minFPS,
          maxFPS,
          frameCount,
          passed,
        };

        console.log(`
Performance Test: ${testName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Average FPS: ${avgFPS} ${avgFPS >= 55 ? '✓' : '✗'}
Minimum FPS: ${minFPS} ${minFPS >= 30 ? '✓' : '✗'}
Maximum FPS: ${maxFPS}
Frame Count: ${frameCount}
Status: ${passed ? 'PASSED ✓' : 'FAILED ✗'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `);

        resolve(results);
      }
    };

    requestAnimationFrame(measureFrame);
  });
};

/**
 * Test scroll performance
 * 
 * @param scrollDistance - Distance to scroll in pixels
 * @param duration - Duration of scroll in ms
 * @returns Scroll performance results
 */
export const testScrollPerformance = async (
  scrollDistance = 1000,
  duration = 1000
): Promise<{
  avgFPS: number;
  scrollJank: number;
  passed: boolean;
}> => {
  return new Promise((resolve) => {
    const fpsReadings: number[] = [];
    let lastTime = performance.now();
    const startTime = lastTime;
    const startScrollY = window.scrollY;
    let jankCount = 0;

    const measureScroll = (currentTime: number) => {
      const delta = currentTime - lastTime;
      
      if (delta > 0) {
        const fps = 1000 / delta;
        fpsReadings.push(fps);
        
        // Count jank (frames that take longer than 16.67ms = 60fps)
        if (delta > 16.67) {
          jankCount++;
        }
      }
      
      lastTime = currentTime;

      // Continue scrolling
      const progress = (currentTime - startTime) / duration;
      if (progress < 1) {
        window.scrollTo(0, startScrollY + scrollDistance * progress);
        requestAnimationFrame(measureScroll);
      } else {
        const avgFPS = Math.round(
          fpsReadings.reduce((a, b) => a + b, 0) / fpsReadings.length
        );
        const scrollJank = (jankCount / fpsReadings.length) * 100;
        const passed = avgFPS >= 55 && scrollJank < 10;

        const results = {
          avgFPS,
          scrollJank: Math.round(scrollJank),
          passed,
        };

        console.log(`
Scroll Performance Test
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Average FPS: ${avgFPS} ${avgFPS >= 55 ? '✓' : '✗'}
Scroll Jank: ${Math.round(scrollJank)}% ${scrollJank < 10 ? '✓' : '✗'}
Status: ${passed ? 'PASSED ✓' : 'FAILED ✗'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `);

        // Scroll back to start
        window.scrollTo(0, startScrollY);
        
        resolve(results);
      }
    };

    requestAnimationFrame(measureScroll);
  });
};

/**
 * Run comprehensive performance test suite
 * 
 * @returns Test suite results
 */
export const runPerformanceTestSuite = async (): Promise<{
  allPassed: boolean;
  results: any[];
}> => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║         PORTFOLIO PERFORMANCE TEST SUITE                  ║
║         Target: 60 FPS for all animations                 ║
╚═══════════════════════════════════════════════════════════╝
  `);

  const results = [];

  // Test 1: Idle performance
  console.log('Running Test 1: Idle Performance...');
  const idleTest = await testAnimationPerformance('Idle Performance', 1000);
  results.push(idleTest);

  // Test 2: Scroll performance
  console.log('Running Test 2: Scroll Performance...');
  const scrollTest = await testScrollPerformance(2000, 2000);
  results.push(scrollTest);

  // Test 3: Animation stress test
  console.log('Running Test 3: Animation Stress Test...');
  const stressTest = await testAnimationPerformance('Animation Stress Test', 3000);
  results.push(stressTest);

  const allPassed = results.every((r) => r.passed);

  console.log(`
╔═══════════════════════════════════════════════════════════╗
║         TEST SUITE COMPLETE                               ║
║         Status: ${allPassed ? 'ALL TESTS PASSED ✓' : 'SOME TESTS FAILED ✗'}                      ║
╚═══════════════════════════════════════════════════════════╝
  `);

  return { allPassed, results };
};

/**
 * Monitor performance in real-time
 * Logs warnings when performance drops below threshold
 * 
 * @param threshold - FPS threshold for warnings (default: 55)
 * @returns Cleanup function
 */
export const monitorPerformance = (threshold = 55): (() => void) => {
  let lastTime = performance.now();
  let rafId: number;
  let warningCount = 0;

  const monitor = (currentTime: number) => {
    const delta = currentTime - lastTime;
    const fps = 1000 / delta;

    if (fps < threshold) {
      warningCount++;
      if (warningCount % 10 === 0) {
        console.warn(`⚠️ Performance Warning: FPS dropped to ${Math.round(fps)}`);
      }
    }

    lastTime = currentTime;
    rafId = requestAnimationFrame(monitor);
  };

  rafId = requestAnimationFrame(monitor);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(rafId);
    console.log(`Performance monitoring stopped. Total warnings: ${warningCount}`);
  };
};

/**
 * Measure component render time
 * 
 * @param componentName - Name of the component
 * @param renderFn - Function that renders the component
 * @returns Render time in ms
 */
export const measureRenderTime = async (
  componentName: string,
  renderFn: () => void
): Promise<number> => {
  const startTime = performance.now();
  
  renderFn();
  
  // Wait for next frame to ensure render is complete
  await new Promise((resolve) => requestAnimationFrame(resolve));
  
  const endTime = performance.now();
  const renderTime = endTime - startTime;

  console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);

  return renderTime;
};
