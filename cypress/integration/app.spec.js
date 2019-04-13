/*global cy*/

describe('Home', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('triggers search', () => {
    const word = 'school';
    cy.visit('/');
    cy.get('[data-testid="search-form"] input')
      .type(word)
      .should('have.value', word);
    cy.get('[data-testid="search-form"]').submit();
    cy.url().should('include', `/word/${word}`);
  });

  it('imports list of words', () => {
    cy.visit('/');
    cy.get('[data-testid="234-animals"] button').click(); //import list of words
    cy.get('.cover-screen.active').click(10, 10); //close popup window
    cy.get('.word-preview').should('have.length', 10);
  });
});

describe('Word', () => {
  it('adds word', () => {
    const word = 'school';
    cy.visit(`/word/${word}`);
    cy.get('[data-testid="state-status-link"] .is-loaded'); //make sure the app state is loaded
    cy.get('[data-testid="button-favorite"]').click(); //set word favorite

    cy.get('[data-testid="menu-"]')
      .eq(0)
      .click({ force: true }); //navigate to homepage, force to skip opening menu
    cy.get('.list-borders__item').should('have.length', 1);
  }).only; //make su to add .only to not have the word added also in the subsequent test

  it("sets word's rating", () => {
    const word = 'school',
      maxRating = 5;
    cy.visit(`/word/${word}`);
    cy.get('[data-testid="state-status-link"] .is-loaded'); //make sure the app state is loaded
    cy.get('[data-testid="button-favorite"]').click(); //set word favorite
    cy.get('.word-head__right .rating-stars').click(); //opens rating popup
    cy.get('[data-testid="word-rating-stars-active"] .rating-stars__star')
      .eq(maxRating - 1)
      .click(); //set max rating
    cy.get('.word-head__right .rating-stars__star--active').should(
      'have.length',
      maxRating
    );
    cy.visit('/'); //go to homepage to clear changes made on word page
  }).only; //make su to add .only to not have the word added also in the subsequent test

  it("sets word's ratings", () => {
    const word = 'school',
      maxRating = 5,
      minRating = 3;
    cy.visit(`/word/${word}`);
    cy.get('[data-testid="state-status-link"] .is-loaded'); //make sure the app state is loaded
    cy.get('[data-testid="button-favorite"]').click(); //set word favorite
    cy.get('.word-head__right .rating-stars').click(); //opens rating popup
    cy.get('[data-testid="word-rating-stars-active"] .rating-stars__star')
      .eq(maxRating - 1)
      .click(); //set max rating
    cy.get('.word-head__right .rating-stars').click(); //opens rating popup
    cy.get('[data-testid="word-rating-stars-active"] .rating-stars__star')
      .eq(minRating - 1)
      .click(); //set min rating
    cy.get('.word-head__right .rating-stars__star--active').should(
      'have.length',
      Math.round((maxRating + minRating) / 2)
    );
    cy.visit('/'); //go to homepage to clear changes made on word page
  }).only; //make su to add .only to not have the word added also in the subsequent test
});

describe('List', () => {
  it('renders predefined lists', () => {
    const predefinedListsCnt = 13;
    cy.visit('/list');
    cy.get('[data-testid="predefined-list"]').should(
      'have.length',
      predefinedListsCnt
    );
  });

  it('adds new list', () => {
    const listName = 'List 1';
    cy.visit('/list');
    cy.get('[data-testid="button-new-list"]').click(); //open new list form
    cy.get('[data-testid="form-new-list"] input').type(listName); //set list name
    cy.get('[data-testid="form-new-list"]').submit();
    cy.get('[data-testid="user-list"]').should('have.length', 1);
  });
});

describe('Settings', () => {
  it('deletes words', () => {
    const word = 'school';
    cy.visit(`/word/${word}`);
    cy.get('[data-testid="button-favorite"]').click(); //set word favorite

    cy.get('[data-testid="menu-settings"]')
      .eq(0)
      .click({ force: true }); //navigate to settings
    cy.get('[data-testid="check-delete-words"]').click();
    cy.get('[data-testid="button-delete"]').click(); //opens confirm popup
    cy.get('[data-testid="button-delete-confirm"]').click();

    cy.get('[data-testid="menu-"]')
      .eq(0)
      .click({ force: true }); //navigate to homepage
    cy.get('.list-borders__item').should('have.length', 0);
  });
});
