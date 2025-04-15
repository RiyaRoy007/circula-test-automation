import { test, expect } from '@playwright/test';
import { CredentialsPage } from '../src/pages/credentialsPage';
import { ContactDetailsPage } from '../src/pages/contactDetailsPage';
import { CompanyInformationPage } from '../src/pages/companyInformationPage';
import waitForAllRequestsToComplete from '../src/utils/networkUtils';
import * as dotenv from 'dotenv';
import { beforeEach, describe } from 'node:test';

describe('Country Selection Tests', () => {

  dotenv.config({ path: 'src/const/consts.env' });
  // Load environment variables from .env file
  const userEmail = process.env.USER_EMAIL; if (!userEmail) { throw new Error('USER_EMAIL is not defined.'); }
  const userPassword = process.env.USER_PASSWORD; if (!userPassword) { throw new Error('USER_PASSWORD is not defined.'); }
  const applicationUrl = process.env.APPLICATION_URL; if (!applicationUrl) { throw new Error('APPLICATION_URL is not defined.'); }


  test('Verify if sign up country Sweden is visible and is selectable from the dropdown options', async ({ page }) => {


    // Initialize page objects
    const credentialsPage = new CredentialsPage(page);
    const contactDetailsPage = new ContactDetailsPage(page);
    const companyInformationPage = new CompanyInformationPage(page);

    // Step 1: Login using credentials
    await credentialsPage.navigateToCirculaUrl(page);
    await credentialsPage.acceptCookies();
    await credentialsPage.login(userEmail, userPassword);


    // Step 2: Fill in contact details
    await contactDetailsPage.fillContactDetails('Riya', 'Roy', '1234567890');
    await contactDetailsPage.navigateToNextStep();


    // Step 3: Verify if the country dropdown is visible
    await waitForAllRequestsToComplete(page);
    const isCountryDropdownVisible = await companyInformationPage.isCountryDropdownVisible();
    expect(isCountryDropdownVisible).toBe(true);

    // Step 4: Fill in company information and select country
    await waitForAllRequestsToComplete(page);
    const countryList = await companyInformationPage.getCountryList();
    console.log('Available countries:', countryList);

    // Step 5: Verify if the country Sweden is in the list
    expect(countryList).toContain('Sweden');
    console.log('Country "Sweden" is available in the list.');
    // Step 6: Select the country
    await companyInformationPage.selectCountry('Sweden');
    await waitForAllRequestsToComplete(page);
    const selectedCountry = await companyInformationPage.companyCountryInput.inputValue();
    console.log('Selected country:', selectedCountry);
    expect(selectedCountry).toBe('Sweden');
    console.log('Country "Sweden" is selected from the dropdown options.');
    
  });


  test('Verify sign up country Italy can be selected from dropdown options', async ({ page }) => {

    // Initialize page objects
    const credentialsPage = new CredentialsPage(page);
    const contactDetailsPage = new ContactDetailsPage(page);
    const companyInformationPage = new CompanyInformationPage(page);

    // Step 1: Login using credentials
    await credentialsPage.navigateToCirculaUrl(page);
    await credentialsPage.acceptCookies();
    await credentialsPage.login(userEmail, userPassword);


    // Step 2: Fill in contact details
    await contactDetailsPage.fillContactDetails('Riya', 'Roy', '1234567890');
    await contactDetailsPage.navigateToNextStep();


    // Step 3: Verify if the country dropdown is visible
    await waitForAllRequestsToComplete(page);
    const isCountryDropdownVisible = await companyInformationPage.isCountryDropdownVisible();
    expect(isCountryDropdownVisible).toBe(true);

    // Step 4: Fill in company information and select a country 
    await companyInformationPage.selectCountry('Italy');
    await waitForAllRequestsToComplete(page);
    const selectedCountry = await companyInformationPage.companyCountryInput.inputValue();
    console.log('Selected country:', selectedCountry);
    expect(selectedCountry).toBe('Italy');
    console.log('Country "Italy" is selected from the dropdown options.');

  });
});