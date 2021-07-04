///<reference types="Cypress"/>
describe('Trello flow test',()=>{
    it('Create our first board',()=>{
        cy.visit('/');
        cy.addFirstBoard('Board #1');
    });

    after(()=>{
        cy.request('DELETE', "/api/boards");
    });

    it('Create list, check text', ()=>{
        cy.addList('List Item #1')
    });

    it('Create task, check task\'s text',()=>{
        cy.addTask('Task #1');
        cy.addTask('Task #2');
        cy.checkTaskText();
    });

    it('Drag and Drop test',()=>{
        cy.dragDrop();
    })

    it('Attach image drag and drop',()=>{
        cy.intercept('POST', 'localhost:3000/api/upload').as('fileUpload')
        cy.attachFileDragDrop();
        cy.wait('@fileUpload')
    })

    it('Show / Hide star on board', ()=>{
        cy.contains('.Nav_button', 'My Boards')
            .dblclick({force:true});

        cy.showStar();
        cy.get('[data-cy="star"]').should('be.visible')

        cy.hideStar();
        cy.get('[data-cy="star"]').should('not.be.visible')

        cy.mouseOverStar();
        cy.get('[data-cy="star"]').should('be.visible')
        
        cy.mouseOutStar();
        cy.get('[data-cy="star"]').should('not.be.visible')
    });
    it('Use Cypress Real Event plugin for hover test',()=>{
        cy.get('[data-cy="board-item"]').realHover();
    })
});