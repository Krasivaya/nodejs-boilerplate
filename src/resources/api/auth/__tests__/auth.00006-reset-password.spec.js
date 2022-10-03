import request from "supertest";
import app from "../../../../app";

let code = "";

describe("Reset account password", () => {
  describe("00006 - Request a reset code", () => {
    it("00006-1 - should return `Validation Error - BAD Request` on request code without an email", async () => {
      const res = await request(app).post("/api/auth/reset-code");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("validation");
      expect(res.body.validation.body.keys).toEqual(["email"]);
    });

    it("00006-2 - should return `BAD Request` on request code with wrong email", async () => {
      const res = await request(app).post("/api/auth/reset-code").send({
        email: "nice@user.com",
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("00006-2 - should be able to get the reset code", async () => {
      const res = await request(app).post("/api/auth/reset-code").send({
        email: "nice@test.com",
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.code).toBeTruthy();
      code = res.body.data.code;
    });
  });

  describe("00007 - Handle reset password", () => {
    it("00007-1 - should return `Validation Error - BAD Request` on reset password without a password", async () => {
      const res = await request(app).post("/api/auth/reset-password");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("validation");
      expect(res.body.validation.body.keys).toEqual(["password"]);
    });

    it("00007-2 - should return `Validation Error - BAD Request` on reset password without a confirm password", async () => {
      const res = await request(app)
        .post("/api/auth/reset-password")
        .send({ password: "new_password" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("validation");
      expect(res.body.validation.body.keys).toEqual(["confirm_password"]);
    });

    it("00007-3 - should return `Validation Error - BAD Request` on reset password without a code", async () => {
      const res = await request(app)
        .post("/api/auth/reset-password")
        .send({ password: "new_password", confirm_password: "new_password" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("validation");
      expect(res.body.validation.body.keys).toEqual(["code"]);
    });

    it("00007-4 - should return `BAD Request` on reset password with wrong code", async () => {
      const res = await request(app).post("/api/auth/reset-password").send({
        password: "new_password",
        confirm_password: "new_password",
        code: 12345,
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("00007-5 - should return `BAD Request` on reset password with unmatched passwords", async () => {
      const res = await request(app).post("/api/auth/reset-password").send({
        password: "old_password",
        confirm_password: "new_password",
        code,
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("00007-6 - should return `BAD Request` on reset password with the previous password", async () => {
      const res = await request(app).post("/api/auth/reset-password").send({
        password: "User@123",
        confirm_password: "User@123",
        code,
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("00007-7 - should be able to reset password", async () => {
      const res = await request(app).post("/api/auth/reset-password").send({
        password: "12345",
        confirm_password: "12345",
        code,
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message");
    });
  });
});
