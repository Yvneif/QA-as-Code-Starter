/** Central test data: one source of truth so tests read as behavior, not literals. */
import { credentials } from './env';

export const users = credentials;

export const products = {
  backpack: 'Sauce Labs Backpack',
} as const;

export const checkoutForm = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  postalCode: '12345',
} as const;
