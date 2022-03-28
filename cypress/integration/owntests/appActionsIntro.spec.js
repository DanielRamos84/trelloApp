describe('Introduction to App Actions', () => {
    it('Use app actions to show Login to your account card', () => {
        cy.visit('/');

        cy.window().then(window => {
            console.log(window.app)
            window.app.showLoginModule= true;
        });
    });

    it('Use app actions to show Login to your account card', () => {
        cy.visit('/');

        cy.component('root')
            .then(root => {
                root.showLoginModule = true
            });

        cy.component('Login')
            .then(login => {
            login.loginCardActive= false;
            login.signupCardActive= true;
        });
    });
});