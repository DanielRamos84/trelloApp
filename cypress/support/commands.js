require('@4tw/cypress-drag-drop')
import 'cypress-file-upload';
import "cypress-real-events/support";

Cypress.Commands.add('login',()=>{
  const email= Cypress.env('email');
  const password= Cypress.env('password')
  
  cy.contains('[data-cy="login-menu"]', 'Log in').should('be.visible')
    .click();
  cy.get('[data-cy="login-email"').type(email);
  cy.get('[data-cy="login-password"]').type(password, {log:false})
  cy.get('[data-cy="login"').click();
  cy.get('[data-cy="logged-user"]').contains('some@email.com')
  
  const log= Cypress.log({
  name:"Login",
  displayName:"Authorized login using cookies ",
  message:[`${email}`]        
  });
});

Cypress.Commands.add('addFirstBoard',(boardText)=>{
        cy.get('[data-cy="create-board"]').click();
        cy.get('[data-cy="new-board-input"]').type(boardText);
        cy.get('[data-cy="new-board-create"]').click();
})

Cypress.Commands.add('addList',(listName)=>{
  cy.get('.CreateList').find('[data-cy="add-list"]').click();
        cy.get('[data-cy="add-list-input"]').type(listName);
        cy.get('[data-cy="save"]').click();
})

Cypress.Commands.add('addTask',(taskName)=>{
  cy.contains('[data-cy="new-task"]', 'Add new task').click();
  
  cy.get('[data-cy="task-input"]')
    .should('be.visible')
    .type(taskName);
        
  cy.get('[data-cy="add-task"]').click();
});

Cypress.Commands.add('checkTaskText', ()=>{
  cy.get('[data-cy="task-title"]').should(taskNameOne=>{
    expect(taskNameOne[0]).to.contain('Task #1')
    expect(taskNameOne[1]).to.contain('Task #2')
  });
});

Cypress.Commands.add('dragDrop',()=>{
  cy.get('[data-cy="task-title"]').eq(0)
  .as('Task #1')
  
  cy.get('[data-cy="task-title"]').eq(1)
  .as('Task #2')

  cy.get('@Task #1').drag('@Task #2')
});

Cypress.Commands.add('attachFileDragDrop',()=>{
  cy.get('[data-cy="task"]').eq(0)
    .click();

    cy.get('.dropzone')
    .attachFile('logo.png', { subjectType: 'drag-n-drop' });
});

Cypress.Commands.add('showStar',()=>{
  cy.get('[data-cy="star"]').invoke('show');

  const log= Cypress.log({
    name: "Show the star",
    displayName: "Show ⭐ on a board using invoke",
    message: ""
  });
});

Cypress.Commands.add('hideStar',()=>{
  cy.get('[data-cy="star"]').invoke('hide')

  const log= Cypress.log({
    name: "Hide star",
    displayName: "Hide ⭐ from board taking away show attribute",
    message: ""
  });
});


Cypress.Commands.add('mouseOverStar',()=>{
  cy.get('[data-cy="board-item"]').trigger('mouseover')

  const log= Cypress.log({
    name: "mouse over",
    displayName: "mouse over to test ⭐ is visible",
    message: ""
  });
});

Cypress.Commands.add('mouseOutStar',()=>{
  cy.get('[data-cy="board-item"]').trigger('mouseout')

  const log= Cypress.log({
    name: "mouse out",
    displayName: "mouse out to test ⭐ isn't visible",
    message: ""
  });
});