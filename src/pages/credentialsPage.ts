import { Page, Locator } from '@playwright/test';
import * as dotenv from 'dotenv';


dotenv.config();
const applicationUrl = process.env.APPLICATION_URL;


export class CredentialsPage {
    private page: Page;

    /**
     * Locators for the elements on the page
     */
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly acceptTosCheckbox: Locator;
    readonly tryForFreeButton: Locator;
    readonly userCentricsDialog: Locator;
    readonly acceptCookiesButton: Locator;


    constructor(page: Page) {
        this.page = page;

        /**
         * Initialize locators for the elements on the page
         */
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.acceptTosCheckbox = page.locator('input[name="acceptTos"]');
        this.tryForFreeButton = page.locator('button:has-text("Try for free")');
        this.userCentricsDialog = page.locator('button[data-testid="uc-accept-all-button"]');
        this.acceptCookiesButton = page.locator('button[data-testid="uc-accept-all-button"]');

    }

    /**
     * Method to login using email and password
     * @param username - The email address of the user
     * @param password - The password of the user
     */
    async login(username: string, password: string): Promise<void> {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.acceptTosCheckbox.waitFor({ state: 'visible' });
        await this.acceptTosCheckbox.check({ force: true });
        await this.tryForFreeButton.click();
    }

    /**
     * Method to accept cookies using the Usercentrics dialog
     */
    async acceptCookies(): Promise<void> {
        // Wait for the Usercentrics dialog to appear
        await this.userCentricsDialog.waitFor({ state: 'visible' });
        // Click the "Accept All" button to bypass the dialog
        await this.acceptCookiesButton.click();
        await this.userCentricsDialog.waitFor({ state: 'hidden' });
    }




    async navigateToCirculaUrl(page: Page): Promise<void> {
        if (!applicationUrl) {
            throw new Error('APPLICATION_URL is not defined in the environment variables.');
        }
        await page.goto(applicationUrl);
        await page.waitForLoadState('networkidle'); // Wait until there are no network requests for at least 500ms
    }

}