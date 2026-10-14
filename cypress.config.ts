import { defineConfig } from "cypress";
import fs from "fs";
import path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      const downloadsFolder = path.resolve(
        config.projectRoot,
        config.downloadsFolder,
      );
      on("task", {
        async findDownloadedOrderPdf() {
          const deadline = Date.now() + 20_000;

          while (Date.now() < deadline) {
            const file = fs.readdirSync(downloadsFolder).find((name) => {
              if (
                !name.startsWith("swag-labs-order-") ||
                !name.endsWith(".pdf")
              ) {
                return false;
              }

              const filePath = path.join(downloadsFolder, name);
              return fs.statSync(filePath).mtimeMs >= Date.now() - 15_000;
            });

            if (file) return file;

            await new Promise((resolve) => setTimeout(resolve, 300));
          }

          return null;
        },
      });
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 6000,
});
