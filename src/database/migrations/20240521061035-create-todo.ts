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
          text: { type: string; allowNull: boolean };
          userId: { type: number; allowNull: boolean };
          completed: { type: boolean };
          createdAt: { type: Date };
          updatedAt: { type: Date };
        }
      ) => any;
    },
    Sequelize: { INTEGER: number; STRING: string; DATE: Date; BOOLEAN: boolean }
  ) {
    await queryInterface.createTable("todos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      completed: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(
    queryInterface: { dropTable: (arg0: string) => any },
    Sequelize: any
  ) {
    await queryInterface.dropTable("todos");
  },
};
