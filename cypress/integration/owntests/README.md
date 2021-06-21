## _logintest.spec.js_
Trello Flow Test Objectives: 
- Bypass Login UI storing our session cookies

## _trellotest.spec.js_
- For e2e testing in this application we're only focusing on testing the behavior of a single board, list, tasks associated to this.  We can have multiple boards, lists etc created as we execute the test suite but testing the other items is out of scope.

Visit localhost assert the following: Trello image and Log in button in nav bar, an h1 that reads My Boards, a card that reads Create a board...

- Problem: Can't target by class name because same class is assigned on two different h1 elements 
- Solution: use cy.contains('h1', 'My Boards')

Create a board using a custom command and then in our spec test assertion for to check title name assigned to the board.
- `Cypress.Commands.add('addFirstBoard');`
- In our spec file: `cy.addFirstBoard('Board #1');`
- Think of what else is important to assert on this step?

Create a list using a custom command and then in our spec test assertion for to check title name assigned to the board.
- `Cypress.Commands.add('addList');`
- In our spec file: `cy.addList('List Item #1');`
- Think of what else is important to assert on this step?

Create two tasks under our list and assert each task text using custom commands.
- `cy.addTask();`
- _Problem_: As we run our suite of tests, the previous test continues to create a new list each time.  Although we have a beforeEach hook with our baseUrl visiting /board/**** where **** is the actual ID of our board, Cypress console log needs to know under which list we want to create our tasks.

- _Possible Solution_: Target the Add new task using index (0).  This way we ensure we're only creating the task entries for our first list.

- _Problem_: If user moves tasks in between tests test fails when attempting to assert text
- _Solution:_ Select task-title element attribute use shold command followed with expect assertion, this approach ensures test retryability, if user moves tasks cypress re-evaluates test in 4 second window and rechecks, passing the test.

- In our commands.js file
```
Cypress.Commands.add('checkTaskText', ()=>{
    cy.get('[data-cy="task-title"]').should(taskNameOne=>{
        expect(taskNameOne[0]).to.contain('Task #1')
        expect(taskNameOne[1]).to.contain('Task #2')
    });
});

```
- In our test spec file: `cy.checkTaskText();`

- _New Problem:_ We are harcoding the index that we want to check the text-title for being first and second as well as hardcoding the text to assert.  How can we solve this?

Star a board moving this to My Starred collection, challenge here is the start element style display is none.  User has to hover over the board to simulate the start showing up and then clicking this.
- Solution #1: Target the element and force click cy.get('[data-cy="star"]')

- Solution #2: Use invoke attribute to show cy.get('[data-cy="star"]').invoke('show')
- _Problem_: After running invoke ('show') how to I reset its state?
- _Solution:_ Remove attribute cy.get('[data-cy="star"]').invoke('removeAttr', 'show')
- _Problem:_ Flaky test get expected <svg.Star> not to be visible
- Solution:??? 

- Solution #3: Use of event listeners cy.get('[data-cy="board-item"]').trigger('mouseover')