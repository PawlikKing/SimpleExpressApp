import { DataTypes, Model } from "sequelize";
import sequelize from "@db";
import { Permissions } from "@shared/flags";
import { Position } from "@shared/enums";
class Employees extends Model {
}
Employees.init({
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
    position: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: Position.SALESMAN
    },
    permissions: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: Permissions.VIEW_DETAILS_PRODUCTS | Permissions.VIEW_SALES
    }
}, {
    sequelize,
    modelName: "Employeess",
});
export default Employees;
