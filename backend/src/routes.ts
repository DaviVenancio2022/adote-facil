import { Router } from "express";
import { createUserControllerInstance } from "./controllers/user/create-user.js";
import { userLoginControllerInstance } from "./controllers/user/user-login.js";
import { upload } from "./config/multer.js";
import { createAnimalControllerInstance } from "./controllers/animal/create-animal.js";
import { userAuthMiddlewareInstance } from "./middlewares/user-auth.js";
import { getAvailableAnimalsControllerInstance } from "./controllers/animal/get-available.js";
import { getUserAnimalsControllerInstance } from "./controllers/animal/get-user-animals.js";
import { updateUserControllerInstance } from "./controllers/user/update-user.js";
import { updateAnimalStatusControllerInstance } from "./controllers/animal/update-animal-status.js";
import { createUserChatMessageControllerInstance } from "./controllers/chat/create-user-chat-message.js";
import { getUserChatsControllerInstance } from "./controllers/chat/get-user-chats.js";
import { getUserChatControllerInstance } from "./controllers/chat/get-user-chat.js";
import { createUserChatControllerInstance } from "./controllers/chat/create-user-chat.js";

const router = Router();

// Usuários
router.post("/users", createUserControllerInstance.handle.bind(createUserControllerInstance));

router.patch(
	"/users",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	updateUserControllerInstance.handle.bind(updateUserControllerInstance)
);

// Chats de usuário
router.post(
	"/users/chats/messages",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	createUserChatMessageControllerInstance.handle.bind(createUserChatMessageControllerInstance)
);

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

router.get(
	"/users/chats/:chatId",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	getUserChatControllerInstance.handle.bind(getUserChatControllerInstance)
);

// Login
router.post("/login", userLoginControllerInstance.handle.bind(userLoginControllerInstance));

// Animais
router.post(
	"/animals",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	upload.array("pictures", 5),
	createAnimalControllerInstance.handle.bind(createAnimalControllerInstance)
);

router.patch(
	"/animals/:id",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	updateAnimalStatusControllerInstance.handle.bind(updateAnimalStatusControllerInstance)
);

router.get(
	"/animals/available",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	getAvailableAnimalsControllerInstance.handle.bind(getAvailableAnimalsControllerInstance)
);

router.get(
	"/animals/user",
	userAuthMiddlewareInstance.authenticate.bind(userAuthMiddlewareInstance),
	getUserAnimalsControllerInstance.handle.bind(getUserAnimalsControllerInstance)
);

export { router };
