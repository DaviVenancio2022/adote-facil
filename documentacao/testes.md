# Testes Automatizados

Este documento descreve os testes automatizados criados para o projeto **Adote Fácil**.

---

## Melhorias nos Testes Unitários

-   Adicionar casos de erro (ex.: email já existente, login inválido).
-   Usar nomes mais descritivos.
-   Mockar banco de dados e serviços externos para maior isolamento.

---

## Testes de Aceitação (Cypress)

### 1. Cadastro de Usuário

-   **Deve cadastrar usuário com sucesso** - Valida registro com email único e senha forte
-   **Não deve cadastrar com email existente** - Verifica duplicação usando `davitestando@hotmail.com`
-   **Não deve cadastrar senhas fracas** - Testa validação de senha com menos de 6 caracteres

### 2. Login de Usuário

-   **Deve logar com sucesso e retornar token** - Autentica com credenciais válidas e verifica token no localStorage
-   **Não deve logar com senha incorreta** - Testa credenciais inválidas com email correto e senha errada
-   **Não deve logar com usuário inexistente** - Valida tratamento para email não cadastrado

### 3. Cadastro de Animal

-   **Deve cadastrar animal autenticado com sucesso** - Requer login prévio e valida fluxo completo
-   **Não deve permitir cadastro sem autenticação** - Verifica redirecionamento para login quando não autenticado
-   **Não deve permitir upload > 5 imagens** - Testa limite máximo de upload de imagens

---

## Execução dos Testes

### Instalar Cypress

npm install cypress

### Executar os testes

npx cypress open

### Testes específicos

npx cypress run --spec "cypress/e2e/cadastro.cy.js"
npx cypress run --spec "cypress/e2e/login.cy.js"
npx cypress run --spec "cypress/e2e/animal.cy.js"

### Credenciais usadas

Email válido: davitestando@hotmail.com
Senha válida: 12345678
URL base: http://localhost:3000
