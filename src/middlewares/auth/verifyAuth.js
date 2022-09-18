import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyAuth = async (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) return res.sendStatus(403);

  const token = authorization.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_SECRET || "secretkey",
    async (error, authData) => {
      if (error) return res.sendStatus(401);

      req.token = token;
      req.currentUser = authData;
      next();
    }
  );
};

export default verifyAuth;
