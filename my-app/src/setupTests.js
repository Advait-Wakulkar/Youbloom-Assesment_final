// Setup file for tests
import '@testing-library/jest-dom';

// Mock console.log to reduce noise in tests
const originalConsoleLog = console.log;
beforeEach(() => {
  console.log = (...args) => {
    // Only show console.logs that start with test-related text
    if (args[0] && typeof args[0] === 'string' && 
        (args[0].includes('Testing') || args[0].includes('✅'))) {
      originalConsoleLog(...args);
    }
  };
});

afterEach(() => {
  console.log = originalConsoleLog;
});