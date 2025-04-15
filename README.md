# Circula Test Automation

This repository contains automated tests for the Circula application using [Playwright](https://playwright.dev/). The tests verify various functionalities, such as user sign-up, country dropdown visibility, and country selection.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Key Features](#key-features)

---

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/) (or npm)
- A modern browser (e.g., Chrome)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/circula-test-automation.git
   cd circula-test-automation
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install Playwright browsers:
   ```bash
   yarn playwright install
   ```

---

## Running Tests

### Run All Tests
To execute all tests:
```bash
yarn playwright test
```

### View Execution Reports
To view exeuction reports:
```bash
yarn playwright show-report
```

### Run a Specific Test
To run a specific test file:
```bash
yarn playwright test country.spec.ts
```

### Debug Tests
To debug tests interactively:
```bash
yarn playwright test --debug
```

---

## Project Structure

```
circula-test-automation/
├── src/
│   ├── pages/
│   │   ├── credentialsPage.ts       # Page object for login functionality
│   │   ├── contactDetailsPage.ts    # Page object for contact details
│   │   ├── companyInformationPage.ts # Page object for company information
│   └── utils/
│       ├── networkUtils.ts          # Utility for handling network requests
├── tests/
│   ├── country.spec.ts              # Test cases for country dropdown
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```


---

## Key Features

- **Playwright Framework**: UI testing with support for Chromium.
- **Page Object Model (POM)**: Organized and reusable page objects for better maintainability.
- **Network Utilities**: Custom utilities to wait for network requests to complete.
- **Environment Configurations**: Easily configurable via `.env` file.

---

