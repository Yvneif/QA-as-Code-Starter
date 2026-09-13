import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

/**
 * Covers the two checkout steps and the confirmation page:
 * "Checkout: Your Information" -> "Checkout: Overview" -> "Checkout: Complete!"
 */
export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.confirmationMessage = page.locator('[data-test="complete-header"]');
  }

  async fillForm(details: CheckoutDetails): Promise<void> {
    await this.fillSticky(this.firstNameInput, details.firstName);
    await this.fillSticky(this.lastNameInput, details.lastName);
    await this.fillSticky(this.postalCodeInput, details.postalCode);
  }

  async submitForm(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
