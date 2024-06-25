Feature: Status

Scenario: Mudar o status de uma máquina para Inativa
  Given que o usuário está na página de gerenciamento de máquinas
  When clicar no botão Editar
  And alterar o status para Inativa
  And clicar em confirmar
  And retornar para página de gerenciamento de máquinas
  Then deve alterar o status da máquina