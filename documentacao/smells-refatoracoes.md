# Detecção de Code Smells e Refatorações

Este documento descreve os code smells identificados no projeto **Adote Fácil** e as refatorações sugeridas/aplicadas. Cada item contém o trecho original, o smell identificado, a refatoração e explicação detalhada.

---

### Smell Identificado

-   **Desestruturação excessiva de objetos**:  
    A desestruturação direta de `req.body` pode causar erros caso o objeto não possua a estrutura esperada.

### Refatoração Sugerida

```javascript
const { name, email, password } = req.body || {};
if (!name || !email || !password) {
	return res.status(400).json({ error: "Dados incompletos." });
}
const user = await User.create({
	data: { name, email, password },
});
```

### Documentação

-   **Local**: `backend/src/controllers/user/create-user.ts`
-   **Descrição**: Adicionada verificação para garantir que `req.body` contenha os campos necessários antes de criar o usuário, evitando erros inesperados.

---

## 2. Roteamento sem validação de entrada

### Trecho Original

```javascript
router.post("/register", userController.register);
```

### Smell Identificado

-   **Roteamento sem validação de entrada**:  
    A rota de registro não possui validação explícita dos dados recebidos, o que pode permitir entradas inválidas ou maliciosas.

### Refatoração Sugerida

```javascript
const { registerSchema } = require("../validators/userValidator");
router.post("/register", validate(registerSchema), userController.register);
```

### Documentação

-   **Local**: `backend/src/routes.js`
-   **Descrição**: Implementada validação dos dados de entrada utilizando um schema de validação antes de chamar o controlador, aumentando a segurança e integridade do sistema.

---

## 3. Falta de tratamento de erros em requisição HTTP

### Trecho Original

```javascript
const handleSubmit = async (e) => {
	e.preventDefault();
	const res = await axios.post("/api/auth/register", { name, email, password });
	if (res.status === 200) {
		router.push("/login");
	}
};
```

### Smell Identificado

-   **Falta de tratamento de erros**:  
    Não há captura de falhas na requisição HTTP, podendo causar falhas silenciosas no frontend.

### Refatoração Sugerida

```javascript
const handleSubmit = async (e) => {
	e.preventDefault();
	try {
		const res = await axios.post("/api/auth/register", { name, email, password });
		if (res.status === 200) {
			router.push("/login");
		}
	} catch (error) {
		console.error("Erro ao registrar:", error);
		alert("Ocorreu um erro. Tente novamente.");
	}
};
```

### Documentação

-   **Local**: `frontend/pages/register.js`
-   **Descrição**: Adicionado bloco `try-catch` para capturar e tratar erros na requisição HTTP, melhora a experiência do usuário e previne falhas silenciosas.

---
