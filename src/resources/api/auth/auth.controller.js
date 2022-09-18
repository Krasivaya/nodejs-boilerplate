import * as dotenv from "dotenv";
import moment from "moment";
import { Op } from "sequelize";
import { User, VerificationCode } from "../../../database/models";
import { hashPassword, comparePassword } from "../../../helpers/auth";
import randomCode from "../../../helpers/randomCode";
import generateToken from "../../../helpers/token";

dotenv.config();

export const signup = async (req, res) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    gender,
    birth_date: birthDate,
  } = req.body;

  let user = await User.findOne({
    where: { email },
  });

  if (user) {
    return res.status(400).json({
      status: 400,
      message: "User already exists",
    });
  }

  user = await User.create({
    first_name: firstName,
    last_name: lastName,
    email,
    password: hashPassword(password),
    gender,
    birth_date: birthDate,
  });

  return res.status(201).json({
    status: 201,
    message: "User has been created succefully",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      status: 400,
      message: "User doesn't exist",
    });
  }

  if (!comparePassword(password, user.get().password)) {
    return res.status(401).json({
      status: 401,
      message: "Wrong email or password",
    });
  }

  const { password: _, ...args } = user.get({ plain: true });

  const token = await generateToken({ ...args });

  const data = {
    ...args,
    token,
  };

  res.status(200).json({
    status: 200,
    data,
  });
};

export const logout = async (req, res) => {
  const { token } = req;

  token.update({ status: "logout" });

  return res.status(200).json({ status: 200, message: "Logged out" });
};

export const changePassword = async (req, res) => {
  const {
    body: { old_password: oldPassword, new_password: newPassword },
    currentUser: { email },
  } = req;

  const user = await User.findOne({
    where: { email },
  });

  if (!comparePassword(oldPassword, user.get().password)) {
    return res.status(400).json({
      status: 400,
      message: "Wrong email or password",
    });
  }

  user.update({
    password: hashPassword(newPassword),
  });

  res.status(200).json({
    status: 200,
    message: "Password have been changed successfully",
  });
};

export const resetCode = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      status: 400,
      message: "User doesn't exist",
    });
  }
  const oneHourAgo = moment().subtract(1, "hours").format();
  const foundCodes = await VerificationCode.findAll({
    where: {
      email,
      created_at: { [Op.gt]: oneHourAgo },
    },
  });

  if (foundCodes.length > 3) {
    return res.status(403).json({
      status: 403,
      message: "You have reached tries limit, try again in 2 hours",
    });
  }

  const code = randomCode();

  await VerificationCode.create({
    email,
    code,
  });

  return res.status(201).json({
    status: 201,
    data: {
      email,
      code,
    },
  });
};

export const resetPassword = async (req, res) => {
  const { password, confirm_password: confirmPassword, code } = req.body;

  const oneHourAgo = moment().subtract(1, "hours").format();
  const foundCode = await VerificationCode.findOne({
    where: { code, created_at: { [Op.gt]: oneHourAgo } },
  });

  if (!foundCode) {
    return res.status(400).json({
      status: 400,
      message: "Invalid code",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 400,
      message: "Password don't match",
    });
  }

  await User.update(
    {
      password: hashPassword(password),
    },
    {
      where: { email: foundCode.email },
    }
  );

  return res.status(201).json({
    status: 201,
    message: "Password has been set sucessfully",
  });
};
