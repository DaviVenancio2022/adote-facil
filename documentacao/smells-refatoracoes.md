# Detecção de Code Smells e Refatorações

Este documento descreve os **code smells** identificados no projeto **Adote Fácil** e as refatorações sugeridas/aplicadas. Cada item contém:

-   O trecho original de código.
-   O _smell_ identificado.
-   A refatoração sugerida.
-   Uma explicação detalhada sobre os impactos.

---

## 1. Código Morto

### Trecho Original

📂 `backend/src/controllers/user/create-user.ts`

```ts
catch (err) {
  const error = err as Error
  console.log({ error })   // código usado só para debug
  return response.status(500).json({ error: error.message })
}
```

### Smell Identificado

-   **Código morto**: o `console.log` serve apenas para debug local e não tem valor em ambiente de produção.
-   Esse trecho gera poluição nos logs, dificulta a leitura de erros reais e pode até expor informações sensíveis.

### Refatoração Sugerida

```ts
catch (err) {
  const error = err as Error
  return response.status(500).json({ error: error.message })
}
```

### Explicação

Remover o `console.log` garante que apenas os erros relevantes sejam tratados e reportados corretamente, mantendo a aplicação mais limpa e profissional.

---

## 2. Console.log Desnecessário

### Trecho Original

📂 `frontend/src/pages/register.tsx`

```tsx
const handleSubmit = async (e) => {
	e.preventDefault();
	console.log("Enviando dados..."); // desnecessário em produção
	const res = await axios.post("/api/auth/register", { name, email, password });
};
```

### Smell Identificado

-   **Console.log desnecessário**: mensagens de log que não agregam valor em produção.
-   Esse tipo de saída pode atrapalhar a análise de logs, além de expor informações irrelevantes.

### Refatoração Sugerida

```tsx
const handleSubmit = async (e) => {
	e.preventDefault();
	const res = await axios.post("/api/auth/register", { name, email, password });
};
```

### Explicação

Manter apenas logs relevantes em pontos críticos facilita o monitoramento e a análise de falhas reais.

---

## 3. Código Duplicado

### Trecho Original

📂 `backend/src/routes.ts`

```ts
router.post(
	"/users/chats",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	createUserChatControllerInstance.handle.bind(createUserChatControllerInstance)
);

router.get(
	"/users/chats",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	getUserChatsControllerInstance.handle.bind(getUserChatsControllerInstance)
);
```

### Smell Identificado

-   **Código duplicado**: o middleware de autenticação é repetido em todas as rotas de `chats`.
-   Isso gera manutenção mais difícil: se mudar a lógica de autenticação, várias partes do código precisarão ser alteradas manualmente.

### Refatoração Sugerida

```ts
// Definir middleware global para rotas de chat
router.use(
	"/users/chats",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance)
);

router.post(
	"/users/chats",
	createUserChatControllerInstance.handle.bind(createUserChatControllerInstance)
);

router.get(
	"/users/chats",
	getUserChatsControllerInstance.handle.bind(getUserChatsControllerInstance)
);
```

### Explicação

Centralizando o middleware, reduzimos duplicação, melhoramos a legibilidade e tornamos a manutenção mais simples e menos propensa a erros.

---

## 4. Falta de Tratamento de Erros

### Trecho Original

📂 `frontend/src/pages/register.tsx`

```tsx
const handleSubmit = async (e) => {
	e.preventDefault();
	const res = await axios.post("/api/auth/register", { name, email, password });
	if (res.status === 200) {
		router.push("/login");
	}
};
```

### Smell Identificado

-   **Falta de tratamento de erros**: caso a requisição falhe (problema de rede, servidor fora do ar, dados inválidos), a aplicação quebra silenciosamente.
-   Isso compromete a experiência do usuário, que não recebe feedback adequado.

### Refatoração Sugerida

```tsx
const handleSubmit = async (e) => {
	e.preventDefault();
	try {
		const res = await axios.post("/api/auth/register", { name, email, password });
		if (res.status === 200) {
			router.push("/login");
		}
	} catch (error) {
		console.error("Erro ao registrar:", error);
		alert("Ocorreu um erro ao registrar. Tente novamente.");
	}
};
```

### Explicação

O uso de `try-catch` garante robustez, capturando falhas e informando o usuário. Além disso, facilita o debug durante o desenvolvimento.

---
