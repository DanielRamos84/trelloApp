Cypress.Commands.add('addBoard', (input) => {

  cy
    .get('[data-cy="create-board"]')
    .click();

  cy
    .get('[data-cy=new-board-input]')
    .type(input + '{enter}');

})

Cypress.Commands.add('loginSetCookie',()=>{
  cy.get('[data-cy="login-menu"]').should('be.visible')
            .click();
        cy.get('[data-cy="login-email"').type('some@email.com');
        cy.get('[data-cy="login-password"]').type('danrautomation',{log:false})
        cy.get('[data-cy="login"').click();
        cy.get('[data-cy="logged-user"]').contains('some@email.com')

        // cy.setCookie('trello_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVAZW1haWwuY29tIiwiaWF0IjoxNjI0Mjk0NDM5LCJleHAiOjE2MjQyOTgwMzksInN1YiI6IjEifQ.qffhJood2ZwmXijWMfwZZOdcQJ_gFagX64VNQx1CFv8')
})

Cypress.Commands.add('addFirstBoard',(boardText)=>{
  cy.visit('http://localhost:3000/');
        cy.get('[data-cy="create-board"]').click();
        cy.get('[data-cy="new-board-input"]').type(boardText);
        cy.get('[data-cy="new-board-create"]').click();
})

Cypress.Commands.add('addList',(listName)=>{
  cy.get('[data-cy="add-list"]').click();
        cy.get('[data-cy="add-list-input"]').type(listName);
        cy.get('[data-cy="save"]').click();
})

Cypress.Commands.add('addTask',(taskName)=>{
  cy.get('[data-cy="new-task"]').eq(0).click()
        cy.get('[data-cy="task-input"]').eq(0).type(taskName);
        cy.get('[data-cy="add-task"]').eq(0).click();
});

Cypress.Commands.add('checkTaskText', ()=>{
  cy.get('[data-cy="task-title"]').should(taskNameOne=>{
    expect(taskNameOne[0]).to.contain('Task #1')
    expect(taskNameOne[1]).to.contain('Task #2')
  });
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
  cy.get('[data-cy="star"]').invoke('removeAttr', 'show')

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