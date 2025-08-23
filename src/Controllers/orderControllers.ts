import { Request, Response, NextFunction } from "express";
import prisma from "../config/config";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Login first.." });
    const userId = req.user.id;
    const { address_id } = req.body;

    const cart = await prisma.shopping_cart.findUnique({
      where: { userId: userId },
      include: { cart_items: true },
    });

    if (!cart || cart.cart_items.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    const address = await prisma.user_address.findFirst({
      where: { address_id: address_id, userId },
    });

    if (!address)
      return res.status(400).json({ error: "Invalid Shipping address..." });

    const totalAmount = cart.cart_items.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const order = await prisma.order_table.create({
      data: {
        userId,
        shippingAddress_id: address.address_id,
        total_amount: totalAmount,
        order_items: {
          create: cart.cart_items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { order_items: true },
    });

    await prisma.cart_items.deleteMany({ where: { cart_id: cart.cart_id } });
    return res
      .status(201)
      .json({ message: "Order created successfully ", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to place the order..." });
  }
};

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

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(404).json({ message: "Login first.." });
    const { id } = req.params; //orderId

    const order = await prisma.order_table.findUnique({
      where: { order_id: Number(id) },
    });
    if (!order) return res.status(404).json({ message: "Order not found... " });
    const updateOrder = await prisma.order_table.update({
      where: { order_id: Number(id) },
      data: { status: "CANCELLED" },
    });
    res.status(200).json({
      message: `Order #${id} marked as CANCELLED !`,
      order: updateOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel order" });
  }
};
