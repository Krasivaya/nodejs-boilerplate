import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Token } from "../../database/models";

dotenv.config();

const verifyAuth = async (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) return res.sendStatus(403);

  const token = authorization.split(" ")[1];

  if (!token) return res.sendStatus(401);

  const foundToken = await Token.findOne({
    where: { token, status: "active" },
  });

  if (!foundToken)
    return res.status(400).json({
      status: 400,
      message: "Invalid token",
    });

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secretkey",
    async (error, authData) => {
      if (error) return res.sendStatus(401);

      req.token = foundToken;
      req.currentUser = authData;
      next();
    }
  );
};

export default verifyAuth;
