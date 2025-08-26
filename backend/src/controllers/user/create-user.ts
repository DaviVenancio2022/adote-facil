import { Request, Response } from "express";
import { CreateUserService, createUserServiceInstance } from "../../services/user/create-user.js"; // Verifique se o caminho está correto

class CreateUserController {
	constructor(private readonly createUser: CreateUserService) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;

		if (!name || !email || !password) {
			return response.status(400).json({ error: "Dados incompletos." });
		}

		try {
			const result = await this.createUser.execute({ name, email, password });

			const statusCode = result.isFailure() ? 400 : 201;

			return response.status(statusCode).json(result.value);
		} catch (err) {
			const error = err as Error;
			console.error("Erro ao criar usuário:", error.message);
			return response.status(500).json({ error: error.message });
		}
	}
}

export const createUserControllerInstance = new CreateUserController(createUserServiceInstance);
