import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
	await page.route('**/data.json*', route => {
		return route.fulfill({
			status: 200,
			contentType: 'application/octet-stream',
			body: JSON.stringify(require('./data.mock.json')),
		});
	});

  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(await page.title()).toEqual("Money exchanges");
	// await page.waitForTimeout(1000);
	await expect(page.locator('.yc-text_variant_code-2')).toHaveText("11/27/2022, 11:15:03 AM");

  // // create a locator
  // const getStarted = page.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});
