import { Request, Response } from "express";
import prisma from "../config/config";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

// REGISTER USER   // DONE
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, first_name, last_name, role } = req.body;

    const isUser = await prisma.user.findUnique({
      where: { email },
    });

    if (isUser)
      return res.status(401).json({ message: "User already exists... " });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        role,
      },
    });
    res.status(201).json({ message: "User created successfully... ", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user " });
  }
};

// LOGIN USER   // DONE
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials...." });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials...." });

    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      JWT_ACCESS_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await prisma.user.update({
      where: { id: Number(user.id) },
      data: { refreshToken: refreshToken, accessToken: accessToken },
    });

    const loggedInUser = await prisma.user.findUnique({
      where: { email },
    });

    return res.status(200).json({
      message: "LoggedIn Successfull...",
      loggedInUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " Login Failed .........." });
  }
};

//LOGOUT USER
export const logoutUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Can't log you out ..." });
  }
};
