import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client"; // using prisma enum that i have created

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found!" });
    }

    if (req.user.role !== Role.ADMIN) {
      return res.status(403).json({ message: "Forbidden: Admins only..." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
