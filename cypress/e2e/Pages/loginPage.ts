/// <reference types="cypress" />
class loginPage {
  elements = {
    emailInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit("/");
  }

  login(email: string, password: string) {
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }
}

export default new loginPage();
