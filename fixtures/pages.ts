import { expect, test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../utils/test-data';

/**
 * Fixture wiring: every test receives ready-made page objects plus
 * `standardUser` — a Page already logged in with the standard demo user —
 * so test bodies stay focused on the behavior under test (Arrange lives here).
 */
type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  standardUser: Page;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  standardUser: async ({ page, loginPage }, use) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await use(page);
  },
});

export { expect };
