/// <reference types="cypress" />
import inventory from "../Pages/inventoryPage";
import cart from "../Pages/cartPage";
import checkout from "../Pages/checkoutPage";
import userData from "../../fixtures/userData.json";

describe("Verify the Checkout Process", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should allow a user to proceed to checkout", { tags: ["smoke"] }, () => {
    inventory.addItem("Sauce Labs Backpack");
    inventory.addItem("Sauce Labs Bolt T-Shirt");
    inventory.addItem("Sauce Labs Fleece Jacket");
    inventory.verifyCartCount(3);
    inventory.clickCart();
    cart.verifyItemsInCart(3);
    cart.clickCheckout();
    checkout.verifyCheckoutInfoPage();
    checkout.enterDetails(userData.fname, userData.lname, userData.postcode);
    checkout.clickContinue();
    checkout.verifyCheckoutOverviewPage();
    checkout.verifyCheckoutOverviewDetails();
    checkout.clickFinish();
    checkout.verifyCheckoutCompletePage();
  });
});
