import request from "supertest";
import app from "../../../../app";
import token from "../../../../constants/mockToken";

describe("Account verification", () => {
  describe("01001 - verify user authorization", () => {
    test("01001-1 - should not be able to access the route without header 'Authorization'", async () => {
      const res = await request(app).post("/api/auth/logout");
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("message");
    });

    test("01001-2 should not be able to access without token value", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", "jwt ");
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message");
    });

    test("01001-3 should not be able to access with an invalid token", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", "jwt enjkndjnxedjnxji");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});

describe("Account change password", () => {
  describe("01002 - change password of the account", () => {
    test("01002-1 - should not be able to change password with wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/change-password")
        .set("Authorization", token)
        .send({
          old_password: "Wrong@123",
          new_password: "Wrong2@123",
        });
      expect(res.status).toBe(404);
    });

    test("01002-2 - should be able to change password", async () => {
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

describe("Account logout", () => {
  describe("01003 - logout from the account", () => {
    test("01003-1 - should be able to logout", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
    });
  });
});

// describe("Account Reset", () => {
//   describe("01004-1 - should be able to");
// });
