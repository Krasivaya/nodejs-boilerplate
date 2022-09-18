import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import moment from "moment";
import { Token } from "../database/models";

dotenv.config();

const generateToken = async (payload, expiresIn = "10d") => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secretkey", {
      expiresIn,
    });

    const tokenExpireTime = moment()
      .add(parseInt(expiresIn.slice(0, -1)), "days")
      .format();

    await Token.create({
      token,
      status: "active",
      expired_at: tokenExpireTime,
    });

    return token;
  } catch (error) {
    console.error(error);
  }
};

export default generateToken;
