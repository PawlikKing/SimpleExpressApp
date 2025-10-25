import { DataTypes, InferAttributes, InferCreationAttributes, Model, CreationOptional } from "sequelize";
import sequelize from "@db";
import { Permissions } from "@shared/flags";

class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare permissions: CreationOptional<number>;
}

Client.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		permissions: {
			type: DataTypes.NUMBER,
			allowNull: false,
			defaultValue: Permissions.None
		}
	},
	{
		sequelize,
		modelName: "Clients",
	}
);

export default Client;