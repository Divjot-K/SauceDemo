import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 15000,
});
