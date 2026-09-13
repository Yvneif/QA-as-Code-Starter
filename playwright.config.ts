import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

// Target site is swappable per environment; see .env.example.
const baseURL = process.env.BASE_URL ?? 'https://www.saucedemo.com';

export default defineConfig({
  testDir: './tests',
  // E2E budget includes browser-context setup and SPA loads on busy machines
  // and modest CI runners — 30s (the default) is too tight for that.
  timeout: 60_000,
  expect: { timeout: 10_000 },
  // FR5: tests run in parallel within and across worker processes.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // 2 per CI matrix job; locally capped so 3 engines + video don't
  // oversubscribe a typical dev machine (override with --workers).
  workers: process.env.CI ? 2 : 4,
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results',
  use: {
    baseURL,
    // FR4: keep debugging evidence for any failed test.
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
