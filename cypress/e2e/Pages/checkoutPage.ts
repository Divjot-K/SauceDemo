/// <reference types="cypress" />

class checkoutPage {
  elements = {
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postCodeInput: () => cy.get('[data-test="postalCode"]'),
    cancelButton: () => cy.get('[data-test="cancel"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    checkoutTitle: () => cy.get('[data-test="title"]'),
    paymentInfoText: () => cy.get('[data-test="payment-info-value"]'),
    shippingInfoText: () => cy.get('[data-test="shipping-info-value"]'),
    itemNameLink: () => cy.get('[data-test="inventory-item-name"]'),
    itemPriceText: () => cy.get('[data-test="inventory-item-price"]'),
    itemTotalText: () => cy.get('[data-test="subtotal-label"]'),
    taxText: () => cy.get('[data-test="tax-label"]'),
    totalAmountText: () => cy.get('[data-test="total-label"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    checkoutCompleteText: () => cy.get('[data-test="complete-text"]'),
    generatePDFButton: () => cy.get('[data-test="generate-pdf-order"]'),
    backButton: () => cy.get('[data-test="back-to-products"]'),
  };

  verifyCheckoutInfoPage() {
    cy.url().should("contain", "/checkout-step-one");
    this.elements
      .checkoutTitle()
      .should("have.text", "Checkout: Your Information");
  }

  enterDetails(fname: string, lname: string, postcode: string) {
    this.elements.firstNameInput().type(fname);
    this.elements.lastNameInput().type(lname);
    this.elements.postCodeInput().type(postcode);
  }

  clickContinue() {
    this.elements.continueButton().should("be.enabled");
    this.elements.continueButton().click();
    cy.url().should("contain", "/checkout-step-two.html");
  }

  verifyCheckoutOverviewPage() {
    cy.url().should("contain", "/checkout-step-two.html");
    this.elements.checkoutTitle().should("have.text", "Checkout: Overview");
  }
  verifyCheckoutOverviewDetails() {
    this.elements.paymentInfoText().should("exist");
    this.elements.shippingInfoText().should("exist");
    this.elements.itemNameLink().should("exist");
    this.elements.itemPriceText().should("exist");
    this.elements.itemTotalText().should("exist");
    this.elements.taxText().should("exist");
    this.elements.totalAmountText().should("exist");
  }
  clickFinish() {
    this.elements.finishButton().should("be.enabled");
    this.elements.finishButton().click();
    cy.url().should("contain", "/checkout-complete.html");
  }
  verifyCheckoutCompletePage() {
    cy.url().should("contain", "/checkout-complete.html");
    this.elements.checkoutTitle().should("have.text", "Checkout: Complete!");
  }
  clickGeneratePDF() {
    this.elements.generatePDFButton().click();
  }
  verifyPDFDownloaded() {
    cy.task("findDownloadedOrderPdf").should("exist");
  }
  verifyItemPriceIsCorrect() {
    let total = 0.0;
    this.elements.itemPriceText().then(($items) => {
      const prices = [...$items].map((el) =>
        parseFloat(el.textContent!.replace("$", "").trim()),
      );
      for (let i = 0; i < prices.length; i++) {
        expect(prices[i]).to.be.greaterThan(0);
        total += prices[i];
      }
    });
    this.elements.finishButton().scrollIntoView();
    this.elements.itemTotalText().then((totalText) => {
      cy.log(totalText.text());
      const totalPrice = parseFloat(
        totalText.text().replace("Item total: $", "").trim(),
      );
      expect(totalPrice).to.equal(total);
    });
  }
}
export default new checkoutPage();
