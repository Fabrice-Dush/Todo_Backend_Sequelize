import { DataTypes, ForeignKey, Model, NonAttribute } from "sequelize";
import { SequelizeConnection } from "./index";
import User from "./user";

export default class Todo extends Model {
  declare id: number;

  declare text: string;

  declare completed: boolean;

  declare createdAt: Date;

  declare updatedAt: Date;

  declare userId: ForeignKey<User["id"]>;

  declare user: NonAttribute<User>;
}

const sequelizeConnection = SequelizeConnection.getInstance();

Todo.init(
  {
    id: {
      field: "id",
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },

    text: {
      field: "text",
      type: DataTypes.STRING,
    },

    completed: {
      field: "completed",
      type: DataTypes.BOOLEAN,
    },

    userId: {
      field: "userId",
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
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
    tableName: "todos",
    modelName: "Todo",
  }
);

Todo.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Todo, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "todos",
});

//? Will create the table automatically if it's not found
Todo.sync().then();
