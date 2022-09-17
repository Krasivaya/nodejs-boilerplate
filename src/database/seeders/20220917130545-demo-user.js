"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        first_name: "Jean",
        last_name: "Mika",
        email: "jean@mika.com",
        password: "12345",
        gender: "male",
        age: 22,
        birth_date: new Date("2000-01-01"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
