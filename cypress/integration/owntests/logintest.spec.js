///<reference types= "cypress"/>

describe('Suite of tests login', () => {
    before(() => {
        cy.clearCookie('trello_token');
    })

    it('Login via UI', () => {
        cy.visit('/');

        cy.contains('[data-cy="login-menu"]', 'Log in')
            .should('be.visible')
            .click();
        
        cy.get('[data-cy="login-email"')
            .should('be.visible')
            .type(`${Cypress.env('email')}`);
        
        cy.get('[data-cy="login-password"]')
            .should('be.visible')
            .type(`${Cypress.env('password')}`, {log:false});
        
        cy.get('[data-cy="login"')
            .should('be.visible')
            .click();

        cy.get('[data-cy="logged-user"]')
            .should('be.visible')
            .click();

        cy.contains('Log out')
            .should('be.visible')
            .click();         
    });
});