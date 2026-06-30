import { test, expect } from '@playwright/test';

test('calculator workflows', async ({ page }) => {
	await page.route('**/data.json*', (route) => {
		return route.fulfill({
			status: 200,
			contentType: 'application/octet-stream',
			body: JSON.stringify(require('./data.mock.json')),
		});
	});

	page.on('console', (msg) => console.log('BROWSER LOG:', msg.text()));

	await page.goto('/');

	// Find the USD-1 input field
	const usdInput = page.locator('input[name="USD-1"]');
	await expect(usdInput).toBeVisible();

	// Fill with 100
	await usdInput.focus();
	await usdInput.fill('100');
	await usdInput.blur();

	// Check that the active summand shows "100.00 USD"
	const activeItem = page.locator('.CalculatorRow__Item_temp');
	await expect(activeItem).toBeVisible();
	await expect(activeItem.locator('.CalculatorRow__Value')).toHaveText(
		'100.00',
	);
	await expect(activeItem.locator('.CalculatorRow__Details')).toHaveText('USD');

	// Click "+" button to fix summand
	const plusBtn = page.locator('.CalculatorRow__AddBtn');
	await expect(plusBtn).toBeEnabled();
	await plusBtn.click();

	// USD-1 should reset to 0
	await expect(usdInput).toHaveValue('0');

	// Fixed summand should appear
	const fixedItem = page.locator('.CalculatorRow__Item').first();
	await expect(fixedItem.locator('.CalculatorRow__Value')).toHaveText('100.00');
	await expect(fixedItem.locator('.CalculatorRow__Details')).toHaveText('USD');

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

	const sumItem = page.locator('.CalculatorRow__Item_sum');
	await expect(sumItem).toBeVisible();

	// Since the ratio is kept at the first ratio (1), typing 60 in EUR-6 scales it to 10 EUR-1.
	// Total sum in USD-1 should be 100 + (10 / 1 / 0.963039) = 110.38
	const sumValue = await sumItem.locator('.CalculatorRow__Value').textContent();
	expect(parseFloat(sumValue?.replace(/\s/g, '') || '0')).toBeGreaterThan(110);
	expect(parseFloat(sumValue?.replace(/\s/g, '') || '0')).toBeLessThan(111);

	// Click on the sum result to apply it to the table
	await sumItem.click();

	// USD-1 input should now show the sum value (around 110)
	const usdValStr = await usdInput.inputValue();
	expect(parseFloat(usdValStr.replace(/\s/g, ''))).toBe(110);

	const decimalSpan = page.locator(
		'td:has(input[name="USD-1"]) .MoneyInput_Decimal',
	);
	await expect(decimalSpan).toHaveText('.41');

	// Change sum ratio in dropdown to 12
	const ratioSelect = page
		.locator('.CalculatorRow__SelectorContainer select')
		.nth(1);
	await ratioSelect.selectOption('12');

	// Clear the calculator
	const clearBtn = page.locator('.CalculatorRow__ClearBtn');
	await clearBtn.click();

	// Fixed summand list should be empty
	await expect(page.locator('.CalculatorRow__Item_Remove')).toHaveCount(0);
});

test('calculator sum stability when switching active summand', async ({
	page,
}) => {
	await page.route('**/data.json*', (route) => {
		return route.fulfill({
			status: 200,
			contentType: 'application/octet-stream',
			body: JSON.stringify(require('./data.mock.json')),
		});
	});

	await page.goto('/');

	// Enter 100 USD-1, click "+"
	const usdInput = page.locator('input[name="USD-1"]');
	await usdInput.focus();
	await usdInput.fill('100');
	await usdInput.blur();

	const plusBtn = page.locator('.CalculatorRow__AddBtn');
	await plusBtn.click();

	// Now enter 50 in EUR-1 (temporary summand)
	const eurInput = page.locator('input[name="EUR-1"]');
	await eurInput.focus();
	await eurInput.fill('50');
	await eurInput.blur();

	const sumItem = page.locator('.CalculatorRow__Item_sum');
	const initialSumVal = await sumItem
		.locator('.CalculatorRow__Value')
		.textContent();

	// Switch active summand to the first summand (USD-1)
	const firstSummand = page.locator('.CalculatorRow__Item').first();
	await firstSummand.click();

	// The sum value should remain exactly the same!
	const sumValAfterSwitch = await sumItem
		.locator('.CalculatorRow__Value')
		.textContent();
	expect(sumValAfterSwitch).toEqual(initialSumVal);

	// Switch back to editing the temporary summand
	const tempSummand = page.locator('.CalculatorRow__Item_temp');
	await tempSummand.click();

	// The sum value should still remain exactly the same!
	const sumValAfterSwitchBack = await sumItem
		.locator('.CalculatorRow__Value')
		.textContent();
	expect(sumValAfterSwitchBack).toEqual(initialSumVal);
});
