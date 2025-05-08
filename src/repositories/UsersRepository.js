import { Users } from "../models/Users.js";

export class UsersRepository {
	create(data) {
		return Users.create(data);
	}
	findByEmail(email_address) {
		return Users.findOne({ where: { email_address } });
	}
	deleteById(id) {
		return Users.destroy({ where: { id } });
	}
	findAll() {
		return Users.findAll();
	}
}
