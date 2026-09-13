import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly heading: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addToCart(productName: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
