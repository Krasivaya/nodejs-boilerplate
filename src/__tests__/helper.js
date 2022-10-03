import request from "supertest";
import app from "../app";

const password = "12345";

export const timeoutTest = (time = 30) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const testUser = (email = "jean@mika.com") => {
  return {
    email,
    password,
  };
};

export const loggedUserTest = async (email = "jean@mika.com") => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password });

  if (res.status >= 400)
    console.log(
      `>>>>> loginUserTest(${email}, ${password})`,
      `status: ${res.status}`,
      `response body:`,
      res.body
    );

  await timeoutTest();

  return {
    ...res.body.data,
  };
};
