import { expect, test } from '../../fixtures/pages';
import { products } from '../../utils/test-data';

test.describe('Navigation', () => {
  test('the cart round-trip preserves its contents', async ({
    standardUser: _standardUser,
    inventoryPage,
    cartPage,
  }) => {
    // Arrange: one item added to the cart
    await inventoryPage.addToCart(products.backpack);

    // Act: visit the cart, then go back to browsing
    await inventoryPage.openCart();
    await cartPage.continueShopping();

    // Assert: back on the products page and the cart badge still counts the item
    await expect(inventoryPage.heading).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
