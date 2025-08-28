import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import prisma from "../config/config";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Please login first.. " });

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET) as JwtPayload;

    const existingUser = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!existingUser) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = existingUser;
    return next();
  } catch (error) {
    return refreshAccessToken(req, res, next);
  }
};

async function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const incomingRefreshToken = req.body.refreshToken;
    if (!incomingRefreshToken)
      return res.status(401).json({ message: "Please Login again......." });

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      JWT_REFRESH_SECRET
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const accessToken = jwt.sign({ email: user.email }, JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    await prisma.user.update({
      where: { id: Number(user.id) },
      data: { refreshToken: refreshToken, accessToken: accessToken },
    });
    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or Expired refresh token" });
  }
}
