/// <reference types="cypress" />
class cartPage {
  elements = {
    qtyNumberText: () => cy.get('[data-test="item-quantity"]'),
    itemNameLink: () => cy.get('[data-test="inventory-item-name"]'),
    itemPriceText: () => cy.get('[data-test="inventory-item-price"]'),
    removeButton: () => cy.get('[data-test^="remove-sauce-labs-"]'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    cartItem: () => cy.get('[data-test="inventory-item"]'),
  };

  verifyItemsInCart(count: number) {
    if (count === 0) {
      this.elements.cartItem().should("not.exist");
    } else {
      this.elements.cartItem().should("have.length", count);
    }
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

  clickCheckout() {
    this.elements.checkoutButton().should("be.enabled");
    this.elements.checkoutButton().click();
    cy.url().should("contain", "/checkout-step-one");
  }
  clickContinueShopping() {
    this.elements.continueShoppingButton().should("be.enabled");
    this.elements.continueShoppingButton().click();
    cy.url().should("contain", "/inventory");
  }
}

export default new cartPage();
