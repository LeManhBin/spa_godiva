import { Auth } from "../models/AuthModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { userName, password, role } = req.body;

    if (!userName || !password || !role) {
      return res.status(400).json({
        message: "Bad request",
      });
    }
    const user = await Auth.findOne({ userName: userName });

    if (user) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await Auth.create({
      userName: userName,
      password: hashPassword,
      role: role,
    });

    res.status(200).json({
      data: {
        userName: newUser.userName,
        role: newUser.role,
      },
      message: "Register success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginAuth = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(req.body);
    if (!userName || !password) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const user = await Auth.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({
        message: "Account or password is incorrect",
      });
    }
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = await jwt.sign(
        {
          id: user._id,
          user: user,
        },
        "khoabimat"
      );

      res.status(200).json({
        data: {
          userName: user.userName,
          role: user.role,
        },
        token: token,
        message: "Login success",
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Account or password is incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
