import { Page } from "@playwright/test";

/**
 * Waits for all API requests to complete by ensuring the network is idle.
 * @param page - The Playwright Page object
 */
export default async function waitForAllRequestsToComplete(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle'); // Wait until there are no network requests for at least 500ms
}