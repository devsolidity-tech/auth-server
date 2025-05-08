import { validationResult } from "express-validator";

export class AuthController {
	constructor(authService) {
		this.authService = authService;
	}

	signUp = async (req, res, next) => {
		try {
			const errs = validationResult(req);
			if (!errs.isEmpty()) {
				return res.status(400).json({ errors: errs.array() });
			}

			const { username, fullname, email, password } = req.body;

			const requestPayload = {
				username,
				fullname,
				email_address: email,
				password,
			};

			const user = await this.authService.signUp(requestPayload);
			res.status(201).json({
				success: true,
				data: [user],
			});
		} catch (err) {
			next(err);
		}
	};

	login = async (req, res, next) => {
		try {
			const errs = validationResult(req);
			if (!errs.isEmpty()) {
				return res.status(400).json({ errors: errs.array() });
			}

			const { email, password } = req.body;

			const requestPayload = {
				email_address: email,
				password,
			};

			const payload = await this.authService.login(requestPayload);
			res.json(payload);
		} catch (err) {
			console.log(err);
			next(err);
		}
	};

	getUsers = async (req, res, next) => {
		try {
			const users = await this.authService.getUsers();
			console.log(users);
			res.json(users);
		} catch (error) {
			next(error);
		}
	};

	deleteAccount = async (req, res, next) => {
		try {
			await this.authService.deleteAccount(req.user.id);
			res.sendStatus(204);
		} catch (err) {
			next(err);
		}
	};
}
