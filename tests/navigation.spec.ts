import { test, expect } from '@playwright/test';

test('currencies keyboard navigation', async ({ page }) => {
	await page.route('**/data.json*', (route) => {
		return route.fulfill({
			status: 200,
			contentType: 'application/octet-stream',
			body: JSON.stringify(require('./data.mock.json')),
		});
	});

	await page.goto('/');

	// Find the Currencies search input
	const searchInput = page.locator(
		'input[placeholder="Search currency or country"]',
	);
	await expect(searchInput).toBeVisible();

	// Focus the search input
	await searchInput.focus();
	await expect(searchInput).toBeFocused();

	// Press Tab
	await page.keyboard.press('Tab');

	// The first checkbox should be focused
	const firstCheckbox = page
		.locator('.Config__Currency_Item input[type="checkbox"]')
		.first();
	await expect(firstCheckbox).toBeFocused();

	// Press ArrowDown
	await page.keyboard.press('ArrowDown');
	const secondCheckbox = page
		.locator('.Config__Currency_Item input[type="checkbox"]')
		.nth(1);
	await expect(secondCheckbox).toBeFocused();

	// Press Shift+Tab on the second checkbox should go back to the first checkbox
	await page.keyboard.press('Shift+Tab');
	await expect(firstCheckbox).toBeFocused();

	// Press Shift+Tab on the first checkbox should go back to the search input
	await page.keyboard.press('Shift+Tab');
	await expect(searchInput).toBeFocused();
});
