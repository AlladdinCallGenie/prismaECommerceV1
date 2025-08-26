import { Request, Response } from "express";
import prisma from "../config/config";
import bcrypt from "bcrypt";
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
export const getCtgryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (!category)
      return res.status(404).json({ message: "No category found with id.." });
    return res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: "Failed to get the Category by ID..." });
  }
};
export const getAllCtgry = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch All Categories..." });
  }
};
// -------------> ORDERS <-----------------------
export const updateStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Login first.." });

    const { status } = req.body;
    const { id } = req.params;

    const validStatuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    const order = await prisma.order_table.findUnique({
      where: { order_id: Number(id) },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const updatedOrder = await prisma.order_table.update({
      where: {
        order_id: Number(id),
      },
      data: { status },
    });
    res.status(200).json({
      message: `Order #${id} marked as ${status}`,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};
//get all orders
export const allOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order_table.findMany({
      orderBy: { order_date: "asc" },
      include: { order_items: true },
    });
    return res.status(200).json({ Orders: orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to get all orders..." });
  }
};
//cancel or remove orders
// -------------> PRODUCTS <-----------------------

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
export const getAdminAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.products.findMany();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch all products..." });
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
    const isProduct = await prisma.products.findUnique({
      where: { product_id: Number(id) },
    });
    if (!isProduct)
      return res.status(401).json({ message: " Product not Found... " });
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
export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isProduct = await prisma.products.findUnique({
      where: { product_id: Number(id) },
    });
    if (!isProduct)
      return res.status(404).json({ message: " Product not Found... " });
    await prisma.products.delete({ where: { product_id: Number(id) } });
    res.status(200).json({ message: "Product permanently deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Product..." });
  }
};

// -------------> USERS <-----------------------
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch all users..." });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user)
      return res
        .status(404)
        .json({ message: `User with id #${userId} not found....` });

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Cant find user with ID.." });
  }
};
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { username, email, first_name, last_name, password, role } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user)
      return res
        .status(404)
        .json({ message: `User with id #${userId} not found....` });
    const validUserRoles = ["ADMIN", "CUSTOMER"];
    // if (role.includes(validUserRoles))                                 // Needs improvments
    //   return res.status(400).json({ message: "Invalid Role value" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        username,
        email,
        first_name,
        last_name,
        password: hashedPassword,
        role,
      },
    });
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update User... " });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found with given ID...." });
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { isDeleted: true },
    });

    return res.status(200).json({ message: "User deleted successfully...." });
  } catch (error) {
    return res.status(500).json({ error: "Cant delete User .... " });
  }
};

// -------------> COUPONS <-----------------------

export const addCoupon = async (req: Request, res: Response) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscount,
      validTo,
    } = req.body;
    const isCode = await prisma.coupon.findUnique({ where: { code } });
    if (isCode)
      return res.status(400).json({ message: "Coupon already exists..." });
    const coupon = await prisma.coupon.create({
      data: {
        code,
        description,
        discountType,
        discountValue,
        minOrderValue,
        maxDiscount,
        validTo,
      },
    });
    return res.status(200).json({ message: "Coupon created successfully... " });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Cant Add Coupon for some reason .... " });
  }
};
export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      code,
      description,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscount,
      validTo,
    } = req.body;
    const isCoupon = await prisma.coupon.findUnique({
      where: { id: Number(id) },
    });
    if (!isCoupon)
      return res.status(400).json({ message: "Coupon does not exists..." });
    const updatedCoupon = await prisma.coupon.update({
      where: { id: Number(id) },
      data: {
        code,
        description,
        discountType,
        discountValue,
        minOrderValue,
        maxDiscount,
        validTo,
      },
    });
    return res
      .status(200)
      .json({ message: "Updated Coupon:- ", updatedCoupon });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot update coupon due to some reason.." });
  }
};
export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const coupon = await prisma.coupon.findUnique({
      where: { id: Number(id) },
    });
    if (!coupon)
      return res.status(404).json({ message: "No coupon with given ID... " });
    await prisma.coupon.update({
      where: { id: Number(id) },
      data: { isActive: false },
    });
    return res.status(200).json({ message: "Coupon deleted successfully... " });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Cant Delete Coupon for some reason .... " });
  }
};
export const reactivateCoupon = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isCoupon = await prisma.coupon.findUnique({
      where: { id: Number(id) },
    });
    if (!isCoupon)
      return res.status(400).json({ message: "Coupon does not exists..." });
    const updatedCoupon = await prisma.coupon.update({
      where: { id: Number(id) },
      data: {
        isActive: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Coupon reactivated successfully..." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot reactivate coupon due to some reason.." });
  }
};
