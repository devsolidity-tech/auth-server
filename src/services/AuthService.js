import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
	constructor(userRepo, config) {
		this.userRepo = userRepo;
		this.jwtSecret = config.jwtSecret;
		this.jwtExpires = config.jwtExpires;
	}

	async signUp({ username, fullname, email_address, password }) {
		if (await this.userRepo.findByEmail(email_address)) {
			throw new Error("Email already registered");
		}
		const hash = await bcrypt.hash(password, 10);
		const user = await this.userRepo.create({ username, fullname, email_address, encoded_password: hash });
		return { id: user._id, email_address: user.email_address };
	}

	async login({ email_address, password }) {
		const user = await this.userRepo.findByEmail(email_address);
		if (!user || !(await bcrypt.compare(password, user.encoded_password))) {
			throw new Error("Invalid credentials");
		}
		const token = jwt.sign({ sub: user._id }, this.jwtSecret, { expiresIn: this.jwtExpires });
		return { token };
	}

	async getUsers() {
		const users = await this.userRepo.findAll();
		return { users };
	}

	async deleteAccount(userId) {
		await this.userRepo.deleteById(userId);
	}
}
