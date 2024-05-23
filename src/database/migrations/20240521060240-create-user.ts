"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    queryInterface: {
      createTable: (
        arg0: string,
        arg1: {
          id: {
            allowNull: boolean;
            autoIncrement: boolean;
            primaryKey: boolean;
            type: number;
          };
          fullname: { type: string };
          email: { type: string };
          password: { type: string };
          createdAt: { allowNull: boolean; type: Date };
          updatedAt: { allowNull: boolean; type: Date };
          passwordChangedAt: { allowNull: boolean; type: Date };
        }
      ) => any;
    },
    Sequelize: { INTEGER: number; STRING: string; DATE: Date }
  ) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      passwordChangedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(
    queryInterface: { dropTable: (arg0: string) => any },
    Sequelize: any
  ) {
    await queryInterface.dropTable("users");
  },
};
