/// <reference types="cypress" />
import loginPage from '../../support/page-objects/loginPage';
import homePage from '../../support/page-objects/homePage';

let loginData;
describe('Verify Login Functionality', () => {
    beforeEach(() => {
        cy.fixture('credentials').then((credential) => {
            loginData = credential;
        });
        cy
            .visit('/')
    });

    it('Verify Login With Valid Credentials', () => {
        loginPage.inputEmail(loginData.valid.email)
            .inputPassword(loginData.valid.password)
            .inputCaptchaAndClick()
            .clickSignIn();
        cy.location('pathname').should('include', '/account/dashboard');
        homePage.logout();
        cy.location('pathname').should('include', '/login');
    });

    it.only('verify Login with Invalid Credentials ', () => {
        loginPage.inputEmail(loginData.invalid.email)
            .inputPassword(loginData.invalid.password)
            .clickSignIn()
            .inputCaptchaAndClick('testvale')
            .verifyInvalidCredsMessage();
        cy.location('pathname').should('include', '/login');
    });
})