"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        first_name: "Jean",
        last_name: "Mika",
        email: "jean@mika.com",
        password:
          "$2a$10$2Gl48HwEiXignxGRZR0Tp.pxH0BKnXQoSZnyhQANGN6.4VpMF3UKe",
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
