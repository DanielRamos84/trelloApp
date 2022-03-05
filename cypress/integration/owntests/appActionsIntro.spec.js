describe('Introduction to App Actions', () => {
    it('Visit the site', () => {
        cy.visit('/');

        cy.window().then(window => {
            console.log(window.app)
            window.app.showLoginModule= true;
           console.log(window[children]);
        });
    });
});