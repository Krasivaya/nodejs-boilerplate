import request from "supertest";
import app from "../../../../app";

const user = {
  gender: "female",
  birth_date: "2000-01-01",
};

describe("Account signup", () => {
  describe("00001 - send user required data", () => {
    test("00001-1 - should not be able to signup without user first name", async () => {
      const res = await request(app).post("/api/auth/signup").send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    test("00001-2 - should not be able to signup without user last name", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          first_name: "Nice",
          ...user,
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    test("00001-3 - should not be able to signup without email", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          first_name: "Nice",
          last_name: "Test",
          ...user,
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    test("00001-4 - should not be able to signup without password", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          first_name: "Nice",
          last_name: "Test",
          email: "nice@test.com",
          ...user,
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("00002 - create user account", () => {
    test("00002-1 - should not signup with an existing email", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          email: "jean@mika.com",
          ...user,
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    test("00002-2 - should be able to signup", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          first_name: "Nice",
          last_name: "Test",
          email: "nice@test.com",
          password: "User@123",
          ...user,
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message");
    });
  });
});
