/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (
    queryInterface: {
      bulkInsert: (
        arg0: string,
        arg1: {
          id: number;
          text: string;
          userId: number;
          completed: boolean;
          createdAt: Date;
          updatedAt: Date;
        }[]
      ) => any;
    },
    Sequelize: any
  ) => {
    // Add multiple todos to database
    return queryInterface.bulkInsert("todos", [
      {
        id: 1,
        text: "Creating todo list app",
        userId: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        text: "Study electronics",
        userId: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        text: "Study electromagnetic",
        userId: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        text: "Cook food to eat",
        userId: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (
    queryInterface: { bulkDelete: (arg0: string, arg1: null, arg2: {}) => any },
    Sequelize: any
  ) => {
    // Remove all todos from database
    return queryInterface.bulkDelete("todos", null, {});
  },
};
