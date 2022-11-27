import { test, expect } from '@playwright/test';

test('homepage has title and load data.json', async ({ browserName, page }) => {
	await page.route('**/data.json*', route => {
		return route.fulfill({
			status: 200,
			contentType: 'application/octet-stream',
			body: JSON.stringify(require('./data.mock.json')),
		});
	});

  await page.goto('/');

  await expect(await page.title()).toEqual("Money exchanges");

	await expect(page.locator('.Header__Date')).toHaveText("11/27/2022, 11:15:03 AM");

	await page.screenshot({ path: `tests/screenshot-${browserName}.png`, fullPage: true });
});
