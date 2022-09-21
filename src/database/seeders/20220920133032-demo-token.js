"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tokens", [
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IkplYW4iLCJsYXN0X25hbWUiOiJNaWthIiwiZW1haWwiOiJqZWFuQG1pa2EuY29tIiwiZ2VuZGVyIjoibWFsZSIsImJpcnRoX2RhdGUiOiIyMDAwLTAxLTAxVDAwOjAwOjAwLjAwMFoiLCJhZ2UiOjIyLCJjcmVhdGVkX2F0IjoiMjAyMi0wOS0yMFQxMzo0MjoxMC4xMTZaIiwidXBkYXRlZF9hdCI6IjIwMjItMDktMjBUMTM6NDI6MTAuMTE2WiIsImlhdCI6MTY2MzY4MTMzMiwiZXhwIjoxNjY0NTQ1MzMyfQ.yA-dgo_SRtVZ38A5-nl9ve9f56faZK8wniweXs0tADM",
        status: "active",
        expired_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("tokens", null, {});
  },
};
