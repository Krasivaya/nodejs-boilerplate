import request from "supertest";
import app from "../../../../app";
import {
  loggedUserTest,
  testUser,
  timeoutTest,
} from "../../../../__tests__/helper";

let token = "";
const user = testUser();

describe("Account logout", () => {
  describe("10000 - logout from the account", () => {
    beforeEach(async () => {
      const res = await loggedUserTest(user.email);
      token = res.token;

      await timeoutTest();
    });

    it("10000-1 - should return a `BAD Request` on logout with an Invalid token", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set({
          Authorization: `JWT ${token}_WRONG`,
        })
        .send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("10000-2 - should logout with a valid token", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set({
          Authorization: `JWT ${token}`,
        })
        .send(user);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
    });
  });
});
