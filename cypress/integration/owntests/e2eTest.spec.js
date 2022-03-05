///<reference types= "Cypress"/>
describe('Login test suite using Cookies',()=>{
    before('Visit homepage log into the application',()=>{
        cy.visit('http://localhost:3000/')
        cy.login();
        cy.setCookie('trello_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVAZW1haWwuY29tIiwiaWF0IjoxNjI0Mjk0NDM5LCJleHAiOjE2MjQyOTgwMzksInN1YiI6IjEifQ.qffhJood2ZwmXijWMfwZZOdcQJ_gFagX64VNQx1CFv8')
        cy.get('[data-cy="logged-user"]').should('contain', 'some@email.com')
    });
    
    after(()=>{
        cy.getCookies().should('have.length', 2)
        cy.clearCookie('trello_token');
        cy.getCookie('trello_token').should('be.null');
    });
    
    it('Visit second board without having to log back in',()=>{
        cy.visit('http://localhost:3000/board/29454093432');
        cy.get('[data-cy="board-title"]').should('have.value','Second one')    
    });

    it('Visit third board without having to log back in',()=>{
        cy.visit('http://localhost:3000/board/88468223975')
        cy.get('[data-cy="board-title"]').should('have.value','Third One')
    });
});