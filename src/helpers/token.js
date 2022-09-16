import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const generateToken = async (payload, expiresIn = "10d") => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secretkey", {
      expiresIn,
    });

    return token;
  } catch (error) {
    Promise.reject(error);
  }
};

export default generateToken;
