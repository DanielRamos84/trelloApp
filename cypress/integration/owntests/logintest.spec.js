///<reference types= "Cypress"/>
describe('Login test suite',()=>{
    before('Visit homepage log into the application',()=>{
        cy.visit('/')
        cy.loginSetCookie();
        
    });
    
    beforeEach(()=>{
        cy.visit('/')
        Cypress.Cookies.debug(true, { verbose: false })
        // Cypress.Cookies.preserveOnce('trello_token')//for this particular suite of tests we are to save cookie
        cy.getCookies();
    });


    it('Visit a second time do I have cookie?',()=>{
        cy.get('[data-cy="logged-user"]').should('contain', 'some@email.com')       
    });

    it('Visit second board do I have cookie?',()=>{
        cy.visit('http://localhost:3000/board/29454093432')
        cy.get('[data-cy="logged-user"]').should('contain', 'some@email.com')    
    });

    it('Visit third board do I have cookie?',()=>{
        cy.visit('http://localhost:3000/board/88468223975')
        cy.get('[data-cy="logged-user"]').should('contain', 'some@email.com') 
    });
});