import * as dotenv from "dotenv";
import { User } from "../../../database/models";
import { hashPassword, comparePassword } from "../../../helpers/auth";
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
