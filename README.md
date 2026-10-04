# Running the Cypress tests

## Requirements

- Node.js 22, 24, or 26+ (Cypress 16 and the configured Mochawesome reporter require Node.js 22 or newer).
- npm, included with Node.js.
- Google Chrome for the Chrome commands, or Mozilla Firefox for the Firefox commands.
- Internet access to `https://www.saucedemo.com/`, which is the test application's configured base URL.

## Install dependencies

Open a terminal in the project folder (the folder containing `package.json`) and run:

```sh
npm ci
```

This installs the versions recorded in `package-lock.json`, including Cypress, `@cypress/grep`, and the Mochawesome reporter.

## Configure login credentials

Create a root-level `cypress.env.json` file (next to `package.json`) with the login credentials:

```json
{
  "USERNAME": "your_username",
  "PASSWORD": "your_password"
}
```

The shared `cy.login()` command reads these values with Cypress 16's `cy.env()` API. `cypress.env.json` is ignored by Git; keep credentials in this local file and do not commit it.

## Run tests

Run the full end-to-end suite in Chrome:

```sh
npm run cy:chrome
```

Or run it in Firefox:

```sh
npm run cy:firefox
```

To open the Cypress interactive runner and select E2E tests and a browser:

```sh
npx cypress open
```

## Run tests by tag

Tests can be tagged with `@cypress/grep` using a test option, for example:

```ts
it("should complete checkout", { tags: ["smoke"] }, () => {
  // Test steps
});
```

The checkout flow test is tagged `smoke`. Run only tests with that tag using:

```sh
npm run cy:smoke:chrome
npm run cy:smoke:firefox
```

These scripts pass `grepTags=smoke` with Cypress `--expose` and omit tests that do not match.

## Generate an HTML report

Run the suite with the configured Mochawesome reporter:

```sh
npm run cy:report
```

The reporter writes its output under `cypress/reports/html`. Cypress may clear this report output directory at the start of a run.

## Run one spec

For example, run only the checkout spec in Chrome:

```sh
npx cypress run --browser chrome --spec "cypress/e2e/Tests/checkout.cy.ts"
```

## Notes

- Cypress test specs are in `cypress/e2e/`.
- The shared Cypress support setup (custom commands, tag registration, and report registration) is in `cypress/support/e2e.ts`.
- `npm test` is only a placeholder script in this project; use one of the Cypress commands above instead.
