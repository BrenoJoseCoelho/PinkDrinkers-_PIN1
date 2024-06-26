Feature: Login

Scenario: Login mal-sucedido com e-mail incorreto
  Given que o usuário está na página de login
  When inserir o e-mail "teste123@teste"
  And inserir a senha "Abc@123"
  And clicar em entrar
  Then devo ver uma mensagem de erro "Usuário ou senha inválidos"

Scenario: Login mal-sucedido com senha incorreta
  Given que o usuário está na página de login
  When inserir o e-mail "lucas@email.com"
  And inserir a senha "Abc@123"
  And clicar em entrar
  Then devo ver uma mensagem de erro "Usuário ou senha inválidos"

Scenario: Login bem-sucedido com senha correta
  Given que o usuário está na página de login
  When inserir o e-mail "lucas@email.com"
  And inserir a senha "12345678"
  And clicar em entrar
  Then devo entrar no sistema