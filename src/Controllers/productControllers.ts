import { Request, Response, NextFunction } from "express";
import prisma from "../config/config";

// -------------------PRODUCTS ------------------------

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      category_id,
      product_name,
      product_price,
      description,
      stock,
      discount,
      image,
    } = req.body;

    const isProduct = await prisma.products.findUnique({
      where: { product_name },
    });
    if (isProduct)
      return res
        .status(401)
        .json({ message: "Duplicate Products not allowed... " });

    const product = await prisma.products.create({
      data: {
        category_id,
        product_name,
        product_price,
        description,
        stock,
        discount,
        image,
      },
    });

    res.status(201).json({ message: "Product created successfully...." });
  } catch (error) {
    res.status(500).json({ error: "Failed to Add a product " });
  }
};
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
export const getAdminAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.products.findMany();
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
export const updateProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      category_id,
      product_name,
      product_price,
      description,
      stock,
      discount,
      image,
    } = req.body;

    const isProduct = await prisma.products.findUnique({
      where: { product_id: Number(id) },
    });
    if (!isProduct)
      return res.status(401).json({ message: " Product not Found... " });
    const updateProduct = await prisma.products.update({
      where: { product_id: Number(id) },
      data: {
        category_id,
        product_name,
        product_price,
        description,
        stock,
        discount,
        image,
      },
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to Update the Product..." });
  }
};
export const softDeleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isProduct = await prisma.products.findUnique({
      where: { product_id: Number(id) },
    });
    if (!isProduct)
      return res.status(401).json({ message: " Product not Found... " });
    const product = await prisma.products.update({
      where: { product_id: Number(id) },
      data: { isActive: false },
    });
    res
      .status(200)
      .json({ message: "Product deleted successfully... ", product });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the Product..." });
  }
};
export const reActivateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.products.update({
      where: { product_id: Number(id) },
      data: { isActive: true },
    });
    return res
      .status(200)
      .json({ message: "product activated successfully..." });
  } catch (error) {
    res.status(500).json({ error: "Failed to re Activate Product..." });
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
