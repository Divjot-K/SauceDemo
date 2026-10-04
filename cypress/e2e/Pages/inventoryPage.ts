/// <reference types="cypress" />
import { SortingOptions } from "../../support/common";

class inventoryPage {
  elements = {
    itemNameLink: () => cy.get('[data-test="inventory-item-name"]'),
    itemPriceText: () => cy.get('[data-test="inventory-item-price"]'),
    addCartButton: () => cy.get('[data-test^="add-to-cart-"]'),
    removeButton: () => cy.get('[data-test^="remove-sauce-labs-"]'),
    sortButton: () => cy.get('[data-test="product-sort-container"]'),
    cartButton: () => cy.get('[data-test="shopping-cart-link"]'),
    cartCountText: () => cy.get('[data-test="shopping-cart-badge"]'),
  };

  sortButton(sortValue: SortingOptions) {
    this.elements.sortButton().select(sortValue);
  }

  verifySortedByName(sortValue: SortingOptions) {
    this.elements.itemNameLink().then(($items) => {
      const names = [...$items].map((el) => el.textContent!.trim());

      for (let i = 1; i < names.length; i++) {
        const previous = names[i - 1];
        const current = names[i];

        const isSorted =
          sortValue === SortingOptions.NameAToZ
            ? previous.localeCompare(current) <= 0
            : previous.localeCompare(current) >= 0;

        expect(
          isSorted,
          `Expected "${previous}" to come before "${current}" for ${sortValue}`,
        ).to.be.true;
      }
    });
  }

  verifySortedByPrice(sortValue: SortingOptions) {
    this.elements.itemPriceText().then(($items) => {
      const prices = [...$items].map((el) =>
        parseFloat(el.textContent!.replace("$", "").trim()),
      );

      for (let i = 1; i < prices.length; i++) {
        const previous = prices[i - 1];
        const current = prices[i];

        const isSorted =
          sortValue === SortingOptions.PriceLowToHigh
            ? previous <= current
            : previous >= current;

        expect(
          isSorted,
          `Expected ${previous} to come before ${current} for ${sortValue}`,
        ).to.be.true;
      }
    });
  }

  addItem(name: string) {
    this.elements
      .itemNameLink()
      .contains(name)
      .parents('[data-test="inventory-item"]')
      .within(() => {
        this.elements.addCartButton().click();
      });
  }

  removeItem(name: string) {
    this.elements
      .itemNameLink()
      .contains(name)
      .parents('[data-test="inventory-item"]')
      .within(() => {
        this.elements.removeButton().click();
      });
  }

  verifyCartCount(count: number) {
    if (count === 0) {
      cy.get("body").then(($body) => {
        if ($body.find('[data-test="shopping-cart-badge"]').length) {
          cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
        }
      });
    } else {
      this.elements.cartCountText().should("have.text", String(count));
    }
  }

  clickCart() {
    this.elements.cartButton().click();
    cy.url().should("contain", "/cart");
  }
}
export default new inventoryPage();
