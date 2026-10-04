/// <reference types="cypress" />
import inventory from "../Pages/inventoryPage";
import cart from "../Pages/cartPage";

describe("Verify the Cart", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should allow a user to add and remove items from inventory", () => {
    inventory.addItem("Sauce Labs Backpack");
    inventory.addItem("Sauce Labs Bolt T-Shirt");
    inventory.addItem("Sauce Labs Fleece Jacket");
    inventory.verifyCartCount(3);
    inventory.removeItem("Sauce Labs Fleece Jacket");
    inventory.verifyCartCount(2);
  });

  it("should allow a user to remove items from cart", () => {
    inventory.addItem("Sauce Labs Backpack");
    inventory.addItem("Sauce Labs Bolt T-Shirt");
    inventory.addItem("Sauce Labs Fleece Jacket");
    inventory.verifyCartCount(3);
    inventory.clickCart();
    cart.removeItem("Sauce Labs Fleece Jacket");
    cart.verifyItemsInCart(2);
  });
});
