import jwt from "jsonwebtoken";

export const authMiddleware = (config) => (req, res, next) => {
	const auth = req.headers.authorization;
	if (!auth?.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

	try {
		const token = auth.split(" ")[1];
		const { sub } = jwt.verify(token, config.jwtSecret);
		req.user = { id: sub };
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};
