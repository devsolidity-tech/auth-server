import dotenv from "dotenv";
dotenv.config();

export default {
	db: {
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT || 5432,
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		dialect: "postgres",
	},
	jwtSecret: process.env.JWT_SECRET,
	jwtExpires: process.env.JWT_EXPIRES_IN || "1h",
};
