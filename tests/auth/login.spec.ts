import { expect, test } from '../../fixtures/pages';
import { users } from '../../utils/test-data';

test.describe('Login', () => {
  test('valid credentials land on the products page', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    // Arrange
    await loginPage.open();

    // Act
    await loginPage.login(users.standard.username, users.standard.password);

    // Assert
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.heading).toBeVisible();
  });

  test('locked-out user is rejected with a clear error message', async ({ loginPage }) => {
    // Arrange
    await loginPage.open();

    // Act
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });
});
