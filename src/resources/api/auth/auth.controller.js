import * as dotenv from "dotenv";
import generateToken from "../../../helpers/token";

dotenv.config();

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
