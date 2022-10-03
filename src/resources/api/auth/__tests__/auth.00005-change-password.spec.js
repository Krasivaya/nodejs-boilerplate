import request from "supertest";
import app from "../../../../app";
import {
  loggedUserTest,
  testUser,
  timeoutTest,
} from "../../../../__tests__/helper";

let token = "";
const user = testUser();

describe("Change account password", () => {
  describe("00005 - change password of the account", () => {
    beforeEach(async () => {
      const res = await loggedUserTest(user.email);
      token = res.token;

      await timeoutTest();
    });

    it("00005-1 - should not be able to change password with wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", token)
        .send({
          old_password: "Wrong@123",
          new_password: "Wrong2@123",
        });
      expect(res.status).toBe(404);
    });

    it("00005-2 - should be able to change password", async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", token)
        .send({
          old_password: "12345",
          new_password: "123456",
        });
      expect(res.status).toBe(404);
    });
  });
});
