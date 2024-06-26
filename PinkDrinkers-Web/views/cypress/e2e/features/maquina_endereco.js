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

When('alterar o Endereço da máquina para {string}', (endereco) => {
    cy.get('#root > div > div > div > form > div > div.inputs-field-form > div.produto-field-form > div.input-produto > input').clear().type(endereco);
  });

When('clicar em confirmar', () => {
  cy.get('#root > div > div > div > form > div > div.area-button-confirmar > input').click();
});

When('retornar para página de gerenciamento de máquinas', () => {
    cy.get('#root > div > div > div > div > a > span').click();
  });

Then('deve alterar o endereco da máquina', (errorMessage) => {
    cy.get('#root > div > div > div.tabela-wrapper > table > tbody > tr:nth-child(3) > td:nth-child(3)').should('have.text','testecypress');
});

