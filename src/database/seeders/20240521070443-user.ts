/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (
    queryInterface: {
      bulkInsert: (
        arg0: string,
        arg1: {
          id: number;
          fullname: string;
          email: string;
          password: string;
          createdAt: Date;
          updatedAt: Date;
          passwordChangedAt: Date;
        }[]
      ) => any;
    },
    Sequelize: any
  ) => {
    // Add multiple users to database
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        fullname: "Dushimimana Fabrice",
        email: "dush@gmail.com",
        password: "dush@2002",
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordChangedAt: new Date(),
      },
      {
        id: 2,
        fullname: "Saddock Kabandana",
        email: "saddock@gmail.com",
        password: "saddock@2024",
        createdAt: new Date(),
        updatedAt: new Date(),
        passwordChangedAt: new Date(),
      },
    ]);
  },
  down: (
    queryInterface: { bulkDelete: (arg0: string, arg1: null, arg2: {}) => any },
    Sequelize: any
  ) => {
    // Remove all users from database
    return queryInterface.bulkDelete("users", null, {});
  },
};
