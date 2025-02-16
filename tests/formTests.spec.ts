import { test, expect } from '@playwright/test';

const positiveTestCases = [
  { state: 'New South Wales', suburb: 'Zetland', postcode: '2017'},
  { state: 'Victoria', suburb: 'Melbourne', postcode: '3000' },
  { state: 'Victoria', suburb: 'Ferntree Gully', postcode: '3156' },
  { state: 'Queensland', suburb: 'Brisbane', postcode: '4001' },
  { state: 'Queensland', suburb: 'Noosa Heads', postcode: '4567' },
  { state: 'New South Wales', suburb: 'Broadway', postcode: '2007' },
  { state: 'New South Wales', suburb: 'Surry Hills', postcode: '2010' },
  { state: 'Western Australia', suburb: 'Perth', postcode: '6000' },
  { state: 'Western Australia', suburb: 'Fremantle', postcode: '6160' },
  { state: 'South Australia', suburb: 'Adelaide', postcode: '5000' },
  { state: 'South Australia', suburb: 'Whyalla', postcode: '5600' },
  { state: 'Tasmania', suburb: 'Hobart', postcode: '7000' },
  { state: 'Tasmania', suburb: 'Launceston', postcode: '7250' },
];

const invalidPostCodeTestCases = [
  { state: 'New South Wales', suburb: 'Zetland', postcode: '0000'},
  { state: 'Victoria', suburb: 'Melbourne', postcode: '0000' },
  { state: 'Victoria', suburb: 'Ferntree Gully', postcode: '0000' },
  { state: 'Queensland', suburb: 'Brisbane', postcode: '0000' },
];

const invalidSuburbTestCases = [
  { state: 'Victoria', suburb: 'invalid suburb', postcode: '2007' },
  { state: 'New South Wales', suburb: 'invalid suburb', postcode: '2010' },
  { state: 'Queensland', suburb: 'invalid suburb', postcode: '6000' },
  { state: 'Western Australia', suburb: 'invalid suburb', postcode: '6160' },
];

positiveTestCases.forEach(({state, suburb, postcode}) => {
    test(`should display positive notification for ${suburb} ${state} ${postcode}`, async ({ page }) => {
      await page.goto('/');
      await page.fill('input[name="postcode"]', postcode);

      await page.fill('input[name="suburb"]', suburb);

      await page.click("#multi-selector");
      await page.locator("#multi-selector", { hasText: state }).click();

      await page.click('button[type="submit"]');

      const notification = page.locator("#notification");

      await expect(notification).toContainText("Valid address!",  { timeout: 20_000 });
      await expect(notification).toHaveClass("mt-4 p-2 text-white rounded-lg text-center bg-green-500");
    })
});

invalidPostCodeTestCases.forEach(({state, suburb, postcode}) => {
  test(`should display negative postcode notification for ${suburb} ${state} ${postcode}`, async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="postcode"]', postcode);

    await page.fill('input[name="suburb"]', suburb);

    await page.click("#multi-selector");
    await page.locator("#multi-selector", { hasText: state }).click();

    await page.click('button[type="submit"]');

    const notification = page.locator("#notification");

    await expect(notification).toContainText("Error: Postcode",  { timeout: 20_000 });
    await expect(notification).toHaveClass("mt-4 p-2 text-white rounded-lg text-center bg-red-500");
  })
});

invalidSuburbTestCases.forEach(({state, suburb, postcode}) => {
  test(`should display negative suburb notification for ${suburb} ${state} ${postcode}`, async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="postcode"]', postcode);

    await page.fill('input[name="suburb"]', suburb);

    await page.click("#multi-selector");
    await page.locator("#multi-selector", { hasText: state }).click();

    await page.click('button[type="submit"]');

    const notification = page.locator("#notification");

    await expect(notification).toContainText("Error: Suburb",  { timeout: 20_000 });
    await expect(notification).toHaveClass("mt-4 p-2 text-white rounded-lg text-center bg-red-500");
  })
});