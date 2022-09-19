import request from "supertest";
import app from "../../../../app";

describe("Account login", () => {
  describe("00003 - send required data", () => {
    test("00003-1 - should not be able to login without email", async () => {
      const res = await request(app).post("/api/auth/login");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("validation");
      expect(res.body.validation.body.keys).toEqual(["email"]);
    });

    test("00003-2 - should not be able to login without password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nice@test.com" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("validation");
      expect(res.body.validation.body.keys).toEqual(["password"]);
    });
  });

  describe("00004 - login to the user account", () => {
    test("00004-1 - ahould not be able to login with non existing email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "nice@gmail.com",
        password: "User@123",
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    test("00004-2 - ahould not be able to login with wrong password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "nice@test.com",
        password: "Wrong@123",
      });
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message");
    });

    test("00004-3 - ahould be able to login successfully", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "nice@test.com",
        password: "User@123",
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("token");
    });
  });
});
