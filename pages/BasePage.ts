import { expect, type Locator, type Page } from '@playwright/test';

/** Shared navigation helpers for all page objects. */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Fill a controlled input and make sure the value survived. The SPA can
   * (re)mount route components while hydration is still in flight, which
   * resets inputs filled mid-mount — so re-fill until the app actually holds
   * the value instead of racing the framework.
   */
  protected async fillSticky(input: Locator, value: string): Promise<void> {
    await expect(async () => {
      await input.fill(value);
      await expect(input).toHaveValue(value, { timeout: 1_000 });
    }).toPass({ timeout: 20_000 });
  }
}
