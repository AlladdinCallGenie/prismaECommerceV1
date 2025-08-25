import { Request, Response, NextFunction } from "express";
import prisma from "../config/config";

// -------------------PRODUCTS ------------------------


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.products.findMany({
      where: { isActive: true },
    });
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch all products..." });
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await prisma.products.findUnique({
      where: { product_id: Number(id) },
    });

    if (!product)
      return res.status(404).json({ message: "Product not found..." });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch product..." });
  }
};
export const getByCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Category name is required" });
    }

    const products = await prisma.products.findMany({
      where: {
        category: {
          name: name,
        },
      },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
