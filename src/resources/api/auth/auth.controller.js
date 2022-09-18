import * as dotenv from "dotenv";
import { User } from "../../../database/models";
import { hashPassword } from "../../../helpers/auth";
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
  // Mock User
  const user = {
    id: 1,
    username: "Jean",
    email: "jean@gmail.com",
  };

  const token = await generateToken(user);

  res.json({ token });
};

export const protectedRoute = async (req, res) => {
  res.json({
    message: "I have been verified!",
    data: req.currentUser,
  });
};
