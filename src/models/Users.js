import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index.js";

export class Users extends Model {}

Users.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
        username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: { isEmail: true },
		},
		email_address: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: { isEmail: true },
		},
		encoded_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        fullname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "users",
		timestamps: false,
	}
);
