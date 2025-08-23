import { Request, Response, NextFunction } from "express";
import prisma from "../config/config";

// -------------> CATEGORIES <-----------------------

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.findUnique({
      where: { name },
    });
    if (category)
      return res.status(401).json({ message: "Categtory already exists.. " });

    const newCategory = await prisma.category.create({
      data: { name },
    });
    return res
      .status(200)
      .json({ message: "Category created successfully... " });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the category.. " });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (!isCategory)
      return res.status(401).json({ message: " Category not Found... " });
    await prisma.category.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Category deleted successfully... " });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the Category..." });
  }
};

// UPDATE CATEGORY  INCOMPLETE
const updateCategory = async (req: Request, res: Response) => {};
