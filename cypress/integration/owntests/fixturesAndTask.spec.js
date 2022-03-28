const boards = require('../../fixtures/tenBoards.json');
const listBoards= require('../../fixtures/oneListPerBoard.json');
const JSONboards= JSON.stringify(boards);
const JSONlistBoards= JSON.stringify(listBoards);

describe('DB seeding cy.task and fixtures', () => {
    before(() => {
        //login once bypassing UI 
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}login`,
            body: {
                "email": `${Cypress.config('email')}`,
                "password": `${Cypress.config('password')}`
                }
                }).its('body')
                    .then(body => {
                        cy.setCookie('trello_token', body.accessToken, {log:false});
                });
    });

    beforeEach('Delete and set Boards', () => {
        //Preserve the cookie so we stay logged in through out tests
        Cypress.Cookies.preserveOnce('trello_token')
        
        cy.task('seedBoardData', {JSONboards, JSONlistBoards})
        
        cy.visit('/');
        
        cy.get('[data-cy="logged-user"]').should('contain', 'some@email.com');
    });

    it.only('Check that we have 10 boards', () => {
        cy.get('[data-cy="board-item"]')
            .should('have.length', 10);
    });

    it.only ('Get board title compare text to fixture file', () => {
        cy.get('[data-cy="board-item"]')
            .as('boards');

        cy.get('@boards')
            .each((board, index) => {
                expect(board.text()).to.include(boards[index].name )
        });
    });

    it ('Send API request to get board title compare text to fixture file', () => {
    cy.request({
            method:'GET',
            url: '/api/boards',
            headers: {'Authorization': 'Bearer '+ `${Cypress.env('token')}`,
            accept: 'application/json'},
            }).its('body')
                .then(res => {
                    const resArrayBoards= res;
                    resArrayBoards.forEach((resBoard, index) => {
                        expect(resBoard.name).eq(boards[index].name)
                    });
                });
    });

    it('Send API request to get list title compare text to fixture file', () => {            
        cy.request({
            method:'GET',
            url: '/api/lists',
            headers: {'Authorization': 'Bearer '+ `${Cypress.env('token')}`,
            accept: 'application/json'},
            }).its('body')
                .then(res => {
                   const resArrayTitle= res;
                   resArrayTitle.forEach((resTitle, index) => {
                    expect(resTitle.title).eq(listBoards[index].title)
                   });
                });   
        });

    it('Visit each board', () => {
        cy.get(boards)
            .each(board => {
                cy.contains('h1', board.name)
                    .click();

                cy.url()
                    .should('include', `${Cypress.config('baseUrl')}board`);

                cy.get('[data-cy="logged-user"]'). should('contain', 'some@email.com');

                cy.get('#loginMessage')
                    .as('loginBanner');

                cy.contains('My Boards')
                    .should('be.visible')
                    .click();
            });
    });
});