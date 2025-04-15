import { Page, Locator } from '@playwright/test';

export class ContactDetailsPage {
  private page: Page;

  /**
   * Locators for the elements on the Contact Details page
   */
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly nextStepButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /**
     * Initialize locators for the elements on the Contact Details page
     */
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.phoneNumberInput = page.locator('input[name="phoneNumber"]');
    this.nextStepButton = page.locator('button:has-text("Next step")')
    this.backButton = page.locator('button:has-text("Back")');
  }

  /**
   * Method to fill in contact details
   * @param firstName - The first name of the user
   * @param lastName - The last name of the user
   * @param phoneNumber - The phone number of the user
   */
  async fillContactDetails(firstName: string, lastName: string, phoneNumber: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.phoneNumberInput.fill(phoneNumber);
  }

  /**
   * Method to save contact details
   */
  async navigateToNextStep(): Promise<void> {
    await this.nextStepButton.click();
  }
}