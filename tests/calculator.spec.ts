import { test, expect } from '@playwright/test';

test('calculator workflows', async ({ page }) => {
	await page.route('**/data.json*', (route) => {
		return route.fulfill({
			status: 200,
			contentType: 'application/octet-stream',
			body: JSON.stringify(require('./data.mock.json')),
		});
	});

	page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

	await page.goto('/');

	// Find the USD-1 input field
	const usdInput = page.locator('input[name="USD-1"]');
	await expect(usdInput).toBeVisible();

	// Fill with 100
	await usdInput.focus();
	await usdInput.fill('100');
	await usdInput.blur();

	// Check that the active summand shows "100.00 USD-1"
	const activeItem = page.locator('.CalculatorRow__Item_temp');
	await expect(activeItem).toBeVisible();
	await expect(activeItem.locator('.CalculatorRow__Value')).toHaveText(
		'100.00',
	);
	await expect(activeItem.locator('.CalculatorRow__Details')).toHaveText(
		'USD-1',
	);

	// Click "+" button to fix summand
	const plusBtn = page.locator('.CalculatorRow__AddBtn');
	await expect(plusBtn).toBeEnabled();
	await plusBtn.click();

	// USD-1 should reset to 0
	await expect(usdInput).toHaveValue('0');

	// Fixed summand should appear
	const fixedItem = page.locator('.CalculatorRow__Item').first();
	await expect(fixedItem.locator('.CalculatorRow__Value')).toHaveText('100.00');
	await expect(fixedItem.locator('.CalculatorRow__Details')).toHaveText(
		'USD-1',
	);

	// Now enter a value in EUR-6
	// Let's first make sure EUR-6 input exists and is visible
	const eurInput = page.locator('input[name="EUR-6"]');
	await expect(eurInput).toBeVisible();
	await eurInput.focus();
	await eurInput.fill('60'); // 60 EUR-6 = 10 EUR base value.
	// Since USD is base (rate ~0.96 in mock, let's verify exact rate: EUR is 0.963039)
	// Base value of EUR = 60 / 6 / 0.963039 = 10.38 USD.
	// So sum should be ~100 + 10.38 = 110.38 USD.
	await eurInput.blur();

	// Check that the sum displays the correct calculated value in real time
	const sumItem = page.locator('.CalculatorRow__Item_sum');
	await expect(sumItem).toBeVisible();
	const sumValue = await sumItem.locator('.CalculatorRow__Value').textContent();
	expect(parseFloat(sumValue?.replace(/\s/g, '') || '0')).toBeGreaterThan(110);
	expect(parseFloat(sumValue?.replace(/\s/g, '') || '0')).toBeLessThan(111);

	// Click on the sum result to apply it to the table
	await sumItem.click();

	// USD-1 input should now show the sum value (around 110)
	const usdValStr = await usdInput.inputValue();
	expect(parseFloat(usdValStr.replace(/\s/g, ''))).toBe(110);

	const decimalSpan = page.locator('td:has(input[name="USD-1"]) .MoneyInput_Decimal');
	await expect(decimalSpan).toHaveText('.41');

	// Change sum ratio in dropdown to 12
	const ratioSelect = page.locator('.CalculatorRow__SelectorContainer select').nth(1);
	await ratioSelect.selectOption('12');

	// Clear the calculator
	const clearBtn = page.locator('.CalculatorRow__ClearBtn');
	await clearBtn.click();

	// Fixed summand list should be empty
	await expect(page.locator('.CalculatorRow__Item_Remove')).toHaveCount(0);
});
