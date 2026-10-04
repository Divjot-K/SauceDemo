/// <reference types="cypress" />
import inventory from "../Pages/inventoryPage";
import { SortingOptions } from "../../support/common";

describe("Verify the Checkout Process", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should allow a user to sort items by name from A to Z", () => {
    inventory.sortButton(SortingOptions.NameAToZ);
    inventory.verifySortedByName(SortingOptions.NameAToZ);
  });

  it("should allow a user to sort items by name from Z to A", () => {
    inventory.sortButton(SortingOptions.NameZToA);
    inventory.verifySortedByName(SortingOptions.NameZToA);
  });

  it("should allow a user to sort items by price from low to high", () => {
    inventory.sortButton(SortingOptions.PriceLowToHigh);
    inventory.verifySortedByPrice(SortingOptions.PriceLowToHigh);
  });

  it("should allow a user to sort items by price from high to low", () => {
    inventory.sortButton(SortingOptions.PriceHighToLow);
    inventory.verifySortedByPrice(SortingOptions.PriceHighToLow);
  });
});
