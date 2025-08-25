describe("Cadastro de Animal", () => {
	const baseUrl = "http://localhost:3000";

	beforeEach(() => {
		// Login antes de cada teste
		cy.visit(`${baseUrl}/login`);
		cy.get('input[type="email"]').type("davitestando@hotmail.com");
		cy.get('input[type="password"]').type("12345678");
		cy.get('button[type="submit"]').click();
		cy.url().should("not.include", "/login");
	});

	it("Deve cadastrar animal autenticado com sucesso", () => {
		cy.visit(`${baseUrl}/animal/cadastro`);
		cy.get('input[name="nome"]').type("Rex");
		cy.get('select[name="especie"]').select("Cachorro");
		cy.get('button[type="submit"]').click();
		cy.contains("Animal cadastrado").should("be.visible");
	});

	it("Não deve permitir cadastro sem autenticação", () => {
		cy.clearLocalStorage();
		cy.visit(`${baseUrl}/animal/cadastro`);
		cy.url().should("include", "/login");
	});

	it("Não deve permitir upload > 5 imagens", () => {
		cy.visit(`${baseUrl}/animal/cadastro`);

		// Simula upload de 6 imagens
		for (let i = 0; i < 6; i++) {
			cy.get('input[type="file"]').selectFile(
				{
					contents: Cypress.Buffer.from("file contents"),
					fileName: `image${i}.jpg`,
				},
				{ force: true }
			);
		}

		cy.contains("Máximo 5 imagens").should("be.visible");
	});
});
