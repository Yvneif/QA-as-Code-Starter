/**
 * Environment access in one place. `playwright.config.ts` loads `dotenv/config`,
 * so values from `.env` reach `process.env` before tests run.
 *
 * Every credential here has a code-level fallback with the demo site's
 * published values — that is what makes `npm install && npx playwright test`
 * work out of the box. For a real application, drop the fallbacks and feed
 * these variables from a secret store instead; never commit real credentials.
 */
export const credentials = {
  standard: {
    username: process.env.DEMO_USERNAME ?? 'standard_user',
    password: process.env.DEMO_PASSWORD ?? 'secret_sauce',
  },
  lockedOut: {
    username: process.env.DEMO_LOCKED_USERNAME ?? 'locked_out_user',
    password: process.env.DEMO_LOCKED_PASSWORD ?? 'secret_sauce',
  },
} as const;
