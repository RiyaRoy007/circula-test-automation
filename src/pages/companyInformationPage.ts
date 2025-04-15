import { Page, Locator } from '@playwright/test';

export class CompanyInformationPage {
  private page: Page;

  /**
   * Locators for the elements on the Company Information page
   */
  readonly companyNameInput: Locator;
  readonly companyCountryInput: Locator;
  readonly companyCountryOptions: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * Initialize locators for the elements on the Company Information page
     */
    this.companyNameInput = page.locator('input[name="companyName"]');
    this.companyCountryInput = page.locator('input[name="country"]');
    this.companyCountryOptions = page.locator('li[role="option"]');
    this.createAccountButton = page.locator('button:has-text("Create Account")');
  }

  /**
   * Method to verify if the country dropdown is visible
   */
  async isCountryDropdownVisible(): Promise<boolean> {
    return await this.companyCountryInput.isVisible();
  }

  /**
    * Method to get the list of countries from the dropdown
    */
  async getCountryList(): Promise<string[]> {
    await this.companyCountryInput.click(); // Open the dropdown
    await this.companyCountryOptions.first().waitFor({ state: 'visible' });
    return await this.companyCountryOptions.allTextContents(); // Get all country names
  }


  async selectCountry(country: string): Promise<void> {
    await this.companyCountryInput.click(); // Open the dropdown

    await this.page.evaluate((country) => {
      const dropdown = document.querySelector('input[name="country"]') as HTMLInputElement;
      if (dropdown) {
        dropdown.value = country; // Set the value
        dropdown.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
        dropdown.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
      }
    }, country);
  }

}