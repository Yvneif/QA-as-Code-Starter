import { expect, test } from '../../fixtures/pages';
import { checkoutForm, products } from '../../utils/test-data';

test.describe('Checkout form', () => {
  test('submitting the form without required fields shows a validation error', async ({
    standardUser: _standardUser,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Arrange: a logged-in user with one item in the cart, on the checkout form
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.beginCheckout();

    // Act: submit with every field left empty
    await checkoutPage.submitForm();

    // Assert
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('completing checkout with valid details shows the order confirmation', async ({
    standardUser,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Arrange
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.beginCheckout();

    // Act
    await checkoutPage.fillForm(checkoutForm);
    await checkoutPage.submitForm();
    await checkoutPage.finish();

    // Assert
    await expect(standardUser).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.confirmationMessage).toContainText('Thank you for your order');
  });
});
