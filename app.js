import express from "express";
import helmet from "helmet";

import config from "./src/config/config.js";
import { sequelize } from "./src/models/index.js";
import { UsersRepository } from "./src/repositories/UsersRepository.js";
import { AuthService } from "./src/services/AuthService.js";
import { AuthController } from "./src/controllers/AuthController.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { authRoutes } from "./src/routes/authRoutes.js";

const app = express();
app.use(helmet());
app.use(express.json());

// DB Connection
sequelize
	.authenticate()
	.then(() => console.log("Postgres connected"))
	.then(() => sequelize.sync())
	.catch((err) => console.error("DB error", err));

// DI
const userRepo = new UsersRepository();
const authService = new AuthService(userRepo, config);
const authController = new AuthController(authService);
const guard = authMiddleware(config);

// Mount
app.use("/auth", authRoutes(authController, guard));

// Global Error Handler
app.use((err, _, res, __) => {
	console.error(err);
	res.status(500).json({ message: err.message });
});

export default app;
