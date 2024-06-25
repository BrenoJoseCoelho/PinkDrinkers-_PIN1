import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Scenario: Alterar status de uma máquina

Given('que o usuário está na página de gerenciamento de máquinas', () => {
  cy.visit('http://localhost:3000/');
  cy.get('#root > div > div > div > div.form-area > form > div > div.area-user-senha-form > div.user-form > div.input-user > input[type=usuario]').type('lucas@email.com');
  cy.get('#root > div > div > div > div.form-area > form > div > div.area-user-senha-form > div.senha-form > div.input-password > input[type=password]').type('12345678');
  cy.get('#root > div > div > div > div.form-area > form > div > div.area-btn-form > button').click();
  cy.get('#root > div > div > div > div.area-btn-img > div.area-buttons > button.maquinas-button').click();
});

When('clicar no botão Editar', () => {
  cy.get('#root > div > div > div.tabela-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(4) > a').click();
});

When('alterar o status para Inativa', () => {
    cy.get('#root > div > div > div > form > div > div.inputs-field-form > div.categoria-field-form > div.input-categoria > select').select('Inativa');
  });

When('clicar em confirmar', () => {
  cy.get('#root > div > div > div > form > div > div.area-button-confirmar > input').click();
});

When('retornar para página de gerenciamento de máquinas', () => {
    cy.get('#root > div > div > div > div > a > span').click();
  });

Then('deve alterar o status da máquina', (errorMessage) => {
    cy.get('#root > div > div > div.tabela-wrapper > table > tbody > tr:nth-child(3) > td:nth-child(2)').should('have.text','Inativa');
});

