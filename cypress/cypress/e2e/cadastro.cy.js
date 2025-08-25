describe("Cadastro de Usuário", () => {
	const baseUrl = "http://localhost:3000";

	it("Deve cadastrar usuário com sucesso", () => {
		cy.visit(`${baseUrl}/register`);
		cy.get('input[type="email"]').type(`test${Date.now()}@email.com`);
		cy.get('input[type="password"]').type("Senha123!");
		cy.get('button[type="submit"]').click();
		cy.url().should("not.include", "/register");
	});

	it("Não deve cadastrar com email existente", () => {
		cy.visit(`${baseUrl}/register`);
		cy.get('input[type="email"]').type("davitestando@hotmail.com");
		cy.get('input[type="password"]').type("Senha123!");
		cy.get('button[type="submit"]').click();
		cy.contains("Email já existe").should("be.visible");
	});

	it("Não deve cadastrar senhas fracas", () => {
		cy.visit(`${baseUrl}/register`);
		cy.get('input[type="email"]').type("test@email.com");
		cy.get('input[type="password"]').type("123");
		cy.get('button[type="submit"]').click();
		cy.contains("Senha fraca").should("be.visible");
	});
});
