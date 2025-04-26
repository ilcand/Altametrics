import { test, expect } from '@playwright/test';

test('login and check invoices', async ({ page }) => {
    // Go to login page
    await page.goto('http://localhost:5173/login');
    
    // Fill login form
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for navigation to invoices page
    await page.waitForURL('**/invoices');
    
    // Check if we're on the invoices page
    await expect(page.locator('h1:has-text("Invoices")')).toBeVisible();
    
    // Check if invoices are loaded (should have at least 1 row in the table)
    const invoiceRows = page.locator('table tbody tr');
    const rowCount = await invoiceRows.count();
    expect(rowCount).toBeGreaterThan(0); // Check if there are more than 0 rows
  });