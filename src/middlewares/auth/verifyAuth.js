import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, Token } from "../../database/models";
import { comparePassword } from "../../helpers/auth";

dotenv.config();

const verifyAuth = ({ password = false }) => {
  return async (req, res, next) => {
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

        const user = await User.findOne({ where: { email: authData.email } });

        if (!user)
          return res.status(401).json({
            status: 401,
            message: "Unauthorized Access",
          });

        if (
          password &&
          !comparePassword(req.body.password, user.get().password)
        ) {
          return res.status(400).json({
            status: 400,
            message: "Wrong email or password",
          });
        }

        req.token = foundToken;
        req.currentUser = authData;
        next();
      }
    );
  };
};

export default verifyAuth;
