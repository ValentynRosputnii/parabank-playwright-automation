import { test, expect } from '@playwright/test';
import { waitForApp } from '../utils/waitForApp';

test.describe('Parabank smoke', () => {
    test.beforeAll(async ({ baseURL }) => {
        test.setTimeout(60_000); // або 90_000
        if (!baseURL) throw new Error('baseURL is not defined. Check .env');
        await waitForApp(baseURL, 60_000);
    });

    test('Home page opens', async ({ page }) => {
        await page.goto('index.htm'); // або '' або './'
        await expect(page).toHaveTitle(/ParaBank\s*\|\s*Welcome\s*\|\s*Online Banking/i);
    });
});