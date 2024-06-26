import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Scenario: Tentativa de login com e-mail incorreto

Given('que o usuário está na página de login', () => {
  cy.visit('http://localhost:3000/');
});

When('inserir o e-mail {string}', (email) => {
  cy.get('#root > div > div > div > div.form-area > form > div > div.area-user-senha-form > div.user-form > div.input-user > input[type=usuario]').type(email);
});

When('inserir a senha {string}', (password) => {
  cy.get('#root > div > div > div > div.form-area > form > div > div.area-user-senha-form > div.senha-form > div.input-password > input[type=password]').type(password);
});

When('clicar em entrar', () => {
  cy.get('#root > div > div > div > div.form-area > form > div > div.area-btn-form > button').click();
});

Then('devo ver uma mensagem de erro {string}', (errorMessage) => {
  cy.contains(errorMessage).should('be.visible');
});

Then('devo entrar no sistema', () => {
  cy.url().should('eq', 'http://localhost:3000/home');
});
