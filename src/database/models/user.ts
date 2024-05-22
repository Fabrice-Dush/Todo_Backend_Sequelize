import { DataTypes, Model } from "sequelize";
import { SequelizeConnection } from "./index";
import Todo from "./todo";

export default class User extends Model {
  declare id: number;

  declare fullname: string;

  declare email: string;

  declare password: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}

const sequelizeConnection = SequelizeConnection.getInstance();

User.init(
  {
    id: {
      field: "id",
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },

    fullname: {
      field: "fullname",
      type: DataTypes.STRING,
    },

    email: {
      field: "email",
      type: DataTypes.STRING,
    },

    password: {
      field: "password",
      type: DataTypes.STRING,
    },

    createdAt: {
      field: "createdAt",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updatedAt",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    modelName: "User",
  }
);

//? Will create the table automatically if it's not found
User.sync().then();
