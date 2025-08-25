describe("Login de Usuário", () => {
	const baseUrl = "http://localhost:3000";

	it("Deve logar com sucesso e retornar token", () => {
		cy.visit(`${baseUrl}/login`);
		cy.get('input[type="email"]').type("davitestando@hotmail.com");
		cy.get('input[type="password"]').type("12345678");
		cy.get('button[type="submit"]').click();
		cy.url().should("not.include", "/login");
		cy.window().its("localStorage.token").should("exist");
	});

	it("Não deve logar com senha incorreta", () => {
		cy.visit(`${baseUrl}/login`);
		cy.get('input[type="email"]').type("davitestando@hotmail.com");
		cy.get('input[type="password"]').type("senhaerrada");
		cy.get('button[type="submit"]').click();
		cy.contains("Credenciais inválidas").should("be.visible");
	});

	it("Não deve logar com usuário inexistente", () => {
		cy.visit(`${baseUrl}/login`);
		cy.get('input[type="email"]').type("inexistente@email.com");
		cy.get('input[type="password"]').type("12345678");
		cy.get('button[type="submit"]').click();
		cy.contains("Usuário não encontrado").should("be.visible");
	});
});
