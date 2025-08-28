import { Request, Response } from "express";
import prisma from "../config/config";

export const paginateData = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.products.findMany({
        skip,
        take: limit,
      }),
      prisma.products.count(),
    ]);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};
