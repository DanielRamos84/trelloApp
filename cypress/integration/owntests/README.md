## _logintest.spec.js_
Trello Flow Test Objectives: 
- Bypass Login UI storing our session cookies, problem trying to solve "Cypress automatically clears all cookies before each test to prevent state from building up."
## _First iteration_
- We Sign up creating a new account for Trello app use, login with our new credentials. Chrome Dev Tools > Application > Cookies notice this sets a trello_token cookie with Value.
    <img src="..\..\..\Images\2021-06-25_15-03-42.png">

- In our spec file there's a two part operation. _First_ a before block where we visit localhost and login to the application using our custom command `cy.login() ` 
- We also set our cookie value in the same before block, keep in mind this isn't the best place to store that information but for our testing purposes for now this is we're se are setting it.
-  Create a beforeEach block where again we visit localhost but in here the key is to preserve cookies for this spec file using `Cypress.Cookies.preserveOnce('trello_token', 'yourcookievalue')`
    
    <img src="../../../Images\2021-06-25_15-13-02.png">

- Run the test _once only_ and this will now save the cookie and we'll no longer have to login in between tests, add a simple test in your it block to assert when your logged in your email is displayed.

 <img src="../../../Images\2021-06-25_15-14-14.png">

- After running the test for the first time now we must comment out the before statement because we don't want to set cookie again, we've already saved it in our beforeEach hook and the remainder of the tests we'll no longer be logged out.

<img src="../../../Images\2021-06-25_20-57-52.png">

- In trello app create two boards Second one and Third One, log out of system, log back in notice both boards are presented by default.
- To test this we visit the url for each individual board on its own it block without loosing cookies in between tests.

<img src="../../../Images\2021-06-25_20-59-21.png">

- Credentials shouldn't be stored in the commands.js file and cookes shouldn't be stored in the spec file test, we'll be addressing that next.

## _Second iteration_
- Storing email and password as environment variables under `cypress.json` file passing those as arguments into custom command `login` 
- Cookies are being stored globally now under support folder > `index.js` file
```
Cypress.Cookies.defaults({
    preserve: 'trello_token',
  });

```
- Added after block that exectues once after all it blocks, here we clear the trello_token cookie so that we no longer have to comment out sections of the code as it was done in the first iteration.

```
after(()=>{
    cy.getCookies().should('have.length', 2)
    cy.clearCookie('trello_token');
    cy.getCookie('trello_token').should('be.null');
});

```
## _trellotest.spec.js_
## _First iteration_
- For e2e testing in this application we're only focusing on testing the behavior of a single board, list, tasks associated to this.  We can have multiple boards, lists etc created as we execute the test suite but testing the other items is out of scope.
- Also we are creating a board in our application runing in localhost getting the ID for that board (id appended to the url) and setting that as our baseUrl in `cypress.json` file.  So we first run only the first it block that contains `cy.addFirstBoard()` grab the url with the board if and use that in `cypress.json`. Then we skip that it block, _this is wrong approach but we'll fix that later._

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
- Solution #1: Target the element and force click `cy.get('[data-cy="star"]')`

- Solution #2: Use invoke attribute to show `cy.get('[data-cy="star"]').invoke('show')`
- _Problem_: After running `invoke.('show')` how to I reset its state?
- _Solution:_ Remove attribute `cy.get('[data-cy="star"]').invoke('removeAttr', 'show')`
- _Problem:_ Flaky test get `expected <svg.Star> not to be visible`
- _Solution:_ `_``cy.get('[data-cy="star"]').invoke('hidden')_``

- Solution #3: Use of event listeners `cy.get('[data-cy="board-item"]').trigger('mouseover')`

## _Second iteration_
-   Checking task name, asserting task text matches the correct index position 1 or two depening whether the user is re arranging the taks we want our test to retry automatically.
    - Custom command `checkTaskText` that uses `.should` with chai assertion 
```
Cypress.Commands.add('checkTaskText', ()=>{
    cy.get('[data-cy="task-title"]').should(taskNameOne=>{
    expect(taskNameOne[0]).to.contain('Task #1')
    expect(taskNameOne[1]).to.contain('Task #2')
    });
}); 
```
- Integrated plugin for drag and drop functionality see install instructions: <https://www.npmjs.com/package/@4tw/cypress-drag-drop>
- Declare its use in commands.js entering line `require('@4tw/cypress-drag-drop')`
- Create custom command `cy.dragDrop()`
```
Cypress.Commands.add('dragDrop',()=>{
    cy.get('[data-cy="task-title"]').eq(0)
        .as('Task #1')
  
    cy.get('[data-cy="task-title"]').eq(1)
        .as('Task #2')

    cy.get('@Task #1').drag('@Task #2')
});
```
- Upload image to a taks via drag and drop using plugin <https://www.npmjs.com/package/cypress-file-upload>
- Declare its use in commands.js entering line `import 'cypress-file-upload';` 
- Create custom command `cy.attachFileDragDrop();`
```
Cypress.Commands.add('attachFileDragDrop',()=>{
    cy.get('[data-cy="task"]').eq(0)
        .click();

    cy.get('.dropzone')
        .attachFile('logo.png', { subjectType: 'drag-n-drop' });
});
```
- Finally integrated Cypress Real Events <https://github.com/dmtrKovalenko/cypress-real-events>
- Cypress event by default are fired using JavaScript and in some instances it behaves different from real events.  This plugin uses native events using Chrome DevTools Protocol.
- Declare its use in commands.js file line `import "cypress-real-events/support";`
- Tests such as hovering over an elemnet are much simpler
    - `cy.get('[data-cy="board-item"]').realHover();`
