import { Router } from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

export const authRoutes = (controller, middleware) => {
	const router = Router();

	// Prevent brute-force
	const loginLimiter = rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 5,
		message: "Too many attempts, try again later.",
	});

	router.post(
		"/signup",
		body("email").isEmail(),
		body("password").isLength({ min: 6 }),
		controller.signUp
	);

	router.post(
		"/login",
		// loginLimiter,
		body("email").isEmail(),
		body("password").exists(),
		controller.login
	);

	router.get(
		"/users",
		controller.getUsers
	);

	router.delete("/me", middleware, controller.deleteAccount);

	return router;
};
