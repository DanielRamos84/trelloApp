///<reference types= "cypress"/>

describe('Suite of tests login', () => {
    beforeEach(() => {
        cy.clearCookie('trello_token');
        cy.visit('/');
    });
    
    it('Login via UI', () => {
        cy.contains('[data-cy="login-menu"]', 'Log in')
            .click();
        
        cy.get('[data-cy="login-email"')
            .type(`${Cypress.env('email')}`);
        
        cy.get('[data-cy="login-password"]')
            .type(`${Cypress.env('password')}`, {log:false});
        
        cy.contains('[data-cy="login"]', 'Log in')
            .click();

        cy.contains('[data-cy="logged-user"]', 'some@email.com')
            .click();

        cy.contains('span', 'Log out')
            .click();
    });
});