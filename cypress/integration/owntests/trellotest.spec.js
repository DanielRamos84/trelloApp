///<reference types="Cypress"/>
describe('Trello flow test',()=>{
    it.skip('Create our first board',()=>{
        cy.addFirstBoard('Board #1');
    })

    it('Login Test', ()=>{
        cy.visit('http://localhost:3000/');
        cy.contains('h1', 'My Boards')    
    });

    beforeEach('Visit the board we created', ()=>{
        cy.visit('/')
    });

    it('Create list, check text', ()=>{
        cy.addList('List Item #1')
    });

    it('Create task, check task\'s text',()=>{
        cy.addTask('Task #1');
        cy.addTask('Task #2');
        cy.checkTaskText();
    });

    it.only('Show / Hide star on board', ()=>{
        cy.visit('http://localhost:3000/')

        cy.showStar();
        cy.get('[data-cy="star"]').should('be.visible')

        cy.hideStar();
        cy.get('[data-cy="star"]').should('not.be.visible')

        cy.mouseOverStar();
        cy.get('[data-cy="star"]').should('be.visible')
        
        cy.mouseOutStar();
        cy.get('[data-cy="star"]').should('not.be.visible')
    });
});