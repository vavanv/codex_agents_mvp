import { clamp } from './calculator.ts';

function assertEqual(actual: number, expected: number): void {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, received ${actual}`);
  }
}

const tests: { name: string; run: () => void }[] = [
  {
    name: 'below lower bound returns lower bound',
    run: () => assertEqual(clamp(-5, 0, 10), 0),
  },
  {
    name: 'interior fractional value remains unchanged',
    run: () => assertEqual(clamp(4.5, 0, 10), 4.5),
  },
  {
    name: 'above upper bound returns upper bound',
    run: () => assertEqual(clamp(15, 0, 10), 10),
  },
  {
    name: 'inclusive endpoints remain unchanged',
    run: () => {
      assertEqual(clamp(0, 0, 10), 0);
      assertEqual(clamp(10, 0, 10), 10);
    },
  },
];

let passed = 0;
for (const test of tests) {
  try {
    test.run();
    passed += 1;
    console.log(`PASS: ${test.name}`);
  } catch (error) {
    console.error(`FAIL: ${test.name}`, error);
  }
}

const failed = tests.length - passed;
console.log(`Tests: ${tests.length}, passed: ${passed}, failed: ${failed}`);
if (failed > 0) {
  throw new Error(`${failed} test(s) failed`);
}
